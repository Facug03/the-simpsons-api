module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'standard'],
  parser: '@typescript-eslint/parser',
  plugins: [],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    semi: ['warn', 'never'],
    'no-eval': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'space-before-function-paren': 'off',
    'no-useless-constructor': 'off'
  },
  overrides: [
    {
      files: ['scripts/**'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['tests/**'],
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'vitest/expect-expect': 'off',
        'vitest/no-standalone-expect': 'off'
      }
    },
    {
      files: ['tests/performance/**'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'no-undef': 'off'
      }
    }
  ]
}
