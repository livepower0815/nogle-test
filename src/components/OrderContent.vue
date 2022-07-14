<script setup>
import { formatMoneyInt, formatNumberWithFixed } from '@/utils/numberFormat.js'
import { orderBookStore } from '@/store/orderBookWs.js'
import { lastPriceStore } from '@/store/lastPriceWs.js'
import LastPrice from '@/components/LastPrice.vue'

const ob = orderBookStore()
const lastPrice = lastPriceStore()
</script>

<template>
  <!-- Sell -->
  <div class="trade">
    <div v-for="ask in ob.max8Asks" class="trade-item">
      <div class="trade-item__price sell-color">{{ formatNumberWithFixed(ask[0]) }}</div>
      <div class="trade-item__size">{{ formatMoneyInt(ask[1]) }}</div>
      <div class="trade-item__total">{{ formatMoneyInt(ask[2]) }}</div>
    </div>
  </div>

  <!-- TODO: 方向好像反了 -->
  <LastPrice :price="lastPrice.price" :status="lastPrice.status" />

  <!-- Buy -->
  <div class="trade">
    <div v-for="bid in ob.max8Bids" class="trade-item">
      <div class="trade-item__price buy-color">{{ formatNumberWithFixed(bid[0]) }}</div>
      <div class="trade-item__size">{{ formatMoneyInt(bid[1]) }}</div>
      <div class="trade-item__total">{{ formatMoneyInt(bid[2]) }}</div>
    </div>
  </div>
</template>
