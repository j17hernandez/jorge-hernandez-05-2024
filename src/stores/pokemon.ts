import { defineStore } from 'pinia'
import PokeAPI from '@/api/PokeAPI'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'
import type { Pokemon, Result } from '@/interfaces/pokemon.interface'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Result[],
    detailAllPokemons: [] as DetailPokemon[],
    paginatedPokemons: [] as DetailPokemon[],
    pageSize: 25,
    currentPage: 1,
    totalPages: 0
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
        this.detailAllPokemons.push({ ...data, selected: false })
      })

      return Promise.all(promises)
    },
    getPaginatedPokemons() {
      this.totalPages = Math.ceil(this.detailAllPokemons.length / this.pageSize)
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      const currentPageData = this.detailAllPokemons.slice(start, end)
      this.paginatedPokemons = currentPageData
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
})
