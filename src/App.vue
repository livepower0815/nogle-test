<script setup>
import { Ws } from '@/websocket/ws.ts'
import { ref } from 'vue'
import { formatMoneyInt, formatNumberWithFixed } from '@/utils/numberFormat.js'

// OrderBook WebSocket API:
let orderBookWs = new Ws('wss://ws.btse.com/ws/oss/futures')
const subscribeOrderBook = () => {
  const reqData = {
    op: 'subscribe',
    args: ['update:BTCPFC']
  }
  orderBookWs.send(reqData)
}

// Last price WebSocket API:
let lastPriceWs = new Ws('wss://ws.btse.com/ws/futures')
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
      <div class="header-total">Tatal</div>
    </div>
    <div class="trade">
      <div v-for="item in 8" class="trade-item">
        <!-- <div class="trade-item__price sell-color">20,003.0</div> -->
        <div class="trade-item__price sell-color">{{ formatNumberWithFixed('20004.5') }}</div>
        <div class="trade-item__size">{{ formatMoneyInt('1666') }}</div>
        <div class="trade-item__total">{{ formatMoneyInt('2348') }}</div>
      </div>
    </div>
    <div class="last-price" :class="lastPriceStatus">
      <div class="number">20000.5</div>
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

<style lang="scss" scoped>
.container {
  width: 240px;
  height: 452px;
  background-color: #131b29;

  .title {
    padding: 8px 12px;
    font-weight: bold;
    font-size: 14px;
  }

  .header {
    display: flex;
    font-size: 12px;
    color: #8698aa;
    margin: 6px 0;

    &-price {
      flex: 1;
      padding-left: 12px;
    }
    &-size {
      flex: 1;
      text-align: center;
    }
    &-total {
      flex: 1;
      text-align: right;
      padding-right: 12px;
    }
  }

  .trade {
    font-family: monospace;
    font-size: 12px;

    &-item {
      display: flex;
      padding: 4px 0;

      &__price {
        width: 76px;
        padding-left: 12px;
      }
      &__size {
        width: 56px;
        text-align: right;
      }
      &__total {
        flex: 1;
        text-align: right;
        padding-right: 12px;
      }
    }
  }

  .last-price {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    font-size: 16px;
    font-family: monospace;

    &.buy {
      color: #00b15d;
      background-color: rgba(16, 186, 104, 0.12);
    }
    &.sell {
      color: #ff5b5a;
      background-color: rgba(255, 90, 90, 0.12);
    }

    .number {
      padding-right: 4px;
    }

    .icon-arrow {
      width: 14px;
      height: 14px;
      mask-image: url('@/assets/IconArrowDown.svg');
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;

      &.buy {
        background-color: #00b15d;
        transform: rotate(180deg);
      }
      &.sell {
        background-color: #ff5b5a;
      }
    }
  }
}

.buy-color {
  color: #00b15d;
}
.sell-color {
  color: #ff5b5a;
}
</style>
