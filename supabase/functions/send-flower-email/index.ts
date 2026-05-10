import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_KEY = Deno.env.get('RESEND_API_KEY')!;
const APP_URL = Deno.env.get('APP_URL') || 'http://localhost:5173';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FLOWER_EMOJI: Record<string, string> = {
  daisy: '🌼',
  bloom: '🌸',
  star: '⭐',
};

function buildEmail(fromName: string, note: string, templateId: string): string {
  const flower = FLOWER_EMOJI[templateId] ?? '🌸';
  const noteBlock = note ? `
    <div style="background:#fffde8;border:1px solid #e8d88a;border-radius:14px;padding:16px 20px;margin:20px 0;text-align:left;">
      <p style="font-size:17px;color:#5c4a10;margin:0;font-style:italic;">"${note}"</p>
      <p style="font-size:13px;color:#9e7f6a;margin:8px 0 0;">— ${fromName}</p>
    </div>` : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>You got a flower!</title>
</head>
<body style="margin:0;padding:0;background:#fdf6ee;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:480px;margin:0 auto;padding:40px 20px;">

    <p style="text-align:center;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#b89880;margin:0 0 28px;text-transform:uppercase;">🌸 bloombox</p>

    <div style="background:#ffffff;border-radius:24px;padding:40px 32px;text-align:center;box-shadow:0 4px 24px rgba(120,80,50,0.08);">
      <p style="font-size:72px;line-height:1;margin:0 0 20px;">${flower}</p>
      <h1 style="font-size:22px;color:#3d2b1f;font-weight:700;margin:0 0 6px;line-height:1.3;">
        ${fromName} planted a flower for you
      </h1>
      <p style="font-size:14px;color:#9e7f6a;margin:0 0 4px;">Head to your garden to see it blooming.</p>
      ${noteBlock}
      <a href="${APP_URL}/garden"
         style="display:inline-block;margin-top:20px;padding:14px 36px;background:linear-gradient(135deg,#f4a97a,#f07a60);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:100px;box-shadow:0 4px 14px rgba(240,122,96,0.35);">
        See my garden →
      </a>
    </div>

    <p style="text-align:center;font-size:12px;color:#c8a890;margin:24px 0 0;">
      someone has your email and wanted to brighten your day 💌
    </p>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  try {
    // Called by database webhook — payload is { type, table, record, ... }
    const body = await req.json();
    const record = body.record ?? body; // handle both webhook and direct call
    const { to_email, from_name, note, template_id } = record;

    if (!to_email || !from_name) {
      return new Response('missing fields', { status: 400, headers: CORS });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'bloombox <onboarding@resend.dev>',
        to: [to_email],
        subject: `🌸 ${from_name} planted a flower for you`,
        html: buildEmail(from_name, note ?? '', template_id ?? 'daisy'),
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
