# 📋 حالة الـ Deployment

## ✅ ما تم إنجازه:

1. ✅ تم رفع الكود على GitHub
2. ✅ تم إضافة `assetlinks.json` في `public/.well-known/`
3. ✅ تم إضافة Route `/voice-session/:sessionId`
4. ✅ تم إضافة React Router

---

## ⚠️ الـ Deployment الحالي:

**لا يوجد إعدادات deployment تلقائي** (لا Vercel، لا Netlify، لا GitHub Actions)

هذا يعني أن الـ deployment **يدوي** حالياً.

---

## 🚀 الخطوات المطلوبة للـ Deployment:

### الخيار 1: Vercel (موصى به)

1. اذهب إلى: https://vercel.com
2. سجل دخول بحساب GitHub
3. اضغط "Add New Project"
4. اختر repository: `Balsam76/balsamwebsite`
5. Vercel سيكتشف تلقائياً أنه Vite project
6. اضغط "Deploy"

**بعد الـ deployment:**
- سيتم تحديث الموقع تلقائياً عند كل push على GitHub
- ستحصل على رابط مثل: `https://balsamwebsite.vercel.app`
- يمكن ربطه بـ `balsamapp.com` عبر DNS

---

### الخيار 2: Netlify

1. اذهب إلى: https://netlify.com
2. سجل دخول بحساب GitHub
3. اضغط "Add new site" → "Import an existing project"
4. اختر repository: `Balsam76/balsamwebsite`
5. Build command: `npm run build`
6. Publish directory: `dist`
7. اضغط "Deploy site"

**بعد الـ deployment:**
- سيتم تحديث الموقع تلقائياً عند كل push على GitHub
- ستحصل على رابط مثل: `https://balsamwebsite.netlify.app`
- يمكن ربطه بـ `balsamapp.com` عبر DNS

---

### الخيار 3: Manual Deployment

إذا كان الموقع مستضاف على server خاص:

1. SSH إلى الـ server
2. `cd` إلى مجلد الموقع
3. `git pull` لسحب آخر التحديثات
4. `npm install` (إذا تم إضافة dependencies جديدة)
5. `npm run build`
6. نسخ محتويات `dist/` إلى مجلد الـ web server

---

## 📝 ملاحظات مهمة:

### بعد الـ Deployment:

1. **تحقق من `assetlinks.json`:**
   ```
   https://www.balsamapp.com/.well-known/assetlinks.json
   ```
   يجب أن يعيد JSON صحيح.

2. **تحقق من Route:**
   ```
   https://www.balsamapp.com/voice-session/test-session-id
   ```
   يجب أن يفتح صفحة redirect.

3. **اختبار على Android:**
   - افتح الرابط على Android
   - يجب أن يفتح التطبيق مباشرة

---

## ⏱️ متى يتم التحديث:

- **Vercel/Netlify:** تلقائياً بعد 1-2 دقيقة من push
- **Manual:** فوراً بعد تنفيذ الخطوات أعلاه

---

**بعد الـ deployment، أرسل لي رسالة وسأختبر الرابط فوراً!** 🚀
