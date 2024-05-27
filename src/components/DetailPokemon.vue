<template>
  <div
    class="detail-pokemon"
    :class="{ 'detail-pokemon--is-mobile': isMobile }"
  >
    <Loading :isLoading="isLoading" />
    <Breadcrumb :items="teamStore.breadcrumb" />
    <section
      v-if="Object.keys(pokemonSelected).length > 0"
      class="detail-pokemon__container"
    >
      <div class="detail-pokemon__header">
        <div class="detail-pokemon__types">
          <span class="detail-pokemon__types__title">Types:</span>
          <span class="detail-pokemon__types__name">{{
            pokemonSelected.types.map((type) => type.type.name).join(", ")
          }}</span>
        </div>

        <div class="detail-pokemon__presentation">
          <span class="detail-pokemon__presentation__name">
            {{ pokemonSelected.name }}
          </span>
          <img
            class="detail-pokemon__presentation__image"
            :src="pokemonSelected.sprites.front_default"
            :alt="pokemonSelected.name"
          />
        </div>
        <div class="detail-pokemon__stats">
          <span class="detail-pokemon__stats__title">Stats:</span>
          <div
            class="detail-pokemon__stats__item"
            v-for="(stat, index) in pokemonSelected.stats"
            :key="index"
          >
            <span class="detail-pokemon__stats__item__name">
              {{ stat.stat.name }}:
            </span>
            <span>{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
      <div class="detail-pokemon__body">
        <h1 class="detail-pokemon__body__title">Evolutions</h1>
        <div class="detail-pokemon__body__evolution">
          <Card
            v-for="(evolution, index) in detailPokemonStore.evolutionPokemon"
            :key="index"
          >
            <template #title>
              <div class="detail-pokemon__body__evolution__card__header">
                <span
                  class="detail-pokemon__body__evolution__card__header__title"
                  >{{ evolution.name }}</span
                >
              </div>
            </template>
            <template #body>
              <div class="detail-pokemon__body__evolution__card__body">
                <img
                  class="detail-pokemon__body__evolution__card__body__image"
                  :src="evolution.image"
                  :alt="evolution.name"
                />
              </div>
            </template>
            <template #footer>
              <div class="detail-pokemon__body__evolution__card__footer">
                <img
                  class="detail-pokemon__body__evolution__card__footer__image"
                  :src="soundIcon"
                  alt="sound-icon"
                  @click="playAudio(evolution)"
                />
              </div>
            </template>
          </Card>
        </div>
        <br />
        <br />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useTeamStore } from "@/stores/team";
import { useDetailPokemonStore } from "@/stores/detailPokemon";
import { useRouter } from "vue-router";
import { useIsMobile } from "@/mixins/isMobileMixin";
import type { DetailPokemon } from "@/interfaces/detail-pokemon.interface";
import Breadcrumb from "@/components/common/BreadcrumbCommon.vue";
import Loading from "@/components/common/LoadingCommon.vue";
import Card from "@/components/common/CardCommon.vue";
import soundIcon from "@/assets/img/icons/sound.png";
import type { Evolution } from "@/interfaces/evolution-pokemon.interface";

const teamStore = useTeamStore();
const detailPokemonStore = useDetailPokemonStore();
const isLoading = ref(false);
const { isMobile } = useIsMobile();
const router = useRouter();
const pokemonSelected = ref({} as DetailPokemon);

const playAudio = (evolution: Evolution) => {
  const audio = new Audio(evolution.audio);
  audio.play();
};

onMounted(() => {
  isLoading.value = true;
  const id = Number.parseInt(router.currentRoute.value.params.id as string);
  const existPokemon = teamStore.teamPokemon.find(
    (pokemon) => pokemon.id === id
  );
  if (!existPokemon) {
    router.push("/team");
  } else {
    pokemonSelected.value = existPokemon;
    detailPokemonStore
      .getEvolutionPokemon(existPokemon.species.url)
      .then(() => {
        isLoading.value = false;
      });
  }
});
</script>
