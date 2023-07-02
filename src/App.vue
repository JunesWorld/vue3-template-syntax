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