import { motion } from 'framer-motion';

/** Compact, elegant route visual: rider \u2192 donor \u2192 NGO. Purely
 * illustrative \u2014 not drawn from real map data. */
export default function RoutePanel({
  riderLabel = 'Rider',
  donorLabel = 'Donor',
  ngoLabel = 'NGO',
  activeLeg = 0, // 0 = rider->donor in progress, 1 = donor->ngo in progress
}: {
  riderLabel?: string;
  donorLabel?: string;
  ngoLabel?: string;
  activeLeg?: 0 | 1;
}) {
  return (
    <div className="relative h-28 overflow-hidden rounded-lg bg-sage">
      <svg viewBox="0 0 320 120" className="h-full w-full">
        <path
          d="M 20 90 C 70 30, 120 100, 170 55"
          fill="none"
          stroke="#153F2D"
          strokeOpacity={activeLeg === 0 ? 0.55 : 0.2}
          strokeWidth="2.5"
          strokeDasharray={activeLeg === 0 ? '0' : '1 8'}
          strokeLinecap="round"
        />
        <path
          d="M 170 55 C 210 20, 250 70, 296 30"
          fill="none"
          stroke="#E67E5F"
          strokeOpacity={activeLeg === 1 ? 0.6 : 0.2}
          strokeWidth="2.5"
          strokeDasharray={activeLeg === 1 ? '0' : '1 8'}
          strokeLinecap="round"
        />
        <circle cx="20" cy="90" r="5" fill="#153F2D" fillOpacity="0.55" />
        <circle cx="170" cy="55" r="6" fill="#153F2D" />
        <circle cx="296" cy="30" r="6" fill="#E67E5F" />
        {activeLeg === 0 && (
          <motion.circle
            r="4.5"
            fill="#153F2D"
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            style={{ offsetPath: "path('M 20 90 C 70 30, 120 100, 170 55')" }}
          />
        )}
        {activeLeg === 1 && (
          <motion.circle
            r="4.5"
            fill="#E67E5F"
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            style={{ offsetPath: "path('M 170 55 C 210 20, 250 70, 296 30')" }}
          />
        )}
      </svg>
      <span className="absolute bottom-1.5 left-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-forest shadow-soft">
        {riderLabel}
      </span>
      <span className="absolute left-[48%] top-1 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-forest shadow-soft">
        {donorLabel}
      </span>
      <span className="absolute bottom-1.5 right-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-terracotta shadow-soft">
        {ngoLabel}
      </span>
    </div>
  );
}
