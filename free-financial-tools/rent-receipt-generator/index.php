<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent Receipt Generator | PDF Download - FreeFinTools</title>
    <meta name="description" content="Generate printable rent receipts and download as PDF. Free and simple.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        :root { --primary:#4361ee; --primary-dark:#3a56d4; --secondary:#06d6a0; --dark:#1e293b; --light:#f8fafc; --gray:#64748b; --light-gray:#e2e8f0; --card-bg:#ffffff; --body-bg:#f1f5f9; --border:#e2e8f0; --text:#1e293b; --text-light:#64748b; }
        *{margin:0;padding:0;box-sizing:border-box} body{font-family:'Inter',sans-serif;background:var(--body-bg);color:var(--text);line-height:1.6}
        .container{width:100%;max-width:900px;margin:0 auto;padding:20px}
        .tool-hero{text-align:center;padding:20px 0} .tool-hero h1{color:var(--primary)}
        .grid{display:grid;grid-template-columns:1fr;gap:16px}
        .control{width:100%;padding:10px 12px;border-radius:10px;border:2px solid var(--border);background:var(--card-bg);color:var(--text)}
        .btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
        .btn:hover{background:var(--primary-dark)}
        .card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.05)}
        #receipt{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px}
    </style>
</head>
<body>
    <?php include '../navbar.php'; ?>
    <div class="tool-hero">
        <h1>Rent Receipt Generator</h1>
        <p>Create a professional rent receipt and download it as PDF.</p>
    </div>
    <div class="container">
        <div class="grid">
            <div class="card">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
                    <input id="landlord" class="control" placeholder="Landlord Name">
                    <input id="tenant" class="control" placeholder="Tenant Name">
                    <input id="address" class="control" placeholder="Property Address">
                    <input id="date" class="control" type="date">
                    <input id="amount" class="control" type="number" step="0.01" placeholder="Amount">
                    <input id="period" class="control" placeholder="Rent Period (e.g., Jul 2025)">
                </div>
                <button id="downloadBtn" class="btn"><i class="fas fa-download"></i> Download PDF</button>
            </div>

            <div class="card" id="receipt">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <h2 style="margin:0;">Rent Receipt</h2>
                    <span id="rDate"></span>
                </div>
                <div><strong>Landlord:</strong> <span id="rLandlord"></span></div>
                <div><strong>Tenant:</strong> <span id="rTenant"></span></div>
                <div><strong>Property:</strong> <span id="rAddress"></span></div>
                <div><strong>Period:</strong> <span id="rPeriod"></span></div>
                <div style="margin-top:8px;"><strong>Amount Received:</strong> <span id="rAmount"></span></div>
                <div style="margin-top:20px;display:flex;justify-content:space-between;">
                    <div>
                        <div style="width:200px;height:1px;background:#ccc;margin-bottom:4px;"></div>
                        <small>Landlord Signature</small>
                    </div>
                    <div>
                        <div style="width:200px;height:1px;background:#ccc;margin-bottom:4px;"></div>
                        <small>Tenant Signature</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include '../footer.php'; ?>

    <script>
        const landlord=document.getElementById('landlord');
        const tenant=document.getElementById('tenant');
        const address=document.getElementById('address');
        const date=document.getElementById('date');
        const amount=document.getElementById('amount');
        const period=document.getElementById('period');
        const rLandlord=document.getElementById('rLandlord');
        const rTenant=document.getElementById('rTenant');
        const rAddress=document.getElementById('rAddress');
        const rDate=document.getElementById('rDate');
        const rAmount=document.getElementById('rAmount');
        const rPeriod=document.getElementById('rPeriod');
        const downloadBtn=document.getElementById('downloadBtn');

        function render(){
            rLandlord.textContent = landlord.value;
            rTenant.textContent = tenant.value;
            rAddress.textContent = address.value;
            rDate.textContent = date.value || new Date().toISOString().slice(0,10);
            rAmount.textContent = (parseFloat(amount.value)||0).toFixed(2);
            rPeriod.textContent = period.value;
        }

        async function download(){
            try{
                const { jsPDF } = window.jspdf; const doc = new jsPDF('p','pt','a4');
                const el = document.getElementById('receipt');
                const canvas = await html2canvas(el, { scale:2 });
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                doc.addImage(imgData, 'PNG', 20, 20, pdfWidth-40, pdfHeight);
                doc.save('rent-receipt.pdf');
            }catch(e){ alert('Failed to generate PDF.'); }
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            [landlord,tenant,address,date,amount,period].forEach(el=>['input','change'].forEach(evt=>el.addEventListener(evt, render)));
            render();
            downloadBtn.addEventListener('click', download);
        });
    </script>
</body>
</html>


