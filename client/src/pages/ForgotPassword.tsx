import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo prototype: no email is actually sent.
    setDone(true);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-sage p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-forest/10 bg-white p-8 shadow-card">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-forest">
          <HeartHandshake /> FoodBridge
        </Link>
        <h1 className="mt-8 text-3xl font-medium text-forest">Reset password</h1>
        {done ? (
          <p className="mt-4 rounded-lg bg-sage p-4 text-ink/70">
            This is a demo prototype, so no email is actually sent. In production, a reset link
            would go to <b>{email || 'your email'}</b>.
          </p>
        ) : (
          <>
            <p className="mt-2 text-ink/60">Enter your account email and we&rsquo;ll send a reset link.</p>
            <label className="label mt-6">Email
              <input required type="email" className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button className="btn-primary mt-6 w-full">Send reset link</button>
          </>
        )}
        <p className="mt-5 text-center text-sm">
          <Link className="font-semibold text-forest" to="/login">Back to sign in</Link>
        </p>
      </form>
    </div>
  );
}
