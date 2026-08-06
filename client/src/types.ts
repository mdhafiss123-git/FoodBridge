export type Role = 'donor' | 'ngo' | 'delivery' | 'admin';

export type RegistrationType = 'Trust' | 'Society' | 'Section 8' | 'Other';

/** NGO-only verification details captured at signup. Demo prototype only —
 * no document upload or real registry check happens here. */
export interface NgoVerification {
  orgName: string;
  registrationNumber: string;
  registrationType: RegistrationType;
  contactPerson: string;
  phone: string;
  address: string;
  capacity: number;
  /** 'submitted' briefly, then flipped to 'demo_verified' to simulate a review step. */
  verificationState: 'submitted' | 'demo_verified';
}

/** Delivery-partner-only profile, seeded for demo riders and set with
 * reasonable defaults for anyone who signs up as a delivery partner. */
export interface DeliveryProfile {
  vehicleType: 'Electric scooter' | 'Bike';
  rating: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  organization?: string;
  phone?: string;
  location?: { coordinates: number[] };
  ngo?: NgoVerification;
  delivery?: DeliveryProfile;
}

/** Distance/time figures used across the claim + dispatch flow. All figures
 * are simulated demo estimates, not live traffic data. */
export interface RouteEstimate {
  distanceKm: number;
  etaMinutes: number;
}

export type DonationStatus =
  | 'open'
  | 'matching'
  | 'claimed'
  | 'picked_up'
  | 'delivered'
  | 'expired';

/** Snapshot of the rider assigned to a claimed donation, plus the route
 * legs used to render the dispatch and map panels. */
export interface DeliveryAssignment {
  riderId: string;
  riderName: string;
  riderPhone: string;
  vehicleType: DeliveryProfile['vehicleType'];
  rating: number;
  pickupDistanceKm: number;
  etaToDonorMinutes: number;
  distanceDonorToNgoKm: number;
  etaDonorToNgoMinutes: number;
  totalRouteKm: number;
  matchedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}

export interface Donation {
  _id: string;
  title: string;
  foodType: string;
  quantity: string;
  meals: number;
  preparedAt: string;
  expiresAt: string;
  status: DonationStatus;
  donor: User;
  ngo?: User;
  address: string;
  location: { coordinates: number[] };
  notes?: string;
  dietaryNote?: string;
  handlingNote?: string;
  distanceKm?: number;
  assignment?: DeliveryAssignment;
  createdAt: string;
}
