<template>
  <!-- 
    msg = props
    Parent.vue는 Child.vue에 내용을 전달만 할 뿐인데 데이터를 정의해야한다.
    - 해결 : provide, inject
    - 주의 : provide는 반응성을 사용할 수 없다 -> computed 사용
   -->
  <button @click="message = 'Good?'">
    Click!
  </button>
  <h1>App: {{ message }}</h1>
  <Parent />
</template>

<script>
import Parent from '~/components/Parent'
import { computed } from 'vue'

export default {
  components: {
    Parent
  },
  data() {
    return {
      message: 'Hello world!'
    }
  },
  // callback 함수를 만들어 반응성 가지고 싶은 data 반환
  provide() {
    return {
      msg: computed(() => this.message)
    }
  }
}
</script>