<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emergency Fund Calculator | How Much Should You Save? - FreeFinTools</title>
    <meta name="description" content="Calculate the ideal emergency fund based on your monthly expenses and months of coverage. Free, simple, fast.">
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
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Emergency Fund Calculator</h1>
            <p>Quickly estimate how much cash you need for emergencies. Common guidance: 3–6 months of essential expenses.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-piggy-bank"></i> Estimate Your Fund</h2>
                <div class="row row-3">
                    <div>
                        <label for="expenses">Monthly Essential Expenses</label>
                        <input id="expenses" class="control" type="number" min="0" step="0.01" value="1500">
                    </div>
                    <div>
                        <label for="months">Months of Coverage</label>
                        <input id="months" class="control" type="number" min="1" step="1" value="6">
                    </div>
                    <div>
                        <label for="buffer">Extra Buffer (%)</label>
                        <input id="buffer" class="control" type="number" min="0" step="1" value="10">
                    </div>
                </div>
                <div class="row">
                    <div>
                        <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
                        <span class="note">Tip: Include rent/mortgage, utilities, groceries, insurance, transport.</span>
                    </div>
                </div>
                <div class="result" id="resultCard" style="display:none;">
                    <div class="result-main" id="resultMain">—</div>
                    <div class="result-sub" id="resultSub">—</div>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> Guidance</h2>
                <ul style="color:var(--text-light); line-height:1.9; padding-left:18px;">
                    <li>Stable income + low dependents: 3 months might be sufficient.</li>
                    <li>Variable income / dependents: aim for 6–12 months.</li>
                    <li>Keep funds liquid (high-yield savings, money market).</li>
                </ul>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const expensesEl = document.getElementById('expenses');
        const monthsEl = document.getElementById('months');
        const bufferEl = document.getElementById('buffer');
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        function fmt(n){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:2}); }

        function calc(){
            const exp = parseFloat(expensesEl.value)||0;
            const mos = parseInt(monthsEl.value,10)||0;
            const bufPct = parseFloat(bufferEl.value)||0;
            if (exp<=0 || mos<=0){ resultCard.style.display='none'; return; }
            const base = exp * mos;
            const buffer = base * (bufPct/100);
            const total = base + buffer;
            resultMain.textContent = `Recommended Fund: ${fmt(total)}`;
            resultSub.textContent = `Base: ${fmt(base)} (${mos} months) · Buffer: ${fmt(buffer)} (${bufPct}%)`;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            calc();
            [expensesEl, monthsEl, bufferEl].forEach(el=>el.addEventListener('input', calc));
            calcBtn.addEventListener('click', calc);
        });
    </script>
</body>
</html>


