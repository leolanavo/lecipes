module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'svelte3',
  ],
  'rules': {
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'operator-linebreak': [ 'error', 'before' ],
    'comma-dangle': [ 'error', 'always-multiline'],
    'sort-imports': [ 'error' ],
    'no-unused-labels': ['error'],
    'no-unused-expressions': ['error'],
    'sort-imports': [ 'error', { 'allowSeparatedGroups': true }],
    '@typescript-eslint/no-explicit-any': 0,
  },
  'overrides': [ 
    {
      'files': ['*.svelte'],
      'processor': 'svelte3/svelte3',
    }
  ],
  'settings': {
    'svelte3/ignore-styles': () => true,
    'svelte3/typescript': true,
  },
};
