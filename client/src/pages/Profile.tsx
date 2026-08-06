import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../auth';
import * as store from '../demoStore';
import NgoVerificationBadge from '../components/NgoVerificationBadge';
import { BadgeCheck, Mail, Phone, Building2, RotateCcw } from 'lucide-react';

export default function Profile() {
  const { user, refresh, logout } = useAuth();
  const nav = useNavigate();
  const [confirmingReset, setConfirmingReset] = useState(false);

  const doReset = () => {
    store.resetDemoData();
    logout();
    nav('/login');
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-medium text-forest">Your profile</h1>
        <div className="card mt-7">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-sage text-2xl font-semibold text-forest">
              {user?.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-medium text-forest">{user?.name}</h2>
              <p className="flex items-center gap-1 capitalize text-forest/80">
                {user?.role} partner <BadgeCheck size={16} />
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-3 text-ink/75">
            <p className="flex gap-3"><Mail size={18} className="text-forest" /> {user?.email}</p>
            {user?.organization && <p className="flex gap-3"><Building2 size={18} className="text-forest" /> {user.organization}</p>}
            {user?.phone && <p className="flex gap-3"><Phone size={18} className="text-forest" /> {user.phone}</p>}
          </div>

          {user?.role === 'ngo' && user.ngo && (
            <div className="mt-6">
              <NgoVerificationBadge ngo={user.ngo} />
            </div>
          )}

          <p className="mt-6 rounded-lg bg-sage p-4 text-sm text-ink/65">
            FoodBridge verifies partner accounts to keep collections safe and accountable. This
            prototype simulates that review; a production build would check submitted documents.
          </p>
        </div>

        <div className="card mt-5">
          <h2 className="text-lg font-semibold text-forest">Demo data</h2>
          <p className="mt-1 text-sm text-ink/60">
            Reset all seeded donors, NGOs, riders, and listings back to their starting state. This signs you out.
          </p>
          {!confirmingReset ? (
            <button onClick={() => setConfirmingReset(true)} className="btn-outline mt-4">
              <RotateCcw size={16} /> Reset demo data
            </button>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-terracotta">This can't be undone. Reset now?</p>
              <button onClick={doReset} className="btn-primary">Yes, reset</button>
              <button onClick={() => setConfirmingReset(false)} className="btn-outline">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
