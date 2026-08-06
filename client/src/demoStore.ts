import type {
  User,
  Donation,
  DonationStatus,
  DeliveryAssignment,
  NgoVerification,
  DeliveryProfile,
  RegistrationType,
} from './types';

/**
 * FoodBridge prototype data layer.
 *
 * Everything here is DEMO OPERATIONAL DATA held in the browser's
 * localStorage. There is no server, no database, and no real-time
 * verification of any business, NGO, address, rider, or delivery time.
 * All matching, distances, and ETAs are simulated for demonstration
 * purposes only.
 */

const KEYS = {
  users: 'fb_demo_users',
  donations: 'fb_demo_donations',
  session: 'fb_demo_session',
  version: 'fb_demo_version',
} as const;

const DATA_VERSION = 2;

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const uid = (prefix: string, n: number) => `${prefix}_${String(n).padStart(3, '0')}`;

const seedDonors: User[] = [
  { _id: uid('donor', 1), name: 'Ramesh Iyer', email: 'donor@foodbridge.demo', role: 'donor', organization: 'The Green Spoon Café', phone: '98450 11234', location: { coordinates: [77.6408, 12.9719] } },
  { _id: uid('donor', 2), name: 'Fatima Sheikh', email: 'tajwestend@foodbridge.demo', role: 'donor', organization: 'Taj West End Events Kitchen', phone: '98450 22345', location: { coordinates: [77.5926, 12.9926] } },
  { _id: uid('donor', 3), name: 'Suresh Rao', email: 'srikrishna@foodbridge.demo', role: 'donor', organization: 'Sri Krishna Grand Hotel', phone: '98450 33456', location: { coordinates: [77.6274, 12.9352] } },
  { _id: uid('donor', 4), name: 'Ayesha Khan', email: 'bakehouse@foodbridge.demo', role: 'donor', organization: 'The Bake House', phone: '98450 44567', location: { coordinates: [77.6408, 12.9121] } },
  { _id: uid('donor', 5), name: 'Vikram Shetty', email: 'palace@foodbridge.demo', role: 'donor', organization: 'Bengaluru Palace Banquets', phone: '98450 55678', location: { coordinates: [77.5926, 12.9987] } },
  { _id: uid('donor', 6), name: 'Deepa Nair', email: 'christhostel@foodbridge.demo', role: 'donor', organization: 'Christ University Hostel Kitchen', phone: '98450 66789', location: { coordinates: [77.6046, 12.9345] } },
];

const seedNgos: User[] = [
  {
    _id: uid('ngo', 1), name: 'Lakshmi Prasad', email: 'ngo@foodbridge.demo', role: 'ngo', organization: 'Asha Community Kitchen', phone: '98460 11234',
    location: { coordinates: [77.5833, 12.9250] },
    ngo: { orgName: 'Asha Community Kitchen', registrationNumber: 'KA/TR/2014/00231', registrationType: 'Trust', contactPerson: 'Lakshmi Prasad', phone: '98460 11234', address: 'Jayanagar 4th Block, Bengaluru', capacity: 150, verificationState: 'demo_verified' },
  },
  {
    _id: uid('ngo', 2), name: 'Manjunath Gowda', email: 'nammaoota@foodbridge.demo', role: 'ngo', organization: 'Namma Oota Foundation', phone: '98460 22345',
    location: { coordinates: [77.5550, 12.9990] },
    ngo: { orgName: 'Namma Oota Foundation', registrationNumber: 'KA/SOC/2016/00874', registrationType: 'Society', contactPerson: 'Manjunath Gowda', phone: '98460 22345', address: 'Rajajinagar 2nd Block, Bengaluru', capacity: 200, verificationState: 'demo_verified' },
  },
  {
    _id: uid('ngo', 3), name: 'Grace Thomas', email: 'hopeserve@foodbridge.demo', role: 'ngo', organization: 'HopeServe Children\u2019s Home', phone: '98460 33456',
    location: { coordinates: [77.6083, 12.9420] },
    ngo: { orgName: 'HopeServe Children\u2019s Home', registrationNumber: 'KA/S8/2018/00459', registrationType: 'Section 8', contactPerson: 'Grace Thomas', phone: '98460 33456', address: 'Wilson Garden, Bengaluru', capacity: 90, verificationState: 'demo_verified' },
  },
  {
    _id: uid('ngo', 4), name: 'Anitha Bhat', email: 'sevasankalp@foodbridge.demo', role: 'ngo', organization: 'SevaSankalp Trust', phone: '98460 44567',
    location: { coordinates: [77.5667, 13.0067] },
    ngo: { orgName: 'SevaSankalp Trust', registrationNumber: 'KA/TR/2011/00118', registrationType: 'Trust', contactPerson: 'Anitha Bhat', phone: '98460 44567', address: 'Malleshwaram 8th Cross, Bengaluru', capacity: 120, verificationState: 'demo_verified' },
  },
  {
    _id: uid('ngo', 5), name: 'Joseph D\u2019Souza', email: 'annapoorna@foodbridge.demo', role: 'ngo', organization: 'Annapoorna Community Centre', phone: '98460 55678',
    location: { coordinates: [77.6033, 12.9870] },
    ngo: { orgName: 'Annapoorna Community Centre', registrationNumber: 'KA/SOC/2013/00602', registrationType: 'Society', contactPerson: 'Joseph D\u2019Souza', phone: '98460 55678', address: 'Shivajinagar, Bengaluru', capacity: 180, verificationState: 'demo_verified' },
  },
  {
    _id: uid('ngo', 6), name: 'Radha Krishnamurthy', email: 'udaan@foodbridge.demo', role: 'ngo', organization: 'Udaan Elder Care Home', phone: '98460 66789',
    location: { coordinates: [77.5750, 12.9420] },
    ngo: { orgName: 'Udaan Elder Care Home', registrationNumber: 'KA/TR/2019/00967', registrationType: 'Trust', contactPerson: 'Radha Krishnamurthy', phone: '98460 66789', address: 'Basavanagudi, Bengaluru', capacity: 70, verificationState: 'demo_verified' },
  },
];

const seedRiders: (User & { delivery: DeliveryProfile })[] = [
  { _id: uid('rider', 1), name: 'Ravi Kumar', email: 'ravi@foodbridge.demo', role: 'delivery', phone: '98470 11234', delivery: { vehicleType: 'Electric scooter', rating: 4.8 } },
  { _id: uid('rider', 2), name: 'Asha N.', email: 'ashan@foodbridge.demo', role: 'delivery', phone: '98470 22345', delivery: { vehicleType: 'Bike', rating: 4.9 } },
  { _id: uid('rider', 3), name: 'Manoj S.', email: 'manoj@foodbridge.demo', role: 'delivery', phone: '98470 33456', delivery: { vehicleType: 'Electric scooter', rating: 4.7 } },
  { _id: uid('rider', 4), name: 'Priya R.', email: 'priyar@foodbridge.demo', role: 'delivery', phone: '98470 44567', delivery: { vehicleType: 'Bike', rating: 4.8 } },
];

function hoursFromNow(h: number) {
  return new Date(Date.now() + h * 3600_000).toISOString();
}
function hoursAgo(h: number) {
  return new Date(Date.now() - h * 3600_000).toISOString();
}

function seedDonations(): Donation[] {
  const list: Omit<Donation, '_id' | 'createdAt'>[] = [
    {
      title: 'Vegetable biryani, packed trays', foodType: 'Cooked meal', quantity: '6 insulated trays', meals: 55,
      preparedAt: hoursAgo(1), expiresAt: hoursFromNow(3), status: 'open',
      donor: seedDonors[0], address: '100 Feet Road, Indiranagar, Bengaluru',
      location: { coordinates: [77.6408, 12.9719] },
      notes: 'Packed at 7pm; please bring crates.', dietaryNote: 'Vegetarian', distanceKm: 2.1,
    },
    {
      title: 'Wedding meal boxes \u2014 mixed thali', foodType: 'Cooked meal', quantity: '120 sealed boxes', meals: 120,
      preparedAt: hoursAgo(0.3), expiresAt: hoursFromNow(2), status: 'open',
      donor: seedDonors[1], address: 'Race Course Road, Bengaluru',
      location: { coordinates: [77.5926, 12.9926] },
      notes: 'Reception just concluded; boxes are sealed and labelled.', dietaryNote: 'Contains dairy', distanceKm: 4.6,
    },
    {
      title: 'Banquet rice and curry trays', foodType: 'Cooked meal', quantity: '10 catering trays', meals: 80,
      preparedAt: hoursAgo(2), expiresAt: hoursFromNow(4), status: 'open',
      donor: seedDonors[2], address: 'Koramangala 5th Block, Bengaluru',
      location: { coordinates: [77.6274, 12.9352] },
      notes: 'Non-vegetarian and vegetarian trays separated.', dietaryNote: 'Mixed \u2014 marked separately', distanceKm: 3.4,
    },
    {
      title: 'Bakery items \u2014 bread and pastries', foodType: 'Bakery items', quantity: '15 crates', meals: 90,
      preparedAt: hoursAgo(4), expiresAt: hoursFromNow(10), status: 'open',
      donor: seedDonors[3], address: 'HSR Layout Sector 2, Bengaluru',
      location: { coordinates: [77.6408, 12.9121] },
      notes: 'Day-old stock, still fresh; best consumed within 24h.', dietaryNote: 'Contains gluten', distanceKm: 5.8,
    },
    {
      title: 'Assorted fresh fruit crates', foodType: 'Fresh produce', quantity: '8 crates', meals: 60,
      preparedAt: hoursAgo(1.5), expiresAt: hoursFromNow(18), status: 'open',
      donor: seedDonors[4], address: 'Vasanth Nagar, Bengaluru',
      location: { coordinates: [77.5926, 12.9987] },
      notes: 'Leftover from banquet fruit display, unopened.', dietaryNote: 'Vegan', distanceKm: 3.9,
    },
    {
      title: 'Hostel dinner packets', foodType: 'Packaged food', quantity: '70 packets', meals: 70,
      preparedAt: hoursAgo(0.5), expiresAt: hoursFromNow(3), status: 'open',
      donor: seedDonors[5], address: 'Dairy Circle, Bengaluru',
      location: { coordinates: [77.6046, 12.9345] },
      notes: 'Extra packets from reduced hostel attendance this week.', dietaryNote: 'Vegetarian', distanceKm: 2.7,
    },
  ];
  return list.map((d, i) => ({ ...d, _id: uid('donation', i + 1), createdAt: hoursAgo(list.length - i) }));
}

function seedUsers(): User[] {
  return [...seedDonors, ...seedNgos, ...seedRiders];
}

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeeded() {
  const version = read<number>(KEYS.version, 0);
  if (version < DATA_VERSION) {
    write(KEYS.users, seedUsers());
    write(KEYS.donations, seedDonations());
    write(KEYS.version, DATA_VERSION);
  }
}
ensureSeeded();

function getUsers(): User[] {
  return read<User[]>(KEYS.users, []);
}
function setUsers(users: User[]) {
  write(KEYS.users, users);
}
function getDonations(): Donation[] {
  return read<Donation[]>(KEYS.donations, []);
}
function setDonations(donations: Donation[]) {
  write(KEYS.donations, donations);
}

export function resetDemoData() {
  write(KEYS.users, seedUsers());
  write(KEYS.donations, seedDonations());
  write(KEYS.version, DATA_VERSION);
  localStorage.removeItem(KEYS.session);
}

// ---------------------------------------------------------------------------
// Auth (demo only \u2014 no real password hashing or session security)
// ---------------------------------------------------------------------------

export function getSessionUser(): User | null {
  const id = localStorage.getItem(KEYS.session);
  if (!id) return null;
  return getUsers().find((u) => u._id === id) || null;
}

export async function login(email: string, password: string): Promise<User> {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  // Demo credentials: any password works for seeded accounts; signed-up
  // accounts must match the password they registered with.
  if (!user) throw new Error('No account found with that email.');
  if (user.password && user.password !== password) throw new Error('Incorrect password.');
  localStorage.setItem(KEYS.session, user._id);
  return user;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  role: User['role'];
  organization?: string;
  phone?: string;
  ngo?: {
    orgName: string;
    registrationNumber: string;
    registrationType: RegistrationType;
    contactPerson: string;
    phone: string;
    address: string;
    capacity: number;
  };
}

export async function signup(input: SignupInput): Promise<User> {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const user: User = {
    _id: uid('user', users.length + 1),
    name: input.name,
    email: input.email,
    password: input.password,
    role: input.role,
    organization: input.organization,
    phone: input.phone,
    location: { coordinates: [77.5946, 12.9716] },
  };
  if (input.role === 'ngo' && input.ngo) {
    const ngo: NgoVerification = { ...input.ngo, verificationState: 'submitted' };
    user.ngo = ngo;
    user.organization = input.ngo.orgName;
  }
  if (input.role === 'delivery') {
    user.delivery = { vehicleType: 'Bike', rating: 4.6 };
  }
  setUsers([...users, user]);
  localStorage.setItem(KEYS.session, user._id);

  // Simulate the review step completing shortly after registration.
  if (user.role === 'ngo') {
    setTimeout(() => {
      const list = getUsers();
      const idx = list.findIndex((u) => u._id === user._id);
      if (idx >= 0 && list[idx].ngo) {
        list[idx] = { ...list[idx], ngo: { ...list[idx].ngo!, verificationState: 'demo_verified' } };
        setUsers(list);
      }
    }, 4000);
  }
  return user;
}

export function logout() {
  localStorage.removeItem(KEYS.session);
}

// ---------------------------------------------------------------------------
// Donations
// ---------------------------------------------------------------------------

export function listDonations(): Donation[] {
  return [...getDonations()].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export interface CreateDonationInput {
  title: string;
  foodType: string;
  quantity: string;
  meals: number;
  expiresAt: string;
  address: string;
  notes?: string;
  dietaryNote?: string;
}

export function createDonation(input: CreateDonationInput, donor: User): Donation {
  const donation: Donation = {
    _id: uid('donation', getDonations().length + 1),
    title: input.title,
    foodType: input.foodType,
    quantity: input.quantity,
    meals: input.meals,
    preparedAt: new Date().toISOString(),
    expiresAt: input.expiresAt,
    status: 'open',
    donor,
    address: input.address,
    location: { coordinates: [77.5946, 12.9716] },
    notes: input.notes,
    dietaryNote: input.dietaryNote,
    createdAt: new Date().toISOString(),
  };
  setDonations([donation, ...getDonations()]);
  return donation;
}

function updateDonation(id: string, patch: Partial<Donation>): Donation {
  const donations = getDonations();
  const idx = donations.findIndex((d) => d._id === id);
  if (idx === -1) throw new Error('Listing not found.');
  donations[idx] = { ...donations[idx], ...patch };
  setDonations(donations);
  return donations[idx];
}

/** Deterministic pseudo-random number in [min, max] seeded from a string,
 * so refreshing the page keeps the same demo route figures. */
function seededRange(seed: string, min: number, max: number, salt = 0) {
  let h = salt + 7;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const t = (h % 1000) / 1000;
  return Math.round((min + t * (max - min)) * 10) / 10;
}

/** Step 1: NGO confirms the claim \u2014 donation enters the matching state. */
export function startClaim(donationId: string, ngo: User): Donation {
  return updateDonation(donationId, { status: 'matching', ngo });
}

/** Step 2: after the matching animation completes, assign the nearest
 * available demo rider and compute simulated route figures. */
export function assignRider(donationId: string): Donation {
  const donations = getDonations();
  const donation = donations.find((d) => d._id === donationId);
  if (!donation) throw new Error('Listing not found.');

  const rider = seedRiders[Math.abs(hashCode(donationId)) % seedRiders.length];
  const pickupDistanceKm = seededRange(donationId, 1.2, 4.6, 1);
  const distanceDonorToNgoKm = seededRange(donationId, 2.5, 8.8, 2);

  const assignment: DeliveryAssignment = {
    riderId: rider._id,
    riderName: rider.name,
    riderPhone: rider.phone || '',
    vehicleType: rider.delivery.vehicleType,
    rating: rider.delivery.rating,
    pickupDistanceKm,
    etaToDonorMinutes: Math.round(pickupDistanceKm * 3 + 2),
    distanceDonorToNgoKm,
    etaDonorToNgoMinutes: Math.round(distanceDonorToNgoKm * 3 + 3),
    totalRouteKm: Math.round((pickupDistanceKm + distanceDonorToNgoKm) * 10) / 10,
    matchedAt: new Date().toISOString(),
  };

  return updateDonation(donationId, { status: 'claimed', assignment });
}

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}

export function confirmPickup(donationId: string): Donation {
  const donation = getDonations().find((d) => d._id === donationId);
  if (!donation?.assignment) throw new Error('No rider assigned yet.');
  return updateDonation(donationId, {
    status: 'picked_up',
    assignment: { ...donation.assignment, pickedUpAt: new Date().toISOString() },
    handlingNote: 'Keep upright \u2014 deliver within 45 minutes.',
  });
}

export function confirmDelivery(donationId: string): Donation {
  const donation = getDonations().find((d) => d._id === donationId);
  if (!donation?.assignment) throw new Error('No rider assigned yet.');
  return updateDonation(donationId, {
    status: 'delivered',
    assignment: { ...donation.assignment, deliveredAt: new Date().toISOString() },
  });
}

// ---------------------------------------------------------------------------
// Dashboard stats
// ---------------------------------------------------------------------------

export function getDashboardStats(user: User) {
  const donations = getDonations();
  const relevant =
    user.role === 'donor'
      ? donations.filter((d) => d.donor._id === user._id)
      : user.role === 'ngo'
      ? donations.filter((d) => d.ngo?._id === user._id)
      : donations;

  const delivered = relevant.filter((d) => d.status === 'delivered');
  const meals = delivered.reduce((sum, d) => sum + d.meals, 0);
  const total = donations.length;
  const people = Math.round(meals * 0.9);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekly = days.map((day, i) => ({
    day,
    meals: Math.max(0, Math.round(seededRange(`${user._id}-${day}`, 10, 90, i))),
  }));

  return { meals, total, people, weekly };
}
