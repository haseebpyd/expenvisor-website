<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Retirement Planner | Calculate Your Retirement Corpus - FreeFinTools</title>
    <meta name="description" content="Calculate your retirement corpus needs based on age, inflation, and lifestyle. Free online retirement planner for financial independence. No signup required.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
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
            overflow-x: hidden;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Tool Hero */
        .tool-hero {
            padding: 40px 0 20px;
            text-align: center;
        }

        .tool-hero h1 {
            font-size: 2.2rem;
            margin-bottom: 15px;
            color: var(--primary);
        }

        .tool-hero p {
            font-size: 1.1rem;
            max-width: 800px;
            margin: 0 auto 20px;
            color: var(--text-light);
        }

        /* Calculator Section */
        .calculator-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }

        @media (max-width: 900px) {
            .calculator-container {
                grid-template-columns: 1fr;
            }
        }

        .calculator-card {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px var(--shadow);
            border: 1px solid var(--border);
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--text);
            font-size: 0.95rem;
        }

        .input-with-tooltip {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .input-with-tooltip input {
            flex: 1;
        }

        .tooltip {
            position: relative;
            cursor: pointer;
        }

        .tooltip .tooltip-text {
            visibility: hidden;
            width: 200px;
            background-color: var(--dark);
            color: white;
            text-align: center;
            border-radius: 6px;
            padding: 8px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 0.85rem;
            font-weight: normal;
        }

        .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }

        .input-control {
            width: 100%;
            padding: 12px 14px;
            border-radius: 8px;
            border: 2px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text);
            font-size: 1rem;
            transition: all 0.3s;
        }

        .input-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }
        
        .currency-select {
            width: 100%;
            padding: 12px 14px;
            border-radius: 8px;
            border: 2px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text);
            font-size: 1rem;
            transition: all 0.3s;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 14px center;
            background-size: 14px;
        }
        
        .currency-select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }

        .btn-calculate {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            display: block;
            width: 100%;
            text-align: center;
            font-size: 1rem;
            margin-top: 15px;
        }

        .btn-calculate:hover {
            background-color: var(--primary-dark);
        }

        .results-card {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 8px 25px rgba(67, 97, 238, 0.3);
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .result-item {
            text-align: center;
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            backdrop-filter: blur(8px);
        }

        .result-value {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 8px 0;
        }

        .result-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        /* Charts Section */
        .charts-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 40px;
        }

        @media (max-width: 768px) {
            .charts-container {
                grid-template-columns: 1fr;
            }
        }

        .chart-card {
            background-color: var(--card-bg);
            border-radius: 14px;
            padding: 25px;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border);
        }

        .chart-card h3 {
            margin-bottom: 15px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.2rem;
        }

        .chart-container {
            height: 250px;
            position: relative;
        }

        /* Schedule Section */
        .schedule-section {
            background-color: var(--card-bg);
            border-radius: 14px;
            padding: 25px;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border);
            margin-bottom: 40px;
            overflow-x: auto;
        }

        .schedule-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .export-buttons {
            display: flex;
            gap: 8px;
        }

        .btn-export {
            background-color: var(--light-gray);
            color: var(--text);
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.9rem;
        }

        .btn-export:hover {
            background-color: var(--primary);
            color: white;
        }

        .schedule-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px;
        }

        .schedule-table th {
            background-color: var(--light-gray);
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .schedule-table td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--border);
            font-size: 0.9rem;
        }

        .schedule-table tr:last-child td {
            border-bottom: none;
        }

        .schedule-table tr:hover td {
            background-color: rgba(67, 97, 238, 0.05);
        }
        
        .show-all-btn {
            display: block;
            margin: 20px auto 0;
            background: none;
            border: none;
            color: var(--primary);
            font-weight: 600;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 6px;
            transition: all 0.3s;
            border: 1px solid var(--primary);
            font-size: 0.9rem;
        }
        
        .show-all-btn:hover {
            background-color: var(--primary);
            color: white;
        }

        /* Educational Content */
        .content-section {
            margin-bottom: 40px;
        }

        .section-title {
            font-size: 1.6rem;
            margin-bottom: 20px;
            color: var(--primary);
            padding-bottom: 8px;
            border-bottom: 2px solid var(--light-gray);
        }

        .content-card {
            background-color: var(--card-bg);
            border-radius: 14px;
            padding: 25px;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border);
            margin-bottom: 25px;
        }

        .content-card h3 {
            margin-bottom: 12px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.1rem;
        }

        .content-card p {
            margin-bottom: 12px;
            line-height: 1.7;
            font-size: 0.95rem;
        }
        
        .formula-container {
            background-color: rgba(6, 214, 160, 0.1);
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
        }
        
        .formula-container pre {
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
            margin: 0;
            white-space: pre-wrap;
            color: var(--text);
        }
        
        .formula-container .formula-title {
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--primary);
        }

        .faq-item {
            margin-bottom: 15px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 15px;
        }

        .faq-question {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .faq-answer {
            color: var(--text-light);
            line-height: 1.7;
            font-size: 0.95rem;
        }

        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animated {
            animation: fadeIn 0.6s ease forwards;
        }

        .hidden {
            display: none;
        }
        
        .show-all-container {
            text-align: center;
            margin-top: 15px;
        }
        
        .lifestyle-options {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }
        
        .lifestyle-option {
            flex: 1;
            min-width: 90px;
            padding: 10px;
            border: 2px solid var(--border);
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
        }
        
        .lifestyle-option:hover {
            border-color: var(--primary);
        }
        
        .lifestyle-option.selected {
            background-color: rgba(67, 97, 238, 0.1);
            border-color: var(--primary);
        }
        
        .lifestyle-option i {
            font-size: 1.3rem;
            margin-bottom: 6px;
            display: block;
            color: var(--primary);
        }

        /* Responsive fixes */
        @media (max-width: 600px) {
            .tool-hero {
                padding: 30px 0 15px;
            }
            
            .tool-hero h1 {
                font-size: 1.8rem;
            }
            
            .tool-hero p {
                font-size: 1rem;
            }
            
            .calculator-card,
            .results-card,
            .chart-card,
            .schedule-section,
            .content-card {
                padding: 20px;
                border-radius: 12px;
            }
            
            .results-grid {
                grid-template-columns: 1fr;
                gap: 10px;
            }
            
            .result-value {
                font-size: 1.3rem;
            }
            
            .section-title {
                font-size: 1.4rem;
            }
            
            .lifestyle-option {
                min-width: 80px;
                font-size: 0.8rem;
            }
            
            .input-control, 
            .currency-select {
                padding: 10px 12px;
                font-size: 0.95rem;
            }
            
            .btn-export {
                padding: 6px 12px;
                font-size: 0.85rem;
            }
        }
        
        /* Scrollbar styling for better mobile experience */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--light-gray);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary-dark);
        }
         
    </style>
</head>
<body>
    <?php include '../navbar.php' ?>
    <!-- Tool Hero -->
    <section class="tool-hero">
        <div class="container">
            <h1>Free Retirement Planner Calculator</h1>
            <p>Calculate your retirement corpus needs based on age, inflation, and lifestyle. Plan your financial independence with our comprehensive retirement planning tool.</p>
        </div>
    </section>

    <!-- Calculator Section -->
    <div class="container">
        <div class="calculator-container">
            <div class="calculator-card">
                <h2>Retirement Details</h2>
                <p class="input-group">Enter your retirement information to calculate your retirement corpus</p>
                
                <div class="input-group">
                    <label for="currentAge">Current Age</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="currentAge" class="input-control" value="35" min="18" max="70">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Your current age in years</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="retirementAge">Planned Retirement Age</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="retirementAge" class="input-control" value="65" min="40" max="90">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Age at which you plan to retire</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="lifeExpectancy">Life Expectancy</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="lifeExpectancy" class="input-control" value="90" min="70" max="120">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Estimated life expectancy in years</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="currentIncome">Current Annual Income</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="currentIncome" class="input-control" value="60000" min="1000" max="10000000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Your current annual income before taxes</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="incomeReplacement">Income Replacement Ratio (%)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="incomeReplacement" class="input-control" value="70" min="10" max="100">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Percentage of income you'll need in retirement</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label>Lifestyle in Retirement</label>
                    <div class="lifestyle-options">
                        <div class="lifestyle-option" data-value="60">
                            <i class="fas fa-home"></i>
                            <div>Modest</div>
                        </div>
                        <div class="lifestyle-option selected" data-value="70">
                            <i class="fas fa-umbrella-beach"></i>
                            <div>Comfortable</div>
                        </div>
                        <div class="lifestyle-option" data-value="80">
                            <i class="fas fa-plane"></i>
                            <div>Luxury</div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="currentSavings">Current Retirement Savings</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="currentSavings" class="input-control" value="100000" min="0" max="10000000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Amount you've already saved for retirement</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="annualContribution">Annual Contribution</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="annualContribution" class="input-control" value="10000" min="0" max="1000000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Amount you save annually for retirement</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="preReturn">Expected Return Before Retirement (%)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="preReturn" class="input-control" value="7" min="0" max="20" step="0.1">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Average annual return on investments before retirement</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="postReturn">Expected Return After Retirement (%)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="postReturn" class="input-control" value="5" min="0" max="20" step="0.1">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Average annual return on investments after retirement</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="inflation">Expected Inflation Rate (%)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="inflation" class="input-control" value="3" min="0" max="20" step="0.1">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Average annual inflation rate</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="currencySelect">Currency</label>
                    <select id="currencySelect" class="currency-select">
                        <option value="USD">$ US Dollar (USD)</option>
                        <option value="EUR">€ Euro (EUR)</option>
                        <option value="GBP">£ British Pound (GBP)</option>
                        <option value="JPY">¥ Japanese Yen (JPY)</option>
                        <option value="CAD">$ Canadian Dollar (CAD)</option>
                        <option value="AUD">$ Australian Dollar (AUD)</option>
                        <option value="CHF">₣ Swiss Franc (CHF)</option>
                        <option value="CNY">¥ Chinese Yuan (CNY)</option>
                        <option value="INR">₹ Indian Rupee (INR)</option>
                        <option value="PKR">PKR Pakistani Rupee (PKR)</option>
                        <option value="MXN">$ Mexican Peso (MXN)</option>
                        <option value="BRL">R$ Brazilian Real (BRL)</option>
                        <option value="RUB">₽ Russian Ruble (RUB)</option>
                        <option value="KRW">₩ South Korean Won (KRW)</option>
                        <option value="SGD">$ Singapore Dollar (SGD)</option>
                        <option value="NZD">$ New Zealand Dollar (NZD)</option>
                        <option value="TRY">₺ Turkish Lira (TRY)</option>
                        <option value="ZAR">R South African Rand (ZAR)</option>
                        <option value="SEK">kr Swedish Krona (SEK)</option>
                        <option value="NOK">kr Norwegian Krone (NOK)</option>
                        <option value="DKK">kr Danish Krone (DKK)</option>
                        <option value="PLN">zł Polish Złoty (PLN)</option>
                    </select>
                </div>
                
                <button id="calculateBtn" class="btn-calculate">Calculate Retirement Corpus</button>
            </div>
            
            <div class="results-card">
                <h2>Your Retirement Summary</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-label">Required Retirement Corpus</div>
                        <div class="result-value" id="requiredCorpus">$1,250,000</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Current Savings Projected</div>
                        <div class="result-value" id="projectedSavings">$380,000</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Additional Savings Needed</div>
                        <div class="result-value" id="additionalNeeded">$870,000</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Monthly Contribution Needed</div>
                        <div class="result-value" id="monthlyContribution">$1,200</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Charts Section -->
        <div class="charts-container">
            <div class="chart-card">
                <h3><i class="fas fa-chart-pie"></i> Corpus Breakdown</h3>
                <div class="chart-container">
                    <canvas id="compositionChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h3><i class="fas fa-chart-line"></i> Savings vs Retirement Needs</h3>
                <div class="chart-container">
                    <canvas id="balanceChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Schedule Section -->
        <div class="schedule-section">
            <div class="schedule-header">
                <h2>Retirement Projection</h2>
                <div class="export-buttons">
                    <button class="btn-export" id="pdfBtn"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    <button class="btn-export" id="printBtn"><i class="fas fa-print"></i> Print</button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="schedule-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Age</th>
                            <th>Annual Savings</th>
                            <th>Savings Growth</th>
                            <th>Total Savings</th>
                            <th>Required Corpus</th>
                        </tr>
                    </thead>
                    <tbody id="scheduleBody">
                        <!-- Schedule will be populated here -->
                    </tbody>
                </table>
            </div>
            
            <div class="show-all-container">
                <button id="showAllBtn" class="show-all-btn">
                    <i class="fas fa-chevron-down"></i> Show Full Schedule
                </button>
            </div>
        </div>
        
        <!-- Educational Content -->
        <div class="content-section">
            <h2 class="section-title">Understanding Retirement Planning</h2>
            
            <div class="content-card animated">
                <h3><i class="fas fa-calculator"></i> How Retirement Calculations Work</h3>
                <p>Retirement planning involves calculating how much money you'll need to maintain your desired lifestyle after you stop working. The calculation considers your current age, retirement age, life expectancy, income, savings, and expected returns.</p>
                
                <div class="formula-container">
                    <div class="formula-title">Retirement Corpus Formula:</div>
                    <pre>
Retirement Corpus = Annual Retirement Income × (1 - (1 / (1 + r)^n) / r

Where:
r = Annual return rate after retirement
n = Number of years in retirement

Annual Retirement Income = Current Income × Income Replacement Ratio × (1 + Inflation)^Years to Retirement
                    </pre>
                </div>
                
                <p>This formula calculates the lump sum needed at retirement that can generate sufficient income throughout your retirement years.</p>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-lightbulb"></i> Tips for Retirement Planning</h3>
                <ul>
                    <li><strong>Start early:</strong> The power of compounding means starting early can significantly reduce the amount you need to save monthly.</li>
                    <li><strong>Maximize employer contributions:</strong> Take full advantage of any employer matching in retirement plans.</li>
                    <li><strong>Diversify investments:</strong> Spread your investments across different asset classes to manage risk.</li>
                    <li><strong>Review regularly:</strong> Reassess your retirement plan annually and adjust for life changes.</li>
                    <li><strong>Consider healthcare costs:</strong> Factor in potential healthcare expenses which typically increase with age.</li>
                    <li><strong>Plan for inflation:</strong> Ensure your retirement income keeps pace with inflation.</li>
                </ul>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                
                <div class="faq-item">
                    <div class="faq-question">What is a retirement corpus? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">A retirement corpus is the total amount of savings you need to accumulate by your retirement age to support your desired lifestyle throughout your retirement years.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">What is a good income replacement ratio? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Most financial experts recommend aiming for 70-80% of your pre-retirement income. However, this varies based on your lifestyle expectations and financial obligations.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How does inflation affect retirement planning? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Inflation reduces the purchasing power of money over time. A retirement plan must account for inflation to ensure your savings will cover future expenses.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">When should I start retirement planning? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">The earlier you start, the better. Ideally, you should begin retirement planning in your 20s or as soon as you start earning. However, it's never too late to start.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How much should I save each month for retirement? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">This depends on your age, income, and retirement goals. A common rule is to save 15% of your pre-tax income annually, but use our calculator for a personalized estimate.</div>
                </div>
            </div>
        </div>
    </div>

    <?php include '../footer.php' ?>
    <script>
        // Lifestyle options selection
        document.querySelectorAll('.lifestyle-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.lifestyle-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
                document.getElementById('incomeReplacement').value = option.getAttribute('data-value');
                calculateRetirement();
            });
        });

        // Currency symbols mapping
        const currencySymbols = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            JPY: '¥',
            CAD: '$',
            AUD: '$',
            CHF: '₣',
            CNY: '¥',
            INR: '₹',
            PKR: 'PKR ',
            MXN: '$',
            BRL: 'R$',
            RUB: '₽',
            KRW: '₩',
            SGD: '$',
            NZD: '$',
            TRY: '₺',
            ZAR: 'R',
            SEK: 'kr ',
            NOK: 'kr ',
            DKK: 'kr ',
            PLN: 'zł '
        };
        
        // Get currency symbol
        function getCurrencySymbol() {
            const currencyCode = document.getElementById('currencySelect').value;
            return currencySymbols[currencyCode] || '$';
        }
        
        // Calculate retirement function
        function calculateRetirement() {
            // Get input values
            const currentAge = parseInt(document.getElementById('currentAge').value);
            const retirementAge = parseInt(document.getElementById('retirementAge').value);
            const lifeExpectancy = parseInt(document.getElementById('lifeExpectancy').value);
            const currentIncome = parseFloat(document.getElementById('currentIncome').value);
            const incomeReplacement = parseFloat(document.getElementById('incomeReplacement').value) / 100;
            const currentSavings = parseFloat(document.getElementById('currentSavings').value);
            const annualContribution = parseFloat(document.getElementById('annualContribution').value);
            const preReturn = parseFloat(document.getElementById('preReturn').value) / 100;
            const postReturn = parseFloat(document.getElementById('postReturn').value) / 100;
            const inflation = parseFloat(document.getElementById('inflation').value) / 100;
            const currencySymbol = getCurrencySymbol();
            
            // Calculate years to retirement and retirement duration
            const yearsToRetirement = retirementAge - currentAge;
            const retirementDuration = lifeExpectancy - retirementAge;
            
            // Calculate required annual retirement income (in future dollars)
            const requiredAnnualIncome = currentIncome * incomeReplacement * Math.pow(1 + inflation, yearsToRetirement);
            
            // Calculate retirement corpus needed at retirement
            const corpusNeeded = requiredAnnualIncome * (1 - Math.pow(1 + postReturn, -retirementDuration)) / postReturn;
            
            // Calculate projected savings at retirement
            let projectedSavings = currentSavings * Math.pow(1 + preReturn, yearsToRetirement);
            for (let i = 0; i < yearsToRetirement; i++) {
                projectedSavings += annualContribution * Math.pow(1 + preReturn, yearsToRetirement - i - 1);
            }
            
            // Calculate additional savings needed
            const additionalNeeded = Math.max(0, corpusNeeded - projectedSavings);
            
            // Calculate monthly contribution needed to fill the gap
            let monthlyContribution = 0;
            if (additionalNeeded > 0) {
                monthlyContribution = additionalNeeded * preReturn / (Math.pow(1 + preReturn, yearsToRetirement) - 1) / 12;
            }
            
            // Format numbers with commas
            function formatCurrency(value) {
                return currencySymbol + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            
            // Update results
            document.getElementById('requiredCorpus').textContent = formatCurrency(corpusNeeded);
            document.getElementById('projectedSavings').textContent = formatCurrency(projectedSavings);
            document.getElementById('additionalNeeded').textContent = formatCurrency(additionalNeeded);
            document.getElementById('monthlyContribution').textContent = formatCurrency(monthlyContribution);
            
            // Generate schedule
            generateSchedule(currentAge, retirementAge, currentSavings, annualContribution, preReturn, corpusNeeded, inflation, currencySymbol);
            
            // Generate charts
            generateCharts(projectedSavings, corpusNeeded, additionalNeeded, currencySymbol);
        }
        
        // Generate retirement projection schedule
        function generateSchedule(currentAge, retirementAge, currentSavings, annualContribution, preReturn, corpusNeeded, inflation, currencySymbol) {
            const scheduleBody = document.getElementById('scheduleBody');
            scheduleBody.innerHTML = '';
            const yearsToRetirement = retirementAge - currentAge;
            const rowsToShow = Math.min(10, yearsToRetirement);
            
            let totalSavings = currentSavings;
            
            for (let i = 0; i <= yearsToRetirement; i++) {
                const age = currentAge + i;
                
                // Calculate savings growth
                const savingsGrowth = totalSavings * preReturn;
                
                // Add new contribution at the end of the year
                if (i > 0) {
                    totalSavings += annualContribution;
                }
                
                // Apply growth
                totalSavings += savingsGrowth;
                
                // Calculate required corpus in future dollars
                const yearsToGo = yearsToRetirement - i;
                const requiredCorpus = corpusNeeded / Math.pow(1 + inflation, yearsToGo);
                
                // Create table row
                const row = document.createElement('tr');
                if (i > rowsToShow) {
                    row.classList.add('hidden');
                }
                
                row.innerHTML = `
                    <td>${i}</td>
                    <td>${age}</td>
                    <td>${currencySymbol}${annualContribution.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>${currencySymbol}${savingsGrowth.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>${currencySymbol}${totalSavings.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>${currencySymbol}${requiredCorpus.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                `;
                
                scheduleBody.appendChild(row);
            }
            
            // Show/hide the show all button based on number of years
            const showAllBtn = document.getElementById('showAllBtn');
            if (yearsToRetirement > 10) {
                showAllBtn.style.display = 'block';
            } else {
                showAllBtn.style.display = 'none';
            }
        }
        
        // Toggle full schedule visibility
        const showAllBtn = document.getElementById('showAllBtn');
        showAllBtn.addEventListener('click', () => {
            const hiddenRows = document.querySelectorAll('#scheduleBody tr.hidden');
            hiddenRows.forEach(row => {
                row.classList.toggle('hidden');
            });
            
            if (hiddenRows.length > 0 && hiddenRows[0].classList.contains('hidden')) {
                showAllBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show Full Schedule';
            } else {
                showAllBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
            }
        });
        
        // Generate charts
        let compositionChart = null;
        let balanceChart = null;
        
        function generateCharts(projectedSavings, corpusNeeded, additionalNeeded, currencySymbol) {
            // Destroy existing charts if they exist
            if (compositionChart) {
                compositionChart.destroy();
            }
            if (balanceChart) {
                balanceChart.destroy();
            }
            
            // Corpus composition chart
            const compositionCtx = document.getElementById('compositionChart').getContext('2d');
            compositionChart = new Chart(compositionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Projected Savings', 'Additional Needed'],
                    datasets: [{
                        data: [projectedSavings, additionalNeeded],
                        backgroundColor: ['#06d6a0', '#4361ee'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: document.body.classList.contains('dark-theme') ? '#f1f5f9' : '#1e293b',
                                font: {
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${currencySymbol}${context.raw.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Balance over time chart
            const rows = document.querySelectorAll('#scheduleBody tr');
            const labels = [];
            const savingsData = [];
            const corpusData = [];
            
            // Extract data for chart
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                labels.push(`Age ${cells[1].textContent}`);
                savingsData.push(parseFloat(cells[4].textContent.replace(currencySymbol, '').replace(/,/g, '')));
                corpusData.push(parseFloat(cells[5].textContent.replace(currencySymbol, '').replace(/,/g, '')));
            }
            
            const balanceCtx = document.getElementById('balanceChart').getContext('2d');
            balanceChart = new Chart(balanceCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Projected Savings',
                            data: savingsData,
                            borderColor: '#06d6a0',
                            backgroundColor: 'rgba(6, 214, 160, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Required Corpus',
                            data: corpusData,
                            borderColor: '#4361ee',
                            backgroundColor: 'rgba(67, 97, 238, 0.1)',
                            tension: 0.4,
                            fill: false,
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${currencySymbol}${context.raw.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: document.body.classList.contains('dark-theme') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                color: document.body.classList.contains('dark-theme') ? '#94a3b8' : '#64748b',
                                callback: function(value) {
                                    return currencySymbol + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: document.body.classList.contains('dark-theme') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                color: document.body.classList.contains('dark-theme') ? '#94a3b8' : '#64748b'
                            }
                        }
                    }
                }
            });
        }
        
        // Export to PDF
        document.getElementById('pdfBtn').addEventListener('click', async () => {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'pt', 'a4');
                
                // Add title
                doc.setFontSize(20);
                doc.text('Retirement Planning Report', doc.internal.pageSize.getWidth() / 2, 40, null, null, 'center');
                
                // Add date
                doc.setFontSize(12);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 60, null, null, 'center');
                
                // Add retirement summary
                doc.setFontSize(14);
                doc.text('Retirement Summary', 40, 90);
                doc.setFontSize(12);
                
                const currencySymbol = getCurrencySymbol();
                const summary = [
                    `Required Retirement Corpus: ${document.getElementById('requiredCorpus').textContent}`,
                    `Projected Current Savings: ${document.getElementById('projectedSavings').textContent}`,
                    `Additional Savings Needed: ${document.getElementById('additionalNeeded').textContent}`,
                    `Monthly Contribution Needed: ${document.getElementById('monthlyContribution').textContent}`
                ];
                
                // Add summary items
                let yPos = 110;
                summary.forEach(item => {
                    doc.text(item, 40, yPos);
                    yPos += 20;
                });
                
                // Add space before table
                yPos += 30;
                
                // Create table data
                const tableColumn = ["Year", "Age", "Annual Savings", "Savings Growth", "Total Savings", "Required Corpus"];
                const tableRows = [];
                
                document.querySelectorAll('#scheduleBody tr').forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('td').forEach(cell => {
                        rowData.push(cell.textContent);
                    });
                    tableRows.push(rowData);
                });
                
                // Add table using basic text method
                doc.setFontSize(10);
                
                // Table header
                let xPos = 40;
                tableColumn.forEach((col, i) => {
                    doc.text(col, xPos, yPos);
                    xPos += i === 0 ? 30 : 50; // Adjust column spacing
                });
                
                yPos += 20;
                
                // Add horizontal line
                doc.setLineWidth(0.5);
                doc.line(40, yPos - 5, doc.internal.pageSize.getWidth() - 40, yPos - 5);
                
                // Table rows
                tableRows.forEach(row => {
                    xPos = 40;
                    
                    // Check if we need a new page
                    if (yPos > doc.internal.pageSize.getHeight() - 50) {
                        doc.addPage();
                        yPos = 40;
                    }
                    
                    row.forEach((cell, i) => {
                        doc.text(cell, xPos, yPos);
                        xPos += i === 0 ? 30 : 50; // Match header spacing
                    });
                    
                    yPos += 20;
                });
                
                // Add footer
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text("Generated by FreeFinTools - www.freefintools.com", 
                        doc.internal.pageSize.getWidth() / 2, 
                        doc.internal.pageSize.getHeight() - 20, 
                        null, null, 'center');
                
                // Save the PDF
                doc.save('retirement-planning-report.pdf');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again or use the print option.');
            }
        });
            
        // Print function
        document.getElementById('printBtn').addEventListener('click', () => {
            window.print();
        });
        
        // FAQ toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                answer.classList.toggle('hidden');
                
                const icon = question.querySelector('i');
                if (answer.classList.contains('hidden')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            });
        });
        
        // Initialize calculator
        const calculateBtn = document.getElementById('calculateBtn');
        calculateBtn.addEventListener('click', calculateRetirement);
        document.getElementById('currencySelect').addEventListener('change', calculateRetirement);
        
        // Initialize with sample data
        window.addEventListener('load', () => {
            calculateRetirement();
            
            // Set dark theme if preferred
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-theme');
            }
        });
    </script>
</body>
</html>