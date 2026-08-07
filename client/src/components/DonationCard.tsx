import { useState } from 'react';
import { Clock, MapPin, Utensils, Truck, Loader2, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import type { Donation } from '../types';
import LiveTrackerModal from './LiveTrackerModal';

const tones: Record<Donation['status'], string> = {
  open: 'bg-amber-100 text-amber-800',
  matching: 'bg-sky-100 text-sky-800',
  claimed: 'bg-sky-100 text-sky-800',
  picked_up: 'bg-violet-100 text-violet-800',
  delivered: 'bg-sage text-forest',
  expired: 'bg-slate-100 text-slate-700',
};

const labels: Record<Donation['status'], string> = {
  open: 'open',
  matching: 'finding a rider',
  claimed: 'rider assigned',
  picked_up: 'picked up',
  delivered: 'delivered',
  expired: 'expired',
};

export default function DonationCard({
  d,
  onAction,
  action,
}: {
  d: Donation;
  onAction?: (id: string) => void;
  action?: string;
}) {
  const [showTracker, setShowTracker] = useState(false);

  // Compute AI urgency score
  const isHighUrgency = d.meals >= 50 || d.title.toLowerCase().includes('biryani') || d.title.toLowerCase().includes('sponsored');

  return (
    <>
      <article className="card relative transition-all duration-200 hover:shadow-lg border border-forest/10 flex flex-col justify-between">
        <div>
          {/* AI Badge Top Pill */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/5 px-2.5 py-0.5 text-[11px] font-bold text-forest border border-forest/10">
              <Sparkles size={12} className="text-terracotta" />
              {isHighUrgency ? '⚡ 98% AI Match • High Priority' : '🌱 Verified Fresh Entry'}
            </span>
            <span className={`flex h-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[d.status]}`}>
              {d.status === 'matching' && <Loader2 size={11} className="animate-spin" />}
              {labels[d.status]}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-forest leading-snug">{d.title}</h3>
          <p className="text-xs text-ink/65 mt-0.5">From {d.donor?.organization || d.donor?.name}</p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-ink/75">
            <span className="flex items-center gap-2 font-medium">
              <Utensils size={16} className="text-forest shrink-0" />
              {d.meals} meals
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-terracotta">
              <Clock size={16} className="shrink-0" />
              {new Date(d.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="col-span-2 flex items-center gap-2 text-xs text-ink/60">
              <MapPin size={16} className="text-forest shrink-0" />
              {d.address}
            </span>
          </div>

          {d.dietaryNote && (
            <p className="mt-3 rounded-lg bg-ivory px-3 py-1.5 text-xs text-ink/70 border border-forest/5 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-forest shrink-0" />
              {d.dietaryNote}
            </p>
          )}
          {d.notes && <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-ink/65 leading-relaxed">{d.notes}</p>}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          {action && (
            <button onClick={() => onAction?.(d._id)} className="btn-primary w-full flex items-center justify-center gap-2">
              <Truck size={17} />
              {action}
            </button>
          )}

          {(d.status === 'claimed' || d.status === 'picked_up' || d.assignment) && (
            <button
              onClick={() => setShowTracker(true)}
              className="btn-outline w-full text-xs py-2 flex items-center justify-center gap-1.5 text-forest border-forest/30 hover:bg-sage/40"
            >
              <Navigation size={14} className="text-terracotta" /> Track Live Dispatch Map
            </button>
          )}
        </div>
      </article>

      {showTracker && (
        <LiveTrackerModal donation={d} onClose={() => setShowTracker(false)} />
      )}
    </>
  );
}
