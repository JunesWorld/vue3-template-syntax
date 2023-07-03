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