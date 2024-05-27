<template>
  <Card
    class="card-pokemon"
    :class="{
      'card-pokemon--selected': pokemon.selected,
      'card-pokemon--limit': teamStore.isLimitReached
    }"
    :style="`--width-image: ${widthImage}px`"
    v-for="(pokemon, index) in pokemons"
    :key="index"
    @click="canGoToPokemon ? goToPokemon(pokemon) : () => {}"
  >
    <template #title>
      <div class="card-pokemon__header">
        <span class="card-pokemon__header__title">{{ pokemon.name }}</span>
        <Checkbox
          v-if="showCheckbox"
          v-model:value="pokemon.selected"
          size="sm"
          status="select"
          type="primary"
          @click="selectPokemon(pokemon)"
        />
      </div>
    </template>
    <template #body>
      <div class="card-pokemon__body">
        <img
          class="card-pokemon__body__image"
          :src="pokemon.sprites.front_default"
          :alt="pokemon.name"
        />

        <div v-if="showAttributes" class="card-pokemon__body__attributes">
          <div class="card-pokemon__body__types">
            <span class="card-pokemon__body__types__title">Types:</span>
            <span>{{ pokemon.types.map((type) => type.type.name).join(', ') }}</span>
          </div>
          <h3>Stats</h3>
          <div
            class="card-pokemon__body__stats"
            v-for="(stat, index) in pokemon.stats"
            :key="index"
          >
            <span class="card-pokemon__body__stats__name"> {{ stat.stat.name }}: </span>
            <span>{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="card-pokemon__footer">
        <img
          class="card-pokemon__footer__image"
          :src="soundIcon"
          alt="sound-icon"
          @click="playAudio(pokemon)"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTeamStore } from '@/stores/team'
import Card from '@/components/common/CardCommon.vue'
import Checkbox from '@/components/common/CheckboxCommon.vue'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'
import soundIcon from '@/assets/img/icons/sound.png'
import { useRouter } from 'vue-router'

const teamStore = useTeamStore()
defineProps({
  pokemons: {
    type: Array<DetailPokemon>
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 200
  },
  widthImage: {
    type: Number,
    default: 150
  },
  showAttributes: {
    type: Boolean,
    default: false
  },
  canGoToPokemon: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const selectPokemon = (pokemon: DetailPokemon) => {
  if (!pokemon.selected && teamStore.isLimitReached) return

  pokemon.selected = !pokemon.selected
  if (!pokemon.selected) {
    teamStore.removePokemon(pokemon)
  } else {
    teamStore.addPokemon(pokemon)
  }
}

const playAudio = (pokemon: DetailPokemon) => {
  const audio = new Audio(pokemon.cries.latest)
  audio.play()
}

const goToPokemon = (pokemon: DetailPokemon) => {
  teamStore.addBreadcrumb({ name: pokemon.name, link: `/team/${pokemon.id}` })
  router.push({ name: 'pokemon-detail', params: { id: pokemon.id } })
}
</script>
