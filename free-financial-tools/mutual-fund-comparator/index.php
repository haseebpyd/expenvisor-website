<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mutual Fund Comparator | TER & Net Returns - FreeFinTools</title>
    <meta name="description" content="Compare mutual funds by expense ratio (TER) and gross returns to estimate net returns over 1/3/5 years.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin:28px 0}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)} .btn-sm{padding:8px 12px;border-radius:8px}
        .control{width:100%;padding:10px 12px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text)}
        table{width:100%;border-collapse:collapse} th,td{padding:10px;border-bottom:1px solid var(--light-gray)} th{text-align:left;background:var(--light-gray)}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Mutual Fund Comparator</h1>
            <p>Compare expense ratios and returns to estimate net performance. Enter gross returns; we subtract TER for an estimate.</p>
        </div>
    </section>

    <div class="container">
        <div class="card" style="overflow:auto;">
            <table id="fundTable">
                <thead>
                    <tr>
                        <th>Fund Name</th>
                        <th style="width:120px">TER %</th>
                        <th style="width:120px">1Y Gross %</th>
                        <th style="width:120px">3Y CAGR %</th>
                        <th style="width:120px">5Y CAGR %</th>
                        <th style="width:100px">Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="margin-top:12px;display:flex;gap:8px;align-items:center;">
                <button id="addFundBtn" class="btn-sm"><i class="fas fa-plus"></i> Add fund</button>
                <span class="note">Net returns are estimated as Gross - TER (annualized). Actual results may vary.</span>
            </div>
        </div>

        <div class="card" id="resultsCard" style="display:none;">
            <h2 style="color:var(--primary);margin-bottom:10px;">Comparison (Estimated Net)</h2>
            <div id="results"></div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const tbody = document.querySelector('#fundTable tbody');
        const addFundBtn = document.getElementById('addFundBtn');
        const resultsCard = document.getElementById('resultsCard');
        const resultsDiv = document.getElementById('results');

        function addRow(fund={name:'New Fund', ter:1.0, r1:8.0, r3:10.0, r5:12.0}){
            const tr=document.createElement('tr');
            tr.innerHTML=`
                <td><input class="control name" value="${fund.name}"></td>
                <td><input class="control ter" type="number" step="0.01" value="${fund.ter}"></td>
                <td><input class="control r1" type="number" step="0.01" value="${fund.r1}"></td>
                <td><input class="control r3" type="number" step="0.01" value="${fund.r3}"></td>
                <td><input class="control r5" type="number" step="0.01" value="${fund.r5}"></td>
                <td><button class="btn-sm btn-del"><i class="fas fa-trash"></i></button></td>
            `;
            tbody.appendChild(tr);
            attachRowEvents(tr);
            render();
        }

        function attachRowEvents(tr){
            tr.querySelector('.btn-del').addEventListener('click',()=>{ tr.remove(); render(); });
            tr.querySelectorAll('input').forEach(inp=>inp.addEventListener('input', render));
        }

        function getFunds(){
            return Array.from(tbody.querySelectorAll('tr')).map(tr=>({
                name: tr.querySelector('.name').value.trim()||'Fund',
                ter: parseFloat(tr.querySelector('.ter').value)||0,
                r1: parseFloat(tr.querySelector('.r1').value)||0,
                r3: parseFloat(tr.querySelector('.r3').value)||0,
                r5: parseFloat(tr.querySelector('.r5').value)||0,
            }));
        }

        function render(){
            const funds = getFunds();
            if (funds.length===0){ resultsCard.style.display='none'; return; }
            const rows = funds.map(f=>{
                const n1 = f.r1 - f.ter;
                const n3 = f.r3 - f.ter;
                const n5 = f.r5 - f.ter;
                return `<tr><td>${escapeHtml(f.name)}</td><td>${n1.toFixed(2)}%</td><td>${n3.toFixed(2)}%</td><td>${n5.toFixed(2)}%</td></tr>`;
            }).join('');
            resultsDiv.innerHTML = `
                <div style="overflow:auto;">
                    <table style="width:100%;border-collapse:collapse;">
                        <thead><tr><th>Fund</th><th>1Y Net %</th><th>3Y Net CAGR %</th><th>5Y Net CAGR %</th></tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>`;
            resultsCard.style.display='block';
        }

        function escapeHtml(s){ return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }

        document.addEventListener('DOMContentLoaded', ()=>{
            addFundBtn.addEventListener('click', ()=> addRow());
            addRow({name:'Alpha Equity', ter:1.2, r1:9.5, r3:11.0, r5:12.4});
            addRow({name:'Beta Index', ter:0.2, r1:8.0, r3:9.0, r5:10.0});
        });
    </script>
</body>
</html>


