<template>
  <!-- Methods
  <h1>{{ reverseMessage() }}</h1>
  <h1>{{ reverseMessage() }}</h1>
  <h1>{{ reverseMessage() }}</h1>
  <h1>{{ reverseMessage() }}</h1> -->

  <!-- 
    computed : 계산된 데이터(캐싱) 
    - 첫번째에서 계산한 값 두번째부터 그대로 반복 사용
    - 데이터 최적화
  -->
  <button @click="add">
    ADD
  </button>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
  <h1>{{ reversedMessage }}</h1>
</template>

<script>
export default {
  data() {
    return {
      // Getter
      // Setter : 값을 지정하는 용도
      msg: 'Hello Computed!'
    }  
  },
  // ReadOnly : 읽기전용
  computed: {
    // Getter : 값을 얻어오는 용도
    // reversedMessage() {
    //   return this.msg.split('').reverse().join('')
    // }
    // Getter, Setter
    reversedMessage: {
      get() {
        return this.msg.split('').reverse().join('')
      },
      // set(들어오는 값)
      // reversedMessage 값을 할당할때만 동작
      set(newValue) {
        // console.log(newValue)로 값을 확인하고 작업!
        this.msg = newValue
      }
    }
  },
  methods: {
    add() {
      this.reversedMessage += '!?'
    }
  }
}
</script>