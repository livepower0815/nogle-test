module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
