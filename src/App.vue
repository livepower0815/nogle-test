<script setup>
import { Ws } from '@/websocket/ws.ts'

// OrderBook WebSocket API:
let orderBookWs = new Ws('wss://ws.btse.com/ws/oss/futures')

const subOrderBook = () => {
  const reqData = {
    op: 'subscribe',
    args: ['update:BTCPFC']
  }
  orderBookWs.send(reqData)
}

// Last price WebSocket API:
let lastPriceWs = new Ws('wss://ws.btse.com/ws/futures')

const getTradeHistory = () => {
  const reqData = {
    op: 'subscribe',
    args: ['tradeHistoryApi:BTCPFC']
  }
  lastPriceWs.send(reqData)
}
</script>

<template>
  <div>
    trade work!!!

    <h1 @click="subOrderBook">orderBookWs</h1>
    <h1 @click="getTradeHistory">lastPriceWs</h1>
  </div>
</template>

<style lang="scss" scoped></style>
