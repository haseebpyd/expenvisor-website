<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Loan Calculator | Calculate EMI, Interest & Payment Schedule - FreeFinTools</title>
    <meta name="description" content="Calculate loan payments, interest costs, and amortization schedules instantly. Free online loan calculator for mortgages, personal loans, auto loans, and student loans. No signup required.">
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
            font-size: 1rem;
            max-width: 800px;
            margin: 0 auto 20px;
            color: var(--text-light);
        }

        /* Calculator Section */
        .calculator-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 25px;
            margin-bottom: 40px;
        }

        @media (min-width: 768px) {
            .calculator-container {
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
        }

        .calculator-card {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 10px var(--shadow);
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
            width: 180px;
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
            font-size: 0.8rem;
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
            padding: 20px;
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
            grid-template-columns: 1fr;
            gap: 25px;
            margin-bottom: 40px;
        }

        @media (min-width: 768px) {
            .charts-container {
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
        }

        .chart-card {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 10px var(--shadow);
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
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 10px var(--shadow);
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
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 10px var(--shadow);
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
        
        /* Responsive Fixes */
        @media (max-width: 767px) {
            .tool-hero {
                padding: 30px 0 15px;
            }
            
            .tool-hero h1 {
                font-size: 1.8rem;
            }
            
            .results-grid {
                grid-template-columns: 1fr;
            }
            
            .result-value {
                font-size: 1.3rem;
            }
            
            .section-title {
                font-size: 1.3rem;
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
        
        @media (max-width: 480px) {
            .tool-hero h1 {
                font-size: 1.5rem;
            }
            
            .calculator-card, .results-card, .chart-card, .schedule-section, .content-card {
                padding: 15px;
            }
            
            .input-control, .currency-select {
                padding: 10px 12px;
                font-size: 0.95rem;
            }
            
            .btn-calculate {
                padding: 12px 16px;
                font-size: 0.95rem;
            }
        }
    </style>
</head>
<body>
    <?php include '../navbar.php' ?>
    <!-- Tool Hero -->
    <section class="tool-hero">
        <div class="container">
            <h1>Free Loan Payment Calculator</h1>
            <p>Calculate your monthly loan payments, total interest costs, and see a detailed amortization schedule for any type of loan. Our calculator works for mortgages, auto loans, personal loans, and student loans.</p>
        </div>
    </section>

    <!-- Calculator Section -->
    <div class="container">
        <div class="calculator-container">
            <div class="calculator-card">
                <h2>Loan Details</h2>
                <p class="input-group">Enter your loan information to calculate your payment schedule</p>
                
                <div class="input-group">
                    <label for="loanAmount">Loan Amount</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="loanAmount" class="input-control" value="25000" min="100" max="10000000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">The total amount you're borrowing</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="interestRate">Annual Interest Rate (%)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="interestRate" class="input-control" value="5.5" min="0.1" max="50" step="0.1">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">The annual interest rate for your loan</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="loanTerm">Loan Term (years)</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="loanTerm" class="input-control" value="5" min="1" max="50">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Total duration of your loan in years</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="startDate">Start Date</label>
                    <input type="month" id="startDate" class="input-control" value="2025-07">
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
                
                <button id="calculateBtn" class="btn-calculate">Calculate Payment</button>
            </div>
            
            <div class="results-card">
                <h2>Your Loan Summary</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-label">Monthly Payment</div>
                        <div class="result-value" id="monthlyPayment">$477.00</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Interest</div>
                        <div class="result-value" id="totalInterest">$3,620.00</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Payment</div>
                        <div class="result-value" id="totalPayment">$28,620.00</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Payoff Time</div>
                        <div class="result-value" id="payoffTime">5 years</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Charts Section -->
        <div class="charts-container">
            <div class="chart-card">
                <h3><i class="fas fa-chart-pie"></i> Payment Composition</h3>
                <div class="chart-container">
                    <canvas id="compositionChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h3><i class="fas fa-chart-line"></i> Balance Over Time</h3>
                <div class="chart-container">
                    <canvas id="balanceChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Schedule Section -->
        <div class="schedule-section">
            <div class="schedule-header">
                <h2>Amortization Schedule</h2>
                <div class="export-buttons">
                    <button class="btn-export" id="pdfBtn"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    <button class="btn-export" id="printBtn"><i class="fas fa-print"></i> Print</button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="schedule-table">
                    <thead>
                        <tr>
                            <th>Payment Date</th>
                            <th>Payment</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>Total Interest</th>
                            <th>Balance</th>
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
            <h2 class="section-title">Understanding Your Loan</h2>
            
            <div class="content-card animated">
                <h3><i class="fas fa-calculator"></i> How Loan Calculations Work</h3>
                <p>Loan payments are calculated using the formula for an amortizing loan. The formula considers the principal amount, interest rate, and loan term to determine your fixed monthly payment.</p>
                
                <div class="formula-container">
                    <div class="formula-title">Loan Payment Formula:</div>
                    <pre>
M = P × [r(1 + r)^n] / [(1 + r)^n - 1]

Where:
M = Monthly payment
P = Principal loan amount
r = Monthly interest rate (annual rate ÷ 12)
n = Total number of payments (loan term in years × 12)
                    </pre>
                </div>
                
                <p>This formula calculates the fixed payment amount required to fully repay a loan over its term, including both principal and interest.</p>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-lightbulb"></i> Tips to Reduce Your Loan Costs</h3>
                <ul>
                    <li><strong>Make extra payments:</strong> Even small additional payments can significantly reduce your total interest costs and shorten your loan term.</li>
                    <li><strong>Consider a shorter term:</strong> Loans with shorter terms typically have lower interest rates and save you money over the life of the loan.</li>
                    <li><strong>Improve your credit score:</strong> A higher credit score can qualify you for better interest rates.</li>
                    <li><strong>Shop around for lenders:</strong> Compare offers from multiple lenders to find the best rate and terms.</li>
                    <li><strong>Make bi-weekly payments:</strong> Making half your monthly payment every two weeks results in one extra full payment each year.</li>
                </ul>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                
                <div class="faq-item">
                    <div class="faq-question">What's the difference between APR and interest rate? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">The interest rate is the cost of borrowing the principal loan amount. The APR (Annual Percentage Rate) includes the interest rate plus other charges or fees to reflect the total cost of the loan.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How do extra payments affect my loan? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Extra payments reduce your principal balance faster, which decreases the total interest you pay over the life of the loan and can shorten your loan term.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">What is an amortization schedule? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">An amortization schedule is a table showing each loan payment's allocation between principal and interest, and how your loan balance decreases over time.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">Should I choose a 15-year or 30-year mortgage? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">A 15-year mortgage has higher monthly payments but lower total interest costs. A 30-year mortgage has lower monthly payments but higher total interest. Choose based on your budget and financial goals.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How does my credit score affect my loan? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Your credit score significantly impacts the interest rate you'll receive. Higher credit scores typically qualify for lower interest rates, which can save you thousands over the life of a loan.</div>
                </div>
            </div>
        </div>
    </div>
    
    <?php include '../footer.php' ?>

    <script>
        // Loan Calculator Logic
        const calculateBtn = document.getElementById('calculateBtn');
        const currencySelect = document.getElementById('currencySelect');
        const showAllBtn = document.getElementById('showAllBtn');
        let compositionChart = null;
        let balanceChart = null;
        
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
            PKR: 'PKR',
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
        
        // Get currency symbol
        function getCurrencySymbol() {
            const currencyCode = currencySelect.value;
            return currencySymbols[currencyCode] || '$';
        }
        
        // Calculate loan function
        function calculateLoan() {
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const loanTerm = parseFloat(document.getElementById('loanTerm').value);
            const startDate = new Date(document.getElementById('startDate').value + '-01');
            const currencySymbol = getCurrencySymbol();
            
            // Calculate monthly payment
            const monthlyRate = interestRate / 12;
            const numberOfPayments = loanTerm * 12;
            const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            
            // Calculate total values
            const totalPayment = monthlyPayment * numberOfPayments;
            const totalInterest = totalPayment - loanAmount;
            
            // Update results
            document.getElementById('monthlyPayment').textContent = currencySymbol + monthlyPayment.toFixed(2);
            document.getElementById('totalInterest').textContent = currencySymbol + totalInterest.toFixed(2);
            document.getElementById('totalPayment').textContent = currencySymbol + totalPayment.toFixed(2);
            document.getElementById('payoffTime').textContent = loanTerm + ' years';
            
            // Generate amortization schedule
            generateSchedule(loanAmount, monthlyRate, numberOfPayments, monthlyPayment, startDate, currencySymbol);
            
            // Generate charts
            generateCharts(loanAmount, totalInterest, currencySymbol);
            
            // Reset show all button
            showAllBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show Full Schedule';
        }
        
        // Generate amortization schedule with pagination
        function generateSchedule(principal, monthlyRate, numberOfPayments, monthlyPayment, startDate, currencySymbol) {
            let balance = principal;
            let totalInterestPaid = 0;
            const scheduleBody = document.getElementById('scheduleBody');
            scheduleBody.innerHTML = '';
            const rowsToShow = Math.min(12, numberOfPayments);
            
            for (let i = 1; i <= numberOfPayments; i++) {
                const interestPayment = balance * monthlyRate;
                const principalPayment = monthlyPayment - interestPayment;
                totalInterestPaid += interestPayment;
                balance -= principalPayment;
                
                // Create date for this payment
                const paymentDate = new Date(startDate);
                paymentDate.setMonth(paymentDate.getMonth() + i);
                
                // Create table row
                const row = document.createElement('tr');
                if (i > rowsToShow) {
                    row.classList.add('hidden');
                }
                row.innerHTML = `
                    <td>${paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                    <td>${currencySymbol}${monthlyPayment.toFixed(2)}</td>
                    <td>${currencySymbol}${principalPayment.toFixed(2)}</td>
                    <td>${currencySymbol}${interestPayment.toFixed(2)}</td>
                    <td>${currencySymbol}${totalInterestPaid.toFixed(2)}</td>
                    <td>${currencySymbol}${balance > 0 ? balance.toFixed(2) : '0.00'}</td>
                `;
                
                scheduleBody.appendChild(row);
                
                // Break if balance is paid off
                if (balance <= 0) break;
            }
            
            // Show/hide the show all button based on number of payments
            if (numberOfPayments > 12) {
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
        function generateCharts(principal, totalInterest, currencySymbol) {
            // Destroy existing charts if they exist
            if (compositionChart) {
                compositionChart.destroy();
            }
            if (balanceChart) {
                balanceChart.destroy();
            }
            
            // Payment composition chart
            const compositionCtx = document.getElementById('compositionChart').getContext('2d');
            compositionChart = new Chart(compositionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Principal', 'Interest'],
                    datasets: [{
                        data: [principal, totalInterest],
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
                                    return `${context.label}: ${currencySymbol}${context.raw.toFixed(2)}`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Balance over time chart
            const rows = document.querySelectorAll('#scheduleBody tr');
            const labels = [];
            const data = [];
            
            // Only take every 6th payment for cleaner chart
            for (let i = 0; i < rows.length; i += Math.max(1, Math.floor(rows.length / 12))) {
                const cells = rows[i].querySelectorAll('td');
                labels.push(cells[0].textContent);
                data.push(parseFloat(cells[5].textContent.replace(currencySymbol, '')));
            }
            
            const balanceCtx = document.getElementById('balanceChart').getContext('2d');
            balanceChart = new Chart(balanceCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Loan Balance',
                        data: data,
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        tension: 0.4,
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
                                    return `Balance: ${currencySymbol}${context.raw.toFixed(2)}`;
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
                                    return currencySymbol + value;
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
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
                doc.text('Loan Amortization Schedule', doc.internal.pageSize.getWidth() / 2, 40, null, null, 'center');
                
                // Add date
                doc.setFontSize(12);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 60, null, null, 'center');
                
                // Add loan summary
                doc.setFontSize(14);
                doc.text('Loan Summary', 40, 90);
                doc.setFontSize(12);
                
                const currencySymbol = getCurrencySymbol();
                const loanAmount = parseFloat(document.getElementById('loanAmount').value);
                const interestRate = parseFloat(document.getElementById('interestRate').value);
                const loanTerm = parseFloat(document.getElementById('loanTerm').value);
                
                const summary = [
                    `Loan Amount: ${currencySymbol}${loanAmount.toFixed(2)}`,
                    `Interest Rate: ${interestRate.toFixed(2)}%`,
                    `Loan Term: ${loanTerm} years`,
                    `Monthly Payment: ${document.getElementById('monthlyPayment').textContent}`,
                    `Total Interest: ${document.getElementById('totalInterest').textContent}`,
                    `Total Payment: ${document.getElementById('totalPayment').textContent}`
                ];
                
                // Add summary items
                let yPos = 110;
                summary.forEach(item => {
                    doc.text(item, 40, yPos);
                    yPos += 20;
                });
                
                // Add space before table
                yPos += 20;
                
                // Create table data
                const tableColumn = ["Date", "Payment", "Principal", "Interest", "Total Int", "Balance"];
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
                    xPos += i === 0 ? 80 : 60; // Adjust column spacing
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
                        xPos += i === 0 ? 80 : 60; // Match header spacing
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
                doc.save('loan-amortization-schedule.pdf');
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
        calculateBtn.addEventListener('click', calculateLoan);
        currencySelect.addEventListener('change', calculateLoan);
        window.addEventListener('load', calculateLoan);
    </script>
</body>
</html>