<template>
  <div
    class="button-common"
    :class="{
      'button-common--contained': contained,
      'button-common--outlined': outlined,
      'button-common--block': block,
      'button-common--noblock': !block,
      'button-common--primary': type == TYPE_BUTTON.PRIMARY,
      'button-common--icon': type == 'icon',
      'button-common--secondary': type == TYPE_BUTTON.SECONDARY,
      'button-common--link': link,
      'button-common--disabled': disabled
    }"
    @click="triggerClick"
  >
    <div v-if="!disabled" class="button-common__label">
      <slot></slot>
    </div>
    <div v-else class="button-common__label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { TYPE_BUTTON } from '@/constants/type-button.constants'
const emit = defineEmits(['click'])

defineProps({
  size: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: TYPE_BUTTON.PRIMARY
  },
  link: {
    type: Boolean,
    default: false
  },
  contained: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const triggerClick = () => {
  emit('click')
}
</script>
