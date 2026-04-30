'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Player';
  const paymentId = searchParams.get('pid') || '';

  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    // Staggered entrance animations
    const t1 = setTimeout(() => setShow(true), 100);
    const t2 = setTimeout(() => setShowDetails(true), 700);
    const t3 = setTimeout(() => setShowSteps(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-12">

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '520px', width: '100%',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>

        {/* Checkmark circle */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #15803d, #16a34a)',
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 16px rgba(22,163,74,0.1), 0 0 0 32px rgba(22,163,74,0.05)',
            animation: show ? 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both' : 'none',
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M10 24L20 34L38 14"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 50,
                  strokeDashoffset: show ? 0 : 50,
                  transition: 'stroke-dashoffset 0.6s ease 0.4s',
                }}
              />
            </svg>
          </div>

          <p style={{ margin: '0 0 6px', color: '#4ade80', fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
            Payment Successful
          </p>
          <h1 style={{ margin: '0 0 8px', color: '#f1f5f9', fontSize: '28px', fontWeight: 800, lineHeight: 1.2 }}>
            Welcome to TPL, {name}! 🏏
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px', lineHeight: 1.6 }}>
            Your registration for <span style={{ color: '#4ade80', fontWeight: 600 }}>Taluka Premier League Season 3</span> is confirmed.
          </p>
        </div>

        {/* Details card */}
        <div style={{
          background: '#1e293b', borderRadius: '16px', overflow: 'hidden',
          border: '1px solid #1e3a2f', marginBottom: '20px',
          opacity: showDetails ? 1 : 0,
          transform: showDetails ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <div style={{ background: '#14532d', padding: '12px 20px' }}>
            <p style={{ margin: 0, color: '#86efac', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Registration Summary
            </p>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #0f172a', marginBottom: '14px' }}>
              <span style={{ color: '#64748b', fontSize: '13px' }}>Status</span>
              <span style={{ background: '#14532d', color: '#4ade80', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                ✓ Confirmed
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #0f172a', marginBottom: '14px' }}>
              <span style={{ color: '#64748b', fontSize: '13px' }}>Tournament</span>
              <span style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600 }}>TPL Season 3 — 2025</span>
            </div>
            {paymentId && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '13px' }}>Payment ID</span>
                <span style={{ color: '#475569', fontSize: '11px', fontFamily: 'monospace' }}>{paymentId}</span>
              </div>
            )}
          </div>
        </div>

        {/* What's next */}
        <div style={{
          background: '#1e293b', borderRadius: '16px', padding: '20px',
          border: '1px solid #1e293b', marginBottom: '28px',
          opacity: showSteps ? 1 : 0,
          transform: showSteps ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <p style={{ margin: '0 0 16px', color: '#94a3b8', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            What Happens Next
          </p>
          {[
            { step: '1', title: 'Profile Review', desc: 'Admin team reviews your registration details.' },
            { step: '2', title: 'Approval', desc: 'You\'ll be added to the live auction pool once approved.' },
            { step: '3', title: 'Live Auction', desc: 'Team owners will bid for you in the TPL Season 3 auction.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              marginBottom: i < 2 ? '14px' : 0,
              opacity: showSteps ? 1 : 0,
              transform: showSteps ? 'translateX(0)' : 'translateX(-12px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.12}s, transform 0.4s ease ${0.1 + i * 0.12}s`,
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#14532d', color: '#4ade80',
                fontSize: '12px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{item.step}</div>
              <div>
                <p style={{ margin: '0 0 2px', color: '#f1f5f9', fontSize: '13px', fontWeight: 600 }}>{item.title}</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Email notice */}
        <div style={{
          background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)',
          borderRadius: '10px', padding: '14px 16px', marginBottom: '28px',
          opacity: showSteps ? 1 : 0, transition: 'opacity 0.5s ease 0.5s',
          display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>📧</span>
          <p style={{ margin: 0, color: '#86efac', fontSize: '13px', lineHeight: 1.5 }}>
            A confirmation email has been sent to your registered email address with all the details.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          opacity: showSteps ? 1 : 0, transition: 'opacity 0.5s ease 0.6s',
          textAlign: 'center',
        }}>
          <Link href="/" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, #15803d, #16a34a)',
            color: 'white', padding: '14px 40px', borderRadius: '10px',
            fontWeight: 700, fontSize: '15px', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(22,163,74,0.3)',
          }}>
            Go to Home
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <SuccessContent />
    </Suspense>
  );
}
