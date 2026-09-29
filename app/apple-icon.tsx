import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  const fontData = readFileSync(join(process.cwd(), 'assets/fonts/CormorantGaramond-Bold.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#c96442',
          color: '#ffffff',
          fontSize: 50,
          letterSpacing: '0.5px',
          fontFamily: 'Cormorant Garamond',
        }}
      >
        Dr. HK
      </div>
    ),
    { ...size, fonts: [{ name: 'Cormorant Garamond', data: fontData, weight: 700, style: 'normal' }] }
  );
}
