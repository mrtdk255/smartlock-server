// ---------------------------------------------
// translationsInfo: كائن الترجمات لصفحة المستأجرين
// ---------------------------------------------
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

// اللّغة الحالية مخزنة في localStorage أو الافتراضية 'ar'
let currentLang = localStorage.getItem('language') || 'ar';

// تحديث اللغة، الاتجاه، والنصوص
function updateLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir  = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = translationsInfo[currentLang][key];
    if (!txt) return;
    if (el.tagName === 'INPUT') el.placeholder = txt;
    else el.textContent = txt;
  });
}

// تبديل اللغة وحفظها
function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('language', currentLang);
  updateLanguage();
  displayTenants();
}

// التنقل بين الصفحات
function navigateTo(page) {
  window.location.href = page;
}

// إشعار Toast
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

// حساب الوقت المتبقي حتى موعد الخروج
function calculateRemainingTime(departureDate) {
  const now = new Date();
  const dep = new Date(departureDate);
  const diff = dep - now;
  if (diff <= 0) {
    return currentLang === 'ar' ? "انتهى الموعد" : "Expired";
  }
  const days  = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  return currentLang === 'ar'
    ? `${days} أيام و ${hours} ساعات متبقية`
    : `${days} days and ${hours} hours remaining`;
}

// عرض مستأجر واحد فقط من localStorage
function displayTenants() {
  const container = document.getElementById('tenantInfo');
  container.innerHTML = '';

  const tenantData = localStorage.getItem('tenantData');

  if (!tenantData) {
    container.innerHTML = `<div class="tenant-card"><p>${translationsInfo[currentLang].noData}</p></div>`;
    return;
  }

  const t = JSON.parse(tenantData);

  const accessCodesRef = firebase.database().ref('accessCodes');

  accessCodesRef.once('value')
    .then(accessCodesSnap => {
      const accessCodes = accessCodesSnap.val() || {};
      const remTime = calculateRemainingTime(t.checkout || t.checkin);

      let lockCode = t.unlockCode || t.code || 'N/A';
      if ((lockCode === 'N/A' || !lockCode) && t.boxNumber) {
        const found = Object.values(accessCodes).find(
          c => c.boxNumber == t.boxNumber
        );
        lockCode = found ? (found.code || found.unlockCode || 'N/A') : 'N/A';
      }

      container.innerHTML = `
        <div class="tenant-card">
          <p><strong>${translationsInfo[currentLang].name}:</strong> ${t.name || 'N/A'}</p>
          <p><strong>${translationsInfo[currentLang].phone}:</strong> ${t.phone || 'N/A'}</p>
          <p><strong>${translationsInfo[currentLang].email}:</strong> ${t.email || 'N/A'}</p>
          <p><strong>${translationsInfo[currentLang].checkin}:</strong> ${t.checkin || 'N/A'}</p>
          <p><strong>${translationsInfo[currentLang].checkout}:</strong> ${t.checkout || 'N/A'}</p>
          <p><strong>${translationsInfo[currentLang].boxNumber}:</strong> ${t.boxNumber || 'N/A'}</p>
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
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<div class="tenant-card"><p>${translationsInfo[currentLang].loadError}</p></div>`;
    });
}

// عند التحميل الأولي للصفحة
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
  displayTenants();
});
