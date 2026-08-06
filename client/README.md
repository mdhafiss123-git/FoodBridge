# FoodBridge \u2014 NGO-to-delivery workflow (prototype)

This update adds a more realistic NGO onboarding, food-claim, and delivery
dispatch workflow to the FoodBridge client. It is a **browser-only
prototype**: all data lives in `localStorage`, there is no server or
database call involved in any of the flows below, and every "live" figure
(matching, ETAs, distances, impact numbers) is **simulated demo data**, not
verified in real time.

## What's new

### 1. NGO signup & verification
- Selecting **NGO / community kitchen** on the signup form reveals required
  fields: organisation name, government registration number, registration
  type, contact person, phone, address, and service capacity.
- The registration number is validated inline (6\u201320 characters, letters/
  digits/`/`/`-`).
- After signup, NGOs land on their **Profile** page, which shows a
  verification badge: *"Registration submitted"* for a few seconds, then
  *"Registration submitted \u2014 Demo verified."* The badge text makes clear
  this is a simulated review, not a real document check.

### 2. NGO claim workflow
From the dashboard or listings page, an NGO can click **Claim food** on any
open listing to open a confirmation modal showing the food, donor location,
best-before time, and their own delivery address. Confirming moves the
listing into a **matching** state with a short animated sequence:
"Searching nearby delivery partners" \u2192 "3 delivery partners are available
within 4 km" \u2192 "Assigning the closest rider." A demo rider is then
assigned with a phone number, vehicle, rating, ETA, and a compact route
panel. All of this persists to `localStorage`, so it survives a refresh.

### 3. Seeded demo data
Realistic Bengaluru-flavoured demo partners are seeded on first load:
6 food donors, 6 NGOs/community kitchens, and 4 delivery riders, plus 6
food listings covering cooked meals, bakery items, produce, and packaged
food. All are clearly demo accounts (see below).

### 4. Delivery dispatch dashboard
Delivery-partner accounts see a dispatch-style queue: pickup and delivery
addresses, distances for each leg, total route distance, ETAs, and a
handling note. **Confirm pickup** moves the job to "picked up \u2014 en route"
with a live-feeling route progress panel; **Confirm delivery** shows a
success state with meals delivered and a short impact note.

### 5. Reset demo data
The **Profile** page has a **Reset demo data** action that restores the
original seeded donors, NGOs, riders, and listings, and signs you out.

## Demo accounts

Any password works for the seeded accounts below (or use `Demo@123`).

| Role | Email | Notes |
|---|---|---|
| Donor | `donor@foodbridge.demo` | The Green Spoon Caf\u00e9, Indiranagar |
| NGO | `ngo@foodbridge.demo` | Asha Community Kitchen, Jayanagar (demo verified) |
| Delivery | `ravi@foodbridge.demo` | Ravi Kumar, electric scooter |

You can also sign up as a new donor, NGO, or delivery partner \u2014 new NGO
accounts go through the same simulated verification flow described above.

## Notes on scope

- This is a **single-tenant demo**: any delivery-partner account can act on
  any assigned listing, rather than being routed to a specific rider
  account. This keeps the demo simple without a real dispatch backend.
- No real addresses, phone numbers, or registration numbers are verified.
  Distances and ETAs are deterministic pseudo-random values, not routed
  against a mapping service.
- Existing donor functionality (posting listings, browsing listings) is
  unchanged in shape; it now reads and writes through `src/demoStore.ts`
  instead of the REST API.

## Data layer

All new logic lives in `src/demoStore.ts`. Key exports:

- `login`, `signup`, `logout`, `getSessionUser`, `resetDemoData`
- `listDonations`, `createDonation`
- `startClaim`, `assignRider`, `confirmPickup`, `confirmDelivery`
- `getDashboardStats`

Types for NGO verification, delivery profiles, route estimates, and
delivery assignments are in `src/types.ts`.
