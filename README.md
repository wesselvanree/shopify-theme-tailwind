# Shopify Theme Tailwind CSS

This repository contains a starting point for Shopify Online Store 2.0 Theme
development using Tailwind CSS and Vite.

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

1. Run the following commands:

   ```bash
   git clone git@github.com:wesselvanree/shopify-theme-tailwind.git
   cd shopify-theme-tailwind
   npm install
   npm run install-theme
   rm -rf .git && git init
   ```

   If your default branch is not called `main`, please replace `main` with your
   default branch name in `.github/workflows/deploy.yml`.

2. Make sure the TailwindCSS output file (`shopify/assets/index.min.css`) is
   included in the `head` of your `shopify/layout/theme.liquid` file.

   ```liquid
   {{ 'index.min.css' | asset_url | stylesheet_tag }}
   ```

   The same holds for all `.bundle.js` files created by Vite. You need to
   insert the script tags on the places where you want to use the bundle. For example, you could insert the `index.bundle.js` using:

   ```liquid
   <script src='{{ 'index.bundle.js' | asset_url }}' defer='defer'>
   </script>
   ```

3. Once you've pushed your first commit to github, a `dist` branch will be
   created. Use the Shopify Github integration to sync your theme with the
   `dist` branch by going to `your admin dashboard` > `Online Store` >
   `Themes` > `Add Theme` > `Connect from Github`.

## Usage

### Development

You will need 2 terminal windows:

1. Start watching for local changes

   ```bash
   npm run dev
   ```

2. Serve your Shopify theme

   ```bash
   shopify login --store your-store-name.myshopify.com
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
