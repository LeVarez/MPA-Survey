module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "svelte3",
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    {
      "files": ["*.svelte"],
      "processor": "svelte3/svelte3"
    }
  ],
  "rules": {
    "semi": "error",
    "no-mixed-spaces-and-tabs": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    "no-irregular-whitespace": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-tabs": "error",
    "indent": ["error", 2],
    "max-len": ["error", {
      "code": 120,
      "ignoreUrls": true,
      "ignoreRegExpLiterals": true

    }],
    "eqeqeq": ["error", "always"],
    "no-multi-spaces": "error",
    "space-infix-ops": "error",
    "space-unary-ops": [
      "error", {
        "words": true,
        "nonwords": false
      }
    ]
  },
  "settings": {
    "svelte3/typescript": true,
    "svelte3/ignore-styles": () => true
  }
};
