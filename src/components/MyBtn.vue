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