// كائن الترجمات المستخدم في صفحة البحث
const translations = {
  ar: {
    welcomeMessage: "مرحبًا بك في واجهة المالك",
    searchTitle: "البحث عن مستأجر",
    phonePlaceholder: "أدخل رقم الهاتف",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    searchBtn: "🔍 بحث عن مستأجر",
    backBtn: "🔙 عودة"
  },
  en: {
    welcomeMessage: "Welcome to Owner Interface",
    searchTitle: "Tenant Search",
    phonePlaceholder: "Enter phone number",
    emailPlaceholder: "Enter email address",
    searchBtn: "🔍 Search Tenant",
    backBtn: "🔙 Back"
  }
};

let currentLang = localStorage.getItem('language') || 'ar';

function updateLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      if (el.tagName === 'INPUT') {
        el.placeholder = translations[currentLang][key];
      } else {
        el.textContent = translations[currentLang][key];
      }
    }
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('language', currentLang);
  updateLanguage();
}

function navigateTo(page) {
  window.location.href = page;
}

// دالة عرض إشعار Toast (يمكن استخدام نفس دالة showNotification من صفحة المعلومات إذا كان التطبيق مشتركاً)
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
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// دالة البحث عن مستأجر باستخدام رقم الهاتف أو البريد الإلكتروني
function searchTenant() {
  const phone = document.getElementById('searchPhone').value.trim();
  const email = document.getElementById('searchEmail').value.trim();

  if (!phone && !email) {
    showNotification(currentLang === 'ar'
      ? 'الرجاء إدخال رقم الهاتف أو البريد الإلكتروني للبحث'
      : 'Please enter phone number or email for search', "center");
    return;
  }

  let query;
  if (phone) {
    query = firebase.database().ref('tenants').orderByChild('phone').equalTo(phone);
  } else {
    query = firebase.database().ref('tenants').orderByChild('email').equalTo(email);
  }

  query.once('value', snapshot => {
    const tenants = snapshot.val();
    if (tenants) {
      // اختيار أول نتيجة موجودة
      const tenantKey = Object.keys(tenants)[0];
      const tenant = tenants[tenantKey];
      localStorage.setItem('tenantData', JSON.stringify(tenant));
      navigateTo('tenant-info.html');
    } else {
      showNotification(currentLang === 'ar'
        ? 'لا يوجد نتائج'
        : 'No results found', "center");
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
});
