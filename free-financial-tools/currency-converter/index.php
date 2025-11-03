<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Currency Converter | Live Exchange Rates - FreeFinTools</title>
    <meta name="description" content="Convert currencies instantly with live exchange rates. Supports USD, EUR, GBP, INR, PKR and more. Free online currency converter.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4361ee;
            --primary-dark: #3a56d4;
            --secondary: #06d6a0;
            --dark: #1e293b;
            --light: #f8fafc;
            --gray: #64748b;
            --light-gray: #e2e8f0;
            --card-bg: #ffffff;
            --body-bg: #f1f5f9;
            --header-bg: rgba(255, 255, 255, 0.95);
            --shadow: rgba(0, 0, 0, 0.05);
            --text: #1e293b;
            --text-light: #64748b;
            --border: #e2e8f0;
        }

        .dark-theme {
            --primary: #5b75f6;
            --primary-dark: #4d67e6;
            --secondary: #06d6a0;
            --dark: #0f172a;
            --light: #0f172a;
            --gray: #94a3b8;
            --light-gray: #1e293b;
            --card-bg: #1e293b;
            --body-bg: #0f172a;
            --header-bg: rgba(15, 23, 42, 0.95);
            --shadow: rgba(0, 0, 0, 0.2);
            --text: #f1f5f9;
            --text-light: #94a3b8;
            --border: #334155;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background-color: var(--body-bg); color: var(--text); line-height: 1.6; }
        .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 20px; }

        /* Hero */
        .tool-hero { padding: 40px 0 20px; text-align: center; }
        .tool-hero h1 { font-size: 2.2rem; margin-bottom: 12px; color: var(--primary); }
        .tool-hero p { color: var(--text-light); max-width: 800px; margin: 0 auto; }

        /* Converter */
        .converter-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin: 28px 0 36px; }
        @media (min-width: 768px) { .converter-grid { grid-template-columns: 2fr 1fr; gap: 28px; } }

        .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; box-shadow: 0 4px 10px var(--shadow); padding: 20px; }
        .card h2 { font-size: 1.3rem; color: var(--primary); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }

        .row { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 14px; }
        @media (min-width: 640px) { .row-2 { grid-template-columns: 1fr 1fr; } }

        label { display: block; font-size: 0.95rem; color: var(--text); margin-bottom: 6px; font-weight: 500; }
        .control { width: 100%; padding: 12px 14px; border-radius: 10px; border: 2px solid var(--border); background: var(--card-bg); color: var(--text); font-size: 1rem; transition: border .2s; }
        .control:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15); }

        .swap { display: inline-flex; align-items: center; gap: 8px; background: var(--light-gray); color: var(--text); border: none; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 600; }
        .swap:hover { background: var(--primary); color: #fff; }

        .result { background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 8px 24px rgba(67,97,238,0.3); }
        .result-main { font-size: 1.6rem; font-weight: 700; margin-bottom: 6px; }
        .result-sub { opacity: .9; }

        .quick { display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 10px; }
        .quick-btn { background: var(--card-bg); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; cursor: pointer; text-align: center; }
        .quick-btn:hover { border-color: var(--primary); color: var(--primary); }

        .note { font-size: 0.9rem; color: var(--gray); margin-top: 6px; }

        /* FAQ */
        .section-title { font-size: 1.3rem; margin: 24px 0 12px; color: var(--primary); }
        .faq-item { border-bottom: 1px solid var(--border); padding: 12px 0; }
        .faq-q { font-weight: 600; cursor: pointer; display:flex; justify-content: space-between; align-items:center; }
        .faq-a { color: var(--text-light); display:none; padding-top:8px; }
    </style>
    <script>
        // Minimal currency list; extendable
        const currencies = [
            'USD','EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR','PKR','SGD','NZD','BRL','MXN','ZAR','SEK','NOK','DKK','PLN','TRY'
        ];
    </script>
    </head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Currency Converter</h1>
            <p>Convert between major world currencies using live exchange rates. Fast, accurate, and free.</p>
        </div>
    </section>

    <div class="container">
        <div class="converter-grid">
            <div class="card">
                <h2><i class="fas fa-exchange-alt"></i> Convert</h2>
                <div class="row">
                    <div>
                        <label for="amount">Amount</label>
                        <input id="amount" class="control" type="number" min="0" step="0.01" value="100">
                    </div>
                </div>
                <div class="row row-2">
                    <div>
                        <label for="base">From</label>
                        <select id="base" class="control"></select>
                    </div>
                    <div>
                        <label for="target">To</label>
                        <select id="target" class="control"></select>
                    </div>
                </div>
                <div style="display:flex; gap:12px; align-items:center; margin: 6px 0 12px;">
                    <button id="swapBtn" class="swap"><i class="fas fa-arrows-rotate"></i> Swap</button>
                    <span class="note" id="rateInfo">Loading live rates…</span>
                </div>
                <div class="result" id="resultCard" style="display:none;">
                    <div class="result-main" id="resultMain">—</div>
                    <div class="result-sub" id="resultSub">—</div>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-bolt"></i> Quick Conversions</h2>
                <div class="quick" id="quickGrid"></div>
                <p class="note">Powered by exchangerate.host (free, no API key).</p>
            </div>
        </div>

        <h3 class="section-title">FAQ</h3>
        <div class="card">
            <div class="faq-item">
                <div class="faq-q">Where do rates come from? <i class="fas fa-chevron-down"></i></div>
                <div class="faq-a">Rates are fetched from exchangerate.host, a free and reliable public API.</div>
            </div>
            <div class="faq-item">
                <div class="faq-q">How often are rates updated? <i class="fas fa-chevron-down"></i></div>
                <div class="faq-a">Rates are refreshed when you change the base currency or on page load.</div>
            </div>
            <div class="faq-item">
                <div class="faq-q">Can I swap currencies? <i class="fas fa-chevron-down"></i></div>
                <div class="faq-a">Yes, click the Swap button to reverse base and target quickly.</div>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const amountEl = document.getElementById('amount');
        const baseEl = document.getElementById('base');
        const targetEl = document.getElementById('target');
        const swapBtn = document.getElementById('swapBtn');
        const rateInfo = document.getElementById('rateInfo');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');
        const quickGrid = document.getElementById('quickGrid');

        let rates = {};

        function populateSelects() {
            currencies.forEach(c => {
                const o1 = document.createElement('option'); o1.value = c; o1.textContent = c; baseEl.appendChild(o1);
                const o2 = document.createElement('option'); o2.value = c; o2.textContent = c; targetEl.appendChild(o2);
            });
            baseEl.value = 'USD';
            targetEl.value = 'EUR';
        }

        async function fetchRates(base) {
            rateInfo.textContent = 'Loading live rates…';
            try {
                const res = await fetch(`https://api.exchangerate.host/latest?base=${encodeURIComponent(base)}`);
                const data = await res.json();
                if (!data || !data.rates) throw new Error('Invalid response');
                rates = data.rates;
                rateInfo.textContent = `1 ${base} = ${formatRate(rates[targetEl.value])} ${targetEl.value}`;
                updateResult();
                renderQuick();
            } catch (e) {
                rateInfo.textContent = 'Failed to load rates. Try again later.';
            }
        }

        function updateResult() {
            const amt = parseFloat(amountEl.value) || 0;
            const base = baseEl.value; const target = targetEl.value;
            if (!rates[target]) { resultCard.style.display = 'none'; return; }
            const rate = rates[target];
            const converted = amt * rate;
            resultMain.textContent = `${formatNumber(amt)} ${base} = ${formatNumber(converted)} ${target}`;
            resultSub.textContent = `Rate: 1 ${base} = ${formatRate(rate)} ${target}`;
            resultCard.style.display = 'block';
        }

        function renderQuick() {
            const base = baseEl.value;
            const popular = [
                ['USD','EUR'],['USD','GBP'],['USD','INR'],['USD','PKR'],
                ['EUR','USD'],['GBP','USD'],['INR','USD'],['PKR','USD']
            ];
            quickGrid.innerHTML = '';
            popular.forEach(([b,t]) => {
                if (b !== base) return; // show pairs from selected base
                const rate = rates[t];
                if (!rate) return;
                const btn = document.createElement('button');
                btn.className = 'quick-btn';
                btn.textContent = `1 ${b} → ${formatRate(rate)} ${t}`;
                btn.addEventListener('click', () => { targetEl.value = t; updateResult(); rateInfo.textContent = `1 ${b} = ${formatRate(rate)} ${t}`; });
                quickGrid.appendChild(btn);
            });
            if (quickGrid.children.length === 0) {
                const info = document.createElement('div'); info.className='note'; info.textContent='Select base USD to see quick pairs.'; quickGrid.appendChild(info);
            }
        }

        function swapCurrencies() {
            const b = baseEl.value; baseEl.value = targetEl.value; targetEl.value = b; fetchRates(baseEl.value);
        }

        function formatNumber(n) { return Number(n).toLocaleString(undefined, { maximumFractionDigits: 4 }); }
        function formatRate(n) { return Number(n).toFixed(4); }

        document.addEventListener('DOMContentLoaded', () => {
            populateSelects();
            fetchRates(baseEl.value);
            amountEl.addEventListener('input', updateResult);
            baseEl.addEventListener('change', () => fetchRates(baseEl.value));
            targetEl.addEventListener('change', updateResult);
            swapBtn.addEventListener('click', swapCurrencies);

            // FAQ toggles
            document.querySelectorAll('.faq-q').forEach(q => {
                q.addEventListener('click', () => {
                    const a = q.nextElementSibling; a.style.display = a.style.display === 'block' ? 'none' : 'block';
                    const icon = q.querySelector('i'); icon.className = a.style.display === 'block' ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
                });
            });
        });
    </script>
</body>
</html>


