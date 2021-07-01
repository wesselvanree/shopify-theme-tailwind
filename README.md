# Shopify Theme Tailwind CSS

This repo contains a starting point for Shopify Online Store 2.0 Theme
development using Tailwind CSS and the default Dawn theme.

> :bulb: NOTE: On june 29, Shopify introduced a new git-based workflow. To learn
> more, visit the
> [create a theme](https://shopify.dev/themes/getting-started/create) guide or
> visit [shopify.dev](https://shopify.dev).

## Prerequisites

- The
  [shopify CLI](https://shopify.dev/themes/getting-started/create#step-1-install-shopify-cli)
  is installed on your machine.

## Things to keep in mind

Using the built-in Shopify code editor would not be effective when using file
transformations like this. The changes made by your merchant in the code editor
would be overridden when you push new changes. Shopify suggests a solution to
this called
[just-in-time transformations](https://shopify.dev/themes/best-practices/file-transformation).

I'm currently looking into this, if anyone has a suggestion on how to do this
using the Github integration, please open an issue.

## Installation

Run the following commands:

```bash
git clone git@github.com:wesselvanree/shopify-theme-tailwind.git
cd shopify-theme-tailwind
npm install
```

Make sure the `assets/index.css` output file is included in the
`layout/theme.liquid` file. Add this line of code under the base.css stylesheet
tag.

```liquid
<!-- line 98 -->
{{ 'index.css' | asset_url | stylesheet_tag }}
```

## Usage

### Development

First, log in to you store if you weren't already logged in.

```bash
shopify login --store store-name.myshopify.com
```

After that, run `shopify theme serve`. This will start the shopify theme dev
server

In a separate terminal, run `npm start`. This command will watch your files and
build on change.

I have not found a solution to run both commands at the same time. If you have
any suggestions please open an issue, I would be happy to hear from you.

### Production

To build for production, run `npm run build`. To publish this build to your
store, you can use the
[Shopify Github integration](https://shopify.dev/themes/getting-started/create#step-6-install-the-shopify-github-integration-and-connect-your-branch-to-your-store).

## Suggestions

If you have any suggestions to improve this repo, please open an issue. I would
be happy to hear from you.
