<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Risk Tolerance Assessor | Investor Profile Quiz - FreeFinTools</title>
    <meta name="description" content="Quick quiz to assess your investment risk tolerance: Conservative, Balanced, or Aggressive.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:900px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin:28px 0}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)} .btn-sm{padding:8px 12px;border-radius:8px}
        .q{margin-bottom:16px} .q h3{font-size:1rem;margin-bottom:8px;color:var(--primary)} .opt{margin-bottom:8px}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.4rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Risk Tolerance Assessor</h1>
            <p>Answer a few questions to estimate your investing risk profile.</p>
        </div>
    </section>

    <div class="container">
        <div class="card" id="quiz">
            <div class="q" data-weight="1">
                <h3>1) How would you react to a 15% drop in your portfolio?</h3>
                <label class="opt"><input type="radio" name="q1" value="1"> Sell to stop further losses</label>
                <label class="opt"><input type="radio" name="q1" value="2"> Hold and wait it out</label>
                <label class="opt"><input type="radio" name="q1" value="3"> Buy more at lower prices</label>
            </div>
            <div class="q" data-weight="1">
                <h3>2) Investment horizon</h3>
                <label class="opt"><input type="radio" name="q2" value="1"> Less than 3 years</label>
                <label class="opt"><input type="radio" name="q2" value="2"> 3–7 years</label>
                <label class="opt"><input type="radio" name="q2" value="3"> 7+ years</label>
            </div>
            <div class="q" data-weight="1">
                <h3>3) Primary goal</h3>
                <label class="opt"><input type="radio" name="q3" value="1"> Preserve capital</label>
                <label class="opt"><input type="radio" name="q3" value="2"> Balanced growth</label>
                <label class="opt"><input type="radio" name="q3" value="3"> Maximize growth</label>
            </div>
            <div class="q" data-weight="1">
                <h3>4) Comfort with volatility</h3>
                <label class="opt"><input type="radio" name="q4" value="1"> Low</label>
                <label class="opt"><input type="radio" name="q4" value="2"> Moderate</label>
                <label class="opt"><input type="radio" name="q4" value="3"> High</label>
            </div>
            <button id="calcBtn" class="btn"><i class="fas fa-check"></i> Get Result</button>
        </div>

        <div class="result" id="resultCard" style="display:none;">
            <div class="result-main" id="resultMain">—</div>
            <div class="result-sub" id="resultSub">—</div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        function calc(){
            let score = 0; let total = 0;
            document.querySelectorAll('#quiz .q').forEach(q=>{
                const weight = parseFloat(q.dataset.weight)||1;
                const sel = q.querySelector('input[type=radio]:checked');
                if (sel){ score += parseInt(sel.value,10) * weight; total += 3 * weight; }
            });
            if (total===0){ resultCard.style.display='none'; return; }
            const pct = (score/total)*100;
            let profile='Conservative', desc='Lower risk tolerance; prioritize capital preservation with higher fixed-income allocation.';
            if (pct>=66) { profile='Aggressive'; desc='Higher risk tolerance; larger equity allocation and long horizon.'; }
            else if (pct>=40) { profile='Balanced'; desc='Moderate risk tolerance; mix of equity and fixed income.'; }
            resultMain.textContent = `Profile: ${profile}`;
            resultSub.textContent = `Score: ${pct.toFixed(0)}% · ${desc}`;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            calcBtn.addEventListener('click', calc);
        });
    </script>
</body>
</html>


