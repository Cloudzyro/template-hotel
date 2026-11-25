# Unslop pass

Done with the unslop skill (unslop by Damir Sokolovsky, @heydamir, CC BY 4.0) on November 25, 2026.

## Audit

Light slop: built with its own palette, type and drawn scenes, so this was polish mode. Signs found:

- `hover:scale` on every room card picture (`RoomCard.astro`)
- Small muted eyebrow labels stacked above section headings on the home page ("Dining", "Getting here") (`index.astro`, `.label` in `global.css`)
- Every room card opened on the same bed view, so the rooms grid read as equal repeated cards (`site.ts` gallery order)
- The key tag (our signature) reused as a badge for offer codes, diluting it (`offers.astro`)
- A "Newsletter" footer link that only led to the contact page, a feature the site doesn't have (`site.ts`)
- Hero intro running four long lines with a list of selling points (`site.ts`)
- Translucent sticky header letting the gallery show through behind the navigation (`Header.astro`)
- Uneven padding on the home offers list (24 top, 8 bottom)

No gradients on chrome, glows, gradient text, emoji, pill badges, uppercase tracked labels, 700+ weights, italic emphasis, trailing periods, looping motion or `transition-all` were found.

## Direction

- Product: a fourteen-room hotel on a tidal marsh in Maine, for guests choosing a room and dates, and diners booking the Long Room
- Character: unhurried, salt-weathered, plainspoken
- World: sea fog, kelp, clapboard and reeds at low tide; fog-tinted neutrals, kelp green as the one accent
- Moments: the drawn house on the marsh in the hero, and each room's drawn interior gallery with the marsh outside the window
- Signature: the room key tag (a rounded fob with a hole and the room number), used only where a room is named

## Changes

- Spacing: offers list padding evened to 24 on every side; booking widget, cards and forms on the 4px scale
- Color: header made opaque fog so nothing shows through; kelp stays on primary buttons, the current thumb and links only
- Copy: hero intro cut to one sentence of facts already on the page; "Dining" eyebrow folded into the heading ("Dinner in The Long Room"); "Getting here" eyebrow removed; the Newsletter link removed
- Type: no change needed (Libre Caslon Display only for large headlines, Hanken Grotesk at 400 and 500, tabular figures for rates, times and facts)
- Layout: room cards now open on different views (Loft Suite on its tub, the Boathouse on its dock), so the grid has variety without decoration
- Details: offer codes are plain code text, so the key tag only marks rooms
- Motion: hover scale removed from cards; only color and border transitions remain, with a small press scale on buttons

screenshot-2: Loft Suite room page with its picture gallery
screenshot-3: Harbor Room details with specs, amenities, rate and the booking widget
