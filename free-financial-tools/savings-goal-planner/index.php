<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Savings Goal Planner | Target Amount & Timeline - FreeFinTools</title>
    <meta name="description" content="Plan savings required per month to reach a goal by a target date. Includes optional expected return.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:900px;margin:0 auto;padding:20px}
        .tool-hero{text-align:center;padding:20px 0} .tool-hero h1{color:var(--primary)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin:28px 0}
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
        <h1>Savings Goal Planner</h1>
        <p>Calculate how much to save each month to reach your goal by a target date.</p>
    </div>
    <div class="container">
        <div class="card">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
                <div><label>Goal Amount</label><input id="goal" class="control" type="number" min="0" step="0.01" value="10000"></div>
                <div><label>Current Savings</label><input id="current" class="control" type="number" min="0" step="0.01" value="500"></div>
                <div><label>Target Date</label><input id="date" class="control" type="date"></div>
                <div><label>Expected Annual Return (%) (optional)</label><input id="rate" class="control" type="number" min="0" step="0.1" value="0"></div>
            </div>
            <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
            <div class="result" id="resultCard" style="display:none;margin-top:12px;">
                <div class="result-main" id="resultMain">—</div>
                <div class="result-sub" id="resultSub">—</div>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const goalEl=document.getElementById('goal');
        const currentEl=document.getElementById('current');
        const dateEl=document.getElementById('date');
        const rateEl=document.getElementById('rate');
        const calcBtn=document.getElementById('calcBtn');
        const resultCard=document.getElementById('resultCard');
        const resultMain=document.getElementById('resultMain');
        const resultSub=document.getElementById('resultSub');

        function monthsUntil(d){
            if (!d) return 0; const t=new Date(d); const n=new Date();
            return Math.max(0, (t.getFullYear()-n.getFullYear())*12 + (t.getMonth()-n.getMonth()));
        }

        function calc(){
            const goal=parseFloat(goalEl.value)||0; const cur=parseFloat(currentEl.value)||0; const months=monthsUntil(dateEl.value);
            const annual=(parseFloat(rateEl.value)||0)/100; const monthlyRate=annual/12;
            if (goal<=0 || months<=0){ resultCard.style.display='none'; return; }
            const targetRemaining = Math.max(0, goal - cur*(1+monthlyRate*months));
            let perMonth;
            if (monthlyRate>0){
                // Future value of ordinary annuity: PMT = r * FV / ((1+r)^n - 1)
                perMonth = monthlyRate * targetRemaining / (Math.pow(1+monthlyRate, months) - 1);
            } else {
                perMonth = targetRemaining / months;
            }
            resultMain.textContent = `Save ${perMonth.toFixed(2)} per month for ${months} months`;
            resultSub.textContent = `Goal: ${goal.toFixed(2)} · Current: ${cur.toFixed(2)} · Rate: ${(annual*100).toFixed(1)}%`;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            calcBtn.addEventListener('click', calc);
        });
    </script>
</body>
</html>


