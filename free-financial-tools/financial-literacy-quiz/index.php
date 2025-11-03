<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financial Literacy Quiz | Test Your Money Skills - FreeFinTools</title>
    <meta name="description" content="Take a short quiz to test your knowledge on budgeting, debt, investing, and credit.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:900px;margin:0 auto;padding:20px}
        .tool-hero{text-align:center;padding:20px 0} .tool-hero h1{color:var(--primary)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin:16px 0}
        .q{margin-bottom:16px} .q h3{font-size:1rem;margin-bottom:8px;color:var(--primary)} .opt{display:block;margin-bottom:8px}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.4rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
        .explain{font-size:.95rem;color:var(--text-light);margin-top:10px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>
    <div class="tool-hero">
        <h1>Financial Literacy Quiz</h1>
        <p>Answer a few questions to check your understanding of personal finance.</p>
    </div>
    <div class="container">
        <div class="card" id="quiz">
            <div class="q" data-correct="b">
                <h3>1) Which is typically the highest priority?</h3>
                <label class="opt"><input type="radio" name="q1" value="a"> Investing in stocks immediately</label>
                <label class="opt"><input type="radio" name="q1" value="b"> Building an emergency fund</label>
                <label class="opt"><input type="radio" name="q1" value="c"> Buying a new car</label>
            </div>
            <div class="q" data-correct="c">
                <h3>2) Credit utilization ideally should be:</h3>
                <label class="opt"><input type="radio" name="q2" value="a"> Below 80%</label>
                <label class="opt"><input type="radio" name="q2" value="b"> Around 60%</label>
                <label class="opt"><input type="radio" name="q2" value="c"> Below 30%</label>
            </div>
            <div class="q" data-correct="a">
                <h3>3) Dollar-cost averaging is:</h3>
                <label class="opt"><input type="radio" name="q3" value="a"> Investing equal amounts at regular intervals</label>
                <label class="opt"><input type="radio" name="q3" value="b"> Investing only when markets drop 10%</label>
                <label class="opt"><input type="radio" name="q3" value="c"> Putting all money at once</label>
            </div>
            <div class="q" data-correct="b">
                <h3>4) Which debt payoff method saves the most interest?</h3>
                <label class="opt"><input type="radio" name="q4" value="a"> Snowball (smallest balance first)</label>
                <label class="opt"><input type="radio" name="q4" value="b"> Avalanche (highest interest first)</label>
                <label class="opt"><input type="radio" name="q4" value="c"> Random order</label>
            </div>
            <div class="q" data-correct="a">
                <h3>5) A diversified index fund typically offers:</h3>
                <label class="opt"><input type="radio" name="q5" value="a"> Broad market exposure at low cost</label>
                <label class="opt"><input type="radio" name="q5" value="b"> Guaranteed returns</label>
                <label class="opt"><input type="radio" name="q5" value="c"> Zero risk</label>
            </div>
            <button id="calcBtn" class="btn"><i class="fas fa-check"></i> Submit</button>
        </div>
        <div class="result" id="resultCard" style="display:none;">
            <div class="result-main" id="resultMain">—</div>
            <div class="result-sub" id="resultSub">—</div>
            <div class="explain" id="explain"></div>
        </div>
    </div>
    <?php include '../footer.php'; ?>
    <script>
        const calcBtn=document.getElementById('calcBtn');
        const resultCard=document.getElementById('resultCard');
        const resultMain=document.getElementById('resultMain');
        const resultSub=document.getElementById('resultSub');
        const explain=document.getElementById('explain');

        function calc(){
            let correct=0,total=0; const details=[];
            document.querySelectorAll('#quiz .q').forEach((q,i)=>{
                total++;
                const ans=q.dataset.correct; const sel=q.querySelector('input[type=radio]:checked')?.value;
                if (sel===ans) correct++;
                details.push(`Q${i+1}: ${sel===ans?'✔️ Correct':'❌ Incorrect'} (Correct: ${ans.toUpperCase()})`);
            });
            const pct = Math.round((correct/total)*100);
            let msg='Keep learning fundamentals.'; if (pct>=80) msg='Great job! Strong fundamentals.'; else if (pct>=60) msg='Good! A few areas to improve.';
            resultMain.textContent = `Score: ${pct}% (${correct}/${total})`;
            resultSub.textContent = msg;
            explain.innerHTML = details.map(d=>`<div>${d}</div>`).join('');
            resultCard.style.display='block';
        }
        document.addEventListener('DOMContentLoaded', ()=> calcBtn.addEventListener('click', calc));
    </script>
</body>
</html>


