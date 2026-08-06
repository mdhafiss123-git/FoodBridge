import { BadgeCheck, Clock3 } from 'lucide-react';
import type { NgoVerification } from '../types';

export default function NgoVerificationBadge({ ngo }: { ngo: NgoVerification }) {
  const verified = ngo.verificationState === 'demo_verified';
  return (
    <div className={`rounded-lg border p-4 ${verified ? 'border-forest/15 bg-sage' : 'border-terracotta/25 bg-terracotta/5'}`}>
      <div className="flex items-center gap-2">
        {verified ? (
          <BadgeCheck size={18} className="text-forest" />
        ) : (
          <Clock3 size={18} className="text-terracotta" />
        )}
        <p className="text-sm font-semibold text-forest">
          {verified ? 'Registration submitted \u2014 Demo verified' : 'Registration submitted \u2014 review pending'}
        </p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-ink/60">
        {verified
          ? 'This is a prototype status. In production, FoodBridge would verify the registration certificate and contact details before enabling claims.'
          : 'Your registration details were received. Demo verification usually completes within a few seconds.'}
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-ink/70">
        <dt className="text-ink/45">Registration no.</dt>
        <dd className="font-medium text-forest">{ngo.registrationNumber}</dd>
        <dt className="text-ink/45">Type</dt>
        <dd className="font-medium text-forest">{ngo.registrationType}</dd>
        <dt className="text-ink/45">Capacity</dt>
        <dd className="font-medium text-forest">{ngo.capacity} people</dd>
      </dl>
    </div>
  );
}
