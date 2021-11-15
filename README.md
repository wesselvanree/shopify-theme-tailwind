# Shopify Theme Tailwind CSS

This repository contains a starting point for Shopify Online Store 2.0 Theme
development using Tailwind CSS and the default Dawn theme.

> :bulb: On june 29, 2021, Shopify introduced a git-based workflow. To learn
> more, visit the
> [create a theme guide](https://shopify.dev/themes/getting-started/create) or
> visit [shopify.dev](https://shopify.dev).

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
- The tailwind `normalize.css` breaks some default styling of the Dawn theme.

## Getting started

### Prerequisites

- [Shopify CLI](https://shopify.dev/themes/getting-started/create#step-1-install-shopify-cli)
- [Node.js](https://nodejs.org/)

### Installation

Run the following commands:

```bash
git clone git@github.com:wesselvanree/shopify-theme-tailwind.git
cd shopify-theme-tailwind
rm -rf .git
git init
npm install
```

Make sure the `shopify/assets/index.css` output file is included in the
`shopify/layout/theme.liquid` file. Add this line of code under the base.css
stylesheet tag.

```liquid
<!-- line 113 -->
{{ 'index.css' | asset_url | stylesheet_tag }}
```

The same holds for all `.bundle.js` files created by Webpack. You need to insert
the script tags on the places where you want to use the Webpack bundle.

Once you've made your first commit, a dist branch will be created on Github. Use
the Shopify Github integration to sync your theme with the dist branch by going
to `your admin dashboard` > `Online Store` > `Themes` > `Add Theme` >
`Connect from Github`.

### Using React

To use React, install the following packages:

```
npm install react react-dom
```

Now you can use React in your javascript files.

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

2. Compile your code: in a separate terminal window, run `npm start` to start
   watch for file changes and build development bundles.

If you prefer to use one single terminal window, you can customize the scripts
in `package.json`.

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

## Example using React

First, install `react` and `react-dom`:

```
npm install react react-dom
```

When using typescript, also install types:

```
npm install --save-dev @types/react @types/react-dom
```

Then paste the following code inside `src/entries/index.js`:

```js
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(prevCount => prevCount + 1)
  }

  const decrease = () => {
    setCount(prevCount => prevCount - 1)
  }

  return (
    <div className="px-5 py-28 max-w-md mx-auto">
      <h2 className="text-5xl font-bold">React example</h2>
      <p className="text-3xl font-semibold">
        Count: <span className="text-blue-600">{count}</span>
      </p>
      <div className="mt-8">
        <button
          onClick={decrease}
          className="py-2 px-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors mr-2"
        >
          Decrease
        </button>
        <button
          onClick={increase}
          className="py-2 px-8 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Increase
        </button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('react-root'))
```

Now we need to add the `react-root` element and `index.bundle.js` to a template
to use it. I will add it to `layout/theme.liquid`:

```html
<!-- line 24 -->
<script src="{{ 'index.bundle.js' | asset_url }}" defer="defer"></script>

...

<!-- line 118 -->
<div id="react-root"></div>

...
```

And now you can enjoy your React component.

## Final notes

### Further reading

- [shopify.dev](https://shopify.dev)
- [Tools for building Shopify themes](https://shopify.dev/themes/tools)
- [Version control for Shopify themes best practices](https://shopify.dev/themes/best-practices/version-control)

### Suggestions

If you have any suggestions to improve this repository, please open an issue. I
would be happy to hear from you.
