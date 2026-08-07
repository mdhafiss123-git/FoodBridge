import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import type { LucideIcon } from 'lucide-react';
import {
  HeartHandshake,
  LayoutDashboard,
  PackagePlus,
  Package,
  UserCircle,
  LogOut,
  Gift,
  Sparkles,
  Users,
  Shield,
  Bike,
} from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, login, logout } = useAuth();
  const nav = useNavigate();

  const links: [string, LucideIcon, string][] = [
    ['/dashboard', LayoutDashboard, 'Overview Hub'],
    ['/donations', Package, 'Food Listings'],
    ['/sponsor', Gift, 'Sponsor Fresh Meals'],
    ...(user?.role === 'donor' ? [['/donate', PackagePlus, 'Post Surplus'] as [string, LucideIcon, string]] : []),
    ['/profile', UserCircle, 'My Profile'],
  ];

  const handleRoleSwitch = async (email: string) => {
    try {
      await login(email, 'demo1234');
      nav('/dashboard');
    } catch {
      console.warn('Role quick switch fallback');
    }
  };

  return (
    <div className="min-h-screen bg-ivory/40">
      {/* Top Demo Bar for 1-Click Role Switcher */}
      <div className="bg-forest px-4 py-2 text-ivory text-xs flex flex-wrap items-center justify-between gap-2 border-b border-forest/20">
        <div className="flex items-center gap-2 font-medium text-sage">
          <Sparkles size={14} className="text-terracotta" />
          <span><b>Demo Switcher:</b> Switch roles live in 1 click &rarr;</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRoleSwitch('donor@foodbridge.demo')}
            className={`px-2.5 py-1 rounded-md transition font-semibold flex items-center gap-1 ${
              user?.role === 'donor' ? 'bg-sage text-forest shadow' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Shield size={12} /> Donor (Green Spoon)
          </button>
          <button
            onClick={() => handleRoleSwitch('ngo@foodbridge.demo')}
            className={`px-2.5 py-1 rounded-md transition font-semibold flex items-center gap-1 ${
              user?.role === 'ngo' ? 'bg-sage text-forest shadow' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Users size={12} /> NGO (Asha Kitchen)
          </button>
          <button
            onClick={() => handleRoleSwitch('ravi@foodbridge.demo')}
            className={`px-2.5 py-1 rounded-md transition font-semibold flex items-center gap-1 ${
              user?.role === 'delivery' ? 'bg-sage text-forest shadow' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Bike size={12} /> Rider (Ravi EV)
          </button>
          <Link
            to="/sponsor"
            className="px-2.5 py-1 rounded-md bg-terracotta text-white font-bold hover:bg-terracotta/90 transition flex items-center gap-1 shadow"
          >
            <Gift size={12} /> Wealthy Sponsor Mode
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-forest">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-ivory shadow-md">
              <HeartHandshake size={21} />
            </span>
            FoodBridge
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:block text-ink/75">
              Hi, <b className="text-forest">{user?.name}</b> ({user?.role})
            </span>
            <button
              onClick={() => {
                logout();
                nav('/');
              }}
              className="btn-outline !px-3 !py-1.5 text-xs flex items-center gap-1.5"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-60 shrink-0 border-r bg-white p-4 md:block min-h-[calc(100vh-100px)]">
          <div className="space-y-1">
            {links.map(([to, Icon, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-150 ${
                    isActive ? 'bg-sage text-forest font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-sage/40 p-4 border border-forest/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest/70 block">
              💡 Presentation Tip
            </span>
            <p className="text-xs text-ink/70 leading-relaxed">
              Use the top <b>Demo Switcher</b> to demonstrate real-time matching between Donor, NGO, Rider, and Wealthy Sponsor in 1 click!
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
