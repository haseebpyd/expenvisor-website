<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cost of Living Comparator | City vs City - FreeFinTools</title>
    <meta name="description" content="Compare cost of living between cities across rent, groceries, transport, and utilities.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .grid{display:grid;grid-template-columns:1fr;gap:24px;margin:28px 0 36px} @media(min-width:992px){.grid{grid-template-columns:1.2fr 1fr;gap:28px}}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        .card h2{font-size:1.3rem;color:var(--primary);margin-bottom:12px;display:flex;gap:8px;align-items:center}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-3{grid-template-columns:1fr 1fr 1fr}}
        .control{width:100%;padding:12px 14px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);font-size:1rem}
        .control:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(67,97,238,.15)}
        table{width:100%;border-collapse:collapse} th,td{padding:10px;border-bottom:1px solid var(--light-gray)} th{text-align:left;background:var(--light-gray)}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.4rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Cost of Living Comparator</h1>
            <p>Compare estimated monthly costs across cities using a curated dataset. Adjust budget for your lifestyle.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-city"></i> Select Cities</h2>
                <div class="row row-3">
                    <div>
                        <label for="cityA">City A</label>
                        <select id="cityA" class="control"></select>
                    </div>
                    <div>
                        <label for="cityB">City B</label>
                        <select id="cityB" class="control"></select>
                    </div>
                    <div>
                        <label for="budget">Baseline Budget (USD)</label>
                        <input id="budget" class="control" type="number" min="0" step="10" value="2000">
                    </div>
                </div>
                <div class="row">
                    <div style="overflow:auto;">
                        <table>
                            <thead>
                                <tr><th>Category</th><th>City A</th><th>City B</th><th>Difference</th></tr>
                            </thead>
                            <tbody id="rows"></tbody>
                        </table>
                    </div>
                </div>
                <div class="result" style="margin-top:12px;">
                    <div class="result-main" id="summaryMain">—</div>
                    <div class="result-sub" id="summarySub">—</div>
                </div>
                <p class="note">Dataset normalized ~100 = average US mid-sized city. Values illustrative.</p>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> Dataset</h2>
                <p class="note">Categories: Rent, Groceries, Transport, Utilities. City index indicates relative cost (e.g., 120 = 20% higher than baseline).</p>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        // City indices per category (illustrative)
        const DATA = {
            'New York, USA':      { rent:180, groceries:130, transport:120, utilities:110 },
            'San Francisco, USA': { rent:170, groceries:125, transport:115, utilities:105 },
            'Austin, USA':        { rent:120, groceries:105, transport:100, utilities:95  },
            'London, UK':         { rent:160, groceries:125, transport:140, utilities:120 },
            'Berlin, DE':         { rent:110, groceries:100, transport:110, utilities:100 },
            'Paris, FR':          { rent:130, groceries:115, transport:120, utilities:110 },
            'Dubai, UAE':         { rent:140, groceries:110, transport:90,  utilities:130 },
            'Mumbai, IN':         { rent:60,  groceries:65,  transport:50,  utilities:70  },
            'Lahore, PK':         { rent:40,  groceries:50,  transport:45,  utilities:55  },
            'Singapore, SG':      { rent:200, groceries:140, transport:130, utilities:125 }
        };
        const CATS = ['rent','groceries','transport','utilities'];

        const cityAEl = document.getElementById('cityA');
        const cityBEl = document.getElementById('cityB');
        const budgetEl = document.getElementById('budget');
        const rowsEl = document.getElementById('rows');
        const summaryMain = document.getElementById('summaryMain');
        const summarySub = document.getElementById('summarySub');

        function populate(){
            Object.keys(DATA).forEach(name=>{
                const oa=document.createElement('option'); oa.value=name; oa.textContent=name; cityAEl.appendChild(oa);
                const ob=document.createElement('option'); ob.value=name; ob.textContent=name; cityBEl.appendChild(ob);
            });
            cityAEl.value='Austin, USA';
            cityBEl.value='Berlin, DE';
        }

        function calc(){
            const A = DATA[cityAEl.value]; const B = DATA[cityBEl.value]; const base = parseFloat(budgetEl.value)||0;
            if (!A||!B||base<=0) { rowsEl.innerHTML=''; summaryMain.textContent='—'; summarySub.textContent='—'; return; }
            let totalA=0, totalB=0;
            rowsEl.innerHTML = CATS.map(cat=>{
                const costA = base * (A[cat]/100) * weight(cat);
                const costB = base * (B[cat]/100) * weight(cat);
                totalA += costA; totalB += costB;
                const diff = costB - costA;
                return `<tr><td>${label(cat)}</td><td>$${costA.toFixed(0)}</td><td>$${costB.toFixed(0)}</td><td style='color:${diff>0?'#ef4444':'#10b981'};'>${diff>0?'+':''}$${diff.toFixed(0)}</td></tr>`;
            }).join('');
            const delta = totalB - totalA;
            summaryMain.textContent = `${cityAEl.value}: $${totalA.toFixed(0)} · ${cityBEl.value}: $${totalB.toFixed(0)}`;
            summarySub.textContent = `Difference: ${delta>0?'+':''}$${delta.toFixed(0)} per month`;
        }

        function weight(cat){
            // Approx weight factors for baseline budget distribution
            switch(cat){ case 'rent': return 0.5; case 'groceries': return 0.2; case 'transport': return 0.15; case 'utilities': return 0.15; }
            return 0.25;
        }
        function label(cat){ return cat.charAt(0).toUpperCase() + cat.slice(1); }

        document.addEventListener('DOMContentLoaded', ()=>{
            populate();
            calc();
            [cityAEl, cityBEl, budgetEl].forEach(el=>el.addEventListener('change', calc));
            budgetEl.addEventListener('input', calc);
        });
    </script>
</body>
</html>


