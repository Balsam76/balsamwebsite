import React, { useEffect, useRef, useState } from 'react';
import { Star, Users, ShieldCheck } from 'lucide-react';

// Generic count-up component that starts animating when `start` is true
function CountUp({ end, duration = 1200, decimals = 0, suffix = '', start = false }: {
  end: number;
  duration?: number; // in ms
  decimals?: number;
  suffix?: string;
  start?: boolean;
}) {
  const [value, setValue] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!start || hasRunRef.current) return;
    hasRunRef.current = true;

    const startTime = performance.now();
    const from = 0;
    const to = end;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic for a smooth finish
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setValue(current);
      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, duration, end]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // run once
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-sky-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="relative">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl px-6 sm:px-10 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Average Rating */}
              <div className="group flex items-center sm:items-start sm:flex-col gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-sky-50/60">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md motion-safe:animate-pulse/10">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">
                    <CountUp end={4.8} decimals={1} start={inView} />
                  </div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>

              {/* Active Users */}
              <div className="group flex items-center sm:items-start sm:flex-col gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-sky-50/60">
                <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md motion-safe:animate-pulse/10">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">
                    {/* Count up to 10 and show K+ */}
                    <CountUp end={10} start={inView} />K+
                  </div>
                  <div className="text-gray-600">Active Users</div>
                </div>
              </div>

              {/* Secure & Private */}
              <div className="group flex items-center sm:items-start sm:flex-col gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-sky-50/60">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md motion-safe:animate-pulse/10">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 tracking-tight">
                    <CountUp end={100} start={inView} />%
                  </div>
                  <div className="text-gray-600">Secure & Private</div>
                </div>
              </div>
            </div>

            {/* Subtle motion underline on hover */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Trusted by our community — designed for privacy and peace of mind.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}