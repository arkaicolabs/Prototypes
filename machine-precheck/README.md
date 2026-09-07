# Machine Pre-Check — clickable pilot prototype

Status: interactive demo; no real authentication, email delivery, inspection submission or fleet integration. Data lives only in page memory and resets on reload. Use fictional data.

## Start
Open index.html through a static server, or the existing GitHub Pages machine-precheck/ URL. Select Continue as Operator K, or try email signup with a made-up address and demo code 123456. The email link action is simulated. Use Try hirer to view the same demo inspection events from the fleet side. mobile-preview.html embeds the app at 390px for desktop review.

## Locked decisions (2026-09-07)
- Product name: MACHINE PRE-CHECK. Splash timing and beacon choreography preserved; sprite cleanup deferred.
- Operator-owned portable account; independent personal checks even without a participating site/hirer.
- Email-only passwordless access. Code is the prototype default; magic link is also demonstrated. Neither is live auth.
- First pilot: hirer-supported, operator-led. No site account or approval gate. Public site QR, induction and site administration deferred.
- We help set up pilot hirer machines and permanent machine QR labels. QR identifies machine only; never grants private fleet access.
- One completed inspection feeds the operator record and participating hirer's inspection/defect view.
- Site recipient nominated by manager, entered by operator, remembered per site, visible at completion. No recipient means save only.
- Different site clears the previous recipient. Historical inspections are snapshots; operator location reports do not overwrite hirer placements.
- Free PDF sharing is deliberately usable. Proposed hirer pricing test: £49/month includes 25 machines, then £1/additional machine. Not validated or implemented.
- Assisted organisation admin setup and site-scoped managers remain future architecture, not pilot prerequisites.

## Demo coverage
Email signup/sign-in simulation, machine scan simulation, personal machine entry, machine identity and hirer disclosure, site/recipient confirmation, short example checklist including grease points, defect notes and optional photo filename, completed record, downloadable marked demo PDF, email preview, operator history and fleet detail with mismatch indication.

## Limitations and next packet
No production permissions, approved machine checklist, camera QR reader, real evidence storage, delivery service, immutable audit trail or backend. Photo selection retains filename only, no upload or image embedded in PDF. PDF uses ASCII text for demo portability. No shared browser/device state. Hirer switch is explicitly a demo control, never production authorisation. No check received does not imply not checked. No declaration that a machine is safe to operate.

Next: user review of connected screens; then approve the production vertical-slice implementation packet with auth, permanent machine identity/placement resolution, approved checklist and verified delivery. Deferred: wallet, induction, public site portal, site paid evidence workflow, integrations, insurers.

## Verification
JavaScript syntax checks pass. Live browser journey and responsive checks are recorded in the implementation PR. Real iPhone PWA install, full beacon motion fidelity and external services remain unverified.
