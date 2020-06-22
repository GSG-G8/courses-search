module.exports = {
    env: {
      commonjs: true,
      es6: true,
      node: true,
      "jest/globals": true,
    },
    root: true,
    extends: ["airbnb-base", "prettier", "plugin:jest/all"],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly"
    },
    parserOptions: {
      ecmaVersion: 2018
    },
    rules: { 
      "linebreak-style": 0,
      "arrow-body-style": ["error", "as-needed"],
      "no-unused-vars": "off",
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          singleQuote: true
        }
      ],
      "jest/no-hooks": [
        "error",
        {
          allow: ["beforeAll", "afterAll"],
        },
      ],
    },
    plugins: ["prettier", "jest"],
    
  };
  