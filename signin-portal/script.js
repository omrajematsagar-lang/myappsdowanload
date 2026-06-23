// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// ===== GOOGLE ACCOUNT PICKER =====
function openGooglePicker() {
    const modal = document.getElementById('googlePickerModal');
    modal.classList.add('show');
    modal.style.display = 'flex';
    
    // Clear any saved accounts - user enters their own
    const container = document.getElementById('savedAccounts');
    container.innerHTML = `
        <p style="font-size:13px;color:#6b7280;text-align:center;padding:16px;">
            <i class="fas fa-info-circle" style="color:#667eea;"></i> 
            Sign in with your Google account to continue
        </p>
    `;
    
    // Show the form to enter account details
    document.getElementById('addAccountForm').style.display = 'block';
}

function closeGooglePicker() {
    const modal = document.getElementById('googlePickerModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    window.location.reload();
}

function confirmGoogleAccount() {
    const name = document.getElementById('googleName').value.trim();
    const email = document.getElementById('googleEmail').value.trim();
    
    if (!name || !email) {
        showToast('Please enter your name and email');
        return;
    }
    
    if (!email.includes('@gmail.com')) {
        showToast('Please enter a valid @gmail.com email');
        return;
    }
    
    const avatarUrl = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=667eea&color=fff&size=128';
    const account = { name, email, picture: avatarUrl };
    
    showConsentScreen(account, avatarUrl);
}

function showConsentScreen(account, avatarUrl) {
    const modal = document.getElementById('googlePickerModal');
    modal.innerHTML = `
        <div class="modal-card" style="text-align:center;">
            <div style="margin-bottom:24px;">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" style="height:28px;">
            </div>
            
            <img src="${avatarUrl}" alt="${account.name}" style="width:72px;height:72px;border-radius:50%;margin-bottom:12px;border:3px solid #667eea;">
            <h3 style="font-size:20px;color:#1a1a2e;margin-bottom:4px;">${account.name}</h3>
            <p style="color:#6b7280;font-size:14px;margin-bottom:24px;">${account.email}</p>
            
            <div style="background:#f9fafb;border-radius:12px;padding:16px;margin-bottom:24px;text-align:left;">
                <p style="font-size:13px;color:#374151;font-weight:600;margin-bottom:12px;">
                    <i class="fas fa-shield-alt" style="color:#667eea;"></i> AppName wants to access your Google Account
                </p>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <i class="fas fa-user-circle" style="color:#667eea;width:20px;"></i>
                    <span style="font-size:13px;color:#374151;">View your email address</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <i class="fas fa-id-card" style="color:#667eea;width:20px;"></i>
                    <span style="font-size:13px;color:#374151;">View your personal info (name, profile picture)</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;">
                    <i class="fas fa-link" style="color:#667eea;width:20px;"></i>
                    <span style="font-size:13px;color:#374151;">Connect your Google account to AppName</span>
                </div>
            </div>
            
            <div style="display:flex;gap:12px;">
                <button onclick="closeGooglePicker()" style="flex:1;padding:10px;border:2px solid #e5e7eb;border-radius:10px;background:white;color:#374151;font-weight:600;cursor:pointer;font-size:14px;">Cancel</button>
                <button onclick="authorizeGoogle('${account.name}', '${account.email}', '${avatarUrl}')" style="flex:1;padding:10px;background:#667eea;border:none;border-radius:10px;color:white;font-weight:600;cursor:pointer;font-size:14px;transition:all 0.3s;" onmouseover="this.style.background='#764ba2'" onmouseout="this.style.background='#667eea'">Allow</button>
            </div>
        </div>
    `;
}

function authorizeGoogle(name, email, picture) {
    // Store current user session
    const user = { name, email, picture };
    sessionStorage.setItem('signedInUser', JSON.stringify(user));
    
    closeGooglePicker();
    
    // Redirect to APK Hub website
    window.location.href = 'file:///C:/WORK/vs%20code/apk%20hub/index.html';
}

// Form submission handler (email/password sign in)
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast('Please fill in all fields');
        return;
    }
    
    // Save and redirect to APK Hub
    const name = email.split('@')[0];
    const picture = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=667eea&color=fff&size=128';
    
    const user = { name, email, picture };
    sessionStorage.setItem('signedInUser', JSON.stringify(user));
    window.location.href = 'file:///C:/WORK/vs%20code/apk%20hub/index.html';
});

// Simple toast notification
function showToast(message, type = 'error') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const colors = {
        error: '#ef4444',
        success: '#10b981',
        info: '#3b82f6'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.error};
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}