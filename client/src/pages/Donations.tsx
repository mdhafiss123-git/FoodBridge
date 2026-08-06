import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import * as store from '../demoStore';
import type { Donation } from '../types';
import DonationCard from '../components/DonationCard';
import ClaimModal from '../components/ClaimModal';
import DeliveryAssignmentCard from '../components/DeliveryAssignmentCard';
import { useAuth } from '../auth';

export default function Donations() {
  const { user } = useAuth();
  const [ds, setDs] = useState<Donation[]>([]);
  const [claiming, setClaiming] = useState<Donation | null>(null);
  const load = () => setDs(store.listDonations());
  useEffect(() => { load(); }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-medium text-forest">Food listings</h1>
      <p className="mt-2 text-ink/60">Every listing is timestamped for safe, quick coordination.</p>
      <div className="mt-7 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {ds.map((d) => {
          if (user?.role === 'delivery' && (d.status === 'claimed' || d.status === 'picked_up')) {
            return <DeliveryAssignmentCard key={d._id} donation={d} onUpdate={load} />;
          }
          let actionText: string | undefined;
          let onAction: ((id: string) => void) | undefined;
          if (user?.role === 'ngo' && d.status === 'open') {
            actionText = 'Claim food';
            onAction = () => setClaiming(d);
          }
          return <DonationCard key={d._id} d={d} action={actionText} onAction={onAction} />;
        })}
      </div>
      {!ds.length && <p className="card mt-5">No listings currently match your view.</p>}

      {claiming && user && (
        <ClaimModal
          donation={claiming}
          ngo={user}
          onClose={() => { setClaiming(null); load(); }}
          onClaimed={() => load()}
        />
      )}
    </Layout>
  );
}
