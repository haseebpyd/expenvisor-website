<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inflation Calculator | Adjust Money for Inflation - FreeFinTools</title>
    <meta name="description" content="Adjust any amount of money for inflation between years. Supports multiple regions. Free, fast, no signup.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4361ee; --primary-dark: #3a56d4; --secondary: #06d6a0; --dark: #1e293b; --light: #f8fafc;
            --gray: #64748b; --light-gray: #e2e8f0; --card-bg: #ffffff; --body-bg: #f1f5f9; --border: #e2e8f0; --text: #1e293b; --text-light: #64748b;
        }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .grid{display:grid;grid-template-columns:1fr;gap:24px;margin:28px 0 36px} @media(min-width:768px){.grid{grid-template-columns:2fr 1fr;gap:28px}}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        .card h2{font-size:1.3rem;color:var(--primary);margin-bottom:12px;display:flex;gap:8px;align-items:center}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-3{grid-template-columns:2fr 1fr 1fr}}
        .control{width:100%;padding:12px 14px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);font-size:1rem}
        .control:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(67,97,238,.15)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.6rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
        .section-title{font-size:1.3rem;margin:24px 0 12px;color:var(--primary)} .faq-item{border-bottom:1px solid var(--border);padding:12px 0}
        .faq-q{font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center} .faq-a{color:var(--text-light);display:none;padding-top:8px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Inflation Calculator</h1>
            <p>See how the value of money changes over time. Adjust any amount between two years using region-specific CPI indexes.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-chart-line"></i> Adjust for Inflation</h2>
                <div class="row row-3">
                    <div>
                        <label for="amount">Amount</label>
                        <input id="amount" class="control" type="number" min="0" step="0.01" value="1000">
                    </div>
                    <div>
                        <label for="fromYear">From Year</label>
                        <select id="fromYear" class="control"></select>
                    </div>
                    <div>
                        <label for="toYear">To Year</label>
                        <select id="toYear" class="control"></select>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label for="region">Region</label>
                        <select id="region" class="control">
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="EU">Euro Area</option>
                            <option value="IN">India</option>
                            <option value="PK">Pakistan</option>
                        </select>
                    </div>
                </div>
                <div style="display:flex; gap:12px; align-items:center; margin: 6px 0 12px;">
                    <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
                    <span class="note" id="metaInfo">Using CPI index datasets curated for quick estimates.</span>
                </div>
                <div class="result" id="resultCard" style="display:none;">
                    <div class="result-main" id="resultMain">—</div>
                    <div class="result-sub" id="resultSub">—</div>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> What You'll Get</h2>
                <ul style="color:var(--text-light); line-height:1.9; padding-left:18px;">
                    <li>Inflation-adjusted value from start year to end year</li>
                    <li>Percentage inflation over the period</li>
                    <li>Simple, fast calculation using CPI indexes</li>
                </ul>
                <p class="note">Note: This tool provides estimates for educational purposes.</p>
            </div>
        </div>

        <h3 class="section-title">FAQ</h3>
        <div class="card">
            <div class="faq-item">
                <div class="faq-q">How is inflation calculated here? <i class="fas fa-chevron-down"></i></div>
                <div class="faq-a">We use the ratio of CPI indices: Adjusted = Amount × (CPI<sub>to</sub> / CPI<sub>from</sub>).</div>
            </div>
            <div class="faq-item">
                <div class="faq-q">Are the CPI datasets official? <i class="fas fa-chevron-down"></i></div>
                <div class="faq-a">We use curated CPI index series for quick estimates. For professional use, consult your country's statistics bureau.</div>
            </div>
            <div class="faq-item">
                <div class="faq-q">What if a year is missing? <i class="fas fa-chevron-down"></i></div>
                <div class="faq-a">Pick the nearest available year. We restrict the dropdown to available years to avoid gaps.</div>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        // Minimal CPI index datasets (base ~100 around 2015). Values are illustrative for educational use.
        const CPI = {
            US: { 2000:82.4, 2005:95.2, 2010:100.0, 2015:106.9, 2018:111.8, 2020:113.6, 2021:118.6, 2022:128.0, 2023:133.0, 2024:136.5 },
            UK: { 2000:69.1, 2005:80.9, 2010:92.1, 2015:100.0, 2018:106.4, 2020:109.4, 2021:114.9, 2022:128.6, 2023:136.5, 2024:140.2 },
            EU: { 2000:76.5, 2005:86.9, 2010:95.9, 2015:100.0, 2018:104.7, 2020:106.2, 2021:109.3, 2022:119.6, 2023:126.1, 2024:129.0 },
            IN: { 2005:52.0, 2010:80.0, 2015:100.0, 2018:114.0, 2020:120.0, 2021:126.0, 2022:134.0, 2023:140.0, 2024:146.0 },
            PK: { 2005:45.0, 2010:72.0, 2015:100.0, 2018:122.0, 2020:140.0, 2021:160.0, 2022:190.0, 2023:225.0, 2024:260.0 }
        };

        const amountEl = document.getElementById('amount');
        const fromYearEl = document.getElementById('fromYear');
        const toYearEl = document.getElementById('toYear');
        const regionEl = document.getElementById('region');
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        function populateYears(region) {
            const years = Object.keys(CPI[region]).map(y=>parseInt(y,10)).sort((a,b)=>a-b);
            fromYearEl.innerHTML = ''; toYearEl.innerHTML = '';
            years.forEach(y => { const o1=document.createElement('option');o1.value=y;o1.textContent=y;fromYearEl.appendChild(o1);
                                 const o2=document.createElement('option');o2.value=y;o2.textContent=y;toYearEl.appendChild(o2); });
            fromYearEl.value = years[0];
            toYearEl.value = years[years.length-1];
        }

        function calc() {
            const region = regionEl.value; const fromY = parseInt(fromYearEl.value,10); const toY = parseInt(toYearEl.value,10);
            const amount = parseFloat(amountEl.value)||0;
            if (toY < fromY) { [toYearEl.value, fromYearEl.value] = [fromY, toY]; return calc(); }
            const cpiFrom = CPI[region][fromY]; const cpiTo = CPI[region][toY];
            if (!cpiFrom || !cpiTo) { resultCard.style.display='none'; return; }
            const ratio = cpiTo / cpiFrom; const adjusted = amount * ratio; const inflationPct = (ratio-1)*100;
            resultMain.textContent = `${fmt(amount)} in ${fromY} ≈ ${fmt(adjusted)} in ${toY}`;
            resultSub.textContent = `Inflation over the period: ${inflationPct.toFixed(1)}% · CPI ${fromY}: ${cpiFrom.toFixed(1)} → ${toY}: ${cpiTo.toFixed(1)}`;
            resultCard.style.display = 'block';
        }

        function fmt(n){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:2}); }

        document.addEventListener('DOMContentLoaded', () => {
            populateYears(regionEl.value);
            calc();
            regionEl.addEventListener('change', () => { populateYears(regionEl.value); calc(); });
            fromYearEl.addEventListener('change', calc);
            toYearEl.addEventListener('change', calc);
            amountEl.addEventListener('input', calc);
            calcBtn.addEventListener('click', calc);

            document.querySelectorAll('.faq-q').forEach(q => {
                q.addEventListener('click', ()=>{
                    const a = q.nextElementSibling; a.style.display = a.style.display==='block' ? 'none':'block';
                    const icon = q.querySelector('i'); icon.className = a.style.display==='block' ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
                });
            });
        });
    </script>
</body>
</html>


