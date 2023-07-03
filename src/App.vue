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