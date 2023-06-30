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

<script>
export default {
  data() {
    return {
      isShow: false,
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