<script setup>
import { Ws } from '@/websocket/ws.js'
import { ref } from 'vue'
import { formatMoneyInt, formatNumberWithFixed } from '@/utils/numberFormat.js'

// OrderBook WebSocket API:
let orderBookWs = new Ws({
  url:'wss://ws.btse.com/ws/oss/futures',
  openFn: () => {
    // subscribeOrderBook()
  }
})
const subscribeOrderBook = () => {
  const reqData = {
    op: 'subscribe',
    args: ['update:BTCPFC']
  }
  orderBookWs.send(reqData)
}

// Last price WebSocket API:
let lastPriceWs = new Ws({
  url:'wss://ws.btse.com/ws/futures'
})
const subscribeTradeHistory = () => {
  const reqData = {
    op: 'subscribe',
    args: ['tradeHistoryApi:BTCPFC']
  }
  lastPriceWs.send(reqData)
}

const lastPriceStatus = ref('sell')
</script>

<template>
  <div class="container">
    <div class="title">Order Book</div>
    <div class="header">
      <div class="header-price">Price (USD)</div>
      <div class="header-size">Size</div>
      <div class="header-total">Total</div>
    </div>
    <div class="trade">
      <div v-for="item in 8" class="trade-item">
        <div class="trade-item__price sell-color">{{ formatNumberWithFixed('20004.5') }}</div>
        <div class="trade-item__size">{{ formatMoneyInt('1666') }}</div>
        <div class="trade-item__total">{{ formatMoneyInt('2348') }}</div>
      </div>
    </div>
    <div class="last-price" :class="lastPriceStatus">
      <div class="number">{{ formatNumberWithFixed('20000.5') }}</div>
      <div class="icon-arrow" :class="lastPriceStatus"></div>
    </div>
    <div class="trade">
      <div v-for="item in 8" class="trade-item">
        <div class="trade-item__price buy-color">{{ formatNumberWithFixed('19993.0') }}</div>
        <div class="trade-item__size">{{ formatMoneyInt('1666') }}</div>
        <div class="trade-item__total">{{ formatMoneyInt('2348') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
