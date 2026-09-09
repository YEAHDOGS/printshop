# Car seat gap filler — product research (2026-09-09)

Brandon's pain point, word for word: things fall out of his pockets into the
gap between the car seat and the center console. The wedge that sits in that
gap and stops it.

## Retail price points (sources labeled)

Amazon.com category page "Car Seat Gap Filler 2 Pack"
(https://www.amazon.com/car-seat-gap-filler-2-pack/s?k=car+seat+gap+filler+2+pack,
crawled 2026):
- Best seller in Automotive Trays & Bags: **1K+ bought in past month**.
- Typical 2-pack range: **$9.90–$24.99** (amazon.ca listings, same products
  sell on amazon.com):
  - No-name 2-pack, no-drop guard: **$9.90**
    (https://www.amazon.ca/dp/B0F1LCFNBY/ref=as_li_ss_tl)
  - Nizivdy 2-pack, TPE, 40.9×6.5×3.5 cm: **$10.98**
    (https://www.amazon.ca/dp/B0G23YNNYQ/ref=cm_sw_r_apin_lstpd_A9EED4NF5AW36KXZWS61_1)
  - Homaupt 2-pack PU leather: **$15.98**
    (https://www.amazon.ca/dp/B0F1LCFNBY/ref=as_li_ss_tl)
  - FOLUMAD 2-pack w/ phone holder, soft polyurethane: **$16.99**
    (https://www.amazon.ca/dp/B0FKYJ1SGR/ref=pd_rhf_dp_s_pd_sbs_rvi_d_sccl_2_3)
  - Givifive 2-pack soft foam w/ organizer + hook: **$24.99**
    (https://www.amazon.ca/dp/B0CBJTXH64/ref=cm_sw_r_cso_fm_apin_dp_QQJCZAZS4TZ6Y4G46J7Z?peakEvent=2&skipTwisterOG=1)

Key material fact: **every retail winner is soft foam** (TPE, PU foam, PU
leather over foam). Soft, compressible, won't scratch the interior. A rigid
plastic wedge is NOT the same product experience.

## Free STL competition (sources labeled)

- "Car Seat Gap Organizer" by Mocodroid, Printables (free)
  (https://www.printables.com/model/52411-car-seat-gap-organizer):
  organizer-style with cup holder, 250mm and 200mm lengths, printed in PETG
  at 0.2mm / 15% infill. Author's own warning: use filament with a **high
  glass-transition temperature — PLA will melt in a parked car in summer**.
- Cults3D lists 154 free car-seat-related models
  (https://cults3d.com/en/tags/car+seat) — mostly organizers, mounts, and
  accessories, not the simple soft wedge.
- Etsy precedent for STL *sales*: "Car Seat Trash Bin STL File" digital
  download listing exists and sells
  (https://www.etsy.com/listing/4542338783/car-seat-trash-bin-stl-file-3d-printable)
  — people do pay for car-accessory STLs.

Nobody is selling a plain parametric soft-wedge STL as a flagship product.
The free stuff is organizer gadgets; the retail stuff is foam.

## FDM print economics for a ~41 cm wedge

Reference dimensions from retail: 41 × 6.5 × 3.5 cm.

- Filament: at 15% infill + 3 walls, roughly **120–180 g** per wedge.
  At $20–25/kg → **$2.50–$4.50 material cost**.
- **Bed-size problem: 410 mm does not fit a standard 220 mm bed.**
  The wedge must be split into 2 pieces with alignment pins and glued/bolted.
  (The repo's `assets/seat-gap-filler.scad` has a split mode for exactly this.)
- Print time: ~6–10 h per half at 0.2 mm → **12–20 h total printer time**
  per unit, before cleanup and assembly.
- Material feel problem: PLA/PETG print rigid; the retail product wins on
  softness. TPU approximates foam but prints slower, stringier, and needs a
  direct-drive extruder.

## Brutal-honest verdict

**Print-on-demand physicals LOSE to retail on this product.** A $10–$17
injection-molded foam pair, Prime-shipped, cannot be beaten by a 15-hour
two-piece rigid print that feels worse in the hand. Do not race Amazon foam
to the bottom.

Two lanes where this product CAN win:

1. **STL file sales (recommended):** a *parametric* wedge people size to
   their exact car (length/width/height/taper parameters — retail is
   one-size-fits-most). Digital product, ~$5–15, pure margin, no printer,
   no shipping, no inventory. Etsy/Cults precedent exists.
2. **Redesigned physical:** don't copy the foam wedge — out-feature it.
   The Mocodroid-style organizer (phone slot, cup holder, cable hole) is a
   product foam can't be. Printed-on-demand at a premium ($25–40) for
   people who want the gadget version, or not at all.

Recommendation: launch the parametric STL first (this repo). Add
printed-on-demand later only via a fulfillment partner or once a printer
is in-house — never as the opening move against $10 foam.
