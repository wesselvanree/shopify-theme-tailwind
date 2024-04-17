import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./shopify/**/*.liquid', './src/**/*.{tsx,ts,jsx,js}'],
  prefix: 'tw-',
  theme: {
    columns: replaceRem(defaultTheme.columns),
    spacing: replaceRem(defaultTheme.spacing),
    borderRadius: replaceRem(defaultTheme.borderRadius),
    fontSize: replaceRem(defaultTheme.fontSize),
    lineHeight: replaceRem(defaultTheme.lineHeight),
    maxWidth: replaceRem(defaultTheme.maxWidth),
    extend: {
      fontFamily: {
        body: 'var(--font-body-family)',
        heading: 'var(--font-heading-family)',
      },
      colors: {
        text: 'rgba(var(--color-base-text), <alpha-value>)',
        accent1: 'rgba(var(--color-base-accent-1), <alpha-value>)',
        accent2: 'rgba(var(--color-base-accent-2), <alpha-value>)',
        background1: 'rgba(var(--color-base-background-1), <alpha-value>)',
        background2: 'rgba(var(--color-base-background-2), <alpha-value>)',
      },
      screens: {
        md: '750px',
        lg: '990px',
        xl: '1400px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

/**
 * Recursively replace all `rem` values from root font-size 16px to root font-size `10px`.
 *
 * @template T
 * @param {T} value value to convert, all rem values are assumed to be based on a root font-size of `16px`
 * @returns {T} value with all rem values converted to a root font-size of `10px`
 */
function replaceRem(value) {
  if (value == null) {
    return value
  } else if (Array.isArray(value)) {
    return value.map(replaceRem)
  } else if (typeof value === 'object') {
    return Object.entries(value).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: replaceRem(value) }),
      {}
    )
  } else if (typeof value === 'function') {
    return (...args) => replaceRem(value(...args))
  } else if (typeof value === 'string' && value.endsWith('rem')) {
    const originalValue = parseFloat(value.replace('rem', ''))
    return `${(originalValue * 16) / 10}rem`
  }

  return value
}
