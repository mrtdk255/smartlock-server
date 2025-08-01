const translationsInfo = {
  ar: {
    searchTitle: "معلومات المستأجر",
    name: "الاسم",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    checkin: "تسجيل الدخول",
    checkout: "تسجيل الخروج",
    remainingTime: "الوقت المتبقي للمغادرة",
    backBtn: "🔙 عودة",
    noData: "لا توجد بيانات للمستأجر",
    boxNumber: "رقم الصندوق",
    unlockCode: "رمز القفل",
    deleteBtn: "حذف",
    loadError: "خطأ في تحميل البيانات"
  },
  en: {
    searchTitle: "Tenant Information",
    name: "Name",
    phone: "Phone",
    email: "Email",
    checkin: "Check-in",
    checkout: "Check-out",
    remainingTime: "Remaining Time",
    backBtn: "🔙 Back",
    noData: "No tenant data available",
    boxNumber: "Box Number",
    unlockCode: "Unlock Code",
    deleteBtn: "Delete",
    loadError: "Error loading data"
  }
};

let currentLang = localStorage.getItem('language') || 'ar';

function updateLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = translationsInfo[currentLang][key];
    if (!txt) return;
    if (el.tagName === 'INPUT') el.placeholder = txt;
    else el.textContent = txt;
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('language', currentLang);
  updateLanguage();
  displayTenant();
}

function navigateTo(page) {
  window.location.href = page;
}

function showNotification(message, position = 'center') {
  let container = document.getElementById('toast-container-' + position);
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container-' + position;
    container.className = 'toast-container ' + position;
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function calculateRemainingTime(departureDate) {
  const now = new Date();
  const dep = new Date(departureDate);
  const diff = dep - now;
  if (diff <= 0) {
    return currentLang === 'ar' ? "انتهى الموعد" : "Expired";
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return currentLang === 'ar'
    ? `${days} أيام و ${hours} ساعات متبقية`
    : `${days} days and ${hours} hours remaining`;
}

function displayTenant() {
  const tenantData = JSON.parse(localStorage.getItem('tenantData'));
  const container = document.getElementById('tenantInfo');
  container.innerHTML = '';

  if (!tenantData) {
    container.innerHTML = `<div class="tenant-card"><p>${translationsInfo[currentLang].noData}</p></div>`;
    return;
  }

  const remTime = calculateRemainingTime(tenantData.checkout || tenantData.checkin);
  const lockCode = tenantData.unlockCode || tenantData.code || 'N/A';

  container.innerHTML = `
    <div class="tenant-card">
      <p><strong>${translationsInfo[currentLang].name}:</strong> ${tenantData.name || 'N/A'}</p>
      <p><strong>${translationsInfo[currentLang].phone}:</strong> ${tenantData.phone || 'N/A'}</p>
      <p><strong>${translationsInfo[currentLang].email}:</strong> ${tenantData.email || 'N/A'}</p>
      <p><strong>${translationsInfo[currentLang].checkin}:</strong> ${tenantData.checkin || 'N/A'}</p>
      <p><strong>${translationsInfo[currentLang].checkout}:</strong> ${tenantData.checkout || 'N/A'}</p>
      <p><strong>${translationsInfo[currentLang].boxNumber}:</strong> ${tenantData.boxNumber || 'N/A'}</p>
      <p class="lock-line">
        <strong>${translationsInfo[currentLang].unlockCode}:</strong>
        <span class="lock-icon">🔒</span>
        <span class="lock-code">${lockCode}</span>
      </p>
      <p class="remaining-time">
        <strong>${translationsInfo[currentLang].remainingTime}:</strong> ${remTime}
      </p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
  displayTenant();
});
