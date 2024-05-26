<template>
  <div class="loading" v-if="isLoading">
    <div class="loading__content">
      <img :src="Pokeball" alt="pokeball" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import Pokeball from '@/assets/img/pokeball.png'

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>
