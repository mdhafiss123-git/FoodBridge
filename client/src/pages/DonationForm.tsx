import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import * as store from '../demoStore';
import { useAuth } from '../auth';

export default function DonationForm() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [f, setF] = useState({
    title: '', foodType: 'Cooked meal', quantity: '', meals: 10,
    address: '', expiresAt: '', notes: '', dietaryNote: '',
  });
  const [err, setErr] = useState('');
  const set = (k: string, v: string) => setF({ ...f, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      store.createDonation(
        {
          title: f.title,
          foodType: f.foodType,
          quantity: f.quantity,
          meals: Number(f.meals),
          expiresAt: f.expiresAt ? new Date(f.expiresAt).toISOString() : new Date(Date.now() + 3 * 3600_000).toISOString(),
          address: f.address,
          notes: f.notes,
          dietaryNote: f.dietaryNote,
        },
        user
      );
      nav('/donations');
    } catch (x: any) {
      setErr(x.message || 'Could not post listing');
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-medium text-forest">Post surplus food</h1>
        <p className="mt-2 text-ink/60">Be precise: it helps partners collect safely and on time.</p>
        <form onSubmit={submit} className="card mt-7 grid gap-4 sm:grid-cols-2">
          {err && <p className="sm:col-span-2 text-red-600">{err}</p>}
          <label className="label sm:col-span-2">Listing title
            <input required className="input mt-1" placeholder="Fresh vegetable biryani" onChange={(e) => set('title', e.target.value)} />
          </label>
          <label className="label">Food type
            <select className="input mt-1" value={f.foodType} onChange={(e) => set('foodType', e.target.value)}>
              <option>Cooked meal</option>
              <option>Packaged food</option>
              <option>Bakery items</option>
              <option>Fresh produce</option>
            </select>
          </label>
          <label className="label">Approx. servings
            <input required min="1" className="input mt-1" type="number" value={f.meals} onChange={(e) => set('meals', e.target.value)} />
          </label>
          <label className="label">Quantity / packaging
            <input required className="input mt-1" placeholder="6 insulated trays" onChange={(e) => set('quantity', e.target.value)} />
          </label>
          <label className="label">Best before
            <input required className="input mt-1" type="datetime-local" onChange={(e) => set('expiresAt', e.target.value)} />
          </label>
          <label className="label sm:col-span-2">Pickup address
            <input required className="input mt-1" placeholder="123 MG Road, Bengaluru" onChange={(e) => set('address', e.target.value)} />
          </label>
          <label className="label sm:col-span-2">Dietary note <span className="text-ink/40">(optional)</span>
            <input className="input mt-1" placeholder="Vegetarian, contains dairy, etc." onChange={(e) => set('dietaryNote', e.target.value)} />
          </label>
          <label className="label sm:col-span-2">Safety / collection notes
            <textarea className="input mt-1" rows={3} placeholder="Vegetarian, packed at 6pm; please bring crates." onChange={(e) => set('notes', e.target.value)} />
          </label>
          <button className="btn-primary sm:col-span-2">Publish food listing</button>
        </form>
      </div>
    </Layout>
  );
}
