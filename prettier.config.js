import svelte from 'prettier-plugin-svelte';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  plugins: [svelte],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
