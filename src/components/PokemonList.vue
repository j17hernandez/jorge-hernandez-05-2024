<template>
  <div class="pokemon-list" :class="{ 'pokemon-list--is-mobile': isMobile }">
    <Loading :isLoading="isLoading" />
    <div class="pokemon-list__header">
      <Breadcrumb :items="pokemonStore.breadcrumb" />
      <Input
        type="search"
        v-model="pokemonStore.search"
        icon
        @update:modelValue="() => pokemonStore.getPokemonSearch()"
      />
      <section class="pokemon-list__header__pagination">
        <span
          >{{ pokemonStore.currentPage }} of {{ pokemonStore.totalPages }}</span
        >
        <Button outlined :disabled="isDisabledPrev" @click="prev">
          Prev
        </Button>
        <Button outlined :disabled="isDisabledNext" @click="next">
          Next
        </Button>
      </section>
    </div>
    <section v-if="!isLoading" class="pokemon-list__container">
      <CardPokemon :pokemons="pokemonStore.paginatedPokemons" showCheckbox />
    </section>
    <NoDataAvalible
      v-if="!isLoading && pokemonStore.paginatedPokemons.length === 0"
      message="No results found"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemon";
import NoDataAvalible from "@/components/NoDataAvalible.vue";
import Loading from "@/components/common/LoadingCommon.vue";
import CardPokemon from "@/components/CardPokemon.vue";
import Button from "@/components/common/ButtonCommon.vue";
import Breadcrumb from "@/components/common/BreadcrumbCommon.vue";
import Input from "@/components/common/InputCommon.vue";
import { useIsMobile } from "@/mixins/isMobileMixin";

const pokemonStore = usePokemonStore();
const isLoading = ref(false);
const { isMobile } = useIsMobile();

const isDisabledPrev = computed(() => {
  return pokemonStore.currentPage === 1;
});

const isDisabledNext = computed(() => {
  return pokemonStore.currentPage === pokemonStore.totalPages;
});

onMounted(() => {
  if (pokemonStore.paginatedPokemons.length === 0) {
    isLoading.value = true;
    pokemonStore.getDetailAllPokemons().then(() => {
      pokemonStore.getPaginatedPokemons();
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });
  }
});

const prev = () => {
  pokemonStore.currentPage--;
  pokemonStore.getPaginatedPokemons();
};

const next = () => {
  pokemonStore.currentPage++;
  pokemonStore.getPaginatedPokemons();
};
</script>
