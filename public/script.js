// كائن الترجمات لجميع النصوص المستخدمة في الواجهات
const translations = {
  ar: {
    welcomeMessage: "مرحبًا بك في واجهة المالك",
    optionsTitle: "اختر أحد الخيارات",
    codeEntryTitle: "إدخال رمز الدخول",
    searchTitle: "البحث عن مستأجر",
    verifyTitle: "التحقق من المستأجر",
    emailTitle: "إرسال رمز الدخول عبر البريد الإلكتروني",
    enterBtn: "🔑 دخول",
    cameraBtn: "📷 فتح الكاميرا",
    codeEntryBtn: "🔢 إدخال رمز",
    searchBtn: "🔍 بحث عن مستأجر",
    generateCodeBtn: "🔄 إنشاء رمز",
    activateBtn: "✅ تفعيل الرمز",
    smsBtn: "📱 إرسال SMS",
    backBtn: "🔙 عودة",
    sendBtn: "📩 إرسال",
    verifyBtn: "📡 إرسال طلب فتح الكاميرا",
    codePlaceholder: "أدخل رمز الدخول",
    phonePlaceholder: "أدخل رقم الهاتف",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    searchPlaceholder: "ابحث بالاسم أو رقم الهاتف",
    remoteUnlockBtn: "فتح عند بعد",
    boxNumber: "رقم الصندوق",
    boxNumberPlaceholder: "أدخل رقم الصندوق",
    sendRemoteUnlock: "📩 إرسال أمر الفتح",
    unlockCodePlaceholder: "أدخل رمز الفتح",
    stopCameraBtn: "🛑 إيقاف الكاميرا",
    captureBtn: "📸 التقاط صورة",
    downloadBtn: "⬇️ تحميل الصورة",
    ipCamBtn: "🎥 عرض بث كاميرا الهاتف",
    showStreamBtn: "🎦 عرض البث",
    ipCamPlaceholder: "أدخل رابط الكاميرا IP مثل http://192.168.1.5:8080/video",
    ipCamError: "",
    capturedImgAlt: "صورة ملتقطة",
    ipCamHint: "مثال: http://192.168.1.132:6677/video أو انسخ الرابط من تطبيق الكاميرا مباشرة",
    ipCamWait: "يتم الاتصال بالبث... الرجاء الانتظار",
    ipCamNoStream: "تعذر عرض البث. تحقق من الرابط أو الشبكة",
    // reset code interface
    resetCodeTitle: "إعادة تعيين رمز الدخول",
    showCurrentCodeBtn: "عرض الرمز الحالي",
    resetCodeBtn: "إعادة تعيين الرمز",
    generateAndSaveNewCodeBtn: "توليد وحفظ رمز جديد"
  },
  en: {
    welcomeMessage: "Welcome to Owner Interface",
    optionsTitle: "Choose an Option",
    codeEntryTitle: "Enter Access Code",
    searchTitle: "Tenant Search",
    verifyTitle: "Tenant Verification",
    emailTitle: "Send Access Code via Email",
    enterBtn: "🔑 Enter",
    cameraBtn: "📷 Open Camera",
    codeEntryBtn: "🔢 Enter Code",
    searchBtn: "🔍 Search Tenant",
    generateCodeBtn: "🔄 Generate Code",
    activateBtn: "✅ Activate Code",
    smsBtn: "📱 Send SMS",
    backBtn: "🔙 Back",
    sendBtn: "📩 Send",
    verifyBtn: "📡 Send Camera Request",
    codePlaceholder: "Enter access code",
    phonePlaceholder: "Enter phone number",
    emailPlaceholder: "Enter email address",
    searchPlaceholder: "Search by name or phone",
    remoteUnlockBtn: "Remote Unlock",
    boxNumber: "Box Number",
    boxNumberPlaceholder: "Enter box number",
    sendRemoteUnlock: "📩 Send Unlock Command",
    unlockCodePlaceholder: "Enter unlock code",
    stopCameraBtn: "🛑 Stop Camera",
    captureBtn: "📸 Capture Photo",
    downloadBtn: "⬇️ Download Photo",
    ipCamBtn: "🎥 Show IP Phone Camera",
    showStreamBtn: "🎦 Show Stream",
    ipCamPlaceholder: "Enter IP Camera URL e.g. http://192.168.1.5:8080/video",
    ipCamError: "",
    capturedImgAlt: "Captured Image",
    ipCamHint: "Example: http://192.168.1.132:6677/video or copy the link from your camera app",
    ipCamWait: "Connecting to stream... Please wait",
    ipCamNoStream: "Unable to display the stream. Check the URL or network",
    // reset code interface
    resetCodeTitle: "Reset Access Code",
    showCurrentCodeBtn: "Show Current Code",
    resetCodeBtn: "Reset Code",
    generateAndSaveNewCodeBtn: "Generate & Save New Code"
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
      } else if (el.tagName === 'IMG') {
        el.alt = translations[currentLang][key];
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

function generateCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  document.getElementById('entryCode').value = code;
  document.getElementById('activationSection').classList.remove('hidden');

  const now = new Date();
  document.getElementById('entryDate').value = now.toISOString().split('T')[0];
  document.getElementById('entryTime').value =
    `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

async function activateCode() {
  const code = document.getElementById('entryCode').value;
  const boxNumber = document.getElementById('boxNumber').value.trim();
  const date = document.getElementById('entryDate').value;
  const time = document.getElementById('entryTime').value;

  if (code && boxNumber && date && time) {
    try {
      const codeRef = firebase.database().ref(`accessCodes/${code}`);
      const expirationTime = `${date}T${time}:00`;

      await codeRef.set({
        code: code,
        boxNumber: boxNumber,
        expiration: expirationTime,
        activatedAt: new Date().toISOString()
      });

      const expirationDate = new Date(expirationTime).getTime();
      const currentTime = new Date().getTime();
      const timeUntilExpiration = expirationDate - currentTime;

      if (timeUntilExpiration > 0) {
        setTimeout(() => {
          codeRef.remove();
          console.log('تم حذف الرمز تلقائيًا');
        }, timeUntilExpiration);
      }

      showNotification(currentLang === 'ar'
        ? 'تم التفعيل بنجاح، انتقل لإرسال رمز الدخول بالبريد'
        : 'Activation successful, proceed to send the code via email');

      navigateTo('email-entry.html?code=' + encodeURIComponent(code) + '&box=' + encodeURIComponent(boxNumber));
    } catch (error) {
      console.error(error);
      showNotification(currentLang === 'ar'
        ? 'حدث خطأ أثناء التفعيل'
        : 'Activation failed');
    }
  } else {
    showNotification(currentLang === 'ar'
      ? 'الرجاء إكمال جميع الحقول!'
      : 'Please fill all fields!');
  }
}

function sendRemoteUnlock() {
  const boxNumberElem = document.getElementById('boxNumber');
  const unlockCodeElem = document.getElementById('unlockCode');
  const boxNumber = boxNumberElem ? boxNumberElem.value.trim() : '';
  const unlockCode = unlockCodeElem ? unlockCodeElem.value.trim() : '';

  if (!boxNumber || !unlockCode) {
    showNotification(
      currentLang === 'ar'
        ? 'الرجاء إدخال رقم الصندوق ورمز الفتح'
        : 'Please enter box number and unlock code'
    );
    return;
  }

  firebase.database().ref('remoteUnlockRequests').push({
    boxNumber: boxNumber,
    unlockCode: unlockCode,
    requestedAt: new Date().toISOString()
  })
    .then(() => {
      showNotification(
        currentLang === 'ar'
          ? 'تم إرسال أمر فتح القفل'
          : 'Unlock command sent'
      );
      navigateTo('options.html');
    })
    .catch(error => {
      console.error(error);
      showNotification(
        currentLang === 'ar'
          ? 'حدث خطأ أثناء الإرسال'
          : 'Error sending unlock command'
      );
    });
}

// دالة إرسال رمز الدخول عبر البريد الإلكتروني
async function sendCodeEmail() {
  const emailInput = document.getElementById('tenantEmail');
  const tenantEmail = emailInput ? emailInput.value.trim() : '';

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const box = urlParams.get('box');

  // جلب الوقتين الحاليين
  const now = new Date();
  const timeAr = now.toLocaleString('ar-EG', { hour12: false });
  const timeEn = now.toLocaleString('en-US', { hour12: false });

  if (!tenantEmail || !code || !box) {
    showNotification(
      currentLang === 'ar'
        ? 'الرجاء إدخال البريد الإلكتروني وجميع البيانات'
        : 'Please enter email and all data'
    );
    return;
  }

  try {
    const response = await fetch('https://smartlock-server.onrender.com/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenantEmail,
        boxNumber: box,
        entryCode: code,
        timeAr,
        timeEn
      })
    });

    const result = await response.json();

    if (result.success) {
      showNotification(
        currentLang === 'ar'
          ? 'تم إرسال البريد الإلكتروني بنجاح'
          : 'Email sent successfully'
      );
      navigateTo('options.html');
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Email send error:', error);
    showNotification(
      currentLang === 'ar'
        ? 'حدث خطأ أثناء إرسال البريد'
        : 'Error sending email'
    );
  }
}

// دعم كل مزايا كاميرا IP وظهور رسائل ذكية
let ipCamTimeout = null;
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();

  // ضبط تاريخ أدنى ممكن للحقول (إن وجد)
  const dateInput = document.getElementById('entryDate');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // دعم كاميرا الهاتف (IP Camera) إن وجدت عناصرها في الصفحة
  const showIpCamInputBtn = document.getElementById('showIpCamInputBtn');
  const ipCamSection = document.getElementById('ipCamSection');
  const ipCamUrl = document.getElementById('ipCamUrl');
  const connectIpCamBtn = document.getElementById('connectIpCamBtn');
  const ipCamVideo = document.getElementById('ipCamVideo');
  const ipCamError = document.getElementById('ipCamError');

  if (showIpCamInputBtn && ipCamSection && ipCamUrl && connectIpCamBtn && ipCamVideo && ipCamError) {

    showIpCamInputBtn.onclick = function () {
      ipCamSection.classList.toggle("hidden");
      // إذا كان هناك بث من كاميرا محلية، أغلقه
      const stopCameraBtn = document.getElementById('stopCameraBtn');
      if (stopCameraBtn && typeof stopCameraBtn.onclick === "function") {
        stopCameraBtn.onclick();
      }
    };

    connectIpCamBtn.onclick = function () {
      let url = ipCamUrl.value.trim();
      ipCamError.style.display = "none";
      ipCamError.textContent = "";
      ipCamVideo.style.display = 'none';
      if (!url) {
        ipCamError.textContent = translations[currentLang].ipCamError || (currentLang === 'ar' ? "الرجاء إدخال رابط الكاميرا!" : "Please enter the camera URL!");
        ipCamError.style.display = 'block';
        return;
      }
      // أضف http:// تلقائيا إذا لم يوجد
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
      }
      ipCamVideo.src = url;
      ipCamVideo.style.display = 'block';
      ipCamError.textContent = translations[currentLang].ipCamWait;
      ipCamError.style.display = 'block';
      // انتظر 5 ثوانٍ، إذا لم يبدأ البث أظهر رسالة خطأ
      if (ipCamTimeout) clearTimeout(ipCamTimeout);
      ipCamTimeout = setTimeout(() => {
        if (ipCamVideo.readyState < 2) { // HAVE_CURRENT_DATA
          ipCamVideo.style.display = 'none';
          ipCamError.textContent = translations[currentLang].ipCamNoStream;
          ipCamError.style.display = 'block';
        } else {
          ipCamError.style.display = 'none';
        }
      }, 5000);
      ipCamVideo.onloadeddata = function () {
        ipCamError.style.display = 'none';
      };
    };
  }
});

// ===== دعم واجهة reset-code.html =====
if (location.pathname.endsWith('reset-code.html')) {
  let boxEmail = "";
  let lastBoxNumber = "";

  document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();

    document.getElementById('fetchBoxCodeBtn').onclick = fetchBoxCode;
    document.getElementById('resetCodeBtn').onclick = showGenerateNewCode;
    document.getElementById('generateAndSaveNewCodeBtn').onclick = generateAndSaveNewCode;
  });

  async function fetchBoxCode() {
    const boxNumber = document.getElementById('boxNumber').value.trim();
    if (!boxNumber) {
      showNotification(translations[currentLang]['boxNumberPlaceholder']);
      return;
    }
    lastBoxNumber = boxNumber;
    try {
      // جلب رمز الدخول الحالي
      const snapshot = await firebase.database().ref('accessCodes').orderByChild('boxNumber').equalTo(boxNumber).once('value');
      const codeData = snapshot.val();

      if (codeData) {
        let entry = Object.values(codeData)[0];
        let code = entry.code;
        let expiration = entry.expiration;
        let now = new Date();
        let expired = expiration && (new Date(expiration) < now);
        document.getElementById('codeInfo').classList.remove('hidden');
        document.getElementById('currentCodeDisplay').innerHTML =
          (currentLang === 'ar' ? "رمز الدخول الحالي: " : "Current Code: ") +
          `<span class="lock-code" style="background:${!expired ? '#67d862' : '#e77c7c'}">${code}</span>`;
        document.getElementById('codeStatus').textContent = expired
          ? (currentLang === 'ar' ? "الرمز منتهي (أحمر)" : "Expired code (red)")
          : (currentLang === 'ar' ? "الرمز صالح (أخضر)" : "Valid code (green)");
        document.getElementById('resetCodeBtn').disabled = false;

       // جلب البريد من resetRequests أو tenants حسب رقم الصندوق
const resetReqSnap = await firebase.database().ref('resetRequests').orderByChild('boxNumber').equalTo(boxNumber).once('value');
const resetReqData = resetReqSnap.val();
if (resetReqData) {
  const firstRequest = Object.values(resetReqData)[0];
  boxEmail = firstRequest.email || "";
} else {
  // إذا لم يوجد طلب في resetRequests، جرب البحث في tenants
  const tenantsSnap = await firebase.database().ref('tenants').orderByChild('boxNumber').equalTo(boxNumber).once('value');
  const tenantsData = tenantsSnap.val();
  if (tenantsData) {
    const firstTenant = Object.values(tenantsData)[0];
    boxEmail = firstTenant.email || "";
  } else {
    boxEmail = "";
  }
}

      } else {
        document.getElementById('codeInfo').classList.add('hidden');
        showNotification(currentLang === 'ar' ? 'لم يتم العثور على رمز لهذا الصندوق' : 'No code found for this box');
      }
    } catch (e) {
      showNotification(currentLang === 'ar' ? 'حدث خطأ في قراءة البيانات' : 'Data fetch error');
    }
  }

  function showGenerateNewCode() {
    const newCode = generateCodeLocal();
    document.getElementById('generateSection').classList.remove('hidden');
    document.getElementById('newEntryCode').value = newCode;
  }

  function generateCodeLocal() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  async function generateAndSaveNewCode() {
    const newCode = document.getElementById('newEntryCode').value;
    if (!newCode || !lastBoxNumber) {
      showNotification(currentLang === 'ar' ? 'بيانات غير كافية' : 'Missing data');
      return;
    }
    try {
      // حذف الرمز القديم
      const codesRef = firebase.database().ref('accessCodes');
      const snapshot = await codesRef.orderByChild('boxNumber').equalTo(lastBoxNumber).once('value');
      snapshot.forEach(child => child.ref.remove());

      // إضافة الرمز الجديد (يوم واحد افتراضي)
      const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await firebase.database().ref('accessCodes/' + newCode).set({
        code: newCode,
        boxNumber: lastBoxNumber,
        expiration: expiration.toISOString(),
        activatedAt: new Date().toISOString()
      });

      showNotification(currentLang === 'ar'
        ? 'تم إنشاء رمز جديد وسيتم إرسال البريد...'
        : 'New code generated. Email will be sent...'
      );
      if (boxEmail) {
        await sendNewCodeEmail(boxEmail, lastBoxNumber, newCode);
      } else {
        showNotification(currentLang === 'ar'
          ? 'لم يتم العثور على بريد إلكتروني في طلبات إعادة التعيين'
          : 'No email found in reset requests'
        );
      }
      navigateTo('options.html');
    } catch (err) {
      showNotification(currentLang === 'ar'
        ? 'فشل حفظ الرمز الجديد'
        : 'Failed to save new code'
      );
    }
  }

  async function sendNewCodeEmail(email, box, code) {
    try {
      const now = new Date();
      const timeAr = now.toLocaleString('ar-EG', { hour12: false });
      const timeEn = now.toLocaleString('en-US', { hour12: false });
      const response = await fetch('https://smartlock-server.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantEmail: email,
          boxNumber: box,
          entryCode: code,
          timeAr,
          timeEn
        })
      });
      const result = await response.json();
      if (!result.success) throw new Error();
    } catch {
      showNotification(currentLang === 'ar'
        ? 'خطأ في إرسال البريد الإلكتروني'
        : 'Email send error'
      );
    }
  }
}

