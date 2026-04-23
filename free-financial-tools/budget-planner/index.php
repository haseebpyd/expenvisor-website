<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budget Planner | 50/30/20 and Custom Categories - FreeFinTools</title>
    <meta name="description" content="Plan your monthly budget with 50/30/20 rule or custom categories. Saves to your browser. Free and simple.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .grid{display:grid;grid-template-columns:1fr;gap:24px;margin:28px 0 36px} @media(min-width:992px){.grid{grid-template-columns:1.6fr 1fr;gap:28px}}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        .card h2{font-size:1.3rem;color:var(--primary);margin-bottom:12px;display:flex;gap:8px;align-items:center}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-2{grid-template-columns:1fr 1fr}}
        .control{width:100%;padding:12px 14px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);font-size:1rem}
        .control:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(67,97,238,.15)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        table{width:100%;border-collapse:collapse} th,td{padding:10px;border-bottom:1px solid var(--light-gray)} th{text-align:left;background:var(--light-gray)}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.4rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Budget Planner</h1>
            <p>Plan your monthly spending using the 50/30/20 rule or customize categories. Your plan is saved locally in your browser.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-wallet"></i> Monthly Budget</h2>
                <div class="row row-2">
                    <div>
                        <label for="income">Monthly Net Income</label>
                        <input id="income" class="control" type="number" min="0" step="0.01" value="3000">
                    </div>
                    <div>
                        <label for="template">Template</label>
                        <select id="template" class="control">
                            <option value="50-30-20">50/30/20 Rule</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <button id="addCatBtn" class="btn"><i class="fas fa-plus"></i> Add Category</button>
                        <span class="note">In 50/30/20, Needs=50%, Wants=30%, Savings=20%. Switch to custom to add your own categories.</span>
                    </div>
                </div>
                <div style="overflow:auto;">
                    <table id="budgetTable">
                        <thead><tr><th>Category</th><th style="width:160px">Percent %</th><th style="width:180px">Amount</th><th style="width:100px">Action</th></tr></thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="result" style="margin-top:14px;">
                    <div class="result-main" id="summaryMain">—</div>
                    <div class="result-sub" id="summarySub">—</div>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> Tips</h2>
                <ul style="color:var(--text-light); line-height:1.9; padding-left:18px;">
                    <li>Start with 50/30/20 then fine-tune percentages to fit your life.</li>
                    <li>Keep total percentages at 100% for a balanced plan.</li>
                    <li>Revisit monthly as expenses or income change.</li>
                </ul>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const incomeEl = document.getElementById('income');
        const templateEl = document.getElementById('template');
        const addCatBtn = document.getElementById('addCatBtn');
        const tbody = document.querySelector('#budgetTable tbody');
        const summaryMain = document.getElementById('summaryMain');
        const summarySub = document.getElementById('summarySub');

        const KEY = 'fft_budget_plan_v1';

        function loadState(){
            try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
        }
        function saveState(state){ localStorage.setItem(KEY, JSON.stringify(state)); }

        function defaultRows(){
            return [
                { name:'Needs', percent:50 },
                { name:'Wants', percent:30 },
                { name:'Savings', percent:20 }
            ];
        }

        function renderRows(rows){
            tbody.innerHTML='';
            rows.forEach((r, idx)=>{
                const tr=document.createElement('tr');
                tr.innerHTML = `
                    <td><input class="control cat-name" value="${r.name}" ${templateEl.value==='50-30-20' && ['Needs','Wants','Savings'].includes(r.name)?'readonly':''}></td>
                    <td><input class="control cat-percent" type="number" min="0" step="0.1" value="${r.percent}"></td>
                    <td><input class="control cat-amount" type="number" min="0" step="0.01" value="0" readonly></td>
                    <td><button class="btn btn-del" ${templateEl.value==='50-30-20' && ['Needs','Wants','Savings'].includes(r.name)?'disabled':''} data-idx="${idx}"><i class="fas fa-trash"></i></button></td>
                `;
                tbody.appendChild(tr);
            });
            attachRowEvents();
            recalc();
        }

        function attachRowEvents(){
            tbody.querySelectorAll('.cat-percent').forEach(inp=>inp.addEventListener('input', recalc));
            tbody.querySelectorAll('.cat-name').forEach(inp=>inp.addEventListener('input', save));
            tbody.querySelectorAll('.btn-del').forEach(btn=>btn.addEventListener('click', (e)=>{
                const idx=parseInt(btn.dataset.idx,10);
                const rows = getRows().filter((_,i)=>i!==idx);
                renderRows(rows); save();
            }));
        }

        function getRows(){
            return Array.from(tbody.querySelectorAll('tr')).map(tr=>({
                name: tr.querySelector('.cat-name').value.trim()||'Category',
                percent: parseFloat(tr.querySelector('.cat-percent').value)||0
            }));
        }

        function recalc(){
            const income = parseFloat(incomeEl.value)||0;
            const rows = getRows();
            let totalPct = 0; let totalAmt = 0;
            rows.forEach((r, idx)=>{
                totalPct += r.percent;
                const amt = income * (r.percent/100);
                totalAmt += amt;
                tbody.querySelectorAll('.cat-amount')[idx].value = amt.toFixed(2);
            });
            summaryMain.textContent = `Total Allocated: ${totalAmt.toFixed(2)} / ${income.toFixed(2)}`;
            summarySub.textContent = `Total Percent: ${totalPct.toFixed(1)}% (${totalPct===100?'Balanced':'Adjust to 100%'})`;
            save();
        }

        function addCategory(){
            const rows = getRows();
            rows.push({ name:'New Category', percent:0 });
            renderRows(rows); save();
        }

        function save(){
            const state = { income: parseFloat(incomeEl.value)||0, template: templateEl.value, rows: getRows() };
            saveState(state);
        }

        function restore(){
            const st = loadState();
            if (st){
                incomeEl.value = st.income || 0;
                templateEl.value = st.template || '50-30-20';
                renderRows(st.rows && st.rows.length? st.rows : defaultRows());
            } else {
                templateEl.value='50-30-20';
                renderRows(defaultRows());
            }
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            restore();
            incomeEl.addEventListener('input', recalc);
            templateEl.addEventListener('change', ()=>{
                if (templateEl.value==='50-30-20') renderRows(defaultRows()); else renderRows(getRows());
                save();
            });
            addCatBtn.addEventListener('click', addCategory);
        });
    </script>
</body>
</html>


