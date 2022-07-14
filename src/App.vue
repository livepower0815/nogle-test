<script setup>
import OrderContent from '@/components/OrderContent.vue'
</script>

<template>
  <div class="container">
    <div class="title">Order Book</div>
    <div class="header">
      <div class="header-price">Price (USD)</div>
      <div class="header-size">Size</div>
      <div class="header-total">Total</div>
    </div>
    <OrderContent />
  </div>
</template>

<style lang="scss" scoped></style>
