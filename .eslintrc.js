module.exports = {
  extends: [
    '@lego/eslint-config-typescript',
    '@lego/eslint-config-prettier',
  ],
  rules: {

  },
  overrides: [
    {
      files: ['*.test.{ts,tsx}'],
      rules: {
        'max-nested-callbacks': ['warn', 4],
        'max-lines': ['warn', 200],
        'max-lines-per-function': ['warn', 200],
        'max-statements': ['warn', 50],
      },
    },
  ],
};

