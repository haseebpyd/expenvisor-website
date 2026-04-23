<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker | Simple Local Budget Log - FreeFinTools</title>
    <meta name="description" content="Track expenses by date, category, and amount. Stored locally in your browser. Export/clear anytime.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .grid{display:grid;grid-template-columns:1fr;gap:24px;margin:28px 0 36px} @media(min-width:992px){.grid{grid-template-columns:1.3fr 1fr;gap:28px}}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        .card h2{font-size:1.3rem;color:var(--primary);margin-bottom:12px;display:flex;gap:8px;align-items:center}
        .control{width:100%;padding:10px 12px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text)}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)}
        table{width:100%;border-collapse:collapse} th,td{padding:10px;border-bottom:1px solid var(--light-gray)} th{text-align:left;background:var(--light-gray)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)} .btn-sm{padding:8px 12px;border-radius:8px}
        .pill{display:inline-block;padding:4px 10px;border-radius:999px;background:rgba(67,97,238,.1);color:var(--primary);font-weight:600}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Expense Tracker</h1>
            <p>Log daily expenses by category. Data stays in your browser. Export to CSV anytime.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-receipt"></i> Add Expense</h2>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px;">
                    <div><label>Date</label><input id="date" class="control" type="date"></div>
                    <div><label>Category</label><input id="category" class="control" placeholder="Groceries"></div>
                    <div><label>Amount</label><input id="amount" class="control" type="number" step="0.01" min="0"></div>
                </div>
                <div style="display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:12px;">
                    <div><label>Note (optional)</label><input id="note" class="control" placeholder="(optional)"></div>
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <button id="addBtn" class="btn"><i class="fas fa-plus"></i> Add</button>
                    <button id="clearBtn" class="btn-sm" style="background:#ef4444"><i class="fas fa-trash"></i> Clear All</button>
                    <button id="exportBtn" class="btn-sm" style="background:#10b981"><i class="fas fa-download"></i> Export CSV</button>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-chart-pie"></i> Summary</h2>
                <div id="summary"></div>
            </div>
        </div>

        <div class="card" style="overflow:auto;">
            <h2 style="color:var(--primary);margin-bottom:10px;">Expense Log</h2>
            <table id="logTable">
                <thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Note</th><th>Action</th></tr></thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const KEY='fft_expense_log_v1';
        const dateEl=document.getElementById('date');
        const catEl=document.getElementById('category');
        const amtEl=document.getElementById('amount');
        const noteEl=document.getElementById('note');
        const addBtn=document.getElementById('addBtn');
        const clearBtn=document.getElementById('clearBtn');
        const exportBtn=document.getElementById('exportBtn');
        const tbody=document.querySelector('#logTable tbody');
        const summaryDiv=document.getElementById('summary');

        function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||[] }catch{return []} }
        function save(list){ localStorage.setItem(KEY, JSON.stringify(list)); }

        function add(){
            const d=dateEl.value||new Date().toISOString().slice(0,10);
            const c=(catEl.value||'Uncategorized').trim();
            const a=parseFloat(amtEl.value)||0; const n=(noteEl.value||'').trim(); if (a<=0) return;
            const list=load(); list.push({d,c,a,n}); save(list); render();
            amtEl.value=''; noteEl.value=''; catEl.value=''; dateEl.value='';
        }

        function remove(idx){ const list=load().filter((_,i)=>i!==idx); save(list); render(); }
        function clearAll(){ if (confirm('Clear all expenses?')){ save([]); render(); } }

        function exportCSV(){
            const rows = load();
            const header = ['Date','Category','Amount','Note'];
            const csv = [header.join(',')].concat(rows.map(r=>[r.d, r.c.replace(/,/g,';'), r.a, r.n.replace(/,/g,';')].join(','))).join('\n');
            const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
            const url = URL.createObjectURL(blob);
            const a=document.createElement('a'); a.href=url; a.download='expenses.csv'; a.click(); URL.revokeObjectURL(url);
        }

        function render(){
            const rows = load();
            tbody.innerHTML='';
            let total=0; const byCat={};
            rows.forEach((r, idx)=>{
                total+=r.a; byCat[r.c]=(byCat[r.c]||0)+r.a;
                const tr=document.createElement('tr');
                tr.innerHTML=`<td>${r.d}</td><td>${escapeHtml(r.c)}</td><td>${r.a.toFixed(2)}</td><td>${escapeHtml(r.n)}</td><td><button class='btn-sm' style='background:#ef4444' onclick='remove(${idx})'><i class="fas fa-trash"></i></button></td>`;
                tbody.appendChild(tr);
            });
            const catBreakdown = Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([c,amt])=>`<span class='pill' style='margin-right:6px;margin-bottom:6px;display:inline-block;'>${escapeHtml(c)}: ${amt.toFixed(2)}</span>`).join(' ');
            summaryDiv.innerHTML = `<div>Total Spent: <strong>${total.toFixed(2)}</strong></div><div style='margin-top:8px;'>${catBreakdown || 'No expenses yet.'}</div>`;
        }

        function escapeHtml(s){ return (s||'').replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }

        document.addEventListener('DOMContentLoaded', ()=>{
            render();
            addBtn.addEventListener('click', add);
            clearBtn.addEventListener('click', clearAll);
            exportBtn.addEventListener('click', exportCSV);
        });
    </script>
</body>
</html>


