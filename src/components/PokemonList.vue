<template>
  <div class="pokemon-list" :class="{ 'pokemon-list--is-mobile': isMobile }">
    <Loading :isLoading="isLoading" />
    <section class="pokemon-list__pagination">
      <span>{{ pokemonStore.currentPage }} of {{ pokemonStore.totalPages }}</span>
      <Button outlined :disabled="isDisabledPrev" @click="prev"> Prev </Button>
      <Button outlined :disabled="isDisabledNext" @click="next"> Next </Button>
    </section>
    <section v-if="!isLoading" class="pokemon-list__container">
      <CardPokemon :pokemons="pokemonStore.paginatedPokemons" showCheckbox />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import Loading from './common/LoadingCommon.vue'
import CardPokemon from './CardPokemon.vue'
import Button from './common/ButtonCommon.vue'
import { useIsMobile } from '@/mixins/isMobileMixin'

const pokemonStore = usePokemonStore()
const isLoading = ref(false)
const { isMobile } = useIsMobile()

const isDisabledPrev = computed(() => {
  return pokemonStore.currentPage === 1
})

const isDisabledNext = computed(() => {
  return pokemonStore.currentPage === pokemonStore.totalPages
})

onMounted(() => {
  if (pokemonStore.paginatedPokemons.length === 0) {
    isLoading.value = true
    pokemonStore.getDetailAllPokemons().then(() => {
      pokemonStore.getPaginatedPokemons()
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    })
  }
})

const prev = () => {
  pokemonStore.currentPage--
  pokemonStore.getPaginatedPokemons()
}

const next = () => {
  pokemonStore.currentPage++
  pokemonStore.getPaginatedPokemons()
}
</script>
