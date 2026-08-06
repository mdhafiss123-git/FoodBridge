import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import { useAuth } from '../auth';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [e, setE] = useState('donor@foodbridge.demo');
  const [p, setP] = useState('Demo@123');
  const [err, setErr] = useState('');

  const submit = async (x: React.FormEvent) => {
    x.preventDefault();
    try {
      await login(e, p);
      nav('/dashboard');
    } catch (error: any) {
      setErr(error.message || 'We could not sign you in. Check your email and password.');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-sage p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-forest/10 bg-white p-8 shadow-card">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-forest">
          <HeartHandshake /> FoodBridge
        </Link>
        <h1 className="mt-8 text-3xl font-medium text-forest">Welcome back</h1>
        <p className="mt-2 text-ink/60">Sign in to continue rescuing meals.</p>
        {err && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}
        <label className="label mt-6">Email
          <input className="input mt-1" value={e} onChange={(x) => setE(x.target.value)} type="email" />
        </label>
        <label className="label mt-4">Password
          <input className="input mt-1" value={p} onChange={(x) => setP(x.target.value)} type="password" />
        </label>
        <div className="mt-2 text-right">
          <Link className="text-sm font-semibold text-forest" to="/forgot-password">Forgot password?</Link>
        </div>
        <button className="btn-primary mt-6 w-full">Sign in</button>
        <p className="mt-5 text-center text-sm text-ink/70">
          New here? <Link className="font-semibold text-forest" to="/signup">Create an account</Link>
        </p>
        <div className="mt-5 border-t border-forest/10 pt-4 text-center text-xs text-ink/50">
          <p>Demo accounts (any password works, or use <b>Demo@123</b>):</p>
          <p className="mt-1">donor@foodbridge.demo &middot; ngo@foodbridge.demo &middot; ravi@foodbridge.demo</p>
        </div>
      </form>
    </div>
  );
}
