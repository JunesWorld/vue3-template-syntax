# Vue3-webpack-template

## Package Install

```bash
npm i vue@next
npm i -D vue-loader@next vue-style-loader @vue/compiler-sfc
npm i -D file-loader
npm i -D eslint eslint-plugin-vue babel-eslint
```

## webpack.config.js 수정

module/rules
- vue라는 확장자를 가지고 있는 파일을 필터링해서 vue-loader가 실행될 수 있게 설정
- file을 읽을 수 있는 file-loader

test
- style부분이 해석 될 수 있게 vue-style-loader 추가

전역 모듈
- VueLoader에서 Plugin을 가져와 해당 내용을 plugins에서 생성자 함수를 실행하도록 설정

module.exports/resolve
- 경로 명시 시 확장자 생략할 수 있게 함
- alias: 경로별칭 사용하면 해당 경로로 바로 jump
  ```Javascript
  // alias=경로별칭
    // ~ 사용하면 해당 경로로 바로 jump
    alias: {
      '~': path.resolve(__dirname, 'src'), // 폴더가 모여 있는 경로
      'assets': path.resolve(__dirname, 'src/assets') // 실제 이미지가 있는 경로
    }
  },
  ```

## 시작하기

```HTML
<body>
  <div id="app"></div>
</body>
```

```Javascript
// CDN
// import Vue from 'vue'

// CLI
// Vue 객체가 없다
import { createApp } from 'vue'
import App from './App.vue'

// HTML에서 app이라는 값을 가지고 있는 해당 요소에 vue 프로젝트 연결
// 1. CDN
//Vue.createApp(App).mount('#app')

// 2. CLI
createApp(App).mount('#app')
```

```bash
npm run dev
```

## Code 검사 : .eslintrc.js 파일 생성

Google 
- vue3 eslint검색 
  - vue/html-closing-bracket-newline</br>
- eslint rules

VScode
- 파일 저장 시 eslint 규칙에 맞게 수정하겠다.
- Cmd + shift + p : eslint - Edit in settings.json (Preferences:Open Settings(JSON))
  ```JS
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
  ```

!! eslint 활성화 및 settings 해결 !!
- Extensions : ESLint 
- Parsing Error
  ```npm install @babel/eslint-parser --save-dev```
- 재부팅

## eslint Branch 생성

Github 저장소에 eslint branch 생성 후 명령어 

```bash
npx degit JunesWorld/vue3-webpack-template#eslint vue3-practice
cd vue3-practice
code . -r
npm install
```

## 반응성(Reactivity)

데이터를 정의하고 그것을 갱신할 수 있는 이벤트의 핸들러를 만듬

- count data를 갱신하면 연결된 화면도 갱신
- data에 숫자 0을 넣어 초기화하여 화면에 출력
- increase라는 함수를 만들어 함수가 실행될 때마다 count data를 this라는 키워드로 접근하여 숫자 1씩 증가시킴(this = App.vue 파일의 script 부분)
- increase는 this로 count에 접근하여 실행되면 1씩 증가시키는데 h1 tag를 클릭하면 화면에 출력


```html
<template>
  <h1 @click="increase">
    {{ count }}
  </h1>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increase() {
      this.count += 1
    }
  }
}
</script>
```


## Module 호환 Error
