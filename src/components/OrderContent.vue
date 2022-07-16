<script setup>
import { formatMoneyInt, formatNumberWithFixed } from '@/utils/numberFormat.js'
import { orderBookStore } from '@/store/orderBookWs.js'
import { lastPriceStore } from '@/store/lastPriceWs.js'
import TradeSize from '@/components/TradeSize.vue'
import LastPrice from '@/components/LastPrice.vue'

const ob = orderBookStore()
const lastPrice = lastPriceStore()
</script>

<template>
  <!-- Sell -->
  <div class="trade">
    <div v-for="ask in ob.max8Asks" :key="ask[0]" class="trade-item flash-sell" >
      <div class="trade-item__price sell-color">{{ formatNumberWithFixed(ask[0]) }}</div>
      <TradeSize :size="ask[1]" />
      <div class="trade-item__total">{{ formatMoneyInt(ask[2]) }}</div>
    </div>
  </div>

  <LastPrice :price="lastPrice.price" :status="lastPrice.status" />

  <!-- Buy -->
  <div class="trade">
    <div v-for="bid in ob.max8Bids" :key="bid[0]" class="trade-item flash-buy">
      <div class="trade-item__price buy-color">{{ formatNumberWithFixed(bid[0]) }}</div>
      <TradeSize :size="bid[1]" />
      <div class="trade-item__total">{{ formatMoneyInt(bid[2]) }}</div>
    </div>
  </div>
</template>
