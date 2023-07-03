<template>
  <Child />
</template>

<script>
import Child from '~/components/Child'

export default {
  components: {
    Child
  }
  // App.vue에서 msg를 받아 정의하고
  // 다시 Child msg에 연결
  // props: {
  //   msg: {
  //     type: String,
  //     default: ''
  //   }
  // }
}
</script>