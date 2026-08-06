import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Info } from 'lucide-react';
import { useAuth } from '../auth';
import type { Role, RegistrationType } from '../types';

const REG_PATTERN = /^[A-Z0-9][A-Z0-9/-]{5,19}$/i;

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
    name: '', email: '', password: '', organization: '', role: 'donor' as Role, phone: '',
  });
  const [ngo, setNgo] = useState({
    orgName: '', registrationNumber: '', registrationType: 'Trust' as RegistrationType,
    contactPerson: '', phone: '', address: '', capacity: '',
  });
  const [regError, setRegError] = useState('');
  const [err, setErr] = useState('');

  const change = (k: string, v: string) => setF({ ...f, [k]: v });
  const changeNgo = (k: string, v: string) => setNgo({ ...ngo, [k]: v });

  const validateRegistration = (v: string) => {
    if (!v) { setRegError('Registration number is required.'); return false; }
    if (!REG_PATTERN.test(v)) { setRegError('Use 6\u201320 letters, numbers, "/" or "-", e.g. KA/TR/2019/00231.'); return false; }
    setRegError('');
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (f.role === 'ngo') {
      if (!validateRegistration(ngo.registrationNumber)) return;
      if (!ngo.orgName || !ngo.contactPerson || !ngo.phone || !ngo.address || !ngo.capacity) {
        setErr('Please complete all NGO details.');
        return;
      }
    }
    try {
      await signup({
        name: f.name,
        email: f.email,
        password: f.password,
        role: f.role,
        organization: f.role === 'ngo' ? ngo.orgName : f.organization,
        phone: f.role === 'ngo' ? ngo.phone : f.phone,
        ngo: f.role === 'ngo'
          ? { ...ngo, capacity: Number(ngo.capacity) }
          : undefined,
      });
      nav(f.role === 'ngo' ? '/profile' : '/dashboard');
    } catch (x: any) {
      setErr(x.message || 'Unable to create your account');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-sage p-4 py-10">
      <form onSubmit={submit} className="w-full max-w-lg rounded-2xl border border-forest/10 bg-white p-8 shadow-card">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-forest">
          <HeartHandshake /> FoodBridge
        </Link>
        <h1 className="mt-6 text-3xl font-medium text-forest">Join the bridge</h1>
        {err && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}

        <label className="label mt-5">I am joining as
          <select className="input mt-1" value={f.role} onChange={(e) => change('role', e.target.value)}>
            <option value="donor">Food donor</option>
            <option value="ngo">NGO / community kitchen</option>
            <option value="delivery">Delivery partner</option>
          </select>
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="label">Your name
            <input required className="input mt-1" onChange={(e) => change('name', e.target.value)} />
          </label>
          {f.role !== 'ngo' && (
            <label className="label">Organisation <span className="text-ink/40">(optional)</span>
              <input className="input mt-1" onChange={(e) => change('organization', e.target.value)} />
            </label>
          )}
        </div>
        <label className="label mt-4">Email
          <input required type="email" className="input mt-1" onChange={(e) => change('email', e.target.value)} />
        </label>
        <label className="label mt-4">Password
          <input required minLength={8} type="password" className="input mt-1" onChange={(e) => change('password', e.target.value)} />
        </label>

        {f.role === 'ngo' && (
          <div className="mt-6 rounded-xl border border-forest/10 bg-ivory p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-forest">
              <Info size={15} /> NGO verification details
            </p>
            <p className="mt-1 text-xs text-ink/55">
              Demo prototype: registration details are recorded but not checked against a government registry.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="label sm:col-span-2">Organisation name
                <input required className="input mt-1" value={ngo.orgName} onChange={(e) => changeNgo('orgName', e.target.value)} />
              </label>
              <label className="label">Registration number
                <input
                  required
                  className="input mt-1"
                  placeholder="KA/TR/2019/00231"
                  value={ngo.registrationNumber}
                  onChange={(e) => changeNgo('registrationNumber', e.target.value)}
                  onBlur={(e) => validateRegistration(e.target.value)}
                />
                {regError && <span className="mt-1 block text-xs text-red-600">{regError}</span>}
              </label>
              <label className="label">Registration type
                <select className="input mt-1" value={ngo.registrationType} onChange={(e) => changeNgo('registrationType', e.target.value)}>
                  <option>Trust</option>
                  <option>Society</option>
                  <option>Section 8</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="label">Contact person
                <input required className="input mt-1" value={ngo.contactPerson} onChange={(e) => changeNgo('contactPerson', e.target.value)} />
              </label>
              <label className="label">Phone number
                <input required className="input mt-1" value={ngo.phone} onChange={(e) => changeNgo('phone', e.target.value)} />
              </label>
              <label className="label sm:col-span-2">Full address
                <input required className="input mt-1" value={ngo.address} onChange={(e) => changeNgo('address', e.target.value)} />
              </label>
              <label className="label">Service capacity
                <input required type="number" min="1" className="input mt-1" placeholder="People served per day" value={ngo.capacity} onChange={(e) => changeNgo('capacity', e.target.value)} />
              </label>
            </div>
          </div>
        )}

        <button className="btn-primary mt-6 w-full">Create account</button>
        <p className="mt-4 text-center text-sm text-ink/70">
          Already a member? <Link className="font-semibold text-forest" to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
