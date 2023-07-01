<template>
  <!-- 
    Enter = 다른 문자로 대체할 때 케밥케이스로 
    - chaining 가능
    - @keydown.ctrl.shift.a="handler"
    - ctrl.shift 누른 상태에서 enter를 눌러야 동작
  -->
  <input
    type="text"
    @keydown.enter="handler" />
</template>

<script>
export default {
  methods: {
    handler() {
        console.log('Enter!!')
      }
    }
  }
</script>