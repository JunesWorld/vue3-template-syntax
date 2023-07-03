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

## List 렌더링

Apple-1</br>
Banana-2</br>
Cherry-3</br>
```html
<template>
  <!-- 
    [v-for] : 반복문
    - fruits = 문자열을 가지고 있는 배열 데이터
    - 배열 데이터 갯수 만큼 li tag를 반복해서 출력하고 하나씩 추출해서 fruit라는 변수에 담아서 활용
    - :key = data 연결할 수 있음 (li tag 고유하다)
    - {{ fruit }} = 화면에 출력
   -->
  <ul>
    <li
      v-for="(fruit, index) in fruits"
      :key="fruit">
      {{ fruit }}-{{ index + 1 }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry']
    }
  }
</script>
```

반복되는 v-for를 사용할 때 구분할 수 있는 id와 같은 속성값을 넣어 최적화 시켜주자!!

```html
<template>
  <!-- 
    [v-for] : 반복문
    - 구분할 수 있는 id와 같은 속성값을 넣어 최적화 시켜주자!!
    - fruits = 문자열을 가지고 있는 배열 데이터
    - 배열 데이터 갯수 만큼 li tag를 반복해서 출력하고 하나씩 추출해서 fruit라는 변수에 담아서 활용
    - :key = data 연결할 수 있음 (li tag 고유하다)
    - {{ fruit }} = 화면에 출력
   -->
  <!-- 
    [배열 데이터 반복 출력]
    - 반복되는 배열데이터(newFruits)를 매계변수(fruit)에 담아
    - 속성들을(id, name) 활용하여 화면에 출력
  -->
  <ul>
    <li
      v-for="fruit in newFruits"
      :key="fruit.id">
      {{ fruit.name }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry']
    }
  },
  computed: {
    newFruits() {
      return this.fruits.map((fruit, index) => {
        // 배열 데이터 = 객체 데이터(문자 데이터X)
        // { id: 0, name: 'Apple'}...
        return {
          id: index,
          name: fruit
        }
      })
    }
  }
}
</script>
```

id를 고유하게 만들어주는 Package!!
- ```npm i -D shortid```
  
배열 변경 감지(반응성)
- push() : 배열 데이터 가장 뒤쪽에 아이템을 넣는다.
- pop() : 배열 데이터 가장 마지막 아이템을 꺼내준다.
- shift() : 배열 데이터 가장 첫번째 아이템을 꺼내준다.
- unshift() : 배열 데이터 가장 앞쪽에 아이템을 넣는다.
- splice() : index를 넣어 아이템을 빼거나 삭제.
- sort() : 배열 정렬
- reverse() : 배열 뒤집기
  
```html
<template>
  <!-- 
    [v-for] : 반복문
    - 구분할 수 있는 id와 같은 속성값을 넣어 최적화 시켜주자!!
    - fruits = 문자열을 가지고 있는 배열 데이터
    - 배열 데이터 갯수 만큼 li tag를 반복해서 출력하고 하나씩 추출해서 fruit라는 변수에 담아서 활용
    - :key = data 연결할 수 있음 (li tag 고유하다)
    - {{ fruit }} = 화면에 출력
   -->
  <!-- 
    [배열 데이터 반복 출력]
    - 반복되는 배열데이터(newFruits)를 매계변수(fruit)에 담아
    - 속성들을(id, name) 활용하여 화면에 출력
  -->
  <button @click="handler">
    Click me!
  </button>
  <ul>
    <li
      v-for="{ id, name} in newFruits"
      :key="id">
      {{ name }}-{{ id }}
    </li>
  </ul>
</template>

<script>
// npm i -D shortid
import shortid from 'shortid'

export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry']
    }
  },
  computed: {
    newFruits() {
      return this.fruits.map(fruit => {
        // 배열 데이터 = 객체 데이터(문자 데이터X)
        // { id: 0, name: 'Apple'}...
        return {
          id: shortid.generate(),
          name: fruit
        }
      })
    }
  },
  // 반응성 push
  // click me!를 누르면 Orange data 추가
  methods: {
    handler() {
      this.fruits.push('Orange')
    }
  }
}
</script>
```

## 이벤트 핸들링

- @click="" = v-on: click=""
- click이란 이벤트가 발생했을 때 실행할 함수

```html
<template>
  <!-- 
    [Event 객체]
    - click event가 발생했을 때 event의 정보를 가지고 있는 객체 데이터
    - ex) PointerEvent
    - 발생한 event의 실제 데이터를 가지고 있다
    - $event = event 객체가 나와서 들어간다
   -->
  <button @click="handler('hi', $event)">
    Click 1
  </button>
  <button @click="handler('what', $event)">
    Click 2
  </button>
</template>

<script>
export default {
//   methods: {
//     // event라는 매개변수 = data 받아주는 역할 = 변경하여 사용 가능
//     handler(event) {
//       console.log(event)
//       console.log(event.target.textContent)
//     }
//   }
// }
  methods: {
    handler(msg, event) {
      console.log(msg) // hi + PointerEvent
      console.log(event) // what + PointerEvent
    }
  }
}
</script>
```

- 하나의 요소에 Event가 발생했을 때 실행할 Method가 여러개라면 ,로 구분하되 ()를 꼭 붙여줄 것!
  - A B 동시 출력 
```html
<template>
  <button @click="handlerA(), handlerB()">
    Click me!
  </button>
</template>

<script>
export default {
  methods: {
    handlerA() {
      console.log('A')
    },
    handlerB() {
      console.log('B')
    }
  }
}
</script>
```

## Event 수식어

- Method Chaining 가능
  - @click.prevent.once="handler
- prevent : 기본 동작X
- once : 특정 이벤트가 발생했을때 method를 한번만 실행

```html
<template>
  <a
    href="https://naver.com"
    target="_blank"
    @click.prevent="handler">
    Naver
  </a>
</template>

<script>
export default {
  methods: {
    handler() {
      console.log('ABC!')
    }
  }
}
</script>
```

- Event Bubbling : .stop
- Event Capturing: .capture
- .self
```html
<template>
  <!-- 
    [Event Bubbling]
    - child 속성을 click 하면 부모 속성까지 출력
    - B에 .stop 사용하면 해결

    [Event Capturing] <-> [Event Bubbling]
    - A에 .capture 사용 (BA -> AB)
    - .cpature.stop (A만 출력)

    [.self]
    - 자신이 노출되어 있는 부분만 동작
    - target과 current target이 일치할 경우만 동작
   -->
  <div
    class="parent"
    @click="handlerA">
    <div
      class="child"
      @click="handlerB"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handlerA() {
      console.log('A')
    },
    handlerB() {
      console.log('B')
    }
  }
}
</script>

<style scoped lang="scss">
  .parent {
    width: 200px;
    height: 100px;
    background-color: royalblue;
    margin: 10px;
    padding: 10px;
    .child {
      width: 100px;
      height: 100px;
      background-color: orange;
    }
  }
</style>
```

- @wheel.passive
- 
```html
<template>
  <!-- 
    @wheel 동작할 때마다 부하가 걸린다.
    - .passive 사용
    - 로직의 처리와 화면과 분리
  -->
  <div
    class="parent"
    @wheel="handler">
    <div class="child"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handler(event) {
      console.log(event)
    }
  }
}
</script>

<style scoped lang="scss">
  .parent {
    width: 200px;
    height: 100px;
    background-color: royalblue;
    margin: 10px;
    padding: 10px;
    overflow: auto; // scroll bar
    .child {
      width: 100px;
      height: 2000px;
      background-color: orange;
    }
  }
</style>
```

- 키 수식어

```html
<template>
  <!-- 
    Enter = 다른 문자로 대체할 때 케밥케이스로 
    - chaining 가능
    - @keydown.ctrl.shift.a="handler"
    - ctrl.shift 누른 상태에서 enter를 눌러야 동작
  -->
  <input
    type="text"
    @keydown.enter="handler" />
</template>

<script>
export default {
  methods: {
    handler() {
        console.log('Enter!!')
      }
    }
  }
</script>
```

## 폼 입력 바인딩

- Inline 양방향 바인딩

```html
<template>
  <!-- 
    [v-model]
    - :value 부터 삭제 후 사용
    - v-model="msg"
    - 주의사항 : 한글 입력시 단방향 바인딩 사용할 것(:value)
   -->
  <h1>{{ msg }}</h1>
  <input
    type="text"
    :value="msg"
    @input="msg = $event.target.value" />
  <h1>{{ checked }}</h1>
  <input
    type="checkbox"
    v-model="checked" />
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!',
      checked: false
    }
  }
}
</script>
```

## v-model 수식어

```html
<template>
  <h1>{{ msg }}</h1>
  <!-- 
    [양방향 바인딩]
    - 한글 작성시 최적
    - @change : 바로 반응성이 오는 input과 다르게 tab or enter 키를 누르면 변경
    - = v-model.lazy="msg"
   -->
  <!-- 
    <input
    type="text"
    :value="msg"
    @input="msg = $event.target.value" /> 
  -->
  <!-- 
    [v-model.trim]
    - 띄어쓰기 제거
   -->
  <!-- 
    [숫자 타입 출력]
   -->
  <input
    type="text"
    v-model.number="msg" />
</template>

<script>
export default {
  data() {
    return {
      msg: 123
    }
  },
  watch: {
    msg() {
      console.log(typeof this.msg)
    }
  }
}
</script>
```

## 컴포넌트 기초

- App.vue

```html
<template>
  <!-- 
    1. [Components 재활용 가능]
    2. color 변경시 MyBtn에서 props 설정 변경 후 사용
    3. royalblue -> #000
    4. 부모 - 자식 데이터 통신
    5. MyBtn slot tag 자리에 문자열이 들어간다.
   -->
  <MyBtn>Banana</MyBtn>
  <MyBtn color="royalblue">
    <span style="color: red;">Apple</span>
  </MyBtn>
  <MyBtn :color="color">
    Cherry
  </MyBtn>
  <MyBtn
    large
    color="orange">
    Orange
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  },
  data() {
    return {
      color: '#000'
    }
  }
}
</script>
```

- MyBtn.vue

```html
<template>
  <div
    :class="{ large }"
    :style="{ backgroundColor: color }"  
    class="btn">
    <slot></slot>
  </div>
</template>

<script>
// props : 컴포넌트가 실행이 될 때 속성처럼 받아내는 내용을 정의해주는 옵션
export default {
  props: {
    color: {
      type: String,
      default: 'gray'
    },
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .btn {
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
    &.large {
      font-size: 20px;
      padding: 10px 20px;
    }
  }
  
</style>
```

## 컴포넌트 속성 상속

- inheritAttrs : 상속제거
- v-bind

App.vue
```html
<template>
  <MyBtn
    class="JUNE"
    style="color: red;"
    title="Hello world!">
    Banana
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  }
}
</script>
```
MyBtn.vue
```html
<template>
  <!-- 
    [최상위 요소] = Root Element
    - <div></div> 
    - 2개가 존재하기 때문에 App.vue에서 어디에 들어갈지 모름
   -->
  <div class="btn">
    <slot></slot>
  </div>
  <h1 v-bind="$attrs"></h1>
</template>

<script>
// inheritAttrs : 상속
export default {
  inheritAttrs: false,
  created() {
    console.log(this.$attrs)
  }
}
</script>

<style scoped>
  .btn {
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
  }
  
</style>
```

## 컴포넌트 Emit

App.vue
```html
<template>
  <!-- 
    [emits] : event 상속 받아 사용
    - click을 원하는 이름으로 변경하여 사용 가능
    - 하지만 emit으로 받을 때 정확하게 변경
    HTML = Dash-case로 작성
   -->
  <MyBtn
    @click="log"
    @change-msg="logMsg">
    Banana
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  },
  methods: {
    log(event) {
      console.log('Click!!')
      console.log(event)
    },
    logMsg(msg) {
      console.log(msg) // this.msg
    }
  }
}
</script>
```

MyBtn.vue
```html
<template>
  <div class="btn">
    <slot></slot>
  </div>
  <!-- 
    [dblclick] : 더블 클릭
    - click을 원하는 이름으로 변경하여 사용 가능
    - 데이터를 넘겨줄 수 있다. -> 123
    - event 객체를 넘겨줄 수 있다 -> $event
   -->
  <h1 @dblclick="$emit('click', 123)">
    ABC
  </h1>
  <input
    type="text"
    v-model="msg" />
</template>

<script>
export default {
  emits: [
    'click',
    'changeMsg'
  ],
  // v-model 양방향 바인딩
  data() {
    return {
      msg: ''
    }
  },
  // msg 변경 시 App.vue에서 감시
  watch: {
    msg() {
      this.$emit('changeMsg', this.msg)
    }
  }
}
</script>

<style scoped>
  .btn {
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
  }
  
</style>
```

## 컴포넌트 slot

App.vue
```html

<template>
  <!-- 
    [Fallback contents]
    - content 1순위 / slot 2순위
    - content가 없으면 slot  tag 출력
    [v-slot] : 순서 보장
    - Banana = text / (B) = icon
    - 약어 = #
   -->
  <MyBtn>
    <template #icon>
      <span>(B)</span>
    </template>
    <template #text>
      <span>Banana</span>
    </template>
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  }
}
</script>
```

MyBtn.vue
```html
<template>
  <div class="btn">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<style scoped>
  .btn {
    display: inline-block;
    margin: 4px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: gray;
    color: white;
    cursor: pointer;
  }
  
</style>
```

## 컴포넌트 Provide & Inject

- 자식 컴포넌트로 데이터를 내려줄 때 = props
- 부모 컴포넌트로 데이터를 올려줄 때 = provide, inject

App.vue
```html
<template>
  <!-- 
    msg = props
    Parent.vue는 Child.vue에 내용을 전달만 할 뿐인데 데이터를 정의해야한다.
    - 해결 : provide, inject
    - 주의 : provide는 반응성을 사용할 수 없다 -> computed 사용
   -->
  <button @click="message = 'Good?'">
    Click!
  </button>
  <h1>App: {{ message }}</h1>
  <Parent />
</template>

<script>
import Parent from '~/components/Parent'
import { computed } from 'vue'

export default {
  components: {
    Parent
  },
  data() {
    return {
      message: 'Hello world!'
    }
  },
  // callback 함수를 만들어 반응성 가지고 싶은 data 반환
  provide() {
    return {
      msg: computed(() => this.message)
    }
  }
}
</script>
```

Parent.vue
```html
<template>
  <Child />
</template>

<script>
import Child from '~/components/Child'

export default {
  components: {
    Child
  }
  // App.vue에서 msg를 받아 정의하고
  // 다시 Child msg에 연결
  // props: {
  //   msg: {
  //     type: String,
  //     default: ''
  //   }
  // }
}
</script>
```

Child.vue
```html
<template>
  <!-- 
    msg = App.vue (Hello world!)
    computed 계산된 데이터 출력 = value
   -->
  <div>
    Child: {{ msg.value }}
  </div>
</template>

<script>
export default {
  // props: {
  //   msg: {
  //     type: String,
  //     default: ''
  //   }
  // }
  inject: ['msg']
}
</script>
```
