# AODS icons - tiers 1 and 2

40 marks: 35 house marks drawn on the angular outline geometry, 5 supplied brand marks.

## Geometry (house marks)

24 x 24 grid, 2.5-unit stroke, butt caps, mitred joins, live area 1.5 -> 22.5 (0.25 units of
ink margin). Zero radius. Curves are permitted only where the subject is round: the search
lens and the enclosures on error, info, success and help.

## Status ruling (2026-08-22)

| status | mark |
| --- | --- |
| error | circle + X |
| info | circle + i |
| success | circle + check |
| warning | triangle + bar |
| emergency | octagon + bar |

No two statuses share a silhouette. `close` is a bare X and never sits in an enclosure, so it
cannot be read as error. `clear` is a backspace hexagon, not a close - clearing a field and
dismissing a thing are different acts.

## Brand marks

social-facebook, social-instagram, social-linkedin, social-x, social-youtube - supplied artwork, filled and unstroked. Exempt from every geometry
rule above. Do not restyle them into the house hand.

## Not in this package

`flag-us` and `gov-building` belong to the identity band's former artwork; they are not in this release.
Tier 3 (20 marks) and tier 4 (6 domain marks) are out of this release.

## Files

| File | What |
| --- | --- |
| `<name>.svg` | one standalone file per mark |
| `sprite.svg` | one `<symbol id="aods-<name>">` per mark; brand symbols carry their own fill |
| `icon-data.js` | `{ viewBox, kind, body }` keyed by name, plus the `stroke` contract |
| `AodsIconV4.jsx` | React renderer; switches fill/stroke on `kind` |

## The set

**house** (35) - search, close, menu, chevron-down, chevron-up, chevron-right, check, warning, error, info, success, emergency, download, lock, arrow-left, arrow-right, external, clear, copy, thumb-up, thumb-down, retry, send, help, calendar, upload, file, sort, sort-asc, sort-desc, chevrons-left, chevrons-right, filter, print, quote

**brand** (5) - social-facebook, social-instagram, social-linkedin, social-x, social-youtube
