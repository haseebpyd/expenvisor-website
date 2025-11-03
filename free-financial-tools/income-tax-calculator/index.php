<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Income Tax Calculator | Progressive Slabs & Deductions - FreeFinTools</title>
    <meta name="description" content="Estimate income tax with progressive slabs and deductions. Educational presets for regions; customizable rates.">
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
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-3{grid-template-columns:1fr 1fr 1fr}}
        .control{width:100%;padding:12px 14px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);font-size:1rem}
        .control:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(67,97,238,.15)}
        table{width:100%;border-collapse:collapse} th,td{padding:10px;border-bottom:1px solid var(--light-gray)} th{text-align:left;background:var(--light-gray)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)} .btn-sm{padding:8px 12px;border-radius:8px}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.4rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Income Tax Calculator</h1>
            <p>Estimate income tax using progressive slabs and deductions. Choose a preset region or fully customize the slabs.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-file-invoice-dollar"></i> Inputs</h2>
                <div class="row row-3">
                    <div>
                        <label for="region">Region (preset)</label>
                        <select id="region" class="control">
                            <option value="GENERIC">Generic</option>
                            <option value="US">United States (simplified)</option>
                            <option value="UK">United Kingdom (simplified)</option>
                            <option value="IN">India (simplified)</option>
                        </select>
                    </div>
                    <div>
                        <label for="income">Taxable Income</label>
                        <input id="income" class="control" type="number" min="0" step="0.01" value="60000">
                    </div>
                    <div>
                        <label for="deduction">Deductions</label>
                        <input id="deduction" class="control" type="number" min="0" step="0.01" value="0">
                    </div>
                </div>
                <div class="row">
                    <div style="overflow:auto;">
                        <table id="slabTable">
                            <thead><tr><th>Up to Amount</th><th>Rate %</th><th style="width:120px">Action</th></tr></thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div>
                        <button id="addSlabBtn" class="btn-sm"><i class="fas fa-plus"></i> Add slab</button>
                        <span class="note">Slabs are applied progressively from lowest to highest. Last slab applies to remaining income.</span>
                    </div>
                </div>
                <div style="display:flex; gap:12px; align-items:center; margin: 6px 0 12px;">
                    <button id="calcBtn" class="btn"><i class="fas fa-calculator"></i> Calculate</button>
                </div>
                <div class="result" id="resultCard" style="display:none;">
                    <div class="result-main" id="resultMain">—</div>
                    <div class="result-sub" id="resultSub">—</div>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> Notes</h2>
                <ul style="color:var(--text-light); line-height:1.9; padding-left:18px;">
                    <li>Educational tool. Use official calculators for filings.</li>
                    <li>Edit slabs or choose a preset region to approximate your situation.</li>
                    <li>Deductions reduce taxable income before tax calculation.</li>
                </ul>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const regionEl = document.getElementById('region');
        const incomeEl = document.getElementById('income');
        const deductionEl = document.getElementById('deduction');
        const slabBody = document.querySelector('#slabTable tbody');
        const addSlabBtn = document.getElementById('addSlabBtn');
        const calcBtn = document.getElementById('calcBtn');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        const PRESETS = {
            GENERIC: [ { upto: 10000, rate: 5 }, { upto: 30000, rate: 10 }, { upto: 60000, rate: 15 }, { upto: 100000, rate: 20 }, { upto: null, rate: 25 } ],
            // Simplified illustrative brackets (not official). Adjust as needed.
            US: [ { upto: 11000, rate: 10 }, { upto: 44725, rate: 12 }, { upto: 95375, rate: 22 }, { upto: 182100, rate: 24 }, { upto: 231250, rate: 32 }, { upto: 578125, rate: 35 }, { upto: null, rate: 37 } ],
            UK: [ { upto: 12570, rate: 0 }, { upto: 50270, rate: 20 }, { upto: 125140, rate: 40 }, { upto: null, rate: 45 } ],
            IN: [ { upto: 300000, rate: 0 }, { upto: 600000, rate: 5 }, { upto: 900000, rate: 10 }, { upto: 1200000, rate: 15 }, { upto: 1500000, rate: 20 }, { upto: null, rate: 30 } ]
        };

        function loadPreset(key){
            const rows = PRESETS[key] || PRESETS.GENERIC;
            renderSlabs(rows);
        }

        function renderSlabs(rows){
            slabBody.innerHTML = '';
            rows.forEach((r, idx)=>{
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><input class="control slab-upto" type="number" min="0" step="0.01" ${r.upto===null?'placeholder="∞"':''} value="${r.upto!==null?r.upto:''}"></td>
                    <td><input class="control slab-rate" type="number" min="0" step="0.01" value="${r.rate}"></td>
                    <td><button class="btn-sm btn-del"><i class="fas fa-trash"></i></button></td>
                `;
                slabBody.appendChild(tr);
            });
            attachEvents();
        }

        function attachEvents(){
            slabBody.querySelectorAll('.btn-del').forEach(btn=>btn.addEventListener('click', (e)=>{
                const tr = btn.closest('tr'); tr.remove();
            }));
        }

        function getSlabs(){
            const rows = Array.from(slabBody.querySelectorAll('tr')).map(tr=>{
                const uptoVal = tr.querySelector('.slab-upto').value;
                return {
                    upto: uptoVal===''? null : parseFloat(uptoVal),
                    rate: parseFloat(tr.querySelector('.slab-rate').value)||0
                };
            }).filter(r=>r.rate>=0);
            // sort by upto (null last)
            rows.sort((a,b)=> (a.upto===null?Infinity:a.upto) - (b.upto===null?Infinity:b.upto));
            return rows;
        }

        function calcTax(){
            const gross = parseFloat(incomeEl.value)||0;
            const ded = parseFloat(deductionEl.value)||0;
            const taxable = Math.max(0, gross - ded);
            const slabs = getSlabs();
            let remaining = taxable;
            let prevCap = 0;
            let tax = 0;
            for (const slab of slabs){
                const cap = slab.upto===null? Infinity : slab.upto;
                const width = Math.max(0, Math.min(remaining, cap - prevCap));
                if (width>0){ tax += width * (slab.rate/100); remaining -= width; }
                prevCap = cap; if (remaining<=0) break;
            }
            const effRate = taxable>0 ? (tax/taxable)*100 : 0;
            resultMain.textContent = `Estimated Tax: ${tax.toFixed(2)} (${effRate.toFixed(2)}% effective)`;
            resultSub.textContent = `Gross: ${gross.toFixed(2)} · Deductions: ${ded.toFixed(2)} · Taxable: ${taxable.toFixed(2)}`;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            loadPreset(regionEl.value);
            regionEl.addEventListener('change', ()=> loadPreset(regionEl.value));
            addSlabBtn.addEventListener('click', ()=>{
                const rows = getSlabs(); rows.push({ upto:null, rate:0 }); renderSlabs(rows);
            });
            calcBtn.addEventListener('click', calcTax);
        });
    </script>
</body>
</html>


