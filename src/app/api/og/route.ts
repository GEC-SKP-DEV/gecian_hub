import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Gecian Hub';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          padding: 48,
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 16 }}>
          Student portal for GEC Palakkad
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
