// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier'); // <-- importujemy config Prettiera
const pluginPrettier = require('eslint-plugin-prettier'); // <-- plugin Prettiera

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: pluginPrettier, // <-- dodajemy plugin
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier, // <-- wyłącza kolidujące reguły ESLint-a
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'prettier/prettier': 'error', // <-- sprawdza zgodność z Prettierem
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  }
);
