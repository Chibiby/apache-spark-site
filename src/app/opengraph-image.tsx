// path: src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Apache Spark  Systems, Software, Networks & Infrastructure';
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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F2EFE8',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '80px',
        }}
      >
        {/* Drafting borders */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            border: '1px solid rgba(20,24,28,0.20)',
          }}
        />

        {/* Center brand lockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Mark Geometry */}
          <svg width="110" height="110" viewBox="0 0 256 256">
            <path
              d="M128,32 L224,128 L128,224 L32,128 Z"
              fill="none"
              stroke="#14181C"
              strokeWidth="14"
            />
            <path
              d="M128,84 L172,128 L128,172 L84,128 Z"
              fill="#9E5430"
            />
          </svg>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '54px',
              fontWeight: 'bold',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#7C7568', fontWeight: 400, marginRight: '16px' }}>
              APACHE
            </span>
            <span style={{ color: '#14181C' }}>SPARK</span>
          </div>

          <div
            style={{
              width: '480px',
              height: '3px',
              backgroundColor: '#9E5430',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '14px',
              letterSpacing: '0.22em',
              color: '#7C7568',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            <span>SOFTWARE</span>
            <span style={{ color: '#9E5430' }}>·</span>
            <span>SYSTEMS</span>
            <span style={{ color: '#9E5430' }}>·</span>
            <span>NETWORKS</span>
            <span style={{ color: '#9E5430' }}>·</span>
            <span>INFRASTRUCTURE</span>
          </div>
        </div>

        {/* Bottom footer text */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            fontSize: '12px',
            fontFamily: 'monospace',
            letterSpacing: '0.18em',
            color: '#7C7568',
          }}
        >
          WE BUILD THE SYSTEMS YOUR BUSINESS RUNS ON.
        </div>
      </div>
    ),
    { ...size }
  );
}
