<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coming Soon - FreeFinTools</title>
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
            --card-bg: #ffffff;
            --body-bg: #f1f5f9;
            --header-bg: rgba(255, 255, 255, 0.95);
            --shadow: rgba(0, 0, 0, 0.05);
            --text: #1e293b;
            --text-light: #64748b;
            --border: #e2e8f0;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
        }

        .dark-theme {
            --primary: #5b75f6;
            --primary-dark: #4d67e6;
            --secondary: #06d6a0;
            --dark: #0f172a;
            --light: #0f172a;
            --gray: #94a3b8;
            --light-gray: #1e293b;
            --card-bg: #1e293b;
            --body-bg: #0f172a;
            --header-bg: rgba(15, 23, 42, 0.95);
            --shadow: rgba(0, 0, 0, 0.2);
            --text: #f1f5f9;
            --text-light: #94a3b8;
            --border: #334155;
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
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        
        /* Coming Soon Section */
        .coming-soon {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 60px 0;
            position: relative;
            overflow: hidden;
        }

        .coming-soon-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
        }

        .coming-soon h1 {
            font-size: 4rem;
            margin-bottom: 20px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: fadeInUp 1s ease;
        }

        .coming-soon p {
            font-size: 1.3rem;
            color: var(--text-light);
            margin-bottom: 40px;
            animation: fadeInUp 1s ease 0.2s forwards;
            opacity: 0;
        }

        .progress-container {
            width: 100%;
            height: 20px;
            background-color: var(--light-gray);
            border-radius: 10px;
            overflow: hidden;
            margin: 40px auto;
            max-width: 500px;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            border-radius: 10px;
            width: 20%; /* 3 out of 30 tools completed */
            position: relative;
            animation: progressAnimation 2s ease-in-out;
        }

        .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: 600;
            font-size: 0.8rem;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .counter {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 40px 0;
            animation: fadeInUp 1s ease 0.4s forwards;
            opacity: 0;
        }

        .counter-item {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            min-width: 100px;
            box-shadow: 0 5px 15px var(--shadow);
            border: 1px solid var(--border);
        }

        .counter-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 5px;
        }

        .counter-label {
            font-size: 0.9rem;
            color: var(--text-light);
        }

        .notify-form {
            max-width: 500px;
            margin: 40px auto;
            animation: fadeInUp 1s ease 0.6s forwards;
            opacity: 0;
        }

        .form-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }

        .form-input {
            flex: 1;
            padding: 14px 20px;
            border-radius: 8px;
            border: 2px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text);
            font-size: 1rem;
            transition: all 0.3s;
        }

        .form-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }

        .btn {
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
            display: inline-block;
            cursor: pointer;
            font-size: 1rem;
            border: none;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-outline {
            background-color: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }

        .btn-outline:hover {
            background-color: rgba(67, 97, 238, 0.1);
            transform: translateY(-3px);
        }

        .animation-container {
            position: relative;
            height: 300px;
            margin: 40px auto;
            max-width: 500px;
        }

        /* Animation Elements */
        .gear {
            position: absolute;
            color: var(--primary);
            font-size: 4rem;
            animation: rotate 10s linear infinite;
        }

        .gear-1 {
            top: 20px;
            left: 50px;
            animation-duration: 15s;
        }

        .gear-2 {
            top: 120px;
            right: 80px;
            animation-direction: reverse;
            font-size: 3.5rem;
        }

        .gear-3 {
            bottom: 40px;
            left: 100px;
            font-size: 2.8rem;
            animation-duration: 12s;
        }

        .rocket {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--secondary);
            font-size: 5rem;
            animation: float 3s ease-in-out infinite;
        }

        .star {
            position: absolute;
            color: var(--warning);
            font-size: 1.2rem;
            animation: twinkle 4s infinite;
        }

        .star-1 { top: 30px; right: 100px; animation-delay: 0s; }
        .star-2 { top: 80px; left: 120px; animation-delay: 1s; }
        .star-3 { bottom: 60px; right: 150px; animation-delay: 2s; }
        .star-4 { bottom: 100px; left: 80px; animation-delay: 3s; }

        
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

        @keyframes progressAnimation {
            from {
                width: 0;
            }
            to {
                width: 20%;
            }
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes float {
            0% {
                transform: translate(-50%, -50%);
            }
            50% {
                transform: translate(-50%, -55%);
            }
            100% {
                transform: translate(-50%, -50%);
            }
        }

        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .coming-soon h1 {
                font-size: 2.8rem;
            }
            
            .counter {
                flex-wrap: wrap;
            }
            
            .counter-item {
                min-width: 80px;
                padding: 15px;
            }
            
            .counter-value {
                font-size: 2rem;
            }
            
            .form-group {
                flex-direction: column;
            }
            
            .animation-container {
                height: 250px;
            }
            
            .gear {
                font-size: 3rem;
            }
            
            .rocket {
                font-size: 4rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
     <?php include '../navbar.php'; ?>

    <!-- Coming Soon Section -->
    <section class="coming-soon">
        <div class="container">
            <div class="coming-soon-content">
                <h1>Coming Soon!</h1>
                <p>We're working hard to bring you this financial tool. Stay tuned for its release!</p>
                
                <div class="counter">
                    <div class="counter-item">
                        <div class="counter-value">5</div>
                        <div class="counter-label">Tools Live</div>
                    </div>
                    <div class="counter-item">
                        <div class="counter-value">23</div>
                        <div class="counter-label">In Development</div>
                    </div>
                    <div class="counter-item">
                        <div class="counter-value">27</div>
                        <div class="counter-label">Total Tools</div>
                    </div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar">
                        <!--<div class="progress-text">20% Complete</div>-->
                    </div>
                </div>
                
                <div class="animation-container">
                    <i class="fas fa-cog gear gear-1"></i>
                    <i class="fas fa-cog gear gear-2"></i>
                    <i class="fas fa-cog gear gear-3"></i>
                    <i class="fas fa-rocket rocket"></i>
                    <i class="fas fa-star star star-1"></i>
                    <i class="fas fa-star star star-2"></i>
                    <i class="fas fa-star star star-3"></i>
                    <i class="fas fa-star star star-4"></i>
                </div>
                
               
                
                <a href="/freefintools" class="btn btn-outline"><i class="fas fa-arrow-left"></i> Back to Tools</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
 
    <?php include '../footer.php'; ?>

    <script>
       
    </script>
</body>
</html>