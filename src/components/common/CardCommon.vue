<template>
  <div
    class="card"
    :class="{
      'card--no-shadow': noShadow
    }"
    @click="handleClick"
  >
    <div class="card__header" :class="{ 'card__header--simpleCard': simpleCard }">
      <slot name="title"></slot>
    </div>
    <div class="card__body" :class="{ 'card__body--simpleCard': simpleCard }">
      <slot name="body" />
    </div>
    <div class="card__footer" :class="{ 'card__footer--simpleCard': simpleCard }">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  noShadow: {
    type: Boolean,
    default: false
  },
  simpleCard: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>
