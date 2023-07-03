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