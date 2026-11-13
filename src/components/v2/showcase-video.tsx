'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

/** The brand film, playing muted in a loop like a hero reel; tap to hear it. */
export default function ShowcaseVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tick = () => setProgress(v.duration ? v.currentTime / v.duration : 0);
    v.addEventListener('timeupdate', tick);
    // only play while on screen
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && playing) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => {
      v.removeEventListener('timeupdate', tick);
      io.disconnect();
    };
  }, [playing]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) { v.play(); setPlaying(true); }
  };

  return (
    <div className="group relative">
      <div className="v2-video-glow pointer-events-none absolute -inset-10" />
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <video
          ref={ref}
          className="block aspect-video w-full cursor-pointer bg-black object-cover"
          src="/video/nexary.mp4"
          poster="/video/nexary-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onClick={toggle}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10 text-white opacity-90 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <div className="h-1 flex-1 rounded-full bg-white/25">
            <div className="h-1 rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </div>
          <button onClick={toggleSound} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
        {muted && (
          <button
            onClick={toggleSound}
            className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/55 px-3.5 py-2 text-xs text-white backdrop-blur transition-colors hover:bg-black/75"
          >
            <VolumeX className="h-3.5 w-3.5" /> Activar sonido
          </button>
        )}
      </div>
    </div>
  );
}
