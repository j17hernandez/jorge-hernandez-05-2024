import { defineStore } from "pinia";
import PokeAPI from "@/api/PokeAPI";
import type {
  Chain,
  Evolution,
} from "@/interfaces/evolution-pokemon.interface";

export const useDetailPokemonStore = defineStore("detailPokemon", {
  state: () => ({
    evolutionPokemon: [] as Evolution[],
  }),
  actions: {
    async getPokemonData(name: string) {
      const response = await PokeAPI.getPokemonByName(name);
      return {
        name: name,
        image: response.data.sprites.front_default,
        audio: response.data.cries.latest,
      };
    },
    async processEvolutionChain(chain: Chain) {
      const evolutions = [];
      let current: Chain | null = chain;

      while (current) {
        const pokemonData = await this.getPokemonData(current.species.name);
        evolutions.push(pokemonData);

        if (current.evolves_to.length > 0) {
          current = current.evolves_to[0];
        } else {
          current = null;
        }
      }

      return evolutions;
    },

    async getEvolutionPokemon(url: string) {
      const specie = await PokeAPI.getSpeciePokemon(url);
      const evolutionChain = specie.data.evolution_chain;
      const chain = await PokeAPI.getEvolutionPokemon(evolutionChain.url);
      const evolutions = await this.processEvolutionChain(chain.data.chain);
      this.evolutionPokemon = evolutions;
      return evolutions;
    },
  },
});
