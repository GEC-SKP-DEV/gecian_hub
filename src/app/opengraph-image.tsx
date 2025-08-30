import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Gecian Hub';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800 }}>Gecian Hub</div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 16 }}>
          Student portal for GEC Palakkad
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
