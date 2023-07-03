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