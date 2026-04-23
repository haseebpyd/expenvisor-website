<?php
// index.php
$buyCoffeeUrl = "https://coff.ee/mrhaseeb";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>free-financial-tools - Free Financial Tools & Calculators</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4361ee;
            --primary-dark: #3a56d4;
            --secondary: #06d6a0;
            --dark: #1e293b;
            --light: #f8fafc;
            --gray: #64748b;
            --light-gray: #e2e8f0;
            --card-bg: rgba(255, 255, 255, 0.7);
            --body-bg: #f1f5f9;
            --header-bg: rgba(255, 255, 255, 0.9);
            --shadow: rgba(0, 0, 0, 0.05);
            --text: #1e293b;
            --text-light: #64748b;
            --border: rgba(255, 255, 255, 0.5);
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }

        .dark-theme {
            --primary: #5b75f6;
            --primary-dark: #4d67e6;
            --secondary: #06d6a0;
            --dark: #0f172a;
            --light: #0f172a;
            --gray: #94a3b8;
            --light-gray: #1e293b;
            --card-bg: rgba(30, 41, 59, 0.6);
            --body-bg: #0f172a;
            --header-bg: rgba(15, 23, 42, 0.9);
            --shadow: rgba(0, 0, 0, 0.2);
            --text: #f1f5f9;
            --text-light: #94a3b8;
            --border: rgba(255, 255, 255, 0.1);
            --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--body-bg);
            color: var(--text);
            transition: background-color 0.3s, color 0.3s;
            line-height: 1.6;
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 10;
        }

        /* Floating Background Elements */
        .floating-shapes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
            pointer-events: none;
        }

        .shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.1;
            animation: float 25s infinite linear;
            filter: blur(20px);
        }

        .shape-1 {
            width: 300px;
            height: 300px;
            background: var(--primary);
            top: 10%;
            right: -100px;
            animation-duration: 25s;
        }

        .shape-2 {
            width: 200px;
            height: 200px;
            background: var(--secondary);
            bottom: 10%;
            left: 5%;
            animation-duration: 30s;
            animation-delay: -5s;
        }

        .shape-3 {
            width: 150px;
            height: 150px;
            background: #FF813F;
            top: 30%;
            left: -50px;
            animation-duration: 22s;
            animation-delay: -8s;
        }

        .shape-4 {
            width: 100px;
            height: 100px;
            background: #F06595;
            bottom: 20%;
            right: 20%;
            animation-duration: 28s;
            animation-delay: -12s;
        }

        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(20px, 30px) rotate(90deg);
            }
            50% {
                transform: translate(40px, 0) rotate(180deg);
            }
            75% {
                transform: translate(20px, -30px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }

        
        /* Hero Section - Enhanced with Glassmorphism */
        .hero {
            padding: 140px 0 100px;
            text-align: center;
            position: relative;
            overflow: hidden;
            margin-bottom: 60px;
        }

        .hero::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary) 0%, #3a56d4 100%);
            z-index: -2;
        }

        .hero-content {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 24px;
            border: 1px solid var(--border);
            padding: 60px 40px;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: var(--glass-shadow);
            position: relative;
            overflow: hidden;
        }

        .hero-content::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 Q50,10 100,0 L100,100 Q50,90 0,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
            background-size: cover;
            opacity: 0.2;
            z-index: -1;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            animation: fadeInUp 1s ease;
            text-shadow: 0 2px 10px rgba(0,0,0,0.15);
            color: white;
            line-height: 1.2;
        }

        .hero p {
            font-size: 1.3rem;
            max-width: 700px;
            margin: 0 auto 40px;
            animation: fadeInUp 1s ease 0.2s forwards;
            opacity: 0;
            text-shadow: 0 1px 5px rgba(0,0,0,0.1);
            color: rgba(255, 255, 255, 0.9);
        }

        .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            animation: fadeInUp 1s ease 0.4s forwards;
            opacity: 0;
        }

        .btn {
            padding: 16px 40px;
            border-radius: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.4s;
            display: inline-block;
            cursor: pointer;
            font-size: 1.1rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            position: relative;
            overflow: hidden;
            z-index: 2;
            border: 2px solid transparent;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            z-index: -1;
            transition: transform 0.5s;
            transform: scaleX(0);
            transform-origin: right;
        }

        .btn:hover::before {
            transform: scaleX(1);
            transform-origin: left;
        }

        .btn-primary {
            background: white;
            color: var(--primary);
        }

        .btn-primary:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid white;
            color: white;
        }

        .btn-outline:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
        }

        /* Search & Filters */
        .search-section {
            margin-bottom: 60px;
            position: relative;
            z-index: 10;
        }

        .search-container {
            max-width: 800px;
            margin: 0 auto 30px;
            position: relative;
        }

        .search-bar {
            width: 100%;
            padding: 18px 24px;
            padding-left: 60px;
            border-radius: 16px;
            border: 2px solid var(--border);
            background: var(--card-bg);
            color: var(--text);
            font-size: 1.1rem;
            transition: all 0.4s;
            box-shadow: var(--glass-shadow);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .search-bar:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.2), var(--glass-shadow);
        }

        .search-icon {
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray);
            font-size: 1.3rem;
        }

        .filter-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 20px;
        }

        .filter-btn {
            padding: 12px 28px;
            border-radius: 50px;
            background: var(--card-bg);
            border: 2px solid var(--border);
            color: var(--text);
            font-weight: 500;
            cursor: pointer;
            transition: all 0.4s;
            box-shadow: var(--glass-shadow);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .filter-btn:hover, .filter-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
        }

        /* Tools Grid with Glassmorphism */
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 35px;
            margin-bottom: 80px;
            position: relative;
            z-index: 10;
        }

        .tool-card {
            background: var(--card-bg);
            border-radius: 24px;
            overflow: hidden;
            transition: all 0.4s;
            border: 1px solid var(--border);
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
            box-shadow: var(--glass-shadow);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transform: translateY(0);
        }

        .tool-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 20px 40px rgba(31, 38, 135, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .tool-icon {
            height: 160px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .tool-icon::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
            transform: rotate(30deg);
        }

        .tool-icon i {
            position: relative;
            z-index: 2;
            text-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: transform 0.4s;
        }

        .tool-card:hover .tool-icon i {
            transform: scale(1.1);
        }

        .tool-content {
            padding: 30px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .tool-content h3 {
            margin-bottom: 15px;
            font-size: 1.5rem;
            transition: color 0.4s;
        }

        .tool-card:hover .tool-content h3 {
            color: var(--primary);
        }

        .tool-content p {
            color: var(--text-light);
            margin-bottom: 25px;
            flex-grow: 1;
            font-size: 1.05rem;
            line-height: 1.7;
        }

        .tool-category {
            display: inline-block;
            background: rgba(6, 214, 160, 0.15);
            color: var(--secondary);
            padding: 8px 18px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 20px;
            transition: all 0.4s;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(6, 214, 160, 0.2);
        }

        .tool-card:hover .tool-category {
            background: var(--secondary);
            color: white;
            transform: translateY(-3px);
        }

        .tool-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.4s;
            display: block;
            width: 100%;
            text-align: center;
            text-decoration: none;
            box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .tool-btn:hover {
            background: var(--primary-dark);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(67, 97, 238, 0.4);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tool-card {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
            transform: translateY(20px);
        }

        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 80px 0;
            color: var(--text-light);
            font-size: 1.2rem;
            background: var(--card-bg);
            border-radius: 24px;
            box-shadow: var(--glass-shadow);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
       
        /* Responsive */
        @media (max-width: 992px) {
            .hero h1 {
                font-size: 3rem;
            }
            
            .tools-grid {
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            }
        }

        @media (max-width: 768px) {
            .hero {
                padding: 100px 0 80px;
            }
            
            .hero-content {
                padding: 40px 25px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.1rem;
            }
            
            .hero-buttons {
                flex-direction: column;
                gap: 15px;
                align-items: center;
            }
            
            .tools-grid {
                grid-template-columns: 1fr;
            }
            
            .filter-container {
                justify-content: flex-start;
                overflow-x: auto;
                padding-bottom: 10px;
            }
            
            .btn {
                padding: 14px 30px;
            }
        }

        @media (max-width: 480px) {
            .hero h1 {
                font-size: 2.2rem;
            }
            
            .search-bar {
                padding: 16px 20px 16px 50px;
            }
            
            .filter-btn {
                padding: 10px 20px;
                font-size: 0.95rem;
            }
        }
    </style>
</head>
<body>
    <!-- Floating Background Elements -->
    <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
    </div>

    <!--Header Section-->
    <?php include 'navbar.php'; ?>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Free Financial Tools & Calculators</h1>
                <p>Access 30+ powerful financial tools to make smarter money decisions. Completely free with no signup required.</p>
                <div class="hero-buttons">
                    <a href="/free-financial-tools" class="btn btn-primary">Explore All Tools</a>
                    <a href="/free-financial-tools/how-it-works" class="btn btn-outline">How It Works</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <div class="container">
        <!-- Search & Filters -->
        <section class="search-section">
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-bar" id="searchInput" placeholder="Search for financial tools...">
            </div>
            <div class="filter-container" id="filterContainer">
                <button class="filter-btn active" data-category="all">All Tools</button>
                <button class="filter-btn" data-category="Calculators">Calculators</button>
                <button class="filter-btn" data-category="Currency">Currency & Conversion</button>
                <button class="filter-btn" data-category="Investment">Investment Tools</button>
                <button class="filter-btn" data-category="Tax">Tax & Compliance</button>
                <button class="filter-btn" data-category="Budgeting">Budgeting</button>
                <button class="filter-btn" data-category="Document">Document Generators</button>
                <button class="filter-btn" data-category="Educational">Educational</button>
            </div>
        </section>

        <!-- Tools Grid -->
        <section class="tools-grid" id="toolsGrid">
            <!-- Tools will be dynamically inserted here -->
        </section>
    </div>
    
    <!-- Footer -->
    <?php include 'footer.php'; ?>
    
    <script>
       
        // Tool Data
        const tools = [
            {
                name: "Loan Calculator",
                description: "Calculate EMI, total interest, and amortization schedule for personal, auto, and student loans.",
                category: "Calculators",
                icon: "fa-hand-holding-usd",
                link: "/loan-calculator"
            },
            {
                name: "Mortgage Affordability",
                description: "Determine how much home you can afford based on income, down payment, and location.",
                category: "Calculators",
                icon: "fa-home",
                link: "/mortgage-affordability-calculator"
            },
            {
                name: "Compound Interest Calculator",
                description: "Project savings growth with recurring deposits and compound interest.",
                category: "Calculators",
                icon: "fa-chart-line",
                link: "/compound-interest-calculator"
            },
            {
                name: "Retirement Planner",
                description: "Calculate your retirement corpus needs based on age, inflation, and lifestyle.",
                category: "Calculators",
                icon: "fa-umbrella-beach",
                link: "/retirement-planner"
            },
            {
                name: "Debt Payoff Calculator",
                description: "Compare snowball vs. avalanche methods to eliminate debt faster.",
                category: "Calculators",
                icon: "fa-credit-card",
                link: "/debt-payoff-calculator"
            },
            {
                name: "Currency Converter",
                description: "Real-time exchange rates for all major world currencies.",
                category: "Currency & Conversion",
                icon: "fa-money-bill-wave",
                link: "/currency-converter"
            },
            {
                name: "Inflation Calculator",
                description: "See how the value of money changes over time due to inflation.",
                category: "Currency & Conversion",
                icon: "fa-chart-pie",
                link: "/inflation-calculator"
            },
            {
                name: "Crypto Converter",
                description: "Convert between fiat currencies and major cryptocurrencies.",
                category: "Currency & Conversion",
                icon: "fa-bitcoin",
                link: "/crypto-converter"
            },
            {
                name: "Stock Return Calculator",
                description: "Calculate returns including dividends, splits, and CAGR.",
                category: "Investment Tools",
                icon: "fa-chart-bar",
                link: "/stock-return-calculator"
            },
            {
                name: "Mutual Fund Comparator",
                description: "Compare fees (TER), returns, and performance vs. benchmarks.",
                category: "Investment Tools",
                icon: "fa-balance-scale",
                link: "/mutual-fund-comparator"
            },
            {
                name: "Risk Tolerance Assessor",
                description: "Quiz-based assessment for conservative/aggressive portfolio recommendations.",
                category: "Investment Tools",
                icon: "fa-user-shield",
                link: "/risk-tolerance-assessor"
            },
            {
                name: "Income Tax Calculator",
                description: "Estimate taxes based on income, deductions, and country-specific rules.",
                category: "Tax & Compliance",
                icon: "fa-file-invoice-dollar",
                link: "/income-tax-calculator"
            },
            {
                name: "GST/VAT Calculator",
                description: "Add or remove tax from amounts for accurate pricing.",
                category: "Tax & Compliance",
                icon: "fa-percent",
                link: "/gst-vat-calculator"
            },
            {
                name: "Capital Gains Estimator",
                description: "Calculate taxes on investment profits from short and long-term holdings.",
                category: "Tax & Compliance",
                icon: "fa-coins",
                link: "/capital-gains-estimator"
            },
            {
                name: "Budget Planner",
                description: "Create personalized budgets using the 50/30/20 rule templates.",
                category: "Budgeting & Daily Finance",
                icon: "fa-wallet",
                link: "/budget-planner"
            },
            {
                name: "Emergency Fund Calculator",
                description: "Determine your ideal emergency fund based on monthly expenses.",
                category: "Budgeting & Daily Finance",
                icon: "fa-piggy-bank",
                link: "/emergency-fund-calculator"
            },
            {
                name: "Cost of Living Comparator",
                description: "Compare expenses between cities for rent, groceries, and transportation.",
                category: "Budgeting & Daily Finance",
                icon: "fa-city",
                link: "/cost-of-living-comparator"
            },
            {
                name: "Invoice Generator",
                description: "Create professional PDF invoices for freelancers and businesses.",
                category: "Document Generators",
                icon: "fa-file-invoice",
                link: "/invoice-generator"
            },
            {
                name: "Rent Receipt Generator",
                description: "Generate pre-formatted rent receipts for tenants and landlords.",
                category: "Document Generators",
                icon: "fa-receipt",
                link: "/rent-receipt-generator"
            },
            {
                name: "Financial Literacy Quiz",
                description: "Test your knowledge on investing, debt management, and more.",
                category: "Educational Tools",
                icon: "fa-graduation-cap",
                link: "/financial-literacy-quiz"
            },
            {
                name: "Investment Basics Course",
                description: "Learn fundamental investment concepts with interactive modules.",
                category: "Educational Tools",
                icon: "fa-book-open",
                link: "/investment-basics-course"
            },
            {
                name: "Credit Score Simulator",
                description: "See how financial decisions affect your credit score over time.",
                category: "Educational Tools",
                icon: "fa-chart-line",
                link: "/credit-score-simulator"
            },
            {
                name: "Expense Tracker",
                description: "Monitor your spending habits and identify saving opportunities.",
                category: "Budgeting & Daily Finance",
                icon: "fa-receipt",
                link: "/expense-tracker"
            },
            {
                name: "Savings Goal Planner",
                description: "Set and track progress toward your financial objectives.",
                category: "Budgeting & Daily Finance",
                icon: "fa-bullseye",
                link: "/savings-goal-planner"
            }
        ];

        // Generate tool cards
        const toolsGrid = document.getElementById('toolsGrid');
        
        function renderTools(toolList) {
            toolsGrid.innerHTML = '';
            
            if (toolList.length === 0) {
                toolsGrid.innerHTML = '<div class="no-results"><i class="fas fa-search fa-2x" style="margin-bottom: 20px;"></i><h3>No tools found</h3><p>Try adjusting your search or filter criteria</p></div>';
                return;
            }
            
            toolList.forEach((tool, index) => {
                const toolCard = document.createElement('div');
                toolCard.className = 'tool-card';
                toolCard.style.animationDelay = `${index * 0.05}s`;
                
                toolCard.innerHTML = `
                    <div class="tool-icon">
                        <i class="fas ${tool.icon}"></i>
                    </div>
                    <div class="tool-content">
                        <span class="tool-category">${tool.category}</span>
                        <h3>${tool.name}</h3>
                        <p>${tool.description}</p>
                        <a href="/free-financial-tools${tool.link || '#'}" class="tool-btn">Use Tool</a>
                    </div>
                `;
                
                toolsGrid.appendChild(toolCard);
            });
        }
        
        // Initial render
        renderTools(tools);
        
        // Search functionality
        const searchBar = document.getElementById('searchInput');
        
        searchBar.addEventListener('input', () => {
            filterTools();
        });
        
        // Filter functionality with fixed categories
        const filterButtons = document.querySelectorAll('.filter-btn');
        let activeFilter = "all";
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Set active filter
                activeFilter = button.getAttribute('data-category');
                
                filterTools();
            });
        });
        
        // Improved filter function
        function filterTools() {
            const searchTerm = searchBar.value.toLowerCase();
            
            const filteredTools = tools.filter(tool => {
                // Search term matching
                const matchesSearch = 
                    tool.name.toLowerCase().includes(searchTerm) ||
                    tool.description.toLowerCase().includes(searchTerm) ||
                    tool.category.toLowerCase().includes(searchTerm);
                
                // Category matching with keyword mapping
                let matchesCategory = true;
                
                if (activeFilter !== "all") {
                    switch(activeFilter) {
                        case "Budgeting":
                            matchesCategory = tool.category.includes("Budgeting");
                            break;
                        case "Educational":
                            matchesCategory = tool.category.includes("Educational");
                            break;
                        case "Currency":
                            matchesCategory = tool.category.includes("Currency");
                            break;
                        case "Investment":
                            matchesCategory = tool.category.includes("Investment");
                            break;
                        case "Tax":
                            matchesCategory = tool.category.includes("Tax");
                            break;
                        case "Document":
                            matchesCategory = tool.category.includes("Document");
                            break;
                        default:
                            matchesCategory = tool.category === activeFilter;
                    }
                }
                
                return matchesSearch && matchesCategory;
            });
            
            renderTools(filteredTools);
        }
        
        
    </script>
</body>
</html>