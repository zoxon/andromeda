module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss'), require.resolve('prettier-plugin-astro')],
  singleQuote: true,
  semi: false,
  proseWrap: 'never',
  printWidth: 120,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
