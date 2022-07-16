<script setup>
import { ref, watch } from 'vue'
import { formatMoneyInt } from '@/utils/numberFormat.js'

const props = defineProps({
  size: {
    type: [Number, String],
    default: '0'
  }
})

// When quote size change, add highlight animation on size cell.
// Red background color if size increase. Green background color if size decrease.
// flash-buy or flash-sell
const flashClass = ref('')

watch(
  () => props.size,
  (val, oldVal) => {
    if (Number(val) > Number(oldVal)) setSell()
    else if (Number(val) < Number(oldVal)) setBuy()
  }
)

const setSell = () => {
  flashClass.value = ''
  setTimeout(() => {
    flashClass.value = 'flash-sell'
  }, 0)
}

const setBuy = () => {
  flashClass.value = ''
  setTimeout(() => {
    flashClass.value = 'flash-buy'
  }, 0)
}
</script>

<template>
  <div class="trade-item__size" :class="flashClass">{{ formatMoneyInt(props.size) }}</div>
</template>

<style lang="scss"></style>
