module.exports = {
  extends: ['eslint-config-alloy/vue', 'prettier'],
  rules: {
    'vue/component-tags-order': 0,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
