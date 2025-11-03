<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Converter | CoinGecko Live Prices - FreeFinTools</title>
    <meta name="description" content="Convert between cryptocurrencies and fiat using live CoinGecko prices. Free, no API key.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        .dark-theme { --primary:#5b75f6; --primary-dark:#4d67e6; --dark:#0f172a; --light:#0f172a; --gray:#94a3b8; --light-gray:#1e293b; --card-bg:#1e293b; --body-bg:#0f172a; --border:#334155; --text:#f1f5f9; --text-light:#94a3b8; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1100px;margin:0 auto;padding:0 20px}
        .tool-hero{padding:40px 0 20px;text-align:center} .tool-hero h1{font-size:2.2rem;color:var(--primary);margin-bottom:10px} .tool-hero p{color:var(--text-light)}
        .grid{display:grid;grid-template-columns:1fr;gap:24px;margin:28px 0 36px} @media(min-width:768px){.grid{grid-template-columns:2fr 1fr;gap:28px}}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        .card h2{font-size:1.3rem;color:var(--primary);margin-bottom:12px;display:flex;gap:8px;align-items:center}
        label{display:block;margin-bottom:6px;font-weight:500;color:var(--text)} .row{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:14px} @media(min-width:640px){.row-2{grid-template-columns:1fr 1fr}}
        .control{width:100%;padding:12px 14px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text);font-size:1rem}
        .control:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(67,97,238,.15)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:12px 16px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        .result{background:linear-gradient(135deg,var(--primary) 0%, var(--primary-dark) 100%);color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(67,97,238,.3)}
        .result-main{font-size:1.6rem;font-weight:700;margin-bottom:6px} .result-sub{opacity:.9}
        .note{font-size:.9rem;color:var(--gray);margin-top:6px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>

    <section class="tool-hero">
        <div class="container">
            <h1>Crypto Converter</h1>
            <p>Convert crypto to fiat using CoinGecko live prices. Free and fast.</p>
        </div>
    </section>

    <div class="container">
        <div class="grid">
            <div class="card">
                <h2><i class="fas fa-coins"></i> Convert</h2>
                <div class="row">
                    <div>
                        <label for="amount">Amount</label>
                        <input id="amount" class="control" type="number" min="0" step="0.0001" value="1">
                    </div>
                </div>
                <div class="row row-2">
                    <div>
                        <label for="crypto">Crypto</label>
                        <select id="crypto" class="control"></select>
                    </div>
                    <div>
                        <label for="fiat">Fiat</label>
                        <select id="fiat" class="control"></select>
                    </div>
                </div>
                <div style="display:flex; gap:12px; align-items:center; margin: 6px 0 12px;">
                    <button id="refreshBtn" class="btn"><i class="fas fa-rotate"></i> Refresh Price</button>
                    <span class="note" id="priceInfo">Loading price…</span>
                </div>
                <div class="result" id="resultCard" style="display:none;">
                    <div class="result-main" id="resultMain">—</div>
                    <div class="result-sub" id="resultSub">—</div>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-info-circle"></i> Supported</h2>
                <p class="note">Crypto: BTC, ETH, SOL, ADA, BNB, XRP. Fiat: USD, EUR, GBP, INR, PKR.</p>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const CRYPTOS = [
            {id:'bitcoin', symbol:'BTC'}, {id:'ethereum', symbol:'ETH'}, {id:'solana', symbol:'SOL'}, {id:'cardano', symbol:'ADA'}, {id:'binancecoin', symbol:'BNB'}, {id:'ripple', symbol:'XRP'}
        ];
        const FIAT = ['usd','eur','gbp','inr','pkr'];

        const amountEl = document.getElementById('amount');
        const cryptoEl = document.getElementById('crypto');
        const fiatEl = document.getElementById('fiat');
        const refreshBtn = document.getElementById('refreshBtn');
        const priceInfo = document.getElementById('priceInfo');
        const resultCard = document.getElementById('resultCard');
        const resultMain = document.getElementById('resultMain');
        const resultSub = document.getElementById('resultSub');

        let currentPrice = null;

        function populate(){
            CRYPTOS.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=`${c.symbol}`; cryptoEl.appendChild(o); });
            FIAT.forEach(f=>{ const o=document.createElement('option'); o.value=f; o.textContent=f.toUpperCase(); fiatEl.appendChild(o); });
            cryptoEl.value='bitcoin'; fiatEl.value='usd';
        }

        async function fetchPrice(){
            const id = cryptoEl.value; const fiat = fiatEl.value;
            priceInfo.textContent = 'Loading price…';
            try{
                const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=${encodeURIComponent(fiat)}`;
                const res = await fetch(url, { headers: { 'x-cg-demo-api-key': '' }});
                const data = await res.json();
                const price = data?.[id]?.[fiat];
                if (price){
                    currentPrice = price;
                    priceInfo.textContent = `1 ${getSymbol(id)} = ${fmt(price)} ${fiat.toUpperCase()}`;
                    updateResult();
                } else { throw new Error('No price'); }
            }catch(e){
                priceInfo.textContent = 'Failed to load price. Try again.';
                currentPrice = null;
                resultCard.style.display='none';
            }
        }

        function getSymbol(id){ return (CRYPTOS.find(c=>c.id===id)||{}).symbol || id; }
        function fmt(n){ return Number(n).toLocaleString(undefined,{maximumFractionDigits:6}); }

        function updateResult(){
            const amt = parseFloat(amountEl.value)||0; if (!currentPrice || amt<=0){ resultCard.style.display='none'; return; }
            const fiatVal = amt * currentPrice; const id=cryptoEl.value; const fiat=fiatEl.value;
            resultMain.textContent = `${fmt(amt)} ${getSymbol(id)} = ${fmt(fiatVal)} ${fiat.toUpperCase()}`;
            resultSub.textContent = `Rate: 1 ${getSymbol(id)} = ${fmt(currentPrice)} ${fiat.toUpperCase()}`;
            resultCard.style.display='block';
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            populate();
            fetchPrice();
            refreshBtn.addEventListener('click', fetchPrice);
            amountEl.addEventListener('input', updateResult);
            cryptoEl.addEventListener('change', fetchPrice);
            fiatEl.addEventListener('change', fetchPrice);
        });
    </script>
</body>
</html>


