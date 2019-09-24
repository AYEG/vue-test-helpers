module.exports = {
  'extends': [
    '@vue/typescript',
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript',
  ],
  'plugins': [
    'chai-friendly',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
  },
  'overrides': [{
    files: ['src/**/*.tsx', 'src/**/*.vsx'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  }],
  root: true,
  env: {
    node: true,
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'one-var': 0,

    'import/first': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // always require a comma at the end in multiline
    'comma-dangle': ['error', 'always-multiline'],
    // when the parameters of a function are on multiple lines, always one argument per line
    'function-paren-newline': ['error', 'multiline'],
    // always place a space between a function name and params
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true,
    }],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': 'block-like',
        'next': '*',
      },
    ],
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'vue/max-attributes-per-line': [2, {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always',
    }],
    'vue/html-closing-bracket-spacing': ['error'],
    'vue/prop-name-casing': ['error'],
  },
}
