<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Generator | PDF Download - FreeFinTools</title>
    <meta name="description" content="Create simple invoices in your browser and download as PDF. No signup.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:1000px;margin:0 auto;padding:20px}
        .tool-hero{text-align:center;padding:20px 0} .tool-hero h1{color:var(--primary)}
        .controls{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
        .control{width:100%;padding:10px 12px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)} .btn-sm{padding:8px 12px;border-radius:8px}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05);margin-bottom:20px}
        table{width:100%;border-collapse:collapse} th,td{padding:10px;border-bottom:1px solid var(--light-gray)} th{text-align:left;background:var(--light-gray)}
        #invoice{background:#fff;padding:24px;border:1px solid #e5e7eb;border-radius:10px}
        #invoice h2{margin-bottom:6px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>
    <div class="tool-hero">
        <h1>Invoice Generator</h1>
        <p>Create and download a simple invoice as PDF.</p>
    </div>
    <div class="container">
        <div class="card">
            <div class="controls">
                <input id="from" class="control" placeholder="From (Your business)">
                <input id="to" class="control" placeholder="Bill To (Client)">
                <input id="invNumber" class="control" placeholder="Invoice #">
                <input id="invDate" class="control" type="date">
            </div>
            <div style="overflow:auto;">
                <table id="itemTable">
                    <thead><tr><th>Description</th><th style="width:120px">Qty</th><th style="width:140px">Unit Price</th><th style="width:140px">Line Total</th><th style="width:100px">Action</th></tr></thead>
                    <tbody></tbody>
                </table>
            </div>
            <div style="display:flex; gap:8px; margin:10px 0;">
                <button id="addItemBtn" class="btn-sm"><i class="fas fa-plus"></i> Add Item</button>
                <button id="downloadBtn" class="btn-sm"><i class="fas fa-download"></i> Download PDF</button>
            </div>
        </div>

        <div class="card" id="invoice">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <h2>Invoice</h2>
                    <div id="viewNumber">#</div>
                    <div id="viewDate"></div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:700;">From</div>
                    <div id="viewFrom"></div>
                </div>
            </div>
            <div style="margin:12px 0;">
                <div style="font-weight:700;">Bill To</div>
                <div id="viewTo"></div>
            </div>
            <table style="width:100%;margin-top:10px;">
                <thead><tr><th>Description</th><th style="width:120px">Qty</th><th style="width:140px">Unit Price</th><th style="width:140px">Line Total</th></tr></thead>
                <tbody id="viewItems"></tbody>
            </table>
            <div style="text-align:right;margin-top:10px;">
                <div><strong>Total:</strong> <span id="viewTotal">0.00</span></div>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const fromEl=document.getElementById('from');
        const toEl=document.getElementById('to');
        const invNumberEl=document.getElementById('invNumber');
        const invDateEl=document.getElementById('invDate');
        const addItemBtn=document.getElementById('addItemBtn');
        const downloadBtn=document.getElementById('downloadBtn');
        const tbody=document.querySelector('#itemTable tbody');

        const vFrom=document.getElementById('viewFrom');
        const vTo=document.getElementById('viewTo');
        const vNum=document.getElementById('viewNumber');
        const vDate=document.getElementById('viewDate');
        const vItems=document.getElementById('viewItems');
        const vTotal=document.getElementById('viewTotal');

        function addRow(item={desc:'Service', qty:1, price:100}){
            const tr=document.createElement('tr');
            tr.innerHTML=`
                <td><input class="control desc" value="${item.desc}"></td>
                <td><input class="control qty" type="number" min="0" step="1" value="${item.qty}"></td>
                <td><input class="control price" type="number" min="0" step="0.01" value="${item.price}"></td>
                <td class="line">0.00</td>
                <td><button class="btn-sm btn-del" style="background:#ef4444"><i class="fas fa-trash"></i></button></td>`;
            tbody.appendChild(tr);
            attachRowEvents(tr);
            render();
        }

        function attachRowEvents(tr){
            tr.querySelector('.btn-del').addEventListener('click',()=>{ tr.remove(); render(); });
            tr.querySelectorAll('input').forEach(inp=>inp.addEventListener('input', render));
        }

        function getItems(){
            return Array.from(tbody.querySelectorAll('tr')).map(tr=>({
                desc: tr.querySelector('.desc').value.trim(),
                qty: parseFloat(tr.querySelector('.qty').value)||0,
                price: parseFloat(tr.querySelector('.price').value)||0,
            }));
        }

        function render(){
            vFrom.textContent = fromEl.value; vTo.textContent = toEl.value; vNum.textContent = '#'+(invNumberEl.value||''); vDate.textContent = invDateEl.value||'';
            const items = getItems();
            vItems.innerHTML='';
            let total=0; items.forEach(it=>{ const line=it.qty*it.price; total+=line; vItems.innerHTML += `<tr><td>${escapeHtml(it.desc)}</td><td>${it.qty}</td><td>${it.price.toFixed(2)}</td><td>${line.toFixed(2)}</td></tr>`; });
            vTotal.textContent = total.toFixed(2);
            // update line totals in input table for user feedback
            Array.from(tbody.querySelectorAll('tr')).forEach((tr,i)=>{ const it=items[i]; tr.querySelector('.line').textContent=(it.qty*it.price).toFixed(2); });
        }

        function escapeHtml(s){ return (s||'').replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }

        async function downloadPDF(){
            try{
                const { jsPDF } = window.jspdf; const doc = new jsPDF('p','pt','a4');
                const el = document.getElementById('invoice');
                const canvas = await html2canvas(el, { scale:2 });
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                doc.addImage(imgData, 'PNG', 20, 20, pdfWidth-40, pdfHeight);
                doc.save('invoice.pdf');
            }catch(e){ alert('Failed to generate PDF.'); }
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            addItemBtn.addEventListener('click', ()=> addRow());
            downloadBtn.addEventListener('click', downloadPDF);
            ['input','change'].forEach(evt=>{
                [fromEl,toEl,invNumberEl,invDateEl].forEach(el=>el.addEventListener(evt, render));
            });
            addRow(); addRow({desc:'Consulting', qty:5, price:75});
        });
    </script>
</body>
</html>


