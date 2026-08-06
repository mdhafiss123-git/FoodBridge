import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Utensils, Clock, MapPin, Search, Star, Phone, Bike } from 'lucide-react';
import type { Donation, User } from '../types';
import * as store from '../demoStore';
import RoutePanel from './RoutePanel';

type Stage = 'confirm' | 'searching' | 'found' | 'assigning' | 'result';

export default function ClaimModal({
  donation,
  ngo,
  onClose,
  onClaimed,
}: {
  donation: Donation;
  ngo: User;
  onClose: () => void;
  onClaimed: (d: Donation) => void;
}) {
  const [stage, setStage] = useState<Stage>('confirm');
  const [result, setResult] = useState<Donation | null>(null);

  useEffect(() => {
    if (stage !== 'searching') return;
    const t1 = setTimeout(() => setStage('found'), 1000);
    return () => clearTimeout(t1);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'found') return;
    const t2 = setTimeout(() => setStage('assigning'), 1000);
    return () => clearTimeout(t2);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'assigning') return;
    const t3 = setTimeout(() => {
      const updated = store.assignRider(donation._id);
      setResult(updated);
      setStage('result');
      onClaimed(updated);
    }, 900);
    return () => clearTimeout(t3);
  }, [stage, donation._id, onClaimed]);

  const confirmClaim = () => {
    store.startClaim(donation._id, ngo);
    setStage('searching');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 grid place-items-end bg-forest/30 backdrop-blur-[1px] sm:place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-forest/10 bg-white p-6 shadow-card sm:rounded-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-forest/60">
              {stage === 'confirm' ? 'Confirm claim' : stage === 'result' ? 'Rider assigned' : 'Finding a rider'}
            </p>
            <button aria-label="Close" onClick={onClose} className="rounded-md p-1 text-ink/50 hover:bg-sage hover:text-forest">
              <X size={18} />
            </button>
          </div>

          {stage === 'confirm' && (
            <>
              <h2 className="mt-3 text-xl font-medium text-forest">{donation.title}</h2>
              <div className="mt-3 space-y-2 text-sm text-ink/70">
                <p className="flex items-center gap-2"><Utensils size={15} className="text-forest" /> {donation.meals} meals &middot; {donation.quantity}</p>
                <p className="flex items-center gap-2"><MapPin size={15} className="text-forest" /> {donation.address}</p>
                <p className="flex items-center gap-2"><Clock size={15} className="text-terracotta" /> Best before {new Date(donation.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="mt-4 rounded-lg border border-forest/10 bg-ivory p-3.5 text-sm">
                <p className="font-semibold text-forest">{ngo.ngo?.orgName || ngo.organization}</p>
                <p className="mt-0.5 text-ink/60">{ngo.ngo?.address || 'Delivery address on file'}</p>
              </div>
              <button onClick={confirmClaim} className="btn-primary mt-5 w-full">Confirm claim</button>
              <p className="mt-2 text-center text-[11px] text-ink/40">Demo operational data \u2014 pickup times are simulated.</p>
            </>
          )}

          {(stage === 'searching' || stage === 'found' || stage === 'assigning') && (
            <div className="mt-6 flex flex-col items-center py-4 text-center">
              <div className="relative grid h-16 w-16 place-items-center rounded-full bg-sage">
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-forest/30"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <Search size={22} className="text-forest" />
              </div>
              <p className="mt-4 text-sm font-medium text-forest">
                {stage === 'searching' && 'Searching nearby delivery partners'}
                {stage === 'found' && '3 delivery partners are available within 4 km'}
                {stage === 'assigning' && 'Assigning the closest rider'}
              </p>
              <p className="mt-1 text-xs text-ink/45">This is a simulated match for the demo.</p>
            </div>
          )}

          {stage === 'result' && result?.assignment && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-forest/10 bg-ivory p-4">
                <div>
                  <p className="font-semibold text-forest">{result.assignment.riderName}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink/60">
                    <Bike size={13} /> {result.assignment.vehicleType}
                    <span className="mx-1">&middot;</span>
                    <Star size={12} className="fill-terracotta text-terracotta" /> {result.assignment.rating}
                  </p>
                </div>
                <a href={`tel:${result.assignment.riderPhone}`} className="rounded-full border border-forest/15 p-2 text-forest hover:bg-sage">
                  <Phone size={16} />
                </a>
              </div>

              <div className="mt-4">
                <RoutePanel activeLeg={0} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-forest/10 p-3">
                  <p className="text-xs text-ink/45">Arriving at donor</p>
                  <p className="mt-0.5 font-semibold text-forest">in {result.assignment.etaToDonorMinutes} min</p>
                </div>
                <div className="rounded-lg border border-forest/10 p-3">
                  <p className="text-xs text-ink/45">Pickup distance</p>
                  <p className="mt-0.5 font-semibold text-forest">{result.assignment.pickupDistanceKm} km away</p>
                </div>
              </div>

              <button onClick={onClose} className="btn-primary mt-5 w-full">Done</button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
