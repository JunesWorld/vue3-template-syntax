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