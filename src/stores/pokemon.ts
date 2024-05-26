import { defineStore } from 'pinia'
import PokeAPI from '@/api/PokeAPI'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'
import type { Pokemon, Result } from '@/interfaces/pokemon.interface'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Result[],
    detailAllPokemons: [] as DetailPokemon[]
  }),
  actions: {
    async getAllPokemons() {
      const response = await PokeAPI.getAllPokemons()
      const data: Pokemon = await response.data
      this.pokemons = data.results
    },
    async getPokemonByName(name: string) {
      const response = await PokeAPI.getPokemonByName(name)
      const data = await response.data
      return data
    },
    async getDetailAllPokemons() {
      if (this.pokemons.length === 0) {
        await this.getAllPokemons()
      }
      const promises = this.pokemons.map(async (pokemon) => {
        const data: DetailPokemon = await this.getPokemonByName(pokemon.name)
        this.detailAllPokemons.push(data)
      })

      return Promise.all(promises)
    }
  }
})
