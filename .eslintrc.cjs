module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['unicorn', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:astro/recommended',
    'plugin:prettier/recommended', // Prettier always goes last
  ],

  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
        'prettier/prettier': 'off',
      },
    },
  ],

  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      {
        extendDefaultAllowList: true,
        allowList: {
          env: true,
          Props: true,
        },
      },
    ],
    'unicorn/filename-case': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-redeclare': 0,
    'jsx-a11y/media-has-caption': 0,
  },
}