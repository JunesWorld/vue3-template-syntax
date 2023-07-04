<template>
  <h1 @click="increase">
    {{ count }}
  </h1>
  <h1 @click="changeMessage">
    {{ message }}
  </h1>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
export default {
  setup() {
    // count
    const count = ref(0)
    const doubleCount = computed(() => {
      return count.value * 2
    })
    function increase() {
      count.value += 1
    }

    // message
    const message = ref('Hello world!')
    const reversedMessage = computed(() => {
      return message.value.split('').reverse().join('')
    })
    watch(message, (newValue) => {
      console.log(newValue)
    })
    function changeMessage() {
      message.value = 'Good?!'
    }
    // created
    console.log(message.value)

    onMounted(() => {
      console.log(count.value)
    }) 

    return {
      count,
      doubleCount,
      increase,
      message,
      reversedMessage,
      changeMessage
    }
  }
}
</script>