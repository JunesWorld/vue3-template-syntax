
<template>
  <!-- 
    [Fallback contents]
    - content 1순위 / slot 2순위
    - content가 없으면 slot  tag 출력
    [v-slot] : 순서 보장
    - Banana = text / (B) = icon
    - 약어 = #
   -->
  <MyBtn>
    <template #icon>
      <span>(B)</span>
    </template>
    <template #text>
      <span>Banana</span>
    </template>
  </MyBtn>
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  }
}
</script>