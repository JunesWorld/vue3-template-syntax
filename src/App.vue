<template>
  <!-- 
    @wheel 동작할 때마다 부하가 걸린다.
    - .passive 사용
    - 로직의 처리와 화면과 분리
  -->
  <div
    class="parent"
    @wheel="handler">
    <div class="child"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handler(event) {
      console.log(event)
    }
  }
}
</script>

<style scoped lang="scss">
  .parent {
    width: 200px;
    height: 100px;
    background-color: royalblue;
    margin: 10px;
    padding: 10px;
    overflow: auto; // scroll bar
    .child {
      width: 100px;
      height: 2000px;
      background-color: orange;
    }
  }
</style>