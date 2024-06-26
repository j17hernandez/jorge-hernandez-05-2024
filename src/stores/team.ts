import type { BreadCrumb } from '@/interfaces/breadcrumb.interface'
import type { DetailPokemon } from '@/interfaces/detail-pokemon.interface'
import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teamPokemon: [] as DetailPokemon[],
    teamPokemonLimit: 6,
    breadcrumb: [{ name: 'Team', link: '/team' }] as BreadCrumb[]
  }),
  getters: {
    isLimitReached(): boolean {
      return this.teamPokemon.length === this.teamPokemonLimit
    }
  },
  actions: {
    addPokemon(pokemon: DetailPokemon) {
      if (this.teamPokemon.length === this.teamPokemonLimit) return
      this.teamPokemon.push(pokemon)
    },
    removePokemon(pokemon: DetailPokemon) {
      const index = this.teamPokemon.indexOf(pokemon)
      this.teamPokemon.splice(index, 1)
    },
    addBreadcrumb(breadcrumb: BreadCrumb) {
      this.breadcrumb.push(breadcrumb)
    }
  }
})
