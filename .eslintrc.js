module.exports = {
  extends: [
    // "plugin:@react-three/recommended",
    require.resolve('@umijs/max/eslint'),
  ],
  "rules": {
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
        allowedNames: ['scope', 'self'], // Allow `const self = this`; `[]` by default
      },
    ],
  },
};
