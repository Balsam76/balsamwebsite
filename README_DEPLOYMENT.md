# 🚀 دليل النشر - Balsam Website

## 📋 المتطلبات

1. **Node.js** (v18 أو أحدث)
2. **Vercel CLI** (أو Netlify CLI)
3. **حساب Vercel/Netlify**

---

## 🚀 النشر على Vercel

### الطريقة 1: عبر Vercel Dashboard

1. **اذهب إلى:** [vercel.com](https://vercel.com)
2. **Import Project** من GitHub
3. **اختر:** `balsamwebsite-main` repository
4. **Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy**

### الطريقة 2: عبر CLI

```powershell
# 1. تثبيت Vercel CLI (إذا لم يكن مثبت)
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. النشر
cd balsamwebsite-main\balsamwebsite-main
vercel --prod
```

### الطريقة 3: استخدام السكريبت

```powershell
cd balsamwebsite-main\balsamwebsite-main
.\deploy-and-verify.ps1
```

---

## 🔍 التحقق من النشر

### استخدام السكريبت:

```powershell
cd balsamwebsite-main\balsamwebsite-main
.\verify-deployment.ps1
```

### التحقق اليدوي:

```powershell
# 1. Asset Links
curl https://www.balsamapp.com/.well-known/assetlinks.json

# 2. Apple App Site Association
curl https://www.balsamapp.com/.well-known/apple-app-site-association

# 3. اختبار رابط صوتي
curl https://www.balsamapp.com/j/test-session-id?token=test-token
```

---

## ✅ Checklist بعد النشر

- [ ] ✅ `assetlinks.json` accessible على `https://www.balsamapp.com/.well-known/assetlinks.json`
- [ ] ✅ `apple-app-site-association` accessible على `https://www.balsamapp.com/.well-known/apple-app-site-association`
- [ ] ✅ Content-Type صحيح (`application/json`)
- [ ] ✅ HTTP Status 200
- [ ] ✅ Package name صحيح في `assetlinks.json`
- [ ] ✅ SHA-256 fingerprints موجودة
- [ ] ✅ روابط `/j/*` تعمل بشكل صحيح

---

## 🔧 إعدادات Vercel

الملف `vercel.json` موجود ويحتوي على:

1. **Rewrites:** لتوجيه `/j/*` إلى `index.html`
2. **Headers:** لضبط Content-Type الصحيح
3. **Cache Control:** لتحسين الأداء

---

## ⚠️ مشاكل شائعة

### المشكلة: Content-Type خاطئ

**الحل:** تأكد من أن `vercel.json` يحتوي على headers صحيحة.

### المشكلة: الملفات غير موجودة

**الحل:** تأكد من أن الملفات موجودة في `public/.well-known/`

### المشكلة: النشر فشل

**الحل:** 
1. تحقق من `package.json` scripts
2. تحقق من `vite.config.ts`
3. تحقق من logs في Vercel Dashboard

---

## 📞 الدعم

إذا واجهت مشاكل، تحقق من:
1. Vercel Dashboard → Deployments → Logs
2. `verify-deployment.ps1` output
3. Browser DevTools → Network tab
