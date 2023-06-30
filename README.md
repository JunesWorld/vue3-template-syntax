# Vue3 문법

## 보간법

데이터 바인딩의 가장 기본적인 형태는 "Mustache"(이중 중괄호) 문법을 사용한 텍스트 보간법입니다.

```html
<span>메세지: {{ msg }}</span>
```

이중 중괄호 태그 내 msg는 해당 컴포넌트 인스턴스의 msg 속성의 값으로 대체됩니다. 또한 msg 속성이 변경될 때마다 업데이트됩니다.</br>

v-once 디렉티브를 사용하여 데이터가 변경되어도 갱신되지 않는 일회성 보간을 수행할 수 있습니다.

## HTML 출력

```html
<p>텍스트 보간법 사용: {{ rawHtml }}</p>
<p>v-html 디렉티브 사용: <span v-html="rawHtml"></span></p>
```
웹사이트에서 임의의 HTML을 동적으로 렌더링하면 XSS 취약점이 쉽게 발생할 수 있으므로 매우 위험할 수 있습니다. 신뢰할 수 있는 컨텐츠에만 v-html을 사용하고 사용자가 제공한 컨텐츠에는 절대 사용하지 마세요.

## 속성 바인딩

이중 중괄호는 HTML 속성(attribute) 내에서 사용할 수 없습니다. 대신 v-bind 디렉티브를 사용하세요:
```html
<div v-bind:id="dynamicId"></div>
```
v-bind 디렉티브는 엘리먼트의 id 속성을 컴포넌트의 dynamicId 속성과 동기화된 상태로 유지하도록 Vue에 지시합니다. 바인딩된 값이 null 또는 undefined이면 엘리먼트의 속성이 제거된 상태로 렌더링 됩니다.

```html
<div :id="dynamicId"></div>
```
v-bind는 매우 일반적으로 사용되기 때문에 전용 단축 문법이 있습니다:

## v-on 약어

```html
<!-- 전체 문법 -->
<a v-on:click="doSomething">...</a>
<!-- 약어 -->
<a @click="doSomething">...</a>
```

## 템플릿 문법

```html
<!-- 보간법 -->
<!-- v-once: Data를 화면에 한번만 렌더링하고 갱신x : 반응성 x-->
<!-- 동적 전달 인자 attr = attribute -->
<template>
  <!-- <h1 
    v-once
    @click="add">
    {{ msg }}
  </h1> -->
  <!-- XSS 취약점이 쉽게 발생할 수 있으므로 매우 위험할 수 있습니다. -->
  <!-- <h1 v-html="msg"></h1> -->
  <h1 
    :[attr]="'active'"
    @[event]="add">
    {{ msg }}
  </h1>
</template>

<script>
export default {
  data() {
    return {
      // msg: '<div style="color: red;>Hello!!</div>'
      msg: 'active',
      attr: 'class',
      event: 'click'
    }
  },
  methods: {
    add() {
      this.msg += '!'
    }
  }
}
</script>

<style>
  .active {
    color: royalblue;
    font-size: 100px;
  }
</style>
```

## Computed

App.vue
```html
<template>
  <Fruits />
</template>

<script>
import Fruits from '~/componets/Fruits'

export default {
  components: {
    Fruits
  }  
}
</script>
```

Fruits.vue
```html
<template>
  <!--
  [v-if] : 조건문
  <section v-if="fruits.length > 0">
  -->
  <section v-if="hasFruit">
    <h1>Fruits</h1>
    <ul>
      <!-- 
        [v-for] : 배열 데이터 반복 화면에 출력
        key : 고유한 값 바인딩 / 실제 데이터로 읽혀야하기 때문에 v-bind 약어인 : 사용
        {{ fruit }} : fruit 데이터 출력
        App.vue 파일에 연결
      -->
      <li
        v-for="fruit in fruits"
        :key="fruit">
        {{ fruit }}  
      </li>
    </ul>
  </section>
  <section>
    <h1>Reverse Fruits</h1>
    <ul>
      <li
        v-for="fruit in reverseFruits"
        :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fruits: [
        'Apple', 'Banana', 'Cherry'
      ]
    }
  },
  // computed : 계산된 데이터
  // data 옵션에 적의해 놓은 특정한 데이터를 추가적으로 연산을 해 새로운 데이터로 반환
  computed: {
    hasFruit() {
      // this = fruits 객체 데이터('Apple', 'Banana', 'Cherry')
      // 길이가 0 보다 큰 boolean 데이터 반환
      // true
      return this.fruits.length > 0
    },
    reverseFruits() {
      return this.fruits.map(fruit => {
        // 'Apple' =>(split) ['A','p',...]
        // =>(reverse) ['e','l','p',...] =>(join) 'elppA'
        return fruit.split('').reverse().join('')
      })
    }
  }
}
</script>
```

## Computed 캐싱 & Getter/Setter
```html
<template>
  <!-- Methods
  <h1>{{ reverseMessage() }}</h1>
  <h1>{{ reverseMessage() }}</h1>
  <h1>{{ reverseMessage() }}</h1>
  <h1>{{ reverseMessage() }}</h1> -->

  <!-- 
    computed : 계산된 데이터(캐싱) 
    - 첫번째에서 계산한 값 두번째부터 그대로 반복 사용
    - 데이터 최적화
  -->
  <button @click="add">
    ADD
  </button>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
</template>

<script>
export default {
  data() {
    return {
      // Getter
      // Setter : 값을 지정하는 용도
      msg: 'Hello Computed!'
    }  
  },
  // ReadOnly : 읽기전용
  computed: {
    // Getter : 값을 얻어오는 용도
    // reversedMessage() {
    //   return this.msg.split('').reverse().join('')
    // }
    // Getter, Setter
    reversedMessage: {
      get() {
        return this.msg.split('').reverse().join('')
      },
      // set(들어오는 값)
      // reversedMessage 값을 할당할때만 동작
      set(newValue) {
        // console.log(newValue)로 값을 확인하고 작업!
        this.msg = newValue
      }
    }
  },
  methods: {
    add() {
      this.reversedMessage += '!?'
    }
  }
}
</script>
```

## Watch

변경사항을 감시하는 Option(Console에 출력)
```html
<template>
  <h1 @click="changeMessage">
    {{ msg }}
  </h1>
  <h1>{{ reversedMessage }}</h1>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello?'
    }
  },
  computed: {
    reversedMessage() {
      return this.msg.split('').reverse().join('')
    }
  },
  // 변경 사항 감시하는 Option
  // console에 출력
  watch: {
    msg(newValue) {
      console.log('msg:', newValue)
    },
    reversedMessage(newValue) {
      console.log('reversedMessage: ', newValue)
    }
  },
  methods: {
    changeMessage() {
      this.msg = 'Good!'
    }
  }
}
</script>
```

## HTML Class Binding

```v-bind:class```에 객체를 전달하여 클래스를 동적으로 전환할 수 있습니다.</br>
isActive data가 True면 active class가 연결
```html
<div :class="{ active: isActive }"></div>
```
- 바인딩 된 객체는 인라인 일 필요는 없습니다.
```html
<div :class="classObject"></div>
```
```html
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

- 객체를 반환하는 계산된 옵션인 computed에 바인딩 할 수 있다.
```html
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error
      'text-danger': this.error && this.error.type ==='fatal'
    }
  }
}
```

- 인라인 스타일 바인딩하기
```html
<div :style="{ color: activeColor, fontSize: fontSize +'px' }"></div>
```
```html
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

- App.vue(1)
```html
<template>
  <!-- 
    [Class Binding]
    active class 추가 
    - isActive data 영향
    - true / false 
  -->
  <h1
    :class="{ active: isActive }"
    @click="activate">
    Hello?!({{ isActive }})
  </h1>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    activate() {
      this.isActive = true
    }
  }
}
</script>

<style scoped>
/* scoped = 이 파일 외에서는 영향x */
  .active {
    color: red;
    font-weight: bold;
  }
</style>
```

- App.vue(2)
```html
<template>
  <h1
    :style="[fontStyle, backgroundStyle]"
    @click="changeStyle">
    Hello?!
  </h1>
</template>

<script>
export default {
  data() {
    return {
      fontStyle: {
        color: 'orange',
        fontSize: '30px'
      },
      backgroundStyle: {
        backgroundColor: 'black'
      }
    }
  },
  methods: {
    changeStyle() {
      this.fontStyle.color = 'red'
      this.fontStyle.fontSize = '50px'
    }
  }
}
</script>
```

## 조건부 렌더링

- v-if
v-if 디렉티브는 조건에 따라 블록을 렌더링할 때 사용합니다. 블록은 디렉티브의 표현식이 true 값을 반환할 때만 렌더링됩니다.</br>
awesome이라는 데이터가 truthy(참으로 해석될 수 있는 값)이라면 화면에 렌더링
```html
<h1 v-if="awesome">Vue is awesome!<h1>
```
v-else 와 함께 "else 블록"을 추가하는 것도 가능합니다.
```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no</h1>
```

- if구문
```html
<template>
  <button @click="handler">
    Click me!
  </button>
  <h1 v-if="isShow">
    Hello?!
  </h1>
  <h1 v-else-if="count > 3">
    Count > 3
  </h1>
  <h1 v-else>
    Good~
  </h1>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      count: 0
    }
  },
  methods: {
    handler() {
      this.isShow = !this.isShow
      this.count += 1
    }
  }
}
</script>
```

- template
```html
<template>
  <button @click="handler">
    Click me!
  </button>
  <!-- 
    [template]
    - 특정요소들을 그룹으로 보이거나 보이지않게하는 것 
  -->
  <template v-if="isShow">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
</template>
```

- v-show
```html
<template>
  <button @click="handler">
    Click me!
  </button>
  <!-- 
    [v-show]
    - false일 때, 구조적으로 렌더링을 하지만,
    - 화면에 출력되지 않게 display: none;
   -->
  <h1 v-show="isShow">
    Hello?!
  </h1>
</template>
```

- v-if VS v-show
  - v-if는 조건부 렌더링(런타임 시 조건이 변경되지 않는다면 사용)</br>
  - v-show는 일단 렌더링을 해놓고 단순히 css속성만 가지고 화면에 출력여부 결정(자주 전환 시 사용)
