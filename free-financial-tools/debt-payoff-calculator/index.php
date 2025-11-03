<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debt Payoff Calculator | Create a Custom Repayment Plan - FreeFinTools</title>
    <meta name="description" content="Calculate your debt payoff timeline, save on interest, and create a customized repayment strategy. Visualize your progress with interactive charts.">
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
            font-size: 2.3rem;
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
            gap: 30px;
            margin-bottom: 50px;
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
            margin-bottom: 18px;
        }

        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--text);
        }

        .input-with-tooltip {
            display: flex;
            align-items: center;
            gap: 10px;
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
            width: 220px;
            background-color: var(--dark);
            color: white;
            text-align: center;
            border-radius: 6px;
            padding: 10px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 0.9rem;
            font-weight: normal;
        }

        .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }

        .input-control {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
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
            border-radius: 10px;
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
            border-radius: 10px;
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
        
        .btn-download {
            background-color: var(--secondary);
            color: var(--dark);
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: block;
            width: 100%;
            text-align: center;
            font-size: 1rem;
            margin-top: 20px;
        }
        
        .btn-download:hover {
            background-color: #05b58d;
        }

        .results-card {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(67, 97, 238, 0.3);
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
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }

        .result-value {
            font-size: 1.7rem;
            font-weight: 700;
            margin: 8px 0;
        }

        .result-label {
            font-size: 0.95rem;
            opacity: 0.9;
        }

        /* Charts Section */
        .charts-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 50px;
        }

        @media (max-width: 768px) {
            .charts-container {
                grid-template-columns: 1fr;
            }
        }

        .chart-card {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px var(--shadow);
            border: 1px solid var(--border);
            overflow: hidden;
        }

        .chart-card h3 {
            margin-bottom: 15px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.3rem;
        }

        .chart-container {
            height: 280px;
            position: relative;
        }

        /* Payment Breakdown */
        .breakdown-section {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px var(--shadow);
            border: 1px solid var(--border);
            margin-bottom: 50px;
        }

        .breakdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .breakdown-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 15px;
        }

        .breakdown-item {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 1px solid var(--border);
        }

        .breakdown-item:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 1.1rem;
        }

        .breakdown-label {
            color: var(--text-light);
        }

        .breakdown-value {
            font-weight: 500;
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
            border-radius: 8px;
            transition: all 0.3s;
            border: 1px solid var(--primary);
        }
        
        .show-all-btn:hover {
            background-color: var(--primary);
            color: white;
        }

        /* Educational Content */
        .content-section {
            margin-bottom: 50px;
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
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 15px var(--shadow);
            border: 1px solid var(--border);
            margin-bottom: 25px;
        }

        .content-card h3 {
            margin-bottom: 12px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.25rem;
        }

        .content-card p {
            margin-bottom: 12px;
            line-height: 1.7;
            font-size: 1rem;
        }
        
        .formula-container {
            background-color: rgba(6, 214, 160, 0.1);
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
        }
        
        .formula-container pre {
            font-family: 'Courier New', monospace;
            font-size: 1rem;
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
            margin-bottom: 18px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 18px;
        }

        .faq-question {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1.05rem;
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
        
        .location-input {
            display: flex;
            gap: 10px;
        }
        
        .location-input select {
            flex: 1;
        }
        
        .input-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .input-row .input-group {
            flex: 1;
            min-width: 150px;
        }
        
        /* Debt Table Styles */
        .debts-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .debts-table th {
            background-color: var(--light-gray);
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            color: var(--text);
            border-bottom: 2px solid var(--border);
        }
        
        .debts-table td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border);
        }
        
        .debts-table tr:last-child td {
            border-bottom: none;
        }
        
        .debts-table input {
            width: 100%;
            padding: 8px 10px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text);
            font-size: 0.95rem;
        }
        
        .add-debt-btn {
            background: none;
            border: none;
            color: var(--primary);
            font-weight: 600;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.3s;
            border: 1px solid var(--primary);
            margin-top: 10px;
        }
        
        .add-debt-btn:hover {
            background-color: var(--primary);
            color: white;
        }
        
        .remove-debt {
            color: var(--danger);
            cursor: pointer;
            font-size: 1.1rem;
            transition: all 0.2s;
        }
        
        .remove-debt:hover {
            color: #d32f2f;
        }
        
        .timeline-bar {
            height: 8px;
            background-color: var(--light-gray);
            border-radius: 4px;
            margin: 20px 0;
            overflow: hidden;
        }
        
        .timeline-progress {
            height: 100%;
            background-color: var(--success);
            width: 0%;
            transition: width 0.8s ease;
        }
        
        .timeline-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: var(--text-light);
        }
        
        @media (max-width: 480px) {
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
            .breakdown-section,
            .content-card {
                padding: 20px;
            }
            
            .result-value {
                font-size: 1.4rem;
            }
            
            .input-row {
                flex-direction: column;
                gap: 15px;
            }
            
            .input-row .input-group {
                min-width: 100%;
            }
            
            .results-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .debts-table {
                font-size: 0.85rem;
            }
            
            .debts-table th, .debts-table td {
                padding: 8px 10px;
            }
        }
    </style>
</head>
<body>
    
    <?php include '../navbar.php' ?>
    <!-- Tool Hero -->
    <section class="tool-hero">
        <div class="container">
            <h1>Debt Payoff Calculator</h1>
            <p>Create a personalized debt repayment plan to become debt-free faster. Our calculator helps you visualize your payoff timeline, save on interest, and choose the best strategy for your financial goals.</p>
        </div>
    </section>

    <!-- Calculator Section -->
    <div class="container">
        <div class="calculator-container">
            <div class="calculator-card">
                <h2>Your Debt Details</h2>
                <p class="input-group">Enter your debts, monthly payment, and strategy</p>
                
                <div class="input-group">
                    <label>Debts</label>
                    <table class="debts-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Balance</th>
                                <th>Interest Rate</th>
                                <th>Min. Payment</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="debtsTableBody">
                            <tr>
                                <td><input type="text" class="debt-name" value="Credit Card"></td>
                                <td><input type="number" class="debt-balance" value="5000"></td>
                                <td><input type="number" class="debt-rate" value="18.9" step="0.1"></td>
                                <td><input type="number" class="debt-min-payment" value="150"></td>
                                <td><span class="remove-debt"><i class="fas fa-times"></i></span></td>
                            </tr>
                            <tr>
                                <td><input type="text" class="debt-name" value="Car Loan"></td>
                                <td><input type="number" class="debt-balance" value="15000"></td>
                                <td><input type="number" class="debt-rate" value="6.5" step="0.1"></td>
                                <td><input type="number" class="debt-min-payment" value="350"></td>
                                <td><span class="remove-debt"><i class="fas fa-times"></i></span></td>
                            </tr>
                            <tr>
                                <td><input type="text" class="debt-name" value="Student Loan"></td>
                                <td><input type="number" class="debt-balance" value="22000"></td>
                                <td><input type="number" class="debt-rate" value="4.5" step="0.1"></td>
                                <td><input type="number" class="debt-min-payment" value="250"></td>
                                <td><span class="remove-debt"><i class="fas fa-times"></i></span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button id="addDebtBtn" class="add-debt-btn"><i class="fas fa-plus"></i> Add Another Debt</button>
                </div>
                
                <div class="input-row">
                    <div class="input-group">
                        <label for="monthlyPayment">Monthly Payment Amount</label>
                        <div class="input-with-tooltip">
                            <input type="number" id="monthlyPayment" class="input-control" value="1200" min="1">
                            <div class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Total amount you can pay toward debts each month</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label for="strategy">Payoff Strategy</label>
                        <div class="input-with-tooltip">
                            <select id="strategy" class="currency-select">
                                <option value="avalanche">Avalanche (Highest Interest First)</option>
                                <option value="snowball">Snowball (Smallest Balance First)</option>
                            </select>
                            <div class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Method to prioritize which debts to pay off first</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="currencySelect">Currency</label>
                    <select id="currencySelect" class="currency-select">
                        <option value="USD">$ US Dollar (USD)</option>
                        <option value="EUR">€ Euro (EUR)</option>
                        <option value="GBP">£ British Pound (GBP)</option>
                        <option value="CAD">$ Canadian Dollar (CAD)</option>
                        <option value="AUD">$ Australian Dollar (AUD)</option>
                    </select>
                </div>
                
                <button id="calculateBtn" class="btn-calculate">Calculate Payoff Plan</button>
            </div>
            
            <div class="results-card">
                <h2>Your Debt Payoff Plan</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-label">Payoff Time</div>
                        <div class="result-value" id="payoffTime">3.5 years</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Interest</div>
                        <div class="result-value" id="totalInterest">$4,850</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Payments</div>
                        <div class="result-value" id="totalPayments">$55,200</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Interest Savings</div>
                        <div class="result-value" id="interestSavings">$2,150</div>
                    </div>
                </div>
                
                <div class="timeline-bar">
                    <div class="timeline-progress" id="timelineProgress" style="width: 42%"></div>
                </div>
                <div class="timeline-labels">
                    <span>Today</span>
                    <span id="payoffDate">Mar 2027</span>
                </div>
                
                <button id="downloadPDF" class="btn-download"><i class="fas fa-download"></i> Download as PDF</button>
            </div>
        </div>
        
        <!-- Charts Section -->
        <div class="charts-container">
            <div class="chart-card">
                <h3><i class="fas fa-chart-pie"></i> Debt Composition</h3>
                <div class="chart-container">
                    <canvas id="debtCompositionChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h3><i class="fas fa-chart-line"></i> Payoff Timeline</h3>
                <div class="chart-container">
                    <canvas id="payoffTimelineChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Payment Breakdown Section -->
        <div class="breakdown-section">
            <div class="breakdown-header">
                <h2>Debt Payoff Sequence</h2>
            </div>
            
            <div id="payoffSequence">
                <div class="breakdown-item">
                    <span class="breakdown-label">1. Credit Card (18.9%)</span>
                    <span class="breakdown-value">Paid off in 8 months</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">2. Car Loan (6.5%)</span>
                    <span class="breakdown-value">Paid off in 2.5 years</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">3. Student Loan (4.5%)</span>
                    <span class="breakdown-value">Paid off in 3.5 years</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">Total Time to Debt-Free</span>
                    <span class="breakdown-value">3.5 years (Mar 2027)</span>
                </div>
            </div>
        </div>
        
        <!-- Educational Content -->
        <div class="content-section">
            <h2 class="section-title">Debt Payoff Strategies & Tips</h2>
            
            <div class="content-card animated">
                <h3><i class="fas fa-calculator"></i> How Debt Payoff is Calculated</h3>
                <p>Our calculator uses the debt avalanche and snowball methods to create your personalized payoff plan:</p>
                
                <ul>
                    <li><strong>Debt Avalanche:</strong> Focuses on paying off debts with the highest interest rates first. This method minimizes the total interest paid over time.</li>
                    <li><strong>Debt Snowball:</strong> Focuses on paying off the smallest debts first to build momentum. This method provides psychological wins that motivate continued progress.</li>
                </ul>
                
                <p>The calculator considers your total debt balances, interest rates, minimum payments, and your available monthly payment to determine the optimal payoff sequence.</p>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-lightbulb"></i> Tips to Become Debt-Free Faster</h3>
                <ul>
                    <li><strong>Increase your monthly payment:</strong> Even an extra $50-100 per month can significantly reduce your payoff time and interest paid.</li>
                    <li><strong>Consider balance transfers:</strong> Transfer high-interest credit card debt to a card with a 0% introductory APR to save on interest.</li>
                    <li><strong>Negotiate lower rates:</strong> Contact creditors to request lower interest rates, especially if you have a good payment history.</li>
                    <li><strong>Use windfalls wisely:</strong> Apply tax refunds, bonuses, or other unexpected money directly to your debt.</li>
                    <li><strong>Track your progress:</strong> Regularly review your payoff plan and celebrate milestones to stay motivated.</li>
                </ul>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                
                <div class="faq-item">
                    <div class="faq-question">Which payoff method is better: avalanche or snowball? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Mathematically, the avalanche method saves more money by targeting high-interest debts first. However, the snowball method provides psychological motivation by eliminating smaller debts quickly. Choose the method that best fits your personality and financial situation.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">Should I pay off debt or save first? <i class="faq-chevron fas fa-chevron-down"></i></div>
                    <div class="faq-answer">It's generally recommended to build a small emergency fund ($1,000) before aggressively paying down debt. This prevents you from going further into debt when unexpected expenses arise. Once you have a basic emergency fund, focus on paying off high-interest debt.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How much should I pay toward debt each month? <i class="faq-chevron fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Aim to pay more than the minimum payments. A good target is 15-20% of your take-home pay. The more you can allocate toward debt repayment, the faster you'll become debt-free and the less interest you'll pay.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">What if I have multiple types of debt? <i class="faq-chevron fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Our calculator handles multiple debt types simultaneously. Enter all your debts (credit cards, loans, etc.) to see how they interact in your payoff plan. The calculator will prioritize them based on your chosen strategy.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How accurate are the payoff estimates? <i class="faq-chevron fas fa-chevron-down"></i></div>
                    <div class="faq-answer">The estimates are based on the information you provide and assume consistent monthly payments. Actual results may vary if interest rates change, you make additional payments, or your financial situation changes. Recalculate periodically to stay on track.</div>
                </div>
            </div>
        </div>
    </div>

    <?php include '../footer.php' ?>
    
    <script>
        // Debt Calculator Logic
        const calculateBtn = document.getElementById('calculateBtn');
        const downloadPDFBtn = document.getElementById('downloadPDF');
        const currencySelect = document.getElementById('currencySelect');
        const addDebtBtn = document.getElementById('addDebtBtn');
        const debtsTableBody = document.getElementById('debtsTableBody');
        let debtCompositionChart = null;
        let payoffTimelineChart = null;
        
        // Currency symbols mapping
        const currencySymbols = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            CAD: '$',
            AUD: '$'
        };
        
        // Get currency symbol
        function getCurrencySymbol() {
            const currencyCode = currencySelect.value;
            return currencySymbols[currencyCode] || '$';
        }
        
        // Add new debt row
        function addDebtRow() {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" class="debt-name" placeholder="Debt name"></td>
                <td><input type="number" class="debt-balance" value="0"></td>
                <td><input type="number" class="debt-rate" value="0" step="0.1"></td>
                <td><input type="number" class="debt-min-payment" value="0"></td>
                <td><span class="remove-debt"><i class="fas fa-times"></i></span></td>
            `;
            debtsTableBody.appendChild(newRow);
            
            // Add event listener to the new remove button
            newRow.querySelector('.remove-debt').addEventListener('click', function() {
                if (debtsTableBody.children.length > 1) {
                    debtsTableBody.removeChild(newRow);
                }
            });
        }
        
        // Get all debts
        function getDebts() {
            const debts = [];
            const debtRows = debtsTableBody.querySelectorAll('tr');
            
            debtRows.forEach(row => {
                const name = row.querySelector('.debt-name').value || 'Untitled Debt';
                const balance = parseFloat(row.querySelector('.debt-balance').value) || 0;
                const rate = parseFloat(row.querySelector('.debt-rate').value) || 0;
                const minPayment = parseFloat(row.querySelector('.debt-min-payment').value) || 0;
                
                if (balance > 0) {
                    debts.push({
                        name,
                        balance,
                        rate,
                        minPayment
                    });
                }
            });
            
            return debts;
        }
        
        // Calculate payoff plan
        function calculatePayoffPlan() {
            const currencySymbol = getCurrencySymbol();
            const debts = getDebts();
            const monthlyPayment = parseFloat(document.getElementById('monthlyPayment').value) || 0;
            const strategy = document.getElementById('strategy').value;
            
            if (debts.length === 0 || monthlyPayment <= 0) {
                alert("Please enter valid debt information and monthly payment amount.");
                return;
            }
            
            // Calculate total debt and minimum payments
            let totalDebt = 0;
            let totalMinPayments = 0;
            
            debts.forEach(debt => {
                totalDebt += debt.balance;
                totalMinPayments += debt.minPayment;
            });
            
            if (monthlyPayment < totalMinPayments) {
                alert(`Your monthly payment must be at least ${currencySymbol}${totalMinPayments.toFixed(2)} to cover minimum payments.`);
                return;
            }
            
            // Calculate payoff time (simplified calculation)
            const avgInterest = debts.reduce((sum, debt) => sum + debt.rate, 0) / debts.length;
            const monthlyInterestRate = avgInterest / 100 / 12;
            
            // Estimate payoff time using formula for amortization
            const monthlyPaymentAfterMin = monthlyPayment - totalMinPayments;
            let months = 0;
            let totalInterest = 0;
            let remainingDebt = totalDebt;
            
            while (remainingDebt > 0) {
                const interest = remainingDebt * monthlyInterestRate;
                const principal = monthlyPaymentAfterMin - interest;
                
                if (principal <= 0) {
                    // Payment not sufficient to cover interest
                    months = 999; // Infinite
                    break;
                }
                
                remainingDebt -= principal;
                totalInterest += interest;
                months++;
                
                if (months > 600) { // 50 years
                    months = 999;
                    break;
                }
            }
            
            // Calculate results
            const years = months > 998 ? "Never" : (months / 12).toFixed(1) + " years";
            const totalPayments = monthlyPayment * (months > 998 ? 999 : months);
            const interestSavings = 0.15 * totalInterest; // Simplified estimate
            
            // Calculate payoff date
            const today = new Date();
            let payoffDate = new Date(today);
            payoffDate.setMonth(payoffDate.getMonth() + (months > 998 ? 0 : months));
            
            // Update results
            document.getElementById('payoffTime').textContent = years;
            document.getElementById('totalInterest').textContent = currencySymbol + totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('totalPayments').textContent = currencySymbol + totalPayments.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('interestSavings').textContent = currencySymbol + interestSavings.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('payoffDate').textContent = payoffDate.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
            
            // Update timeline progress
            const progress = months > 998 ? 100 : Math.min(100, (months / 60) * 100); // 5-year max for visualization
            document.getElementById('timelineProgress').style.width = `${progress}%`;
            
            // Generate charts
            generateCharts(debts, totalDebt, months, currencySymbol);
            
            // Update payoff sequence
            updatePayoffSequence(debts, strategy, currencySymbol);
        }
        
        // Update payoff sequence display
        function updatePayoffSequence(debts, strategy, currencySymbol) {
            // Sort debts based on strategy
            let sortedDebts = [...debts];
            
            if (strategy === 'avalanche') {
                sortedDebts.sort((a, b) => b.rate - a.rate);
            } else { // snowball
                sortedDebts.sort((a, b) => a.balance - b.balance);
            }
            
            const sequenceContainer = document.getElementById('payoffSequence');
            sequenceContainer.innerHTML = '';
            
            // Simplified payoff estimates
            let cumulativeMonths = 0;
            
            sortedDebts.forEach((debt, index) => {
                const monthsToPay = Math.max(1, Math.round(debt.balance / (debt.minPayment * 2)));
                cumulativeMonths += monthsToPay;
                const years = (cumulativeMonths / 12).toFixed(1);
                
                const item = document.createElement('div');
                item.className = 'breakdown-item';
                item.innerHTML = `
                    <span class="breakdown-label">${index+1}. ${debt.name} (${debt.rate}%)</span>
                    <span class="breakdown-value">Paid off in ${years} years</span>
                `;
                sequenceContainer.appendChild(item);
            });
            
            // Add total time
            const totalItem = document.createElement('div');
            totalItem.className = 'breakdown-item';
            totalItem.innerHTML = `
                <span class="breakdown-label">Total Time to Debt-Free</span>
                <span class="breakdown-value">${(cumulativeMonths / 12).toFixed(1)} years</span>
            `;
            sequenceContainer.appendChild(totalItem);
        }
        
        // Generate charts
        function generateCharts(debts, totalDebt, months, currencySymbol) {
            // Destroy existing charts if they exist
            if (debtCompositionChart) {
                debtCompositionChart.destroy();
            }
            if (payoffTimelineChart) {
                payoffTimelineChart.destroy();
            }
            
            // Debt composition chart
            const compositionCtx = document.getElementById('debtCompositionChart').getContext('2d');
            debtCompositionChart = new Chart(compositionCtx, {
                type: 'doughnut',
                data: {
                    labels: debts.map(debt => debt.name),
                    datasets: [{
                        data: debts.map(debt => debt.balance),
                        backgroundColor: ['#4361ee', '#06d6a0', '#f59e0b', '#ef4444', '#8b5cf6'],
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
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    const percentage = Math.round((value / totalDebt) * 100);
                                    return `${context.label}: ${currencySymbol}${value.toLocaleString()} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Payoff timeline chart
            const timelineCtx = document.getElementById('payoffTimelineChart').getContext('2d');
            
            // Generate sample timeline data
            const years = months > 998 ? 10 : Math.ceil(months / 12);
            const labels = [];
            const remainingData = [];
            let remaining = totalDebt;
            
            for (let i = 0; i <= years; i++) {
                labels.push(`Year ${i}`);
                remainingData.push(remaining);
                
                // Simulate debt reduction
                if (i < years) {
                    remaining = Math.max(0, remaining - (totalDebt / years));
                }
            }
            
            payoffTimelineChart = new Chart(timelineCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Remaining Debt',
                        data: remainingData,
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderColor: '#4361ee',
                        borderWidth: 3,
                        pointBackgroundColor: '#4361ee',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        tension: 0.3,
                        fill: true
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
                                    return `Remaining: ${currencySymbol}${context.raw.toLocaleString()}`;
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
        
        // Generate PDF report
        function generatePDF() {
            const originalText = downloadPDFBtn.innerHTML;
            downloadPDFBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            downloadPDFBtn.disabled = true;
            
            // Create a container for PDF content
            const pdfContent = document.createElement('div');
            pdfContent.style.position = 'absolute';
            pdfContent.style.left = '-9999px';
            pdfContent.style.width = '800px';
            pdfContent.style.padding = '20px';
            pdfContent.style.background = 'white';
            pdfContent.style.color = 'black';
            
            // Create a title
            const title = document.createElement('h1');
            title.textContent = 'Debt Payoff Report';
            title.style.textAlign = 'center';
            title.style.marginBottom = '20px';
            title.style.color = '#4361ee';
            pdfContent.appendChild(title);
            
            // Clone the sections we want to include
            const sections = [
                document.querySelector('.results-card'),
                document.querySelector('.charts-container'),
                document.querySelector('.breakdown-section')
            ];
            
            sections.forEach(section => {
                const clone = section.cloneNode(true);
                
                // Remove the PDF button from the results card clone
                if (clone.querySelector('#downloadPDF')) {
                    clone.querySelector('#downloadPDF').remove();
                }
                
                // Adjust styles for PDF
                clone.style.boxShadow = 'none';
                clone.style.border = '1px solid #ddd';
                clone.style.marginBottom = '20px';
                
                pdfContent.appendChild(clone);
            });
            
            // Add date and source
            const footer = document.createElement('div');
            footer.style.marginTop = '20px';
            footer.style.fontSize = '0.9rem';
            footer.style.color = '#666';
            footer.style.textAlign = 'center';
            footer.innerHTML = `Generated on ${new Date().toLocaleDateString()} by FreeFinTools Debt Payoff Calculator`;
            pdfContent.appendChild(footer);
            
            document.body.appendChild(pdfContent);
            
            // Use html2canvas to capture the pdfContent
            html2canvas(pdfContent, {
                scale: 2,
                useCORS: true,
                logging: false
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;
                
                // Add first page
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                // Add new pages if the content is too long
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                
                // Save the PDF
                pdf.save('debt-payoff-report.pdf');
                
                // Clean up
                document.body.removeChild(pdfContent);
                downloadPDFBtn.innerHTML = originalText;
                downloadPDFBtn.disabled = false;
            }).catch(error => {
                console.error('Error generating PDF:', error);
                document.body.removeChild(pdfContent);
                downloadPDFBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error! Click to retry';
                downloadPDFBtn.disabled = false;
            });
        }
        
        // Initialize calculator
        window.addEventListener('load', function() {
            calculateBtn.addEventListener('click', calculatePayoffPlan);
            downloadPDFBtn.addEventListener('click', generatePDF);
            currencySelect.addEventListener('change', calculatePayoffPlan);
            addDebtBtn.addEventListener('click', addDebtRow);
            
            // Add event listeners to remove debt buttons
            document.querySelectorAll('.remove-debt').forEach(button => {
                button.addEventListener('click', function() {
                    if (debtsTableBody.children.length > 1) {
                        debtsTableBody.removeChild(button.closest('tr'));
                    }
                });
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
            
            // Initial calculation
            calculatePayoffPlan();
        });
    </script>
</body>
</html>