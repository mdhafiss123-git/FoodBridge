import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Truck, CheckCircle2, PackageCheck, User2, Building2 } from 'lucide-react';
import type { Donation } from '../types';
import * as store from '../demoStore';
import RoutePanel from './RoutePanel';

export default function DeliveryAssignmentCard({
  donation,
  onUpdate,
}: {
  donation: Donation;
  onUpdate: () => void;
}) {
  const [justDelivered, setJustDelivered] = useState<Donation | null>(null);
  const a = donation.assignment;
  if (!a) return null;

  const confirmPickup = () => {
    store.confirmPickup(donation._id);
    onUpdate();
  };
  const confirmDelivery = () => {
    const updated = store.confirmDelivery(donation._id);
    setJustDelivered(updated);
  };

  if (justDelivered) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-forest/15 bg-sage"
      >
        <div className="flex items-center gap-2 text-forest">
          <CheckCircle2 size={20} />
          <h3 className="text-lg font-semibold">Food delivered successfully</h3>
        </div>
        <p className="mt-2 text-sm text-ink/70">{justDelivered.meals} meals delivered</p>
        <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-ink/65">
          <dt className="text-ink/45">Donor</dt>
          <dd>{justDelivered.donor.organization || justDelivered.donor.name}</dd>
          <dt className="text-ink/45">NGO</dt>
          <dd>{justDelivered.ngo?.organization || justDelivered.ngo?.name}</dd>
          <dt className="text-ink/45">Rider</dt>
          <dd>{a.riderName}</dd>
          <dt className="text-ink/45">Completed</dt>
          <dd>{new Date(justDelivered.assignment!.deliveredAt!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</dd>
        </dl>
        <p className="mt-3 rounded-lg bg-white px-3 py-2 text-xs text-forest">
          This listing helped redirect {justDelivered.meals} meals.
        </p>
        <button onClick={onUpdate} className="btn-outline mt-4 w-full">Back to queue</button>
      </motion.article>
    );
  }

  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-forest">{donation.title}</h3>
          <p className="mt-0.5 text-sm text-ink/55">{donation.meals} meals</p>
        </div>
        <span className="h-fit rounded-full bg-sage px-2.5 py-1 text-xs font-semibold text-forest">
          {donation.status === 'claimed' ? 'Rider arrived' : 'Picked up \u2014 en route'}
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-ink/70">
        <p className="flex items-center gap-2"><Building2 size={14} className="text-forest" /> Pickup: {donation.donor.organization || donation.donor.name} &middot; {donation.address}</p>
        <p className="flex items-center gap-2"><User2 size={14} className="text-terracotta" /> Deliver to: {donation.ngo?.organization || donation.ngo?.name}</p>
        <p className="flex items-center gap-2"><Clock size={14} className="text-forest" /> Best before {new Date(donation.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-forest/10 p-2.5">
          <p className="text-ink/45">Rider &rarr; donor</p>
          <p className="font-semibold text-forest">{a.pickupDistanceKm} km</p>
        </div>
        <div className="rounded-lg border border-forest/10 p-2.5">
          <p className="text-ink/45">Donor &rarr; NGO</p>
          <p className="font-semibold text-forest">{a.distanceDonorToNgoKm} km</p>
        </div>
        <div className="rounded-lg border border-forest/10 p-2.5">
          <p className="text-ink/45">Total route</p>
          <p className="font-semibold text-forest">{a.totalRouteKm} km</p>
        </div>
        <div className="rounded-lg border border-forest/10 p-2.5">
          <p className="text-ink/45">{donation.status === 'claimed' ? 'ETA to donor' : 'ETA to NGO'}</p>
          <p className="font-semibold text-forest">{donation.status === 'claimed' ? a.etaToDonorMinutes : a.etaDonorToNgoMinutes} min</p>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 rounded-lg bg-ivory px-3 py-2 text-xs text-ink/60">
        <PackageCheck size={14} className="text-terracotta" /> {donation.handlingNote || 'Keep upright \u2014 deliver within 45 minutes.'}
      </p>

      <div className="mt-4">
        <RoutePanel activeLeg={donation.status === 'claimed' ? 0 : 1} />
      </div>

      <AnimatePresence>
        {donation.status === 'picked_up' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-lg border border-forest/10 bg-sage/60 p-3 text-xs text-forest"
          >
            <p className="flex items-center gap-2 font-semibold"><MapPin size={13} /> Distance remaining: {a.distanceDonorToNgoKm} km</p>
            <p className="mt-1">Estimated arrival: {a.etaDonorToNgoMinutes} minutes</p>
          </motion.div>
        )}
      </AnimatePresence>

      {donation.status === 'claimed' ? (
        <button onClick={confirmPickup} className="btn-primary mt-4 w-full"><Truck size={16} /> Confirm pickup</button>
      ) : (
        <button onClick={confirmDelivery} className="btn-primary mt-4 w-full"><CheckCircle2 size={16} /> Confirm delivery</button>
      )}
    </motion.article>
  );
}
