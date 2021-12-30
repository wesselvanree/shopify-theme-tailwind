# Shopify Theme Tailwind CSS

This repository contains a starting point for Shopify Online Store 2.0 Theme
development using Tailwind CSS and the default Dawn theme.

> :warning: It is possible to use React with this configuration, but
> [Hydrogen](https://hydrogen.shopify.dev/) might be more useful because it
> provides a lot of features out-of-the-box.

## Workflow

A short description of this workflow:

- Edit theme locally using the Shopify CLI, Tailwind and Webpack
- Commit changes to feature branch
- Merge feature branch with main branch once feature is implemented
- Automatically publish the production build to the `dist` branch using Github
  Actions
- Shopify automatically syncs with the `dist` branch.

### Technologies used

- Tailwind CSS
  - The main css file is located in `src/index.css`
  - This file will be built to `shopify/assets/index.css`
- Webpack
  - All `src/entries/**/*.{js,jsx,ts,tsx}` files will be sourced as webpack
    entry and the output file can be found in the `assets` directory. All build
    bundles get the extension `.bundle.js` instead of `.{js,jsx,ts,tsx}`.
- Shopify CLI
- Github Actions to deploy the theme to the dist branch on push to the main
  branch
- Github Actions to test for build errors on every Pull Request

You can copy the Lighthouse Github Action from the original
[Dawn theme](https://github.com/Shopify/dawn) repository to track the
performance of your theme on every push.

### Disadvantages

- Because an extra build step is involved, you need to manually copy changes
  made in the Shopify theme editor. Those changes will be committed to the
  `dist` branch.
- TailwindCSS preflight breaks some default styles of the Dawn theme.

## Getting started

### Prerequisites

- [Shopify CLI](https://shopify.dev/themes/getting-started/create#step-1-install-shopify-cli)
- [Node.js](https://nodejs.org/)

### Installation

1. Run the following commands:

   ```bash
   git clone git@github.com:wesselvanree/shopify-theme-tailwind.git
   cd shopify-theme-tailwind
   npm install
   npm run install-theme
   rm -rf .git && git init
   ```

   You can remove all `install-theme:*` scripts from your `package.json` because
   you will not need them anymore.

2. Make sure the TailwindCSS output file (`shopify/assets/index.css`) is
   included in the `head` of your `shopify/layout/theme.liquid` file.

   ```liquid
   {{ 'index.css' | asset_url | stylesheet_tag }}
   ```

   The same holds for all `.bundle.js` files created by Webpack. You need to
   insert the script tags on the places where you want to use the Webpack
   bundle. You can do this with the following line of code:

   ```liquid
   <script src="{{ '[your_script_name].bundle.js' | asset_url }}" defer="defer"></script>
   ```

3. Once you've pushed your first commit to github, a `dist` branch will be
   created. Use the Shopify Github integration to sync your theme with the
   `dist` branch by going to `your admin dashboard` > `Online Store` >
   `Themes` > `Add Theme` > `Connect from Github`.

## Usage

### Development

You will need 2 terminal windows:

1. Serve your Shopify theme

   - First, log in to your store if you was not logged in already.
     ```bash
     shopify login --store your-store-name.myshopify.com
     ```
   - Serve your theme to your development store
     ```bash
     npm run shopify
     ```

2. Build your code: in a separate terminal window, run `npm start` to start
   watch for file changes and build development bundles.

If you prefer to use one single terminal window, you can customize the scripts
in `package.json` to use the `npm-run-all` package.

### Production

This repository contains a Github Action that uses
[JamesIves/github-pages-deploy-action@4.1.4](https://github.com/JamesIves/github-pages-deploy-action).
This action does not activate Github Pages in your repository but just commits
the build to another branch. Currently, the action is configured to deploy the
build to the dist branch. You can easily customize this by editing
`.github/workflows/deploy.yml`.

Alternatively, you can create the build manually. Run `npm run build` to build
for production. You can use the
[Shopify Github integration](https://shopify.dev/themes/getting-started/create#step-6-install-the-shopify-github-integration-and-connect-your-branch-to-your-store)
to track a branch in your Github repository.

## Final notes

### Further reading

- [shopify.dev](https://shopify.dev)
- [Tools for building Shopify themes](https://shopify.dev/themes/tools)
- [Version control for Shopify themes best practices](https://shopify.dev/themes/best-practices/version-control)

### Suggestions

If you have any suggestions to improve this repository, please open an issue. I
would be happy to hear from you.

```

```
