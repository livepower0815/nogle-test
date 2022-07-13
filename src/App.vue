<script setup>
import { Ws } from '@/websocket/ws.ts'
import { onMounted } from 'vue'

let orderBookWs = null

onMounted(() => {
  orderBookWs = new Ws('wss://ws.btse.com/ws/oss/futures')
})
</script>

<template>
  <div>
    trade work!!!
  </div>
</template>

<style lang="scss" scoped>
</style>
