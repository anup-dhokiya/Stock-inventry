async function loadDashboard() {
    const res = await fetch('/api/products');
    const products = await res.json();

    // Calculate Widgets
    const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStock = products.filter(p => p.status === 'low-stock').length;
    const outStock = products.filter(p => p.status === 'out-of-stock').length;

    // Update Widgets
    document.getElementById('wv-total').textContent = products.length;
    document.getElementById('wv-units').textContent = totalUnits;
    document.getElementById('wv-low').textContent = lowStock;
    document.getElementById('wv-out').textContent = outStock;

    // Update Table
    const tbody = document.getElementById('productTableBody');
    if (tbody) {
        tbody.innerHTML = products.slice(0, 5).map(p => `
            <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.sku}</td>
                <td>${p.category}</td>
                <td>${p.stock}</td>
                <td><span class="status-badge ${p.status}">${p.status.replace('-', ' ')}</span></td>
            </tr>
        `).join('');
    }
}

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    document.addEventListener('DOMContentLoaded', loadDashboard);
}
