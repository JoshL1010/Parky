# Parky – Requirements (v1)

## Functional requirements

### FR1 – Sign in
**User story:** As a user, I want to sign in so my reports are tied to an account.

**Acceptance criteria**
- User can sign in and sign out
- User stays signed in after refresh
- Unauthorized users cannot submit reports

---

### FR2 – View map and location
**User story:** As a user, I want to see a map centred on my location so I can understand parking near me.

**Acceptance criteria**
- Map loads successfully
- User location is displayed (or a clear message is shown if permission is denied)
- App does not crash if location permission is denied

---

### FR3 – Search a destination
**User story:** As a user, I want to search for a destination so I can see parking near where I’m going.

**Acceptance criteria**
- User can type a destination and select a result
- Selecting a result recentres the map near that destination
- The selected destination is shown on the map

---

### FR4 – Show parking confidence overlay
**User story:** As a user, I want to see a parking confidence overlay so I can choose streets with better odds of parking.

**Acceptance criteria**
- Nearby street segments show a confidence state (e.g. high, medium, low)
- Confidence updates within a short time window when new data arrives
- If no data exists, the UI clearly shows “no data yet”

---

### FR5 – Report “I left a spot”
**User story:** As a user, I want to report that I left a parking spot so others benefit from fresh availability signals.

**Acceptance criteria**
- User can submit a report in under 10 seconds
- The app suggests the nearest street segment automatically
- User must confirm before submitting
- After submitting, the overlay updates

---

### FR6 – Recommendations list
**User story:** As a user, I want Parky to suggest the top streets to try so I can make a quick decision.

**Acceptance criteria**
- App shows the top 3 street segments near the destination
- Each suggestion shows confidence level + distance
- Tapping a suggestion highlights it on the map

---

### FR7 – Rate limiting and basic abuse controls
**User story:** As the product owner, I want to reduce spam so the confidence layer stays trustworthy.

**Acceptance criteria**
- Users cannot submit more than N reports per minute (configurable)
- Reports require being near the segment (basic GPS sanity check)
- Suspicious behaviour reduces a user’s “trust impact” on confidence

---

## Non-functional requirements

### NFR1 – Performance
- Map + overlay loads within 2 seconds on normal WiFi for a city-sized view

### NFR2 – Reliability
- App handles API errors gracefully with user-friendly messages
- No blank screen on failure

### NFR3 – Security
- Database is protected by RLS policies
- Admin-only actions require an admin role

### NFR4 – Privacy
- Avoid storing precise location histories long-term
- Keep only what is necessary for the report and aggregation
