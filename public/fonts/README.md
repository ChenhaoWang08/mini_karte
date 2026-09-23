# Mini Karte local font assets

All fonts in this directory are bundled locally. The application does not use
a remote font CDN and does not require the preferred families to be installed
on the host operating system.

## Russo One

- Role: display headings and major Russian celestial names
- Bundled weight: 400 Regular
- Format: TTF
- Source: [Google Fonts official repository](https://github.com/google/fonts/tree/e44c4b011a820c2cbe2fd2cfa8052037d7edb571/ofl/russoone)
- Upstream revision: `e44c4b011a820c2cbe2fd2cfa8052037d7edb571`
- Source path: `ofl/russoone/RussoOne-Regular.ttf`
- License: SIL Open Font License 1.1; see `russo-one/OFL.txt`

Google Fonts' reviewed Russo One directory publishes TTF rather than an
upstream WOFF2 asset. The official TTF is retained instead of using a mirror or
creating a renamed derivative of a font with a Reserved Font Name.

## IBM Plex

- Roles: interface, body text, and scientific data
- Bundled families and weights:
  - IBM Plex Sans Condensed: 400 Regular, 500 Medium, 600 SemiBold
  - IBM Plex Sans: 400 Regular, 500 Medium
  - IBM Plex Mono: 400 Regular, 500 Medium, 600 SemiBold
- Format: complete-character-set WOFF2
- Source: [IBM Plex official repository](https://github.com/IBM/plex/tree/763c36ef9117782905ae010056dfbe8fd2653a25/packages)
- Upstream revision: `763c36ef9117782905ae010056dfbe8fd2653a25`
- Source paths: `packages/plex-*/fonts/complete/woff2/`
- License: SIL Open Font License 1.1; see `ibm-plex/OFL.txt`

The complete WOFF2 builds are used so the Russian/English workstation UI is
covered by the same family rather than switching to a fallback for Cyrillic.

## SHA-256 checksums

```text
bc0abcc660bd8b7ad3000ecb2898a27c58a29a50f7ec81652fa12e75148d09df  russo-one/RussoOne-Regular.ttf
a71a56e516751883cb7877112d39f9c13b92c2dc15caaf00277b7f9d941d673a  ibm-plex/sans-condensed/IBMPlexSansCondensed-Regular.woff2
eb93da02ace70c39e4c4e811b8b02dd5f5d4804d186202d6668bea60d22f57d0  ibm-plex/sans-condensed/IBMPlexSansCondensed-Medium.woff2
385a082a1eac88343eab01fb6746be04b7175dacaf4550b17dee76ea0f78126d  ibm-plex/sans-condensed/IBMPlexSansCondensed-SemiBold.woff2
ba711a3085ff9f27440b6b9c4550cfc47c97bf36591d5da958b975bb3add8c1a  ibm-plex/sans/IBMPlexSans-Regular.woff2
5660f8a658f8bb50dbc005232f885eadffd2bc1c235c4f6fbb63469d1f9cde6d  ibm-plex/sans/IBMPlexSans-Medium.woff2
ba204497f16b6d334cee9d1e963a831b73e3a56e1d6300a8489d18df7214b350  ibm-plex/mono/IBMPlexMono-Regular.woff2
33faf307fa6031fb4062276d7320a6d632de890cbb347576fd80cfa01077bc25  ibm-plex/mono/IBMPlexMono-Medium.woff2
6a825b4824c01cbb401e829e5a066a1818411bcb3538b5a5792c5ca9b82343c3  ibm-plex/mono/IBMPlexMono-SemiBold.woff2
```
