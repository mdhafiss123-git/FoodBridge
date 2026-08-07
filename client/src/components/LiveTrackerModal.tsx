import { useState, useEffect } from 'react';
import { X, Bike, CheckCircle2, MapPin, Phone, ShieldCheck, Clock, Navigation, Sparkles } from 'lucide-react';
import type { Donation } from '../types';

export default function LiveTrackerModal({
  donation,
  onClose,
}: {
  donation: Donation;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(65);
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 95 ? 65 : p + 2));
      setEta((e) => (e <= 2 ? 8 : e - 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const assignment = donation.assignment;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-forest/10">
        {/* Header */}
        <div className="bg-forest px-6 py-5 text-ivory flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage">
              <Sparkles size={14} /> Live Dispatch Control Center
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">{donation.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-ivory hover:bg-white/20 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Live Progress Banner */}
          <div className="rounded-xl bg-sage/50 p-4 border border-forest/15 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-forest text-ivory shadow-lg">
                <Bike size={24} className="animate-bounce" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-forest/70">Estimated Arrival</p>
                <h3 className="text-2xl font-bold text-forest">{eta} mins remaining</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <ShieldCheck size={14} /> Freshness Verified
              </span>
              <p className="text-xs text-ink/60 mt-1">Temperature-controlled bag active</p>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-ink/70 mb-2">
              <span>Kitchen Pickup</span>
              <span className="text-forest font-bold">{progress}% En Route</span>
              <span>NGO Delivery</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-forest via-emerald-500 to-terracotta transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 border-l-2 border-forest/20 ml-3 pl-5">
            <div className="relative">
              <div className="absolute -left-[27px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-ivory text-xs">
                <CheckCircle2 size={14} />
              </div>
              <p className="text-xs font-bold text-forest">Order Verified & Dispatch Prepared</p>
              <p className="text-xs text-ink/60">{donation.donor?.organization || donation.donor?.name}</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-ivory text-xs">
                <Bike size={14} />
              </div>
              <p className="text-xs font-bold text-forest">Rider Picked Up Package</p>
              <p className="text-xs text-ink/60">
                {assignment?.riderName || 'Ravi Kumar (EV Rider)'} ({assignment?.vehicleType || 'Electric Scooter'})
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-ivory text-xs animate-pulse">
                <Navigation size={14} />
              </div>
              <p className="text-xs font-bold text-terracotta">En Route to Target Shelter/NGO</p>
              <p className="text-xs text-ink/60">Destination: {donation.address}</p>
            </div>
          </div>

          {/* Rider Info Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 font-bold text-forest">
                RK
              </div>
              <div>
                <p className="text-sm font-bold text-forest">{assignment?.riderName || 'Ravi Kumar'}</p>
                <p className="text-xs text-ink/60">★ {assignment?.rating || 4.9} Rating &middot; Zero-Emission EV Scooter</p>
              </div>
            </div>
            <a
              href={`tel:${assignment?.riderPhone || '9847011234'}`}
              className="flex items-center gap-1.5 rounded-lg bg-forest px-3 py-2 text-xs font-semibold text-ivory hover:bg-forest/90 transition"
            >
              <Phone size={14} /> Call Rider
            </a>
          </div>

          {/* Impact Snapshot */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-ivory p-3 border border-forest/10">
              <p className="text-[11px] font-semibold text-ink/50 uppercase">Meals Rescued</p>
              <p className="text-lg font-bold text-forest">{donation.meals}</p>
            </div>
            <div className="rounded-lg bg-ivory p-3 border border-forest/10">
              <p className="text-[11px] font-semibold text-ink/50 uppercase">CO₂ Offset</p>
              <p className="text-lg font-bold text-emerald-600">{(donation.meals * 0.42).toFixed(1)} kg</p>
            </div>
            <div className="rounded-lg bg-ivory p-3 border border-forest/10">
              <p className="text-[11px] font-semibold text-ink/50 uppercase">Distance</p>
              <p className="text-lg font-bold text-terracotta">{donation.distanceKm || 2.4} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
