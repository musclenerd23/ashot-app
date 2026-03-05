'use client';

import { useState, useEffect, useRef } from 'react';

export default function SaveTheDate() {
  const [entered, setEntered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Countdown to July 4, 2026
  useEffect(() => {
    const target = new Date('2026-07-04T18:00:00+04:00').getTime(); // 6PM Yerevan time
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setDays(Math.floor(diff / 86400000));
      setHours(Math.floor((diff % 86400000) / 3600000));
      setMinutes(Math.floor((diff % 3600000) / 60000));
      setSeconds(Math.floor((diff % 60000) / 1000));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    // Start music
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    // Stagger content reveal
    setTimeout(() => setShowContent(true), 400);
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Video Background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
        overflow: 'hidden', background: '#0a0a0a',
      }}>
        <video
          ref={videoRef}
          src="/bg-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: entered ? 1 : 0.3,
            transition: 'opacity 2s ease',
          }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: entered
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.7) 100%)'
            : 'rgba(0,0,0,0.7)',
          transition: 'all 2s ease',
        }} />
      </div>

      {/* Entry Screen */}
      {!entered && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 'clamp(14px, 3vw, 18px)', fontFamily: 'Inter, sans-serif', fontWeight: 300,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.3em', textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            You&apos;re Invited
          </div>
          <button
            onClick={handleEnter}
            style={{
              padding: '18px 48px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
              color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16,
              cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            Open
          </button>
        </div>
      )}

      {/* Main Content */}
      {entered && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '40px 24px',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          {/* Save the Date */}
          <div style={{
            fontSize: 'clamp(12px, 2.5vw, 15px)', fontFamily: 'Inter, sans-serif', fontWeight: 400,
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.35em', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            Save the Date
          </div>

          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(48px, 12vw, 120px)', fontFamily: '"Playfair Display", serif',
            fontWeight: 900, color: '#fff', margin: '0 0 8px 0', lineHeight: 1,
            letterSpacing: '-0.02em', textAlign: 'center',
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          }}>
            Ashot
          </h1>

          {/* Turns 40 */}
          <div style={{
            fontSize: 'clamp(18px, 4vw, 32px)', fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.85)',
            marginBottom: 40,
          }}>
            turns forty
          </div>

          {/* Divider */}
          <div style={{
            width: 60, height: 1, background: 'rgba(255,255,255,0.3)', marginBottom: 40,
          }} />

          {/* Date */}
          <div style={{
            fontSize: 'clamp(22px, 5vw, 36px)', fontFamily: '"Playfair Display", serif',
            fontWeight: 700, color: '#fff', marginBottom: 8, textAlign: 'center',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            July 4, 2026
          </div>

          {/* Location */}
          <div style={{
            fontSize: 'clamp(14px, 3vw, 20px)', fontFamily: 'Inter, sans-serif', fontWeight: 300,
            color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: 48,
          }}>
            Yerevan, Armenia
          </div>

          {/* Countdown */}
          <div style={{
            display: 'flex', gap: 'clamp(16px, 4vw, 32px)', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {[
              { val: days, label: 'Days' },
              { val: hours, label: 'Hours' },
              { val: minutes, label: 'Minutes' },
              { val: seconds, label: 'Seconds' },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(28px, 6vw, 48px)', fontFamily: '"Playfair Display", serif',
                  fontWeight: 700, color: '#fff', lineHeight: 1,
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                }}>
                  {String(val).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: 'clamp(9px, 1.5vw, 11px)', fontFamily: 'Inter, sans-serif',
                  fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginTop: 6,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Music control */}
      {entered && (
        <button
          onClick={() => {
            if (audioRef.current) {
              if (audioRef.current.paused) audioRef.current.play();
              else audioRef.current.pause();
            }
          }}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 20,
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.6)',
            fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Toggle Music"
        >
          ♪
        </button>
      )}
    </>
  );
}
