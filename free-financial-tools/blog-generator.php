<?php
// Configuration
define('DEEPSEEK_API_KEY', 'your_api_key_here');
define('BLOG_DIR', __DIR__ . '/blogs/');
define('TOOLS', [
    'Loan Calculator' => [
        'path' => '/tools/loan-calculator',
        'prompt' => 'Comprehensive guide to loan calculations including EMI, interest rates, and amortization schedules'
    ],
    'Mortgage Affordability' => [
        'path' => '/tools/mortgage-affordability',
        'prompt' => 'How to determine home affordability based on income, down payment, and location factors'
    ],
    'Compound Interest Calculator' => [
        'path' => '/tools/compound-interest',
        'prompt' => 'Understanding compound interest growth with recurring deposits and long-term projections'
    ],
    'Retirement Planner' => [
        'path' => '/tools/retirement-planner',
        'prompt' => 'Calculating retirement corpus needs considering inflation, lifestyle, and investment strategies'
    ],
    'Debt Payoff Calculator' => [
        'path' => '/tools/debt-payoff',
        'prompt' => 'Comparing snowball vs avalanche methods for efficient debt elimination'
    ]
]);

// Main function to generate blogs
function generateBlogs() {
    // Create directory if needed
    if (!is_dir(BLOG_DIR)) mkdir(BLOG_DIR, 0755, true);
    
    // Get next tool to blog about (round-robin)
    $last_index = file_exists(BLOG_DIR . 'last_index.txt') 
        ? (int)file_get_contents(BLOG_DIR . 'last_index.txt') 
        : -1;
    $current_index = ($last_index + 1) % count(TOOLS);
    file_put_contents(BLOG_DIR . 'last_index.txt', $current_index);
    
    $tool_names = array_keys(TOOLS);
    $tool_name = $tool_names[$current_index];
    $tool = TOOLS[$tool_name];
    
    // Generate blog content
    $blog_html = generateBlogContent($tool_name, $tool['prompt']);
    $blog_path = saveBlogFile($tool_name, $blog_html);
    
    // Update sitemap or linking system
    updateBlogIndex($tool_name, $blog_path);
    
    return "Generated blog for: $tool_name at $blog_path";
}

// Generate blog content using DeepSeek API
function generateBlogContent($tool_name, $prompt) {
    $api_url = 'https://api.deepseek.com/v1/chat/completions';
    
    $messages = [
        [
            'role' => 'system',
            'content' => "You are a financial content expert creating SEO-optimized blog posts for FreeFinTools. 
                Create comprehensive HTML content in the same style as our loan calculator page with:
                - Engaging introduction explaining the tool's importance
                - Step-by-step usage guide with examples
                - Educational sections explaining key concepts
                - Comparison tables when applicable
                - Visual charts using Chart.js syntax
                - Real-life application scenarios
                - FAQ section with 5 questions
                - Strong conclusion with call-to-action
                Use proper heading hierarchy, semantic HTML, and maintain our site's styling."
        ],
        [
            'role' => 'user',
            'content' => "Create blog about: $tool_name. Focus on: $prompt. 
                Include Chart.js configuration for relevant visualizations. 
                Use HTML structure with proper sections. 
                Target keywords: '$tool_name, free financial tools, personal finance education'"
        ]
    ];
    
    $data = [
        'model' => 'deepseek-chat',
        'messages' => $messages,
        'temperature' => 0.7,
        'max_tokens' => 4000
    ];
    
    $ch = curl_init($api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . DEEPSEEK_API_KEY
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    return $result['choices'][0]['message']['content'] ?? '';
}

// Save blog to HTML file
function saveBlogFile($tool_name, $content) {
    $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($tool_name));
    $filename = date('Y-m-d') . '-' . $slug . '.html';
    $filepath = BLOG_DIR . $filename;
    
    // Wrap in site template
    $full_html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$tool_name - Free Financial Education | FreeFinTools</title>
    <meta name="description" content="Learn how to use our $tool_name tool to improve your financial literacy and decision making">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Include your existing CSS styles here */
        :root { /* ... existing root variables ... */ }
        body { /* ... existing body styles ... */ }
        /* Add any additional blog-specific styles */
        .blog-content { max-width: 800px; margin: 40px auto; }
        .blog-hero { text-align: center; padding: 40px 0; }
    </style>
</head>
<body>
    <?php include '../navbar.php' ?>
    
    <section class="blog-hero">
        <div class="container">
            <h1>$tool_name: Master Your Financial Strategy</h1>
            <p>Published on: <?= date('F j, Y') ?></p>
        </div>
    </section>

    <div class="container blog-content">
        $content
    </div>

    <?php include '../footer.php' ?>
    
    <script>
        // Initialize any charts in the blog content
        document.querySelectorAll('.chart-container').forEach(container => {
            const ctx = container.querySelector('canvas').getContext('2d');
            const config = JSON.parse(container.dataset.config);
            new Chart(ctx, config);
        });
    </script>
</body>
</html>
HTML;

    file_put_contents($filepath, $full_html);
    return $filepath;
}

// Update blog index (simplified example)
function updateBlogIndex($tool_name, $blog_path) {
    $index_file = BLOG_DIR . 'index.html';
    $relative_path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $blog_path);
    
    $entry = "<li><a href='$relative_path'>$tool_name - " . date('M d, Y') . "</a></li>\n";
    
    if (file_exists($index_file)) {
        $content = file_get_contents($index_file);
        // Insert new entry at top
        $new_content = preg_replace('/(<ul[^>]*>)/', "$1\n$entry", $content);
        file_put_contents($index_file, $new_content);
    } else {
        $content = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <title>Financial Education Blog | FreeFinTools</title>
</head>
<body>
    <h1>Financial Education Resources</h1>
    <ul>
        $entry
    </ul>
</body>
</html>
HTML;
        file_put_contents($index_file, $content);
    }
}

// Execute the blog generation
try {
    $result = generateBlogs();
    echo $result;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>