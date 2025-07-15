const translations = {
  en: {
    remoteUnlockTitle: "Remote Unlock",
    boxNumberPlaceholder: "Enter box number",
    sendRemoteUnlock: "Send Unlock Command",
    backBtn: "Back to Options",
    sendSuccess: (code) => `Sent: ${code}`,
    sendError: "Failed to send command.",
    enterBoxNumber: "Please enter the box number"
  },
  ar: {
    remoteUnlockTitle: "فتح القفل عن بعد",
    boxNumberPlaceholder: "أدخل رقم الصندوق",
    sendRemoteUnlock: "إرسال أمر الفتح",
    backBtn: "العودة إلى الخيارات",
    sendSuccess: (code) => `تم الإرسال: ${code}`,
    sendError: "فشل في إرسال الأمر.",
    enterBoxNumber: "يرجى إدخال رقم الصندوق"
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[currentLang][key];

    if (el.tagName === 'INPUT') {
      el.placeholder = translation;
    } else {
      el.textContent = typeof translation === 'function' ? translation() : translation;
    }
  });
}

document.getElementById('languageButton').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('lang', currentLang);
  translatePage();
});

function showNotification(message, position = 'top') {
  const containerId = `toast-container-${position}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = `toast-container ${position}`;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  const audio = document.getElementById('toast-sound');
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.warn("Audio playback failed", e));
  }

  setTimeout(() => toast.remove(), 3000);
}

function sendRemoteUnlock() {
  const boxNumber = document.getElementById('boxNumber').value.trim();
  const t = translations[currentLang];

  if (!boxNumber) {
    showNotification(t.enterBoxNumber, 'top');
    return;
  }

  const command = `unlock ${boxNumber}`;
  firebase.database().ref('remoteUnlockRequests').push({
    boxNumber,
    command,
    requestedAt: new Date().toISOString()
  })
  .then(() => {
    showNotification(typeof t.sendSuccess === 'function' ? t.sendSuccess(command) : t.sendSuccess, 'top');
    navigateTo('options.html');
  })
  .catch(() => {
    showNotification(t.sendError, 'top');
  });
}

function navigateTo(url) {
  window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
  translatePage();
  document.getElementById('sendBtn').addEventListener('click', sendRemoteUnlock);
  document.getElementById('backBtn').addEventListener('click', () => navigateTo('options.html'));
});
