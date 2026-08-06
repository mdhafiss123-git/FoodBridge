import { Clock, MapPin, Utensils, Truck, Loader2 } from 'lucide-react';
import type { Donation } from '../types';

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
  return (
    <article className="card">
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-forest">{d.title}</h3>
          <p className="text-sm text-ink/55">From {d.donor?.organization || d.donor?.name}</p>
        </div>
        <span className={`flex h-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[d.status]}`}>
          {d.status === 'matching' && <Loader2 size={11} className="animate-spin" />}
          {labels[d.status]}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-ink/65">
        <span className="flex gap-2"><Utensils size={16} className="text-forest" />{d.meals} meals</span>
        <span className="flex gap-2"><Clock size={16} className="text-terracotta" />by {new Date(d.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span className="col-span-2 flex gap-2"><MapPin size={16} className="text-forest" />{d.address}</span>
        {typeof d.distanceKm === 'number' && (
          <span className="col-span-2 text-xs text-ink/40">{d.distanceKm} km away &middot; demo estimate</span>
        )}
      </div>
      {d.dietaryNote && <p className="mt-3 rounded-lg bg-ivory px-3 py-2 text-xs text-ink/60">{d.dietaryNote}</p>}
      {d.notes && <p className="mt-2 rounded-lg bg-slate-50 p-2 text-sm text-ink/60">{d.notes}</p>}
      {action && (
        <button onClick={() => onAction?.(d._id)} className="btn-primary mt-4 w-full">
          <Truck size={17} />
          {action}
        </button>
      )}
    </article>
  );
}
