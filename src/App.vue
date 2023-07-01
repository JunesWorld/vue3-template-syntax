<template>
  <!-- 
    [Event 객체]
    - click event가 발생했을 때 event의 정보를 가지고 있는 객체 데이터
    - ex) PointerEvent
    - 발생한 event의 실제 데이터를 가지고 있다
    - $event = event 객체가 나와서 들어간다
   -->
  <button @click="handler('hi', $event)">
    Click 1
  </button>
  <button @click="handler('what', $event)">
    Click 2
  </button>
</template>

<script>
export default {
//   methods: {
//     // event라는 매개변수 = data 받아주는 역할 = 변경하여 사용 가능
//     handler(event) {
//       console.log(event)
//       console.log(event.target.textContent)
//     }
//   }
// }
  methods: {
    handler(msg, event) {
      console.log(msg) // hi + PointerEvent
      console.log(event) // what + PointerEvent
    }
  }
}
</script>