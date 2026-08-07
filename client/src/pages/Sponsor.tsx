import { useState } from 'react';
import Layout from '../components/Layout';
import * as store from '../demoStore';
import type { Donation } from '../types';
import { Heart, Sparkles, Utensils, CheckCircle, Award, ShieldCheck, ArrowRight, Truck, Gift } from 'lucide-react';
import LiveTrackerModal from '../components/LiveTrackerModal';

interface PackageOption {
  id: string;
  name: string;
  meals: number;
  priceRupees: number;
  kitchen: string;
  description: string;
  badge: string;
  popular?: boolean;
}

const PACKAGES: PackageOption[] = [
  {
    id: 'biryani_100',
    name: 'Royal Biryani Community Feast',
    meals: 100,
    priceRupees: 4500,
    kitchen: 'Taj West End Cloud Kitchen',
    description: '100 hot, aromatic vegetable & paneer biryani boxes with raita & sweet dessert.',
    badge: '🔥 Most Popular',
    popular: true,
  },
  {
    id: 'nutri_50',
    name: 'Nutri-Box Kids & Youth Pack',
    meals: 50,
    priceRupees: 2500,
    kitchen: 'FreshBites Wellness Kitchen',
    description: '50 balanced meals containing sandwiches, fresh seasonal fruit, juice, and protein snacks.',
    badge: '👧 Best for Children Shelter',
  },
  {
    id: 'thali_200',
    name: 'Mega Shelter Thali Pack',
    meals: 200,
    priceRupees: 8500,
    kitchen: 'Sri Krishna Catering Services',
    description: '200 complete Indian thali meals (Roti, Rice, Dal, Sabzi, Salad, Dessert).',
    badge: '🌟 High Impact',
  },
  {
    id: 'elder_80',
    name: 'Elderly Care Soft Food Kit',
    meals: 80,
    priceRupees: 3200,
    kitchen: 'Asha Health Foods',
    description: '80 warm, nutritious soups, soft khichdi, and milk boxes tailored for senior care.',
    badge: '💙 Elder Wellness',
  },
];

export default function Sponsor() {
  const [selectedPkg, setSelectedPkg] = useState<PackageOption>(PACKAGES[0]);
  const [sponsorName, setSponsorName] = useState('Ananya Birla (Philanthropist)');
  const [sponsorEmail, setSponsorEmail] = useState('ananya@sponsor.demo');
  const [targetNgo, setTargetNgo] = useState('Asha Community Kitchen');
  const [personalMessage, setPersonalMessage] = useState('Sending warmth and nutritious meals from our family to yours!');
  const [activeDonation, setActiveDonation] = useState<Donation | null>(null);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [trackingDonation, setTrackingDonation] = useState<Donation | null>(null);

  const handleSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    const created = store.sponsorMealPackage({
      sponsorName,
      sponsorEmail,
      packageName: selectedPkg.name,
      mealsCount: selectedPkg.meals,
      amountRupees: selectedPkg.priceRupees,
      targetNgoName: targetNgo,
      kitchenPartner: selectedPkg.kitchen,
      personalMessage,
    });

    setActiveDonation(created);
    setIsSuccessModal(true);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-forest via-emerald-900 to-emerald-950 p-8 md:p-12 text-ivory overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-sage/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage border border-sage/30">
              <Gift size={16} /> Direct Philanthropy & Food Sponsoring
            </span>
            <h1 className="text-3xl md:text-5xl font-medium leading-tight font-serif">
              Sponsor Fresh Meals for Needy Communities
            </h1>
            <p className="text-sm md:text-base text-ivory/80 leading-relaxed">
              Want to feed a shelter, orphanage, or elder care home? Order fresh, high-nutrition meal packages prepared on demand by our verified partner kitchens and dispatched instantly with zero-emission EV riders.
            </p>
          </div>
          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
            <Utensils size={360} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Package Selection Column */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-forest flex items-center gap-2">
              <Utensils size={20} className="text-terracotta" /> 1. Select a Fresh Meal Package
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {PACKAGES.map((pkg) => {
                const isSelected = selectedPkg.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-forest bg-sage/30 shadow-lg scale-[1.02]'
                        : 'border-slate-200 bg-white hover:border-forest/40 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta">
                          {pkg.badge}
                        </span>
                        {isSelected && <CheckCircle size={20} className="text-forest" />}
                      </div>

                      <h3 className="font-bold text-forest text-lg">{pkg.name}</h3>
                      <p className="text-xs text-ink/65 mt-2 leading-relaxed">{pkg.description}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-forest">₹{pkg.priceRupees.toLocaleString()}</span>
                        <span className="text-xs text-ink/50 ml-1">({pkg.meals} meals)</span>
                      </div>
                      <span className="text-xs font-semibold text-forest flex items-center gap-1">
                        Kitchen: {pkg.kitchen.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Impact Promise Card */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 flex items-center gap-4 text-emerald-900">
              <ShieldCheck size={36} className="text-emerald-600 shrink-0" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold text-sm text-emerald-950">100% Verified Quality & Direct Dispatch Guarantee</p>
                <p className="mt-0.5 text-emerald-800/80">
                  Every sponsored order comes with real-time GPS rider tracking, temperature-controlled transit, tax deduction certificate under Section 80G, and photo delivery proof.
                </p>
              </div>
            </div>
          </div>

          {/* Form & Sponsor Checkout Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-forest flex items-center gap-2">
              <Heart size={20} className="text-terracotta" /> 2. Sponsor Details
            </h2>

            <form onSubmit={handleSponsor} className="card space-y-4 shadow-xl border-forest/10">
              <div>
                <label className="block text-xs font-semibold text-ink/70 mb-1">Selected Package</label>
                <div className="rounded-lg bg-ivory p-3 text-sm font-bold text-forest border border-forest/10 flex justify-between">
                  <span>{selectedPkg.name}</span>
                  <span className="text-terracotta">₹{selectedPkg.priceRupees.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 mb-1">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="e.g. Ananya Birla"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 mb-1">Sponsor Email (for Receipt)</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  value={sponsorEmail}
                  onChange={(e) => setSponsorEmail(e.target.value)}
                  placeholder="sponsor@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 mb-1">Target NGO / Shelter</label>
                <select
                  className="input-field"
                  value={targetNgo}
                  onChange={(e) => setTargetNgo(e.target.value)}
                >
                  <option value="Asha Community Kitchen">Asha Community Kitchen (150 capacity)</option>
                  <option value="HopeServe Children’s Home">HopeServe Children’s Home (90 children)</option>
                  <option value="Namma Oota Foundation">Namma Oota Foundation (200 capacity)</option>
                  <option value="Udaan Elder Care Home">Udaan Elder Care Home (70 elders)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 mb-1">Personal Message / Note</label>
                <textarea
                  rows={2}
                  className="input-field"
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Words of encouragement for the NGO children/residents..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2 shadow-lg">
                <Sparkles size={18} /> Confirm & Dispatch {selectedPkg.meals} Meals
              </button>

              <p className="text-[11px] text-center text-ink/50">
                Demo simulation mode &middot; Instantly dispatches EV rider and updates live counters.
              </p>
            </form>
          </div>
        </div>

        {/* Success Modal / Certificate */}
        {isSuccessModal && activeDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl border border-forest/10 space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
                <Award size={36} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Sponsorship Confirmed & Rider Dispatched!
                </span>
                <h2 className="text-2xl font-serif font-bold text-forest">Thank You, {sponsorName}!</h2>
                <p className="text-xs text-ink/65">
                  You just sponsored <b className="text-forest">{selectedPkg.meals} fresh meals</b> for{' '}
                  <b className="text-forest">{targetNgo}</b>.
                </p>
              </div>

              {/* Certificate Box */}
              <div className="rounded-2xl border border-forest/20 bg-ivory/80 p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-forest/10 pb-2 font-bold text-forest">
                  <span>Order ID: #{activeDonation._id}</span>
                  <span className="text-emerald-700">80G Tax Deductible</span>
                </div>
                <p><b>Kitchen Partner:</b> {selectedPkg.kitchen}</p>
                <p><b>Assigned Rider:</b> Ravi Kumar (Zero-Emission EV)</p>
                <p><b>Estimated Delivery:</b> In 12-15 minutes</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsSuccessModal(false);
                    setTrackingDonation(activeDonation);
                  }}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  <Truck size={18} /> Open Live Dispatch Tracking Map
                </button>
                <button
                  onClick={() => setIsSuccessModal(false)}
                  className="btn-outline w-full py-2.5"
                >
                  Close & View Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Tracker Modal */}
        {trackingDonation && (
          <LiveTrackerModal
            donation={trackingDonation}
            onClose={() => setTrackingDonation(null)}
          />
        )}
      </div>
    </Layout>
  );
}
