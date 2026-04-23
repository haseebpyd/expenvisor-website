<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Credit Score Simulator | What-if Scenarios - FreeFinTools</title>
    <meta name="description" content="Simulate how factors like utilization, on-time payments, and new credit might influence your score (educational).">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:900px;margin:0 auto;padding:20px}
        .tool-hero{text-align:center;padding:20px 0} .tool-hero h1{color:var(--primary)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin:16px 0}
        .control{width:100%;padding:10px 12px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text)}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.4rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>
    <div class="tool-hero">
        <h1>Credit Score Simulator</h1>
        <p>Educational simulation of credit score factors.</p>
    </div>
    <div class="container">
        <div class="card">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
                <div><label>Base Score</label><input id="base" class="control" type="number" min="300" max="850" value="680"></div>
                <div><label>Utilization (%)</label><input id="util" class="control" type="number" min="0" max="100" value="35"></div>
                <div><label>On-time Payment %</label><input id="ontime" class="control" type="number" min="0" max="100" value="98"></div>
                <div><label>New Credit Inquiries (12m)</label><input id="inq" class="control" type="number" min="0" step="1" value="1"></div>
                <div><label>Average Age of Accounts (years)</label><input id="age" class="control" type="number" min="0" step="0.1" value="5"></div>
                <div><label>Derogatory Marks</label><input id="derog" class="control" type="number" min="0" step="1" value="0"></div>
            </div>
            <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Simulate</button>
            <div class="result" id="resultCard" style="display:none;margin-top:12px;">
                <div class="result-main" id="resultMain">—</div>
                <div class="result-sub" id="resultSub">—</div>
            </div>
        </div>
    </div>
    <?php include '../footer.php'; ?>
    <script>
        const baseEl=document.getElementById('base');
        const utilEl=document.getElementById('util');
        const ontimeEl=document.getElementById('ontime');
        const inqEl=document.getElementById('inq');
        const ageEl=document.getElementById('age');
        const derogEl=document.getElementById('derog');
        const calcBtn=document.getElementById('calcBtn');
        const resultCard=document.getElementById('resultCard');
        const resultMain=document.getElementById('resultMain');
        const resultSub=document.getElementById('resultSub');

        function clamp(n,min,max){ return Math.min(max, Math.max(min, n)); }

        function simulate(){
            let score = clamp(parseInt(baseEl.value,10)||680, 300, 850);
            const util = clamp(parseFloat(utilEl.value)||0, 0, 100); // lower is better
            const ontime = clamp(parseFloat(ontimeEl.value)||0, 0, 100); // higher is better
            const inq = clamp(parseInt(inqEl.value,10)||0, 0, 50); // lower is better
            const age = Math.max(0, parseFloat(ageEl.value)||0); // higher is better
            const derog = Math.max(0, parseInt(derogEl.value,10)||0);

            // Simple weights (illustrative): payment 35%, utilization 30%, age 15%, inquiries 10%, derog 10%
            let delta = 0;
            delta += (ontime - 95) * 2;           // above/below 95% impacts
            delta += (30 - util) * 1.5;           // target 30%
            delta += (age - 5) * 2;               // above 5 years helps
            delta += (1 - inq) * -5;              // more inquiries reduce
            delta += (-derog) * 25;               // any derogatory marks hurt strongly

            const sim = clamp(score + delta, 300, 850);
            resultMain.textContent = `Simulated Score: ${Math.round(sim)}`;
            resultSub.textContent = `Changes vs base: ${Math.round(sim - score)} · (illustrative model)`;
            resultCard.style.display='block';
        }
        document.addEventListener('DOMContentLoaded', ()=> calcBtn.addEventListener('click', simulate));
    </script>
</body>
</html>


