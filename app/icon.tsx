import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  const fontData = readFileSync(join(process.cwd(), 'assets/fonts/CormorantGaramond-Bold.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#c96442',
          borderRadius: '7px',
          color: '#ffffff',
          fontFamily: 'Cormorant Garamond',
          lineHeight: 1,
        }}
      >
        <div style={{ fontSize: 8, opacity: 0.85, letterSpacing: '0.5px' }}>Dr.</div>
        <div style={{ fontSize: 15, marginTop: -1 }}>HK</div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Cormorant Garamond', data: fontData, weight: 700, style: 'normal' }] }
  );
}
