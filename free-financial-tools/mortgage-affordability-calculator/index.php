<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mortgage Affordability Calculator | How Much House Can You Afford? - FreeFinTools</title>
    <meta name="description" content="Calculate how much home you can afford based on income, down payment, and location. Understand your mortgage affordability and debt-to-income ratio.">
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
            overflow-x: hidden; /* Prevent horizontal scrolling */
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
            overflow: hidden; /* Prevent chart overflow */
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
        }
    </style>
</head>
<body>
    <?php include '../navbar.php' ?>
    <!-- Tool Hero -->
    <section class="tool-hero">
        <div class="container">
            <h1>Mortgage Affordability Calculator</h1>
            <p>Determine how much home you can afford based on your income, down payment, and location. Our calculator factors in taxes, insurance, and other costs to give you an accurate estimate.</p>
        </div>
    </section>

    <!-- Calculator Section -->
    <div class="container">
        <div class="calculator-container">
            <div class="calculator-card">
                <h2>Financial Details</h2>
                <p class="input-group">Enter your financial information to calculate your home affordability</p>
                
                <div class="input-group">
                    <label for="annualIncome">Annual Income</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="annualIncome" class="input-control" value="75000" min="1000">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Your total pre-tax annual income</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="monthlyDebt">Monthly Debt Payments</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="monthlyDebt" class="input-control" value="400" min="0">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Credit cards, car loans, student loans, etc.</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-row">
                    <div class="input-group">
                        <label for="downPayment">Down Payment</label>
                        <div class="input-with-tooltip">
                            <input type="number" id="downPayment" class="input-control" value="20000" min="0">
                            <div class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Amount you plan to put down</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label for="downPaymentPercent">Down Payment (%)</label>
                        <div class="input-with-tooltip">
                            <input type="number" id="downPaymentPercent" class="input-control" value="10" min="0" max="100">
                            <div class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Percentage of home price</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="input-row">
                    <div class="input-group">
                        <label for="interestRate">Interest Rate (%)</label>
                        <div class="input-with-tooltip">
                            <input type="number" id="interestRate" class="input-control" value="6.5" min="0.1" max="20" step="0.1">
                            <div class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Current mortgage interest rate</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label for="loanTerm">Loan Term (years)</label>
                        <div class="input-with-tooltip">
                            <select id="loanTerm" class="currency-select">
                                <option value="30">30 years</option>
                                <option value="20">20 years</option>
                                <option value="15">15 years</option>
                                <option value="10">10 years</option>
                            </select>
                            <div class="tooltip">
                                <i class="fas fa-info-circle"></i>
                                <span class="tooltip-text">Duration of your mortgage</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="creditScore">Credit Score</label>
                    <div class="input-with-tooltip">
                        <input type="number" id="creditScore" class="input-control" value="720" min="300" max="850">
                        <div class="tooltip">
                            <i class="fas fa-info-circle"></i>
                            <span class="tooltip-text">Affects your interest rate</span>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="location">Location</label>
                    <div class="location-input">
                        <select id="state" class="currency-select">
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="IL">Illinois</option>
                        </select>
                        <select id="county" class="currency-select">
                            <option value="urban">Urban</option>
                            <option value="suburban">Suburban</option>
                            <option value="rural">Rural</option>
                        </select>
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
                
                <button id="calculateBtn" class="btn-calculate">Calculate Affordability</button>
            </div>
            
            <div class="results-card">
                <h2>Your Mortgage Affordability</h2>
                <div class="results-grid">
                    <div class="result-item">
                        <div class="result-label">Home Price You Can Afford</div>
                        <div class="result-value" id="affordableHomePrice">$325,000</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Maximum Monthly Payment</div>
                        <div class="result-value" id="maxMonthlyPayment">$1,850</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Recommended Down Payment</div>
                        <div class="result-value" id="recDownPayment">$65,000</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Debt-to-Income Ratio</div>
                        <div class="result-value" id="dtiRatio">34%</div>
                    </div>
                </div>
                <button id="downloadPDF" class="btn-download"><i class="fas fa-download"></i> Download as PDF</button>
            </div>
        </div>
        
        <!-- Charts Section -->
        <div class="charts-container">
            <div class="chart-card">
                <h3><i class="fas fa-chart-pie"></i> Monthly Payment Breakdown</h3>
                <div class="chart-container">
                    <canvas id="paymentChart"></canvas>
                </div>
            </div>
            <div class="chart-card">
                <h3><i class="fas fa-chart-bar"></i> Affordability by Down Payment</h3>
                <div class="chart-container">
                    <canvas id="downPaymentChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Payment Breakdown Section -->
        <div class="breakdown-section">
            <div class="breakdown-header">
                <h2>Monthly Payment Details</h2>
            </div>
            
            <div class="breakdown-grid">
                <div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Principal & Interest</span>
                        <span class="breakdown-value" id="principalInterest">$1,450</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Property Taxes</span>
                        <span class="breakdown-value" id="propertyTaxes">$275</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Home Insurance</span>
                        <span class="breakdown-value" id="homeInsurance">$125</span>
                    </div>
                </div>
                <div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">PMI</span>
                        <span class="breakdown-value" id="pmi">$0</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">HOA Fees</span>
                        <span class="breakdown-value" id="hoaFees">$0</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="breakdown-label">Total Monthly Payment</span>
                        <span class="breakdown-value" id="totalPayment">$1,850</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Educational Content -->
        <div class="content-section">
            <h2 class="section-title">Understanding Mortgage Affordability</h2>
            
            <div class="content-card animated">
                <h3><i class="fas fa-calculator"></i> How Mortgage Affordability is Calculated</h3>
                <p>Mortgage affordability is determined by several factors including your income, existing debts, down payment, and current interest rates. Lenders typically use the 28/36 rule:</p>
                
                <ul>
                    <li><strong>28% Rule:</strong> Your monthly mortgage payment should not exceed 28% of your gross monthly income.</li>
                    <li><strong>36% Rule:</strong> Your total monthly debt payments (including mortgage) should not exceed 36% of your gross monthly income.</li>
                </ul>
                
                <p>Our calculator uses these guidelines to determine how much house you can comfortably afford while accounting for property taxes, insurance, and other location-based factors.</p>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-lightbulb"></i> Tips to Improve Your Home Affordability</h3>
                <ul>
                    <li><strong>Increase your down payment:</strong> A larger down payment reduces your loan amount and may eliminate PMI costs.</li>
                    <li><strong>Improve your credit score:</strong> A higher credit score qualifies you for better interest rates, saving you thousands over the loan term.</li>
                    <li><strong>Reduce existing debts:</strong> Paying down credit cards and loans lowers your debt-to-income ratio.</li>
                    <li><strong>Consider different loan terms:</strong> A 15-year mortgage has higher payments but saves significantly on interest.</li>
                    <li><strong>Explore first-time buyer programs:</strong> Many states and cities offer special programs with down payment assistance.</li>
                </ul>
            </div>
            
            <div class="content-card animated">
                <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                
                <div class="faq-item">
                    <div class="faq-question">What is PMI and when do I need it? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home's value. It protects the lender in case you default on the loan. PMI typically costs 0.5% to 1% of your loan amount annually.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How does location affect affordability? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Location significantly impacts property taxes and insurance costs. Urban areas typically have higher property taxes and insurance rates than rural areas. Some states also have higher average property tax rates.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">What's the difference between pre-qualification and pre-approval? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Pre-qualification is a preliminary assessment of your borrowing ability based on self-reported information. Pre-approval is a more thorough process where a lender verifies your financial information and commits to lending you a specific amount.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">Should I choose a fixed or adjustable-rate mortgage? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Fixed-rate mortgages offer stable payments for the entire loan term, while adjustable-rate mortgages (ARMs) start with lower rates that can increase over time. Fixed rates are generally better if you plan to stay in the home long-term.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How much should I save for closing costs? <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">Closing costs typically range from 2% to 5% of the home's purchase price. These include loan origination fees, appraisal fees, title insurance, and other expenses. Be sure to budget for these in addition to your down payment.</div>
                </div>
            </div>
        </div>
    </div>

    <?php include '../footer.php' ?>
    <script>
        // Mortgage Calculator Logic
        const calculateBtn = document.getElementById('calculateBtn');
        const downloadPDFBtn = document.getElementById('downloadPDF');
        const currencySelect = document.getElementById('currencySelect');
        let paymentChart = null;
        let downPaymentChart = null;
        
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
        
        // Tax rates by location type
        const taxRates = {
            CA: { urban: 1.2, suburban: 1.0, rural: 0.8 },
            NY: { urban: 1.5, suburban: 1.2, rural: 1.0 },
            TX: { urban: 1.8, suburban: 1.5, rural: 1.2 },
            FL: { urban: 1.0, suburban: 0.9, rural: 0.7 },
            IL: { urban: 2.1, suburban: 1.8, rural: 1.5 }
        };
        
        // Insurance rates by location type
        const insuranceRates = {
            CA: { urban: 0.4, suburban: 0.35, rural: 0.3 },
            NY: { urban: 0.5, suburban: 0.4, rural: 0.35 },
            TX: { urban: 0.6, suburban: 0.5, rural: 0.4 },
            FL: { urban: 0.7, suburban: 0.6, rural: 0.5 },
            IL: { urban: 0.45, suburban: 0.4, rural: 0.35 }
        };
        
        // Calculate affordability function
        function calculateAffordability() {
            const currencySymbol = getCurrencySymbol();
            const annualIncome = parseFloat(document.getElementById('annualIncome').value) || 75000;
            const monthlyDebt = parseFloat(document.getElementById('monthlyDebt').value) || 400;
            const downPayment = parseFloat(document.getElementById('downPayment').value) || 20000;
            const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value) || 10;
            const interestRate = parseFloat(document.getElementById('interestRate').value) || 6.5;
            const loanTerm = parseInt(document.getElementById('loanTerm').value) || 30;
            const creditScore = parseInt(document.getElementById('creditScore').value) || 720;
            const state = document.getElementById('state').value;
            const county = document.getElementById('county').value;
            
            // Adjust interest rate based on credit score
            let adjustedRate = interestRate;
            if (creditScore < 650) adjustedRate += 0.5;
            else if (creditScore >= 750) adjustedRate -= 0.25;
            
            // Calculate monthly income and DTI ratios
            const monthlyIncome = annualIncome / 12;
            const frontEndRatio = 0.28; // 28% rule
            const backEndRatio = 0.36; // 36% rule
            
            // Calculate maximum monthly housing payment
            const maxHousingBy28 = monthlyIncome * frontEndRatio;
            const maxHousingBy36 = (monthlyIncome * backEndRatio) - monthlyDebt;
            const maxHousingPayment = Math.min(maxHousingBy28, maxHousingBy36);
            
            // Get location-based tax and insurance rates
            const propertyTaxRate = taxRates[state][county] || 1.0;
            const homeInsuranceRate = insuranceRates[state][county] || 0.4;
            
            // Calculate affordable home price (simplified)
            const monthlyRate = (adjustedRate / 100) / 12;
            const loanMonths = loanTerm * 12;
            
            // Calculate affordable home price using iterative approach
            let affordablePrice = 300000; // Starting point
            let monthlyPayment = 0;
            let loanAmount = 0;
            let downPaymentUsed = downPayment;
            
            // Calculate based on down payment percentage if provided
            if (downPaymentPercent > 0) {
                affordablePrice = downPayment / (downPaymentPercent / 100);
                downPaymentUsed = affordablePrice * (downPaymentPercent / 100);
            }
            
            loanAmount = affordablePrice - downPaymentUsed;
            
            // Calculate monthly P&I
            const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) / 
                            (Math.pow(1 + monthlyRate, loanMonths) - 1);
            
            // Calculate monthly taxes and insurance
            const monthlyTax = (affordablePrice * (propertyTaxRate / 100)) / 12;
            const monthlyInsurance = (affordablePrice * (homeInsuranceRate / 100)) / 12;
            
            // Calculate PMI if down payment < 20%
            let monthlyPMI = 0;
            if (downPaymentPercent < 20) {
                monthlyPMI = loanAmount * 0.005 / 12; // 0.5% PMI rate
            }
            
            // HOA fees (estimated)
            const monthlyHOA = county === 'urban' ? 150 : county === 'suburban' ? 75 : 0;
            
            // Total monthly payment
            monthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
            
            // Adjust affordable price based on max payment
            if (monthlyPayment > maxHousingPayment) {
                affordablePrice = affordablePrice * (maxHousingPayment / monthlyPayment);
            }
            
            // Recalculate with adjusted affordable price
            if (downPaymentPercent > 0) {
                downPaymentUsed = affordablePrice * (downPaymentPercent / 100);
            }
            
            loanAmount = affordablePrice - downPaymentUsed;
            
            // Recalculate monthly P&I
            const adjustedMonthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) / 
                                    (Math.pow(1 + monthlyRate, loanMonths) - 1);
            
            // Recalculate monthly taxes and insurance
            const adjustedMonthlyTax = (affordablePrice * (propertyTaxRate / 100)) / 12;
            const adjustedMonthlyInsurance = (affordablePrice * (homeInsuranceRate / 100)) / 12;
            
            // Recalculate PMI
            let adjustedMonthlyPMI = 0;
            if (downPaymentPercent < 20) {
                adjustedMonthlyPMI = loanAmount * 0.005 / 12;
            }
            
            // Recalculate total monthly payment
            const adjustedMonthlyPayment = adjustedMonthlyPI + adjustedMonthlyTax + adjustedMonthlyInsurance + adjustedMonthlyPMI + monthlyHOA;
            
            // Calculate DTI ratio
            const dtiRatio = ((adjustedMonthlyPayment + monthlyDebt) / monthlyIncome * 100).toFixed(1);
            
            // Update results
            document.getElementById('affordableHomePrice').textContent = currencySymbol + affordablePrice.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('maxMonthlyPayment').textContent = currencySymbol + maxHousingPayment.toFixed(0);
            document.getElementById('recDownPayment').textContent = currencySymbol + downPaymentUsed.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('dtiRatio').textContent = dtiRatio + '%';
            
            // Update payment details
            document.getElementById('principalInterest').textContent = currencySymbol + adjustedMonthlyPI.toFixed(0);
            document.getElementById('propertyTaxes').textContent = currencySymbol + adjustedMonthlyTax.toFixed(0);
            document.getElementById('homeInsurance').textContent = currencySymbol + adjustedMonthlyInsurance.toFixed(0);
            document.getElementById('pmi').textContent = currencySymbol + adjustedMonthlyPMI.toFixed(0);
            document.getElementById('hoaFees').textContent = currencySymbol + monthlyHOA.toFixed(0);
            document.getElementById('totalPayment').textContent = currencySymbol + adjustedMonthlyPayment.toFixed(0);
            
            // Generate charts
            generateCharts(affordablePrice, downPaymentUsed, adjustedMonthlyPI, adjustedMonthlyTax, 
                          adjustedMonthlyInsurance, adjustedMonthlyPMI, monthlyHOA, currencySymbol);
        }
        
        // Generate charts
        function generateCharts(homePrice, downPayment, principalInterest, propertyTax, 
                               homeInsurance, pmi, hoa, currencySymbol) {
            // Destroy existing charts if they exist
            if (paymentChart) {
                paymentChart.destroy();
            }
            if (downPaymentChart) {
                downPaymentChart.destroy();
            }
            
            // Payment composition chart
            const paymentCtx = document.getElementById('paymentChart').getContext('2d');
            paymentChart = new Chart(paymentCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Principal & Interest', 'Property Tax', 'Home Insurance', 'PMI', 'HOA Fees'],
                    datasets: [{
                        data: [principalInterest, propertyTax, homeInsurance, pmi, hoa],
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
                                    return `${context.label}: ${currencySymbol}${context.raw.toFixed(2)}`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Down payment comparison chart
            const downPaymentCtx = document.getElementById('downPaymentChart').getContext('2d');
            downPaymentChart = new Chart(downPaymentCtx, {
                type: 'bar',
                data: {
                    labels: ['5% Down', '10% Down', '15% Down', '20% Down', '25% Down'],
                    datasets: [{
                        label: 'Affordable Home Price',
                        data: [
                            homePrice * 0.95 / (1 - 0.05),
                            homePrice * 0.90 / (1 - 0.10),
                            homePrice * 0.85 / (1 - 0.15),
                            homePrice * 0.80 / (1 - 0.20),
                            homePrice * 0.75 / (1 - 0.25)
                        ],
                        backgroundColor: '#4361ee',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 1
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
                                    return `Affordable Price: ${currencySymbol}${context.raw.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
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
        
        // Sync down payment and percentage
        function syncDownPayment() {
            const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
            const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value) || 0;
            
            const affordablePrice = document.getElementById('affordableHomePrice').textContent;
            const priceValue = parseFloat(affordablePrice.replace(/[^0-9.]/g, '')) || 300000;
            
            if (downPayment > 0) {
                const percent = (downPayment / priceValue * 100).toFixed(1);
                document.getElementById('downPaymentPercent').value = percent;
            } else if (downPaymentPercent > 0) {
                const amount = (priceValue * downPaymentPercent / 100).toFixed(0);
                document.getElementById('downPayment').value = amount;
            }
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
            title.textContent = 'Mortgage Affordability Report';
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
            footer.innerHTML = `Generated on ${new Date().toLocaleDateString()} by FreeFinTools Mortgage Calculator`;
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
                pdf.save('mortgage-affordability-report.pdf');
                
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
        calculateBtn.addEventListener('click', calculateAffordability);
        downloadPDFBtn.addEventListener('click', generatePDF);
        currencySelect.addEventListener('change', calculateAffordability);
        document.getElementById('downPayment').addEventListener('input', syncDownPayment);
        document.getElementById('downPaymentPercent').addEventListener('input', syncDownPayment);
        
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
        
        // Initialize on load
        window.addEventListener('load', calculateAffordability);
    </script>
</body>
</html>