<template>
  <!-- <h1 ref="hello">
    Hello world!
  </h1> -->
  <Hello ref="hello" />
</template>

<script>
import Hello from '~/components/Hello'
// created = 생성된 직후
// mounted = 연결된 직후
// 연결된 직후에만 refs 사용 가능
export default {
  components: {
    Hello
  },
  mounted() {
    // const h1El = document.querySelector('#hello')
    console.log(this.$refs.hello.$refs.good)
  }
}
</script>