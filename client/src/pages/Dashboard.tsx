import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import * as store from '../demoStore';
import type { Donation } from '../types';
import { useAuth } from '../auth';
import DonationCard from '../components/DonationCard';
import ClaimModal from '../components/ClaimModal';
import DeliveryAssignmentCard from '../components/DeliveryAssignmentCard';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Leaf, Utensils, Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [items, setItems] = useState<Donation[]>([]);
  const [claiming, setClaiming] = useState<Donation | null>(null);

  const load = () => setItems(store.listDonations());
  useEffect(() => { load(); }, []);

  const stats = useMemo(() => (user ? store.getDashboardStats(user) : { meals: 0, total: 0, people: 0, weekly: [] }), [user, items]);

  const visible =
    user?.role === 'donor' ? items.filter((d) => d.donor._id === user._id)
    : user?.role === 'ngo' ? items.filter((d) => d.status === 'open')
    : user?.role === 'delivery' ? items.filter((d) => d.status === 'claimed' || d.status === 'picked_up')
    : items;

  const cards = [
    ['Meals rescued', stats.meals, Utensils],
    ['Food listings', stats.total, Leaf],
    ['People reached', stats.people, Users],
  ] as const;

  return (
    <Layout>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-forest">{user?.role} hub</p>
          <h1 className="mt-1 text-4xl font-medium text-forest">Good to see you, {user?.name?.split(' ')[0]}.</h1>
        </div>
        {user?.role === 'donor' && <a className="btn-primary" href="/donate">Post surplus food</a>}
      </div>

      <p className="mt-3 text-xs text-ink/40">Figures below are demo impact, based on this browser's simulated activity.</p>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {cards.map(([l, n, I]) => (
          <div className="card flex items-center gap-4" key={l}>
            <span className="rounded-lg bg-sage p-3 text-forest"><I size={20} /></span>
            <div>
              <p className="text-sm text-ink/55">{l}</p>
              <b className="text-2xl text-forest">{n}</b>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <div>
          <h2 className="text-2xl font-medium text-forest">
            {user?.role === 'ngo' ? 'Available nearby' : user?.role === 'delivery' ? 'Your delivery queue' : 'Recent activity'}
          </h2>
          <div className="mt-4 grid gap-4">
            {visible.length === 0 && <p className="card">Nothing here right now.</p>}
            {user?.role === 'delivery'
              ? visible.slice(0, 3).map((d) => <DeliveryAssignmentCard key={d._id} donation={d} onUpdate={load} />)
              : visible.slice(0, 3).map((d) => (
                  <DonationCard
                    key={d._id}
                    d={d}
                    action={user?.role === 'ngo' ? 'Claim food' : undefined}
                    onAction={user?.role === 'ngo' ? () => setClaiming(d) : undefined}
                  />
                ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-medium text-forest">Live rescue map</h2>
            <p className="text-xs text-ink/40">Demo locations, not live GPS data.</p>
            <div className="mt-4 h-64 overflow-hidden rounded-lg">
              <MapContainer center={[12.9716, 77.5946]} zoom={11} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                {items.slice(0, 8).map((d) => (
                  <Marker key={d._id} position={[d.location.coordinates[1], d.location.coordinates[0]]}>
                    <Popup><b>{d.title}</b><br />{d.meals} meals</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-medium text-forest">Meals saved this week</h2>
            <p className="text-xs text-ink/40">Demo impact, not verified totals.</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer>
                <BarChart data={stats.weekly}>
                  <XAxis dataKey="day" fontSize={11} stroke="#153F2D66" />
                  <YAxis fontSize={11} stroke="#153F2D66" />
                  <Tooltip />
                  <Bar dataKey="meals" fill="#153F2D" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

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
