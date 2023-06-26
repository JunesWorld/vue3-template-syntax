module.exports = {
  env: {
    // JS는 browser, node 환경에서 동작한다.
    // 코드 검사
    browser: true,
    node: true
  },
  // 코드 검사를 할 기본적인 규칙
  extends: [
    // vue
    // 'plugin:vue/vue3-essential', // Lv1
    'plugin:vue/vue3-strongly-recommended', // Lv2
    // 'plugin:vue/vue3-recommended', // Lv3
    // js
    'eslint:recommended'
  ],
  // 코드 분석기
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 규칙 추가 가능
  // extends에서 설정했기 때문에 설정 skip
  rules: {
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    // self-closing
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  }
}