<template>
  <div class="team-pokemon-list" :class="{ 'team-pokemon-list--is-mobile': isMobile }">
    <Loading :isLoading="isLoading" />
    <Breadcrumb v-if="teamStore.teamPokemon.length > 0" :items="teamStore.breadcrumb" />
    <section
      v-if="!isLoading && teamStore.teamPokemon.length > 0"
      class="team-pokemon-list__container"
    >
      <CardPokemon
        :width="350"
        :widthImage="200"
        :pokemons="teamStore.teamPokemon"
        showCheckbox
        showAttributes
        canGoToPokemon
      ></CardPokemon>
    </section>
    <div v-else class="team-pokemon-list__empty">
      <span class="team-pokemon-list__empty__title">Your team is empty</span>
      <div class="team-pokemon-list__empty__image"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTeamStore } from '@/stores/team'
import Loading from './common/LoadingCommon.vue'
import Breadcrumb from './common/BreadcrumbCommon.vue'
import CardPokemon from './CardPokemon.vue'
import { useIsMobile } from '@/mixins/isMobileMixin'

const teamStore = useTeamStore()
const { isMobile } = useIsMobile()
const isLoading = ref(false)
</script>
