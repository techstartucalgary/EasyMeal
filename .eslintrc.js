module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:jsx-a11y/recommended', 'prettier'],
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'prettier',
    'react-hooks',
    'react-native',
  ],
  rules: {
    semi: 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    'global-require': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-key': [2, { checkFragmentShorthand: true }],
    'react/jsx-fragments': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/function-component-definition': [
      1,
      {
        namedComponents: [
          'function-declaration',
          'function-expression',
          'arrow-function',
        ],
        unnamedComponents: ['function-expression', 'arrow-function'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'newline-after-var': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80,
        bracketSameLine: false,
        trailingComma: 'all',
        endOfLine: 'lf',
      },
    ],
    'eol-last': ['error', 'always'],
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'warn',
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-restricted-exports': 'off',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'no-useless-constructor': 'off',
        'no-undef': 'off',
        'no-shadow': 'off',
        'react/prop-types': 'off',
        'no-use-before-define': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
    },
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
  },
};
