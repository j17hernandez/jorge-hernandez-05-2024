<template>
  <div class="pokemon-list" :class="{ 'pokemon-list--is-mobile': isMobile }">
    <LoadingCommon :isLoading="isLoading" />
    <section class="pokemon-list__pagination">
      <span>{{ pokemonStore.currentPage }} de {{ pokemonStore.totalPages }}</span>
      <ButtonCommon outlined :disabled="isDisabledPrev" @click="prev"> Anterior </ButtonCommon>
      <ButtonCommon outlined :disabled="isDisabledNext" @click="next"> Siguiente </ButtonCommon>
    </section>
    <section v-if="!isLoading" class="pokemon-list__container">
      <CardCommon
        class="pokemon-list__card"
        :class="{
          'pokemon-list__card--selected': pokemon.selected
        }"
        :width="200"
        v-for="(pokemon, index) in pokemonStore.paginatedPokemons"
        :key="index"
        @click="selectPokemon(pokemon)"
      >
        <template #title>
          <span class="pokemon-list__card__title">{{ pokemon.name }}</span>
        </template>
        <template #body>
          <div class="pokemon-list__card__body">
            <img
              class="pokemon-list__card__body__image"
              :src="pokemon.sprites.front_default"
              :alt="pokemon.name"
            />
          </div>
        </template>
      </CardCommon>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import LoadingCommon from './common/LoadingCommon.vue'
import CardCommon from './common/CardCommon.vue'
import ButtonCommon from './common/ButtonCommon.vue'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'
import { useIsMobile } from '@/mixins/isMobileMixin'

const pokemonStore = usePokemonStore()
const isLoading = ref(true)
const { isMobile } = useIsMobile()

const isDisabledPrev = computed(() => {
  return pokemonStore.currentPage === 1
})

const isDisabledNext = computed(() => {
  return pokemonStore.currentPage === pokemonStore.totalPages
})

onMounted(() => {
  if (pokemonStore.detailAllPokemons.length === 0) {
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

const selectPokemon = (pokemon: DetailPokemon) => {
  pokemon.selected = !pokemon.selected
}
</script>
