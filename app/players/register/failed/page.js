'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function FailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') || 'Payment was not completed.';
  const name = searchParams.get('name') || '';

  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 100);
    const t2 = setTimeout(() => setShowDetails(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-12">

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '520px', width: '100%',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>

        {/* X circle */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #991b1b, #dc2626)',
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 16px rgba(220,38,38,0.1), 0 0 0 32px rgba(220,38,38,0.05)',
            animation: show ? 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both' : 'none',
          }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M12 12L32 32M32 12L12 32"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 60,
                  strokeDashoffset: show ? 0 : 60,
                  transition: 'stroke-dashoffset 0.5s ease 0.4s',
                }}
              />
            </svg>
          </div>

          <p style={{ margin: '0 0 6px', color: '#f87171', fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
            Payment Failed
          </p>
          <h1 style={{ margin: '0 0 8px', color: '#f1f5f9', fontSize: '28px', fontWeight: 800, lineHeight: 1.2 }}>
            {name ? `Sorry, ${name}` : 'Payment Unsuccessful'} 😔
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px', lineHeight: 1.6 }}>
            Your registration for <span style={{ color: '#f87171', fontWeight: 600 }}>TPL Season 3</span> could not be completed.
          </p>
        </div>

        {/* Reason card */}
        <div style={{
          background: '#1e293b', borderRadius: '16px', overflow: 'hidden',
          border: '1px solid #3f1515', marginBottom: '20px',
          opacity: showDetails ? 1 : 0,
          transform: showDetails ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <div style={{ background: '#7f1d1d', padding: '12px 20px' }}>
            <p style={{ margin: 0, color: '#fca5a5', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Reason
            </p>
          </div>
          <div style={{ padding: '18px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠️</span>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6 }}>{reason}</p>
          </div>
        </div>

        {/* What to do */}
        <div style={{
          background: '#1e293b', borderRadius: '16px', padding: '20px',
          border: '1px solid #1e293b', marginBottom: '28px',
          opacity: showDetails ? 1 : 0,
          transform: showDetails ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
        }}>
          <p style={{ margin: '0 0 16px', color: '#94a3b8', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            What You Can Do
          </p>
          {[
            { icon: '🔄', title: 'Try Again', desc: 'Click the button below to retry your registration and payment.' },
            { icon: '💳', title: 'Check Your Card', desc: 'Ensure your card has sufficient balance and is enabled for online payments.' },
            { icon: '📞', title: 'Contact Support', desc: 'If the issue persists, reach out to us via the Contact page.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              marginBottom: i < 2 ? '14px' : 0,
              opacity: showDetails ? 1 : 0,
              transform: showDetails ? 'translateX(0)' : 'translateX(-12px)',
              transition: `opacity 0.4s ease ${0.2 + i * 0.1}s, transform 0.4s ease ${0.2 + i * 0.1}s`,
            }}>
              <span style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
              <div>
                <p style={{ margin: '0 0 2px', color: '#f1f5f9', fontSize: '13px', fontWeight: 600 }}>{item.title}</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          opacity: showDetails ? 1 : 0, transition: 'opacity 0.5s ease 0.5s',
          display: 'flex', gap: '12px', flexDirection: 'column',
        }}>
          <Link href="/players/register" style={{
            display: 'block', textAlign: 'center',
            background: 'linear-gradient(135deg, #991b1b, #dc2626)',
            color: 'white', padding: '14px 40px', borderRadius: '10px',
            fontWeight: 700, fontSize: '15px', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(220,38,38,0.3)',
          }}>
            Try Again
          </Link>
          <Link href="/contact" style={{
            display: 'block', textAlign: 'center',
            background: 'transparent', color: '#64748b',
            padding: '12px 40px', borderRadius: '10px',
            fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            border: '1px solid #1e293b',
          }}>
            Contact Support
          </Link>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '28px', color: '#334155', fontSize: '12px' }}>
          🏏 Taluka Premier League · Season 3 · 2025
        </p>

      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function FailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <FailedContent />
    </Suspense>
  );
}
