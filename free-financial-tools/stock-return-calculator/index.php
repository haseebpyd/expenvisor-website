<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Return Calculator | Absolute Return & CAGR - FreeFinTools</title>
    <meta name="description" content="Calculate stock returns including dividends. Get absolute return and CAGR quickly. Free, fast, no signup.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .grid{display:grid;grid-template-columns:1fr;gap:24px;margin:28px 0 36px} @media(min-width:768px){.grid{grid-template-columns:2fr 1fr;gap:28px}}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        .card h2{font-size:1.3rem;color:var(--primary);margin-bottom:12px;display:flex;gap:8px;align-items:center}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-3{grid-template-columns:1fr 1fr 1fr}}
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
            <h1>Stock Return Calculator</h1>
            <p>Compute absolute return and CAGR on a stock investment. Include dividends for a total return view.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-chart-line"></i> Calculate Returns</h2>
                <div class="row row-3">
                    <div>
                        <label for="initial">Initial Price</label>
                        <input id="initial" class="control" type="number" min="0" step="0.01" value="100">
                    </div>
                    <div>
                        <label for="final">Final Price</label>
                        <input id="final" class="control" type="number" min="0" step="0.01" value="150">
                    </div>
                    <div>
                        <label for="dividends">Dividends (total)</label>
                        <input id="dividends" class="control" type="number" min="0" step="0.01" value="0">
                    </div>
                </div>
                <div class="row row-3">
                    <div>
                        <label for="years">Holding Period (years)</label>
                        <input id="years" class="control" type="number" min="0.01" step="0.01" value="3">
                    </div>
                    <div>
                        <label for="shares">Shares (optional)</label>
                        <input id="shares" class="control" type="number" min="0" step="1" value="">
                    </div>
                    <div>
                        <label>&nbsp;</label>
                        <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
                    </div>
                </div>
                <div class="result" id="resultCard" style="display:none;">
                    <div class="result-main" id="resultMain">—</div>
                    <div class="result-sub" id="resultSub">—</div>
                </div>
                <p class="note">Tip: If you know only total invested and final value, set shares blank and treat prices as per-share.</p>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> Outputs</h2>
                <ul style="color:var(--text-light); line-height:1.9; padding-left:18px;">
                    <li>Absolute return (%) and money gain</li>
                    <li>CAGR (annualized return %)</li>
                    <li>Final value including dividends</li>
                    <li>Optional: total gain based on shares</li>
                </ul>
            </div>
        </div>

        <h3 class="section-title">FAQ</h3>
        <div class="card">
            <div class="faq-item"><div class="faq-q">What is CAGR? <i class="fas fa-chevron-down"></i></div><div class="faq-a">Compound Annual Growth Rate: ((Final/Initial)^(1/years) - 1) × 100% including dividends when provided.</div></div>
            <div class="faq-item"><div class="faq-q">How are dividends used? <i class="fas fa-chevron-down"></i></div><div class="faq-a">We add total dividends to the final price for total return calculations.</div></div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const initialEl = document.getElementById('initial');
        const finalEl = document.getElementById('final');
        const dividendsEl = document.getElementById('dividends');
        const yearsEl = document.getElementById('years');
        const sharesEl = document.getElementById('shares');
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        function fmt(n, d=2){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:d}); }

        function calc(){
            const init = parseFloat(initialEl.value)||0;
            const fin = parseFloat(finalEl.value)||0;
            const divs = parseFloat(dividendsEl.value)||0;
            const yrs = parseFloat(yearsEl.value)||0;
            if (init<=0 || fin<0 || yrs<=0){ resultCard.style.display='none'; return; }
            const finalAdj = fin + divs;
            const absRet = (finalAdj - init) / init; // fraction
            const cagr = Math.pow(finalAdj / init, 1/yrs) - 1;
            const shares = parseFloat(sharesEl.value)||null;
            const gain = absRet * init;
            let main = `Absolute Return: ${(absRet*100).toFixed(2)}% · CAGR: ${(cagr*100).toFixed(2)}%`;
            let sub = `Initial: ${fmt(init)} → Final: ${fmt(finalAdj)} (incl. dividends ${fmt(divs)}) over ${fmt(yrs,2)} years`;
            if (shares && shares>0){
                const totalGain = (finalAdj - init) * shares;
                sub += ` · Total Gain (shares): ${fmt(totalGain)}`;
            }
            resultMain.textContent = main;
            resultSub.textContent = sub;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            calc();
            [initialEl, finalEl, dividendsEl, yearsEl, sharesEl].forEach(el=>el.addEventListener('input', calc));
            calcBtn.addEventListener('click', calc);
            document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{
                const a=q.nextElementSibling; a.style.display=a.style.display==='block'?'none':'block';
                const i=q.querySelector('i'); i.className=a.style.display==='block'?'fas fa-chevron-up':'fas fa-chevron-down';
            }));
        });
    </script>
</body>
</html>


