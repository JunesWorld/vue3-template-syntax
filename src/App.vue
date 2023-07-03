<template>
  <!-- 
    1. [Components 재활용 가능]
    2. color 변경시 MyBtn에서 props 설정 변경 후 사용
    3. royalblue -> #000
    4. 부모 - 자식 데이터 통신
    5. MyBtn slot tag 자리에 문자열이 들어간다.
   -->
  <MyBtn>Banana</MyBtn>
  <MyBtn color="royalblue">
    <span style="color: red;">Apple</span>
  </MyBtn>
  <MyBtn :color="color">
    Cherry
  </MyBtn>
  <MyBtn
    large
    color="orange">
    Orange
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  },
  data() {
    return {
      color: '#000'
    }
  }
}
</script>