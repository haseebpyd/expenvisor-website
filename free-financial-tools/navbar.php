<?php
// Load site config to access GOOGLE_ANALYTICS_ID
@include_once dirname(__FILE__) . '/../includes/config.php';

// Inject Google Analytics for Free Financial Tools section
if (defined('GOOGLE_ANALYTICS_ID') && GOOGLE_ANALYTICS_ID && GOOGLE_ANALYTICS_ID !== 'G-XXXXXXXXXX') {
    echo '<script async src="https://www.googletagmanager.com/gtag/js?id=' . htmlspecialchars(GOOGLE_ANALYTICS_ID) . '"></script>' . "\n";
    echo '<script>'
        . 'window.dataLayer = window.dataLayer || [];' 
        . 'function gtag(){dataLayer.push(arguments);}'
        . 'gtag("js", new Date());'
        . 'gtag("config", "' . htmlspecialchars(GOOGLE_ANALYTICS_ID) . '");'
        . '</script>' . "\n";
}
?>

 <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo-block">
                    <a href="https://mrhaseeb.com/free-financial-tools" class="logo">
                        <i class="fas fa-calculator"></i>
                        <span>FreeFinTools</span>
                    </a>
                    <div class="by-mrhaseeb">
                        by <a href="https://mrhaseeb.com"  class="mrhaseeb-link">mrhaseeb</a>
                    </div>
                </div>
                <button class="theme-toggle" id="themeToggle">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
        </div>
    </header>
    
    <style>
        /* Header */
        header {
            background-color: var(--header-bg);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px var(--shadow);
            border-bottom: 1px solid var(--border);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
            transition: all 0.3s;
        }

        .logo:hover {
            transform: translateY(-2px);
        }

        .logo i {
            font-size: 1.8rem;
            transition: transform 0.5s;
        }

        .logo:hover i {
            transform: rotate(10deg);
        }

        .theme-toggle {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.4rem;
            color: var(--text);
            transition: transform 0.3s, color 0.3s;
            padding: 8px;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .theme-toggle:hover {
            transform: rotate(15deg);
            background: rgba(67, 97, 238, 0.1);
            color: var(--primary);
        }

        .logo-block {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        @media (max-width: 600px) {
            .logo-block {
                align-items: center;
            }
        }
        .by-mrhaseeb {
            text-align: center;
            font-size: 0.95rem;
            color: var(--text-muted, #888);
            margin-top: -8px;
            margin-bottom: 4px;
            width: 100%;
        }
        .by-mrhaseeb .mrhaseeb-link {
            color: var(--primary);
            text-decoration: underline dotted;
            font-weight: 500;
            transition: color 0.2s;
        }
        .by-mrhaseeb .mrhaseeb-link:hover {
            color: var(--accent-color, #4361ee);
            text-decoration: underline;
        }

    </style>
    
    <script>
         // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Set initial theme based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                document.body.classList.remove('dark-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });

    </script>