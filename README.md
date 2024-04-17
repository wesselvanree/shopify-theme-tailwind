# Shopify Theme Tailwind

This repository contains a starting point for Shopify Online Store 2.0 Theme
development using [Tailwind CSS](https://tailwindcss.com) and [Vite](https://vitejs.dev).

## Workflow

- Create a feature branch
- Edit theme locally
- Commit changes to the feature branch
- Merge feature branch with main branch once feature is implemented. A production build will be created and pushed to the `dist` branch using Github Actions.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Shopify CLI](https://shopify.dev/themes/getting-started/create#step-1-install-shopify-cli)

### Installation

1. **Clone the repo and install theme**: Run the following commands:

   ```bash
   git clone git@github.com:wesselvanree/shopify-theme-tailwind.git
   cd shopify-theme-tailwind
   npm install
   npm run install-theme
   rm -rf .git && git init
   ```

   If your default branch is not called `main`, please replace `main` with your
   default branch name in `.github/workflows/deploy.yml`.

2. **Add script and link tags**: Include `index.min.css` and `index.bundle.js` in the head tag (after `base.css`) `shopify/layout/theme.liquid`

   ```liquid
   {{ 'index.min.css' | asset_url | stylesheet_tag }}
   <script src='{{ 'index.bundle.js' | asset_url }}' defer='defer'></script>
   ```

   You also need to include other script tags and styles you have added to the entries directory yourself. Vite extracts CSS for each entry to a `[name].min.css` file in the assets directory, when a stylesheet is shared between multiple entries it becomes a separate css file in the assets directory.

3. **Setup Shopify Github integration**: Once you've pushed your first commit to github, a `dist` branch will be
   created. Use the Shopify Github integration to sync your theme with the
   `dist` branch by going to `your admin dashboard` > `Online Store` >
   `Themes` > `Add Theme` > `Connect from Github`.

4. **Customize tailwind config**: By default, `tailwind.config.ts` includes custom options for the Dawn theme:

   - Prefix has been set to `tw-`
   - `rem` units of the default config are converted to a root font-size of `10px`
   - Use CSS variables set in `theme.liquid` (Dawn) in tailwind config
   - Custom screen breakpoints
   - Preflight has been disabled

## Usage

### Development

You will need 2 terminal windows:

1. Start watching for local changes

   ```bash
   npm run dev
   ```

2. Serve your Shopify theme

   ```bash
   shopify theme dev --store your-store-name.myshopify.com
   npm run shopify
   ```

If you prefer to use one single terminal window, you can customize the scripts
in `package.json` to use the [npm-run-all](https://www.npmjs.com/package/npm-run-all) package.

### Production

This repository contains a Github Action that uses
[JamesIves/github-pages-deploy-action@4.1.4](https://github.com/JamesIves/github-pages-deploy-action).
This action does not activate Github Pages in your repository but just commits
the build to another branch. Currently, the action is configured to deploy the
build to the dist branch. You can easily customize this by editing
`.github/workflows/deploy.yml`.

> :warning: Changes made from the Shopify theme editor after deployment will be committed to the `dist` branch by the Shopify Github integration. You need to manually copy these changes before updating the main branch otherwise these changes will be lost.

## Final notes

You might find it useful to copy the Lighthouse Github Action from the original
[Dawn theme](https://github.com/Shopify/dawn) repository to track the
performance of your theme on every push.

### Further reading

- [shopify.dev](https://shopify.dev)
- [Tools for building Shopify themes](https://shopify.dev/themes/tools)
- [Version control for Shopify themes best practices](https://shopify.dev/themes/best-practices/version-control)

### Suggestions

If you have any suggestions to improve this repository, please open an issue. I
would be happy to hear from you.
