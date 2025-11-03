<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GST/VAT Calculator | Add or Remove Tax - FreeFinTools</title>
    <meta name="description" content="Add or remove GST/VAT from amounts quickly. Supports custom tax rates. Free and simple.">
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
            <h1>GST/VAT Calculator</h1>
            <p>Add or remove tax from any amount using your GST/VAT rate.</p>
        </div>
    </section>

    <div class="container">
        <div class="card">
            <div class="row row-3">
                <div>
                    <label for="mode">Mode</label>
                    <select id="mode" class="control">
                        <option value="add">Add Tax</option>
                        <option value="remove">Remove Tax</option>
                    </select>
                </div>
                <div>
                    <label for="rate">Tax Rate (%)</label>
                    <input id="rate" class="control" type="number" min="0" step="0.01" value="15">
                </div>
                <div>
                    <label for="amount">Amount</label>
                    <input id="amount" class="control" type="number" min="0" step="0.01" value="100">
                </div>
            </div>
            <div style="display:flex; gap:12px; align-items:center; margin: 6px 0 12px;">
                <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
            </div>
            <div class="result" id="resultCard" style="display:none;">
                <div class="result-main" id="resultMain">—</div>
                <div class="result-sub" id="resultSub">—</div>
            </div>
            <p class="note">When removing tax, amount is treated as tax-inclusive.</p>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const modeEl = document.getElementById('mode');
        const rateEl = document.getElementById('rate');
        const amountEl = document.getElementById('amount');
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        function fmt(n){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:2}); }

        function calc(){
            const mode = modeEl.value; const rate = parseFloat(rateEl.value)||0; const amt = parseFloat(amountEl.value)||0;
            if (amt<0 || rate<0){ resultCard.style.display='none'; return; }
            let base, tax, total;
            if (mode==='add'){
                tax = amt * (rate/100);
                total = amt + tax;
                base = amt;
                resultMain.textContent = `Total (incl. tax): ${fmt(total)}`;
                resultSub.textContent = `Base: ${fmt(base)} · Tax: ${fmt(tax)} (${rate.toFixed(2)}%)`;
            } else {
                base = amt / (1 + rate/100);
                tax = amt - base;
                total = amt;
                resultMain.textContent = `Base (excl. tax): ${fmt(base)}`;
                resultSub.textContent = `Tax: ${fmt(tax)} (${rate.toFixed(2)}%) · Total: ${fmt(total)}`;
            }
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            calc();
            [modeEl, rateEl, amountEl].forEach(el=>el.addEventListener('input', calc));
            calcBtn.addEventListener('click', calc);
        });
    </script>
</body>
</html>


