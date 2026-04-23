<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capital Gains Estimator | Short-term vs Long-term - FreeFinTools</title>
    <meta name="description" content="Estimate capital gains taxes with simple short- and long-term rates. Educational only; adjust rates to your country.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:900px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin:28px 0}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-3{grid-template-columns:1fr 1fr 1fr}}
        .control{width:100%;padding:12px 14px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);font-size:1rem}
        .control:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(67,97,238,.15)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.6rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Capital Gains Estimator</h1>
            <p>Estimate taxes on your investment gains using simple short-term and long-term rates.</p>
        </div>
    </section>

    <div class="container">
        <div class="card">
            <div class="row row-3">
                <div>
                    <label for="buy">Buy Price</label>
                    <input id="buy" class="control" type="number" min="0" step="0.01" value="100">
                </div>
                <div>
                    <label for="sell">Sell Price</label>
                    <input id="sell" class="control" type="number" min="0" step="0.01" value="140">
                </div>
                <div>
                    <label for="shares">Shares/Units</label>
                    <input id="shares" class="control" type="number" min="0" step="1" value="10">
                </div>
            </div>
            <div class="row row-3">
                <div>
                    <label for="hold">Holding Period (years)</label>
                    <input id="hold" class="control" type="number" min="0" step="0.01" value="0.75">
                </div>
                <div>
                    <label for="stRate">Short-term Rate (%)</label>
                    <input id="stRate" class="control" type="number" min="0" step="0.01" value="30">
                </div>
                <div>
                    <label for="ltRate">Long-term Rate (%)</label>
                    <input id="ltRate" class="control" type="number" min="0" step="0.01" value="15">
                </div>
            </div>
            <div style="display:flex; gap:12px; align-items:center; margin: 6px 0 12px;">
                <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
                <span class="note">Adjust rates to your country's rules. Educational use only.</span>
            </div>
            <div class="result" id="resultCard" style="display:none;">
                <div class="result-main" id="resultMain">—</div>
                <div class="result-sub" id="resultSub">—</div>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const buyEl = document.getElementById('buy');
        const sellEl = document.getElementById('sell');
        const sharesEl = document.getElementById('shares');
        const holdEl = document.getElementById('hold');
        const stRateEl = document.getElementById('stRate');
        const ltRateEl = document.getElementById('ltRate');
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        function fmt(n){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:2}); }

        function calc(){
            const buy = parseFloat(buyEl.value)||0;
            const sell = parseFloat(sellEl.value)||0;
            const units = parseFloat(sharesEl.value)||0;
            const years = parseFloat(holdEl.value)||0;
            const stRate = (parseFloat(stRateEl.value)||0)/100;
            const ltRate = (parseFloat(ltRateEl.value)||0)/100;
            if (buy<=0 || sell<=0 || units<=0){ resultCard.style.display='none'; return; }
            const gainPer = sell - buy; const totalGain = gainPer * units;
            const isLT = years >= 1;
            const taxRate = isLT ? ltRate : stRate;
            const tax = totalGain>0 ? totalGain * taxRate : 0;
            const net = totalGain - tax;
            resultMain.textContent = `Total Gain: ${fmt(totalGain)} · Estimated Tax: ${fmt(tax)} (${(taxRate*100).toFixed(1)}%)`;
            resultSub.textContent = `Net Gain: ${fmt(net)} · Holding: ${years.toFixed(2)} years (${isLT?'Long-term':'Short-term'})`;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            calc();
            [buyEl,sellEl,sharesEl,holdEl,stRateEl,ltRateEl].forEach(el=>el.addEventListener('input', calc));
            calcBtn.addEventListener('click', calc);
        });
    </script>
</body>
</html>


