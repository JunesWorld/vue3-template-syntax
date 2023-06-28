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