# Shopify Theme Tailwind CSS

This repo is a starting point for Shopify Theme development using Tailwind CSS.
The repo starts with the default Dawn theme.

## Installation

Clone this repo. Then run:

```bash
npm install
```

Make sure the `assets/index.css` output file is included in the
`layout/theme.liquid` file. Add this line of code under the base.css link tag.

```liquid
<!-- line 98 -->
{{ 'index.css' | asset_url | stylesheet_tag }}
```
