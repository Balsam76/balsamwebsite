import React, { useEffect, useRef, useState } from 'react';
import { Star, Users, Shield } from 'lucide-react';

// Lightweight CountUp that starts when `start` is true
function CountUp({ end, duration = 1200, decimals = 0, suffix = '', start = false }: {
  end: number;
  duration?: number; // ms
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
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
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

export default function DownloadSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // run once
        }
      });
    }, { threshold: 0.3 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="download" className="py-20 bg-gradient-to-r from-sky-600 to-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" ref={containerRef}>
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who have already improved their mental health with Balsam. 
              Start your journey towards better well-being today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="mb-8">
              <img 
                src="https://images.pexels.com/photos/4101137/pexels-photo-4101137.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Person feeling better with mental health support" 
                className="w-full max-w-md mx-auto h-48 object-cover rounded-2xl shadow-lg opacity-90"
              />
            </div>
          </div>

          {/* Bottom stats with animated counters */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-white/20 rounded-full mr-3">
                  <Star className="h-6 w-6 text-yellow-300" />
                </div>
                <span className="text-2xl font-bold text-white">
                  <CountUp end={4.8} decimals={1} start={inView} />
                </span>
              </div>
              <p className="text-sky-100">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-white/20 rounded-full mr-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  <CountUp end={10} start={inView} />K+
                </span>
              </div>
              <p className="text-sky-100">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-white/20 rounded-full mr-3">
                  <Shield className="h-6 w-6 text-emerald-300" />
                </div>
                <span className="text-2xl font-bold text-white">
                  <CountUp end={100} start={inView} />%
                </span>
              </div>
              <p className="text-sky-100">Secure & Private</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
