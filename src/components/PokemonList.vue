<template>
  <div class="pokemon-list">
    <LoadingCommon :isLoading="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import LoadingCommon from './common/LoadingCommon.vue'
const pokemonStore = usePokemonStore()
const isLoading = ref(true)

onMounted(() => {
  if (pokemonStore.detailAllPokemons.length === 0) {
    isLoading.value = true
    pokemonStore.getDetailAllPokemons().then(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    })
  }
})
</script>
