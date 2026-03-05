'use client';

import { useState, useEffect, useRef } from 'react';

export default function SaveTheDate() {
  const [entered, setEntered] = useState(false);
  const [phase, setPhase] = useState(0); // 0=hidden, 1-7 staggered reveals
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Countdown to July 4, 2026
  useEffect(() => {
    const target = new Date('2026-07-04T18:00:00+04:00').getTime();
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
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    // Stagger content reveals
    setTimeout(() => setPhase(1), 500);
    setTimeout(() => setPhase(2), 1200);
    setTimeout(() => setPhase(3), 2200);
    setTimeout(() => setPhase(4), 3500);
    setTimeout(() => setPhase(5), 5000);
    setTimeout(() => setPhase(6), 6500);
    setTimeout(() => setPhase(7), 8000);
  };

  const fadeIn = (minPhase: number, delay = 0) => ({
    opacity: phase >= minPhase ? 1 : 0,
    transform: phase >= minPhase ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
  });

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
          autoPlay muted loop playsInline
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: entered ? 1 : 0.25,
            transition: 'opacity 2.5s ease',
          }}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: entered
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.8) 100%)'
            : 'rgba(0,0,0,0.75)',
          transition: 'all 2.5s ease',
        }} />
      </div>

      {/* Entry Screen */}
      {!entered && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 'clamp(11px, 2vw, 14px)', fontFamily: 'Inter, sans-serif', fontWeight: 300,
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase',
            marginBottom: 32,
          }}>
            Save the Date
          </div>
          <button
            onClick={handleEnter}
            style={{
              padding: '18px 52px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
              color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15,
              cursor: 'pointer', letterSpacing: '0.2em', textTransform: 'uppercase',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
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
          padding: '40px 28px', textAlign: 'center',
        }}>

          {/* SAVE THE DATE */}
          <div style={{
            ...fadeIn(1),
            fontSize: 'clamp(11px, 2vw, 14px)', fontFamily: 'Inter, sans-serif', fontWeight: 400,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.4em', textTransform: 'uppercase',
            marginBottom: 28,
          }}>
            Save the Date
          </div>

          {/* Knowing Ashot... */}
          <div style={{
            ...fadeIn(2),
            fontSize: 'clamp(15px, 3vw, 22px)', fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.7, maxWidth: 520, marginBottom: 8,
          }}>
            Knowing Ashot Avakyan&hellip;
          </div>

          <div style={{
            ...fadeIn(2, 400),
            fontSize: 'clamp(14px, 2.5vw, 18px)', fontFamily: 'Inter, sans-serif',
            fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7,
            maxWidth: 520, marginBottom: 32,
          }}>
            of course he would celebrate his birthday<br />in Yerevan, Armenia 🇦🇲
          </div>

          {/* Pack your bags */}
          <div style={{
            ...fadeIn(3),
            fontSize: 'clamp(20px, 5vw, 36px)', fontFamily: '"Playfair Display", serif',
            fontWeight: 700, color: '#fff', marginBottom: 10,
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}>
            Pack your bags.
          </div>

          <div style={{
            ...fadeIn(3, 500),
            fontSize: 'clamp(14px, 2.5vw, 18px)', fontFamily: 'Inter, sans-serif',
            fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7,
            maxWidth: 540, marginBottom: 36,
          }}>
            We&apos;re celebrating Ashot&apos;s <strong style={{ color: '#fff', fontWeight: 600 }}>40th Birthday</strong><br />
            in the city of his ancestors!
          </div>

          {/* Divider */}
          <div style={{
            ...fadeIn(4),
            width: 50, height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: 36,
          }} />

          {/* Date */}
          <div style={{
            ...fadeIn(5),
            fontSize: 'clamp(26px, 6vw, 44px)', fontFamily: '"Playfair Display", serif',
            fontWeight: 900, color: '#fff', marginBottom: 10,
            textShadow: '0 2px 30px rgba(0,0,0,0.4)', letterSpacing: '-0.01em',
          }}>
            July 4th, 2026
          </div>

          <div style={{
            ...fadeIn(5, 300),
            fontSize: 'clamp(13px, 2.5vw, 17px)', fontFamily: 'Inter, sans-serif', fontWeight: 300,
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: 36,
          }}>
            Yerevan, Armenia
          </div>

          {/* Countdown */}
          <div style={{
            ...fadeIn(6),
            display: 'flex', gap: 'clamp(16px, 4vw, 36px)', justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: 36,
          }}>
            {[
              { val: days, label: 'Days' },
              { val: hours, label: 'Hours' },
              { val: minutes, label: 'Min' },
              { val: seconds, label: 'Sec' },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(26px, 5vw, 42px)', fontFamily: '"Playfair Display", serif',
                  fontWeight: 700, color: '#fff', lineHeight: 1,
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                }}>
                  {String(val).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: 'clamp(8px, 1.2vw, 10px)', fontFamily: 'Inter, sans-serif',
                  fontWeight: 400, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.25em',
                  textTransform: 'uppercase', marginTop: 6,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Formal invitation */}
          <div style={{
            ...fadeIn(7),
            fontSize: 'clamp(12px, 2vw, 15px)', fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.45)',
          }}>
            Formal invitation coming soon.
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
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.5)',
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
