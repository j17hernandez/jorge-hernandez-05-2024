import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL_BASE
const limit = import.meta.env.VITE_POKEMON_LIMIT
const axiosApi = axios.create({
  baseURL: baseUrl
})

class PokeAPI {
  getAllPokemons() {
    return axiosApi.get(`/pokemon?limit=${limit}`)
  }

  getPokemonByName(name: string) {
    return axiosApi.get(`/pokemon/${name}`)
  }
}
export default new PokeAPI()
