<template>
  <!-- 
    [emits] : event 상속 받아 사용
    - click을 원하는 이름으로 변경하여 사용 가능
    - 하지만 emit으로 받을 때 정확하게 변경
    HTML = Dash-case로 작성
   -->
  <MyBtn
    @click="log"
    @change-msg="logMsg">
    Banana
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  },
  methods: {
    log(event) {
      console.log('Click!!')
      console.log(event)
    },
    logMsg(msg) {
      console.log(msg) // this.msg
    }
  }
}
</script>