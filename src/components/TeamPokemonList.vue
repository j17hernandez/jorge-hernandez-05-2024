<template>
  <div
    class="team-pokemon-list"
    :class="{ 'team-pokemon-list--is-mobile': isMobile }"
  >
    <Loading :isLoading="isLoading" />
    <Breadcrumb
      v-if="teamStore.teamPokemon.length > 0"
      :items="teamStore.breadcrumb"
    />
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
    <NoDataAvalible v-else message="Your team is empty" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTeamStore } from "@/stores/team";
import Loading from "@/components/common/LoadingCommon.vue";
import Breadcrumb from "@/components/common/BreadcrumbCommon.vue";
import NoDataAvalible from "@/components/NoDataAvalible.vue";
import CardPokemon from "@/components/CardPokemon.vue";
import { useIsMobile } from "@/mixins/isMobileMixin";

const teamStore = useTeamStore();
const { isMobile } = useIsMobile();
const isLoading = ref(false);
</script>
