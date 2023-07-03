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