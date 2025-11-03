<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Compound Interest Calculator | Project Savings Growth - FreeFinTools</title>
    <meta name="description" content="Calculate compound interest growth with recurring deposits. See how your savings can grow over time. Free online compound interest calculator for investments, savings accounts, and retirement planning.">
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
            padding: 40px 0;
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
            margin: 0 auto 25px;
            color: var(--text-light);
        }

        /* Calculator Section */
        .calculator-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 40px;
        }

        @media (max-width: 900px) {
            .calculator-container {
                grid-template-columns: 1fr;
            }
        }

        .calculator-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border);
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            margin-bottom: 6px;
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
            padding: 14px 25px;
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
            border-radius: 12px;
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
            backdrop-filter: blur(10px);
        }

        .result-value {
            font-size: 1.6rem;
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
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border);
        }

        .chart-card h3 {
            margin-bottom: 15px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.3rem;
        }

        .chart-container {
            height: 250px;
            position: relative;
        }

        /* Schedule Section */
        .schedule-section {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
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
            gap: 12px;
        }

        .export-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
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
            font-size: 0.95rem;
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
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: var(--primary);
            padding-bottom: 8px;
            border-bottom: 2px solid var(--light-gray);
        }

        .content-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px var(--shadow);
            border: 1px solid var(--border);
            margin-bottom: 20px;
        }

        .content-card h3 {
            margin-bottom: 12px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.2rem;
        }

        .content-card p {
            margin-bottom: 12px;
            line-height: 1.6;
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
            font-size: 1rem;
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
            line-height: 1.6;
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
        
        /* Compound Interest Specific */
        .frequency-options {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 6px;
        }
        
        .frequency-option {
            flex: 1;
            min-width: 70px;
            padding: 8px;
            border-radius: 6px;
            background-color: var(--light-gray);
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            border: 2px solid transparent;
            font-size: 0.9rem;
        }
        
        .frequency-option.active {
            background-color: var(--primary);
            color: white;
            border-color: var(--primary-dark);
        }

        /* Mobile Optimizations */
        @media (max-width: 600px) {
            .tool-hero {
                padding: 30px 0;
            }
            
            .tool-hero h1 {
                font-size: 1.8rem;
            }
            
            .tool-hero p {
                font-size: 1rem;
            }
            
            .calculator-container {
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .results-grid {
                gap: 12px;
            }
            
            .result-item {
                padding: 12px;
            }
            
            .result-value {
                font-size: 1.4rem;
            }
            
            .charts-container {
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .chart-container {
                height: 220px;
            }
            
            .content-card h3 {
                font-size: 1.1rem;
            }
            
            .section-title {
                font-size: 1.3rem;
            }
        }
        
        @media (max-width: 480px) {
            .tool-hero h1 {
                font-size: 1.6rem;
            }
            
            .tool-hero p {
                font-size: 0.95rem;
            }
            
            .calculator-card {
                padding: 15px;
            }
            
            .results-card {
                padding: 20px;
            }
            
            .results-grid {
                grid-template-columns: 1fr;
                gap: 10px;
            }
            
            .result-value {
                font-size: 1.3rem;
            }
            
            .chart-card {
                padding: 15px;
            }
            
            .chart-card h3 {
                font-size: 1.2rem;
            }
            
            .chart-container {
                height: 200px;
            }
            
            .schedule-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .export-buttons {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <?php include '../navbar.php' ?>
    <!-- Tool Hero -->
    <section class="tool-hero">
        <div class="container">
            <h1>Free Compound Interest Calculator</h1>
            <p>Project the growth of your savings with recurring deposits and compound interest. See how your money can grow over time with this powerful financial tool.</p>
        </div>
    </section>

    <!-- Calculator Section -->
    <div class="container">
        <div class="calculator-container">
            <div class="calculator-card">
                <h2>Investment Details</h2>
                <p class="input-group">Enter your investment information to calculate future growth</p>
                
                <div class="input-group">
                    <label for="initialInvestment">Initial Investment</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="initialInvestment" class="input-control" value="5000" min="0" max="10000000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">The starting amount of your investment</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="monthlyContribution">Monthly Contribution</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="monthlyContribution" class="input-control" value="200" min="0" max="1000000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Amount added to investment each month</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="interestRate">Annual Interest Rate (%)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="interestRate" class="input-control" value="6.5" min="0.1" max="50" step="0.1">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">The expected annual return on your investment</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="investmentLength">Investment Length (years)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="investmentLength" class="input-control" value="10" min="1" max="100">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Total duration of your investment</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label>Compounding Frequency</label>
                    <div class="frequency-options">
                        <div class="frequency-option active" data-freq="12">Monthly</div>
                        <div class="frequency-option" data-freq="4">Quarterly</div>
                        <div class="frequency-option" data-freq="2">Semi-Annual</div>
                        <div class="frequency-option" data-freq="1">Annual</div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="currencySelect">Currency</label>
                    <select id="currencySelect" class="currency-select">
                        <option value="USD" selected>$ US Dollar (USD)</option>
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
                
                <button id="calculateBtn" class="btn-calculate">Calculate Growth</button>
            </div>
            
            <div class="results-card">
                <h2>Your Investment Summary</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-label">Final Balance</div>
                        <div class="result-value" id="finalBalance">$ 61,200</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Contributions</div>
                        <div class="result-value" id="totalContributions">$ 29,000</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Interest</div>
                        <div class="result-value" id="totalInterest">$ 32,200</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Growth Rate</div>
                        <div class="result-value" id="growthRate">110.9%</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Charts Section -->
        <div class="charts-container">
            <div class="chart-card">
                <h3><i class="fas fa-chart-pie"></i> Value Composition</h3>
                <div class="chart-container">
                    <canvas id="compositionChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h3><i class="fas fa-chart-line"></i> Balance Projection</h3>
                <div class="chart-container">
                    <canvas id="balanceChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Schedule Section -->
        <div class="schedule-section">
            <div class="schedule-header">
                <h2>Yearly Growth Projection</h2>
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
                            <th>Start Balance</th>
                            <th>Contributions</th>
                            <th>Interest</th>
                            <th>End Balance</th>
                            <th>Growth</th>
                        </tr>
                    </thead>
                    <tbody id="scheduleBody">
                        <tr>
                            <td>1</td>
                            <td>$ 5,000.00</td>
                            <td>$ 2,400.00</td>
                            <td>$ 358.50</td>
                            <td>$ 7,758.50</td>
                            <td>55.2%</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>$ 7,758.50</td>
                            <td>$ 2,400.00</td>
                            <td>$ 643.35</td>
                            <td>$ 10,801.85</td>
                            <td>39.2%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>$ 10,801.85</td>
                            <td>$ 2,400.00</td>
                            <td>$ 937.56</td>
                            <td>$ 14,139.41</td>
                            <td>30.9%</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>$ 14,139.41</td>
                            <td>$ 2,400.00</td>
                            <td>$ 1,242.22</td>
                            <td>$ 17,781.63</td>
                            <td>25.8%</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>$ 17,781.63</td>
                            <td>$ 2,400.00</td>
                            <td>$ 1,558.44</td>
                            <td>$ 21,740.07</td>
                            <td>22.3%</td>
                        </tr>
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
            <h2 class="section-title">Understanding Compound Interest</h2>
            
            <div class="content-card animated">
                <h3><i class="fas fa-calculator"></i> How Compound Interest Works</h3>
                <p>Compound interest is the addition of interest to the principal sum of a loan or deposit. It's essentially interest on interest, which causes your wealth to grow exponentially over time.</p>
                
                <div class="formula-container">
                    <div class="formula-title">Compound Interest Formula:</div>
                    <pre>
A = P × (1 + r/n)^(n×t)

Where:
A = Future value of investment
P = Principal investment amount
r = Annual interest rate (decimal)
n = Number of times interest is compounded per year
t = Number of years
                    </pre>
                </div>
                
                <p>For recurring contributions, the formula becomes more complex as each contribution compounds for a different period. This is why using a compound interest calculator is essential for accurate projections.</p>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-lightbulb"></i> Maximizing Your Compound Growth</h3>
                <ul>
                    <li><strong>Start early:</strong> The earlier you begin investing, the more time compound interest has to work in your favor.</li>
                    <li><strong>Consistent contributions:</strong> Regular deposits significantly boost your investment growth over time.</li>
                    <li><strong>Higher compounding frequency:</strong> The more frequently interest is compounded, the greater your returns.</li>
                    <li><strong>Reinvest dividends:</strong> Automatically reinvesting dividends accelerates compound growth.</li>
                    <li><strong>Minimize fees:</strong> High fees can significantly erode your compound growth over long periods.</li>
                </ul>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                
                <div class="faq-item">
                    <div class="faq-question">What's the difference between simple and compound interest? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus accumulated interest, leading to exponential growth.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How often should interest compound? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">The more frequent the compounding, the greater your returns. Monthly compounding will yield more than annual compounding at the same interest rate.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How does time affect compound interest? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Time is the most powerful factor in compound growth. The longer your investment horizon, the more dramatic the compounding effect becomes.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">Can compound interest work against me? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Yes, when you borrow money, compound interest can work against you, causing debt to grow rapidly if not managed properly.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">What's the Rule of 72? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">The Rule of 72 estimates how long it takes for an investment to double: Divide 72 by the annual interest rate. For example, at 6% interest, your money doubles in about 12 years.</div>
                </div>
            </div>
        </div>
    </div>
    
    <?php include '../footer.php' ?>

    <script>
        // Compound Interest Calculator Logic
        const calculateBtn = document.getElementById('calculateBtn');
        const currencySelect = document.getElementById('currencySelect');
        const showAllBtn = document.getElementById('showAllBtn');
        const frequencyOptions = document.querySelectorAll('.frequency-option');
        let compositionChart = null;
        let balanceChart = null;
        let compoundingFrequency = 12; // Default to monthly compounding
        
        // Set up frequency options
        frequencyOptions.forEach(option => {
            option.addEventListener('click', () => {
                frequencyOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                compoundingFrequency = parseInt(option.dataset.freq);
                calculateCompoundInterest();
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
            SEK: 'kr',
            NOK: 'kr',
            DKK: 'kr',
            PLN: 'zł'
        };
        
        // Format currency
        function formatCurrency(amount, currencyCode) {
            const symbol = currencySymbols[currencyCode] || '$';
            // Format numbers with commas
            return symbol + ' ' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        
        // Format percentage
        function formatPercentage(value) {
            return (value * 100).toFixed(1) + '%';
        }
        
        // Calculate compound interest function
        function calculateCompoundInterest() {
            const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) || 0;
            const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
            const interestRate = (parseFloat(document.getElementById('interestRate').value) || 0) / 100;
            const investmentLength = parseFloat(document.getElementById('investmentLength').value) || 0;
            const currencyCode = currencySelect.value;
            
            if (isNaN(initialInvestment) || isNaN(monthlyContribution) || 
                isNaN(interestRate) || isNaN(investmentLength)) {
                alert('Please enter valid numbers in all fields');
                return;
            }
            
            // Calculate values
            const monthlyRate = interestRate / compoundingFrequency;
            const periods = investmentLength * compoundingFrequency;
            const monthlyContributionTotal = monthlyContribution * periods;
            
            // Calculate future value with compound interest formula
            let futureValue = initialInvestment * Math.pow(1 + monthlyRate, periods);
            let totalContributions = initialInvestment;
            
            // Calculate with monthly contributions
            for (let i = 0; i < periods; i++) {
                futureValue += monthlyContribution * Math.pow(1 + monthlyRate, periods - i - 1);
                totalContributions += monthlyContribution;
            }
            
            const totalInterest = futureValue - totalContributions;
            const growthRate = (futureValue - initialInvestment) / initialInvestment;
            
            // Update results
            document.getElementById('finalBalance').textContent = formatCurrency(futureValue, currencyCode);
            document.getElementById('totalContributions').textContent = formatCurrency(totalContributions, currencyCode);
            document.getElementById('totalInterest').textContent = formatCurrency(totalInterest, currencyCode);
            document.getElementById('growthRate').textContent = formatPercentage(growthRate);
            
            // Generate yearly projection
            generateProjection(initialInvestment, monthlyContribution, interestRate, investmentLength, compoundingFrequency, currencyCode);
            
            // Generate charts
            generateCharts(initialInvestment, totalContributions, totalInterest, futureValue, currencyCode);
        }
        
        // Generate yearly projection
        function generateProjection(initial, monthly, rate, years, freq, currencyCode) {
            const scheduleBody = document.getElementById('scheduleBody');
            scheduleBody.innerHTML = '';
            
            let balance = initial;
            const rowsToShow = Math.min(5, years);
            const periodsPerYear = freq;
            const periodRate = rate / freq;
            
            for (let year = 1; year <= years; year++) {
                const startBalance = balance;
                let yearContributions = 0;
                let yearInterest = 0;
                
                // Calculate for each period in the year
                for (let period = 0; period < periodsPerYear; period++) {
                    // Add monthly contribution at the beginning of the period
                    balance += monthly;
                    yearContributions += monthly;
                    
                    // Calculate interest for the period
                    const periodInterest = balance * periodRate;
                    balance += periodInterest;
                    yearInterest += periodInterest;
                }
                
                const endBalance = balance;
                const yearGrowth = (endBalance - startBalance - yearContributions) / startBalance;
                
                // Create table row
                const row = document.createElement('tr');
                if (year > rowsToShow) {
                    row.classList.add('hidden');
                }
                row.innerHTML = `
                    <td>${year}</td>
                    <td>${formatCurrency(startBalance, currencyCode)}</td>
                    <td>${formatCurrency(yearContributions, currencyCode)}</td>
                    <td>${formatCurrency(yearInterest, currencyCode)}</td>
                    <td>${formatCurrency(endBalance, currencyCode)}</td>
                    <td>${formatPercentage(yearGrowth)}</td>
                `;
                
                scheduleBody.appendChild(row);
            }
            
            // Show/hide the show all button based on number of years
            if (years > 5) {
                showAllBtn.style.display = 'block';
            } else {
                showAllBtn.style.display = 'none';
            }
        }
        
        // Toggle full schedule visibility
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
        function generateCharts(initial, contributions, interest, final, currencyCode) {
            // Destroy existing charts if they exist
            if (compositionChart) {
                compositionChart.destroy();
            }
            if (balanceChart) {
                balanceChart.destroy();
            }
            
            // Value composition chart
            const compositionCtx = document.getElementById('compositionChart').getContext('2d');
            compositionChart = new Chart(compositionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Initial Investment', 'Contributions', 'Interest Earned'],
                    datasets: [{
                        data: [initial, contributions - initial, interest],
                        backgroundColor: ['#06d6a0', '#4361ee', '#f59e0b'],
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
                                    return `${context.label}: ${formatCurrency(context.raw, currencyCode)}`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Balance projection chart
            const rows = document.querySelectorAll('#scheduleBody tr');
            const labels = [];
            const data = [];
            
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                labels.push('Year ' + cells[0].textContent);
                data.push(parseFloat(cells[4].textContent.replace(/[^\d.]/g, '')));
            }
            
            const balanceCtx = document.getElementById('balanceChart').getContext('2d');
            balanceChart = new Chart(balanceCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Investment Value',
                        data: data,
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#4361ee',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Value: ${formatCurrency(context.raw, currencyCode)}`;
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
                                    return formatCurrency(value, currencyCode);
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: document.body.classList.contains('dark-theme') ? '#94a3b8' : '#64748b',
                                maxRotation: 0,
                                autoSkip: true,
                                maxTicksLimit: 10
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
                doc.text('Compound Interest Projection', doc.internal.pageSize.getWidth() / 2, 40, null, null, 'center');
                
                // Add date
                doc.setFontSize(12);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 60, null, null, 'center');
                
                // Add investment summary
                doc.setFontSize(14);
                doc.text('Investment Summary', 40, 90);
                doc.setFontSize(12);
                
                const currencyCode = currencySelect.value;
                const currencySymbol = currencySymbols[currencyCode] || '$';
                const initial = parseFloat(document.getElementById('initialInvestment').value);
                const monthly = parseFloat(document.getElementById('monthlyContribution').value);
                const rate = parseFloat(document.getElementById('interestRate').value);
                const years = parseFloat(document.getElementById('investmentLength').value);
                const freqText = document.querySelector('.frequency-option.active').textContent;
                
                const summary = [
                    `Initial Investment: ${formatCurrency(initial, currencyCode)}`,
                    `Monthly Contribution: ${formatCurrency(monthly, currencyCode)}`,
                    `Annual Interest Rate: ${rate.toFixed(2)}%`,
                    `Compounding Frequency: ${freqText}`,
                    `Investment Length: ${years} years`,
                    `Final Balance: ${document.getElementById('finalBalance').textContent}`,
                    `Total Contributions: ${document.getElementById('totalContributions').textContent}`,
                    `Total Interest: ${document.getElementById('totalInterest').textContent}`
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
                const tableColumn = ["Year", "Start Balance", "Contributions", "Interest", "End Balance", "Growth"];
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
                    xPos += i === 0 ? 40 : (i === 5 ? 50 : 60); // Adjust column spacing
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
                        xPos += i === 0 ? 40 : (i === 5 ? 50 : 60); // Match header spacing
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
                doc.save('compound-interest-projection.pdf');
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
        calculateBtn.addEventListener('click', calculateCompoundInterest);
        currencySelect.addEventListener('change', calculateCompoundInterest);
        window.addEventListener('load', calculateCompoundInterest);
    </script>
</body>
</html>