# Logos

The system's mark: an X of two 45° bars on a square, the forward bar stopping short where it crosses (8 units of clearance each side). Square corners and 45° cuts only, on a 48 × 48 grid, legible from 24px.

- `AODS_Logo_Dark.svg`: the mark in body ink (#262321), for light grounds.
- `AODS_Logo_Light.svg`: the mark in cream (#fff7f2), for dark grounds and photographs.
- `logo-paths.txt`: the three bare `<path>` elements the header and footer draw inline inside `<svg class="aods-header__logo" viewBox="0 0 48 48">`.

In a page the header and footer draw the mark inline, filled by `--c-header-logo-fill` and `--c-footer-logo-fill`, so it follows the surface. Each theme's own mark lives in `assets/identity/` and is named in its theme file (`themes/<id>.json`, `identity`); the template generator bakes the house mark into every identity slot, and `theme.js` swaps in another theme's mark. These files are the house mark's geometry, kept for use outside a page.
