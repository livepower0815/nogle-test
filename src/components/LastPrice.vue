<script setup>
import { formatNumberWithFixed } from '@/utils/numberFormat.js'

const props = defineProps({
  price: {
    type: [String, Number],
    default: 0
  },
  status: {
    type: String,
    default: 'sell'
  }
})
</script>

<template>
  <div class="last-price" :class="props.status">
    <div class="number">{{ formatNumberWithFixed(props.price) }}</div>
    <div class="icon-arrow" :class="props.status"></div>
  </div>
</template>

<style lang="scss" scoped></style>
