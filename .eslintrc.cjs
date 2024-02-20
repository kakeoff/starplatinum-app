module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    parser: {
      js: 'espree',
      ts: '@typescript-eslint/parser',
      '<template>': 'espree'
    }
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 'off',
    'no-debugger': 'off',
    'no-plusplus': 'off',
    'vue/script-setup-uses-vars': 1,
    'no-return-await': 'warn',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true
      }
    ]
  }
}
