import { Link } from 'react-router-dom';
import {
  ArrowRight,
  HeartHandshake,
  UtensilsCrossed,
  ClipboardCheck,
  Bike,
  MapPin,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const journey = [
  {
    icon: UtensilsCrossed,
    title: 'Donor posts surplus food',
    detail: 'A kitchen, hostel or event lists what\u2019s left and how many meals it makes.',
  },
  {
    icon: ClipboardCheck,
    title: 'Nearby NGO claims it',
    detail: 'The closest verified organisation gets notified and accepts the donation.',
  },
  {
    icon: Bike,
    title: 'Delivery partner completes the handoff',
    detail: 'A rider picks up and confirms delivery, so every handoff is traceable.',
  },
];

export default function Landing() {
  return (
    <div className="bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-forest/10 bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-forest">
            <HeartHandshake size={22} strokeWidth={2.25} />
            FoodBridge
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
            <a className="transition hover:text-forest" href="#how-it-works">How it works</a>
            <a className="transition hover:text-forest" href="#impact">Impact</a>
            <a className="transition hover:text-forest" href="#partners">For Partners</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link className="btn-outline" to="/login">Sign in</Link>
            <Link className="btn-primary" to="/signup">Join FoodBridge</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-14 pt-12 md:grid-cols-2 md:pb-16 md:pt-16">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.18em] text-terracotta">
              Food rescue, made human
            </p>
            <h1 className="max-w-xl text-[2.75rem] font-medium leading-[1.1] text-forest md:text-6xl">
              Good food belongs on <em className="not-italic text-terracotta">plates</em>, not in bins.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-ink/70">
              FoodBridge connects food donors, community organisations and delivery
              partners so surplus meals reach people who need them &mdash; the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/signup">
                Join FoodBridge <ArrowRight size={16} />
              </Link>
              <Link className="btn-outline" to="/login">
                Explore demo
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink/50">
              Built for restaurants, hostels, events and community kitchens.
            </p>
          </motion.div>

          {/* Live rescue visual */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="relative rounded-2xl border border-forest/10 bg-white p-5 shadow-card"
          >
            <div className="flex items-center justify-between border-b border-forest/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest/70">
                <MapPin size={13} /> Live rescue
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-terracotta">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                In progress
              </span>
            </div>

            {/* Route map */}
            <div className="relative mt-4 h-40 overflow-hidden rounded-lg bg-sage">
              <svg viewBox="0 0 320 160" className="h-full w-full">
                <path
                  d="M 24 128 C 90 40, 150 150, 220 60 S 280 24, 296 30"
                  fill="none"
                  stroke="#153F2D"
                  strokeOpacity="0.25"
                  strokeWidth="2"
                  strokeDasharray="1 8"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="128" r="6" fill="#153F2D" />
                <circle cx="220" cy="60" r="6" fill="#E67E5F" />
                <circle cx="296" cy="30" r="5" fill="#153F2D" fillOpacity="0.4" />
              </svg>
              <span className="absolute bottom-2 left-3 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-forest shadow-soft">
                Donor
              </span>
              <span className="absolute right-14 top-8 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-terracotta shadow-soft">
                Rider
              </span>
              <span className="absolute right-3 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-forest shadow-soft">
                NGO
              </span>
            </div>

            {/* Donation card */}
            <div className="mt-4 rounded-lg border border-forest/10 bg-ivory p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-forest">Fresh vegetable biryani</p>
                  <p className="text-xs text-ink/55">55 meals &middot; posted 6 min ago</p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-sage px-2.5 py-1 text-[11px] font-semibold text-forest">
                  55 meals
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-ink/70">
                <CheckCircle2 size={14} className="text-forest" />
                Accepted by Anbu Trust NGO
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-ink/70">
                <Bike size={14} className="text-terracotta" />
                Rider en route &middot; pickup in 8 min
              </div>
            </div>
          </motion.div>
        </section>

        {/* Impact / how it works */}
        <section id="how-it-works" className="border-t border-forest/10 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5">
            <motion.div {...fadeUp} className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-terracotta">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-tight text-forest md:text-4xl">
                One surplus meal can become someone&rsquo;s dinner.
              </h2>
            </motion.div>

            {/* Connected journey */}
            <div id="impact" className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
              {journey.map(({ icon: Icon, title, detail }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className="group relative border-forest/10 px-1 py-2 md:border-l md:px-8 md:py-0 first:md:border-l-0 first:md:pl-0"
                >
                  <div className="flex items-center gap-3 md:block">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition group-hover:border-forest group-hover:bg-sage">
                      <Icon size={19} strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink/40 md:mt-4 md:block">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-forest md:mt-3">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{detail}</p>
                </motion.div>
              ))}
            </div>

            {/* Real-world scenario */}
            <motion.div
              {...fadeUp}
              className="mt-14 rounded-xl border border-forest/10 bg-sage/60 p-6 md:p-7"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest/70">
                <Clock size={13} /> A typical evening
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/75 md:text-[15px]">
                <span className="font-semibold text-forest">8:00 PM</span> &mdash; A wedding hall posts 120 meal boxes.{' '}
                <span className="font-semibold text-forest">8:12 PM</span> &mdash; A nearby NGO accepts.{' '}
                <span className="font-semibold text-forest">8:40 PM</span> &mdash; Pickup is confirmed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partners strip */}
        <section id="partners" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5">
            <motion.div
              {...fadeUp}
              className="flex flex-col items-start justify-between gap-6 rounded-xl border border-forest/10 bg-forest px-7 py-9 text-ivory md:flex-row md:items-center md:px-10"
            >
              <div>
                <h3 className="text-2xl font-medium leading-snug md:text-3xl">
                  Running a kitchen, hostel or event space?
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-ivory/70">
                  Post your first surplus donation in under a minute &mdash; no setup fee, no minimum quantity.
                </p>
              </div>
              <Link
                className="btn bg-ivory text-forest hover:-translate-y-px hover:bg-white hover:shadow-soft whitespace-nowrap"
                to="/signup"
              >
                Join as a partner <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}