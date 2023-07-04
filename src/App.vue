<template>
  <div @click="increase">
    {{ count }}
  </div>
</template>

<script>
// 반응성 추가
import { ref } from 'vue'

export default {
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   increase() {
  //     this.count += 1
  //   }
  // },
  
  // [setup Method]
  // - code 최적화 composition API
  // - 기본적으로 정의한 count는 반응성을 가지지 X
  // |- ref로 count라는 객체 데이터 반환할 수 있도록 초기값 생성
  // |- value 속성 사용
   setup() {
    let count = ref(0)
    function increase() {
      count.value +=1
    }
    return {
      count,
      increase
    }
   }
}
</script>