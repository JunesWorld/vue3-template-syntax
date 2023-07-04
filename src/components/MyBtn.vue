<template>
  <!-- 
    [v-bind="$attrs"] : App.vue(MyBtn) 내용 모두 상속
   -->
  <div
    v-bind="$attrs"
    class="btn"
    @click="hello">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'gray'
    }
  },
  // hello Event(@hello) 연결 & 명시적으로 정의
  emits: ['hello'],
  // setup으로 변경
  // props data 출력
  // mounted() {
  //   console.log(this.color)
  //   console.log(this.$attrs)
  // },

  // 연결해서 사용
  // methods: {
  //   hello() {
  //     this.$emit('hello')
  //   }
  // },

  setup(props, context) {
    function hello() {
      context.emit('hello')
    }
    onMounted(() => {
      console.log(props.color)
      console.log(context.attrs)
    })

    return {
      hello
    }
  }
}
</script>