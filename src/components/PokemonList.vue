<template>
  <div class="pokemon-list" :class="{ 'pokemon-list--is-mobile': isMobile }">
    <Loading :isLoading="isLoading" />
    <section class="pokemon-list__pagination">
      <span>{{ pokemonStore.currentPage }} de {{ pokemonStore.totalPages }}</span>
      <Button outlined :disabled="isDisabledPrev" @click="prev"> Anterior </Button>
      <Button outlined :disabled="isDisabledNext" @click="next"> Siguiente </Button>
    </section>
    <section v-if="!isLoading" class="pokemon-list__container">
      <Card
        class="pokemon-list__card"
        :class="{
          'pokemon-list__card--selected': pokemon.selected,
          'pokemon-list__card--limit': teamStore.isLimitReached
        }"
        :width="200"
        v-for="(pokemon, index) in pokemonStore.paginatedPokemons"
        :key="index"
      >
        <template #title>
          <div class="pokemon-list__card__header">
            <span class="pokemon-list__card__header__title">{{ pokemon.name }}</span>
            <Checkbox
              v-model:value="pokemon.selected"
              size="sm"
              status="select"
              type="primary"
              @click="selectPokemon(pokemon)"
            />
          </div>
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
      </Card>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useTeamStore } from '@/stores/team'
import Loading from './common/LoadingCommon.vue'
import Card from './common/CardCommon.vue'
import Checkbox from './common/CheckboxCommon.vue'
import Button from './common/ButtonCommon.vue'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'
import { useIsMobile } from '@/mixins/isMobileMixin'

const pokemonStore = usePokemonStore()
const teamStore = useTeamStore()
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
  if (!pokemon.selected && teamStore.isLimitReached) return

  pokemon.selected = !pokemon.selected
  if (!pokemon.selected) {
    teamStore.removePokemon(pokemon)
  } else {
    teamStore.addPokemon(pokemon)
  }
}
</script>
