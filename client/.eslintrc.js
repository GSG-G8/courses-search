module.exports = {
    extends: ["airbnb", "prettier", "prettier/react"],
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        impliedStrict: true
      }
    },
    root: true,
    env: {
      browser: true,
      node: true,
      jest: true
    },
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "prettier/prettier": "error",
      "react/state-in-constructor": 0,
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx"]
        }
      ],
      quotes: [
        2,
        "single",
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          singleQuote: true
        }
      ],
      'no-nested-ternary': [0, {allowParensWrapped: true}], // nested ternary
      'no-unused-expressions': [0, {allowParensWrapped: true}],
    },
    plugins: ["react", "prettier"]
  };
  