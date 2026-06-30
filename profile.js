async function checkAuth() {
    try {
        const res = await fetch('/api/me');
        if (!res.ok) {
            if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
                window.location.href = '/login.html';
            }
            return;
        }
        const user = await res.json();
        
        // Update UI Elements if they exist
        const nameElems = ['topbarUserName', 'sidebarUserName'];
        const roleElems = ['topbarUserRole', 'sidebarUserRole'];
        const initialElems = ['topbarInitials', 'sidebarInitials'];

        nameElems.forEach(id => { if(document.getElementById(id)) document.getElementById(id).textContent = user.name; });
        roleElems.forEach(id => { if(document.getElementById(id)) document.getElementById(id).textContent = user.role.replace('_', ' '); });
        initialElems.forEach(id => { 
            if(document.getElementById(id)) document.getElementById(id).textContent = user.name.charAt(0).toUpperCase(); 
        });

    } catch (err) {
        console.error("Auth error", err);
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);
