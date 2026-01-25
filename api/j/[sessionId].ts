import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function للـ redirect من /j/:sessionId
 * 
 * السلوك:
 * - Mobile: 302 redirect مباشر إلى balsamapp://voice-session/{sessionId}?token={token}
 * - Desktop: 302 redirect إلى Supabase Edge Function voice-session-redirect
 */
export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // ✅ التحقق من HTTP Method (GET فقط)
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { sessionId } = req.query;
  const token = req.query.token as string | undefined;
  const userAgent = req.headers['user-agent'] || '';

  // ✅ التحقق من وجود sessionId
  if (!sessionId || typeof sessionId !== 'string') {
    res.status(400).json({ error: 'Missing sessionId' });
    return;
  }

  // ✅ التحقق من صحة UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(sessionId)) {
    res.status(400).json({ error: 'Invalid sessionId format' });
    return;
  }

  // ✅ تحديد إذا كان الجهاز mobile
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

  // ✅ Headers للـ redirect
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Robots-Tag': 'noindex, nofollow',
  };

  if (isMobile) {
    // ✅ Mobile: Redirect مباشر إلى deep link
    const deepLink = token 
      ? `balsamapp://voice-session/${sessionId}?token=${encodeURIComponent(token)}`
      : `balsamapp://voice-session/${sessionId}`;
    
    res.setHeader('Location', deepLink);
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.status(302).end();
  } else {
    // ✅ Desktop: Redirect إلى Supabase Edge Function
    // يمكن إضافة SUPABASE_URL كـ environment variable في Vercel
    const supabaseUrl = process.env.SUPABASE_URL || 
                       'https://hmluhtzhugoceualvogn.supabase.co';
    
    const fallbackUrl = token
      ? `${supabaseUrl}/functions/v1/voice-session-redirect/${sessionId}?token=${encodeURIComponent(token)}`
      : `${supabaseUrl}/functions/v1/voice-session-redirect/${sessionId}`;
    
    res.setHeader('Location', fallbackUrl);
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.status(302).end();
  }
}
