import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function VoiceSessionRedirect(): JSX.Element {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [searchParams] = useSearchParams();
  const token: string | null = searchParams.get('token');

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(sessionId)) {
      return;
    }

    // ✅ بناء deep link مع token إذا وُجد
    const deepLink = token 
      ? `balsamapp://voice-session/${sessionId}?token=${token}`
      : `balsamapp://voice-session/${sessionId}`;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isMobile = isIOS || isAndroid;

    // Try to open app immediately
    if (isMobile) {
      try {
        window.location.href = deepLink;
      } catch (e) {
        console.error('Failed to open app:', e);
      }
    }

    // iOS fallback: iframe trick
    if (isIOS) {
      setTimeout(() => {
        try {
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.style.width = '1px';
          iframe.style.height = '1px';
          iframe.src = deepLink;
          document.body.appendChild(iframe);
          setTimeout(() => {
            if (iframe.parentNode) {
              iframe.parentNode.removeChild(iframe);
            }
          }, 2000);
        } catch (e) {
          console.error('iframe trick failed:', e);
        }
      }, 100);
    }

    // Android fallback: window.open
    if (isAndroid) {
      setTimeout(() => {
        try {
          window.open(deepLink, '_blank');
        } catch (e) {
          console.error('window.open failed:', e);
        }
      }, 200);
    }
  }, [sessionId, token]);

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold mb-2">رابط غير صحيح</h1>
          <p className="text-lg opacity-90">الرجاء التحقق من الرابط</p>
        </div>
      </div>
    );
  }

  // Validate UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(sessionId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold mb-2">رابط غير صحيح</h1>
          <p className="text-lg opacity-90">معرف الجلسة غير صحيح</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white">
      <div className="text-center max-w-md px-4">
        <div className="text-6xl mb-6">🌱</div>
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-3xl font-bold mb-4">جاري فتح التطبيق...</h1>
        <p className="text-lg opacity-90 mb-8">سيتم توجيهك إلى الجلسة الصوتية في تطبيق بلسم</p>
        <a
          href={token ? `balsamapp://voice-session/${sessionId}?token=${token}` : `balsamapp://voice-session/${sessionId}`}
          className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all opacity-0 animate-fade-in"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          اضغط هنا لفتح التطبيق
        </a>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
      `}</style>
    </div>
  );
}

export default VoiceSessionRedirect;
