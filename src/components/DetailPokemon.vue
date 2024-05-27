<template>
  <div class="detail-pokemon" :class="{ 'detail-pokemon--is-mobile': isMobile }">
    <Breadcrumb :items="teamStore.breadcrumb" />
    <section class="detail-pokemon__container">
      <span class="detail-pokemon__name">
        {{ pokemonSelected.name }}
      </span>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team'
import { useRouter } from 'vue-router'
import Breadcrumb from './common/BreadcrumbCommon.vue'
import { useIsMobile } from '@/mixins/isMobileMixin'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'

const teamStore = useTeamStore()
const { isMobile } = useIsMobile()
const router = useRouter()
const pokemonSelected = ref({} as DetailPokemon)

onMounted(() => {
  const id = Number.parseInt(router.currentRoute.value.params.id as string)
  const existPokemon = teamStore.teamPokemon.find((pokemon) => pokemon.id === id)
  if (!existPokemon) {
    router.push('/team')
  } else {
    pokemonSelected.value = existPokemon
  }
})
</script>
