import type { DetailPokemon } from "@/interfaces/detail-pokemon.interface";
import type { EvolutionPokemon } from "@/interfaces/evolution-pokemon.interface";
import type { Pokemon } from "@/interfaces/pokemon.interface";
import type { SpeciePokemon } from "@/interfaces/specie-pokemon.interface";
import axios, { type AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_API_URL_BASE;
const limit = import.meta.env.VITE_POKEMON_LIMIT;
const axiosApi = axios.create({
  baseURL: baseUrl,
});

class PokeAPI {
  getAllPokemons(): Promise<AxiosResponse<Pokemon>> {
    return axiosApi.get(`/pokemon?limit=${limit}`);
  }

  getPokemonByName(name: string): Promise<AxiosResponse<DetailPokemon>> {
    return axiosApi.get(`/pokemon/${name}`);
  }

  getSpeciePokemon(url: string): Promise<AxiosResponse<SpeciePokemon>> {
    return axiosApi.get(url);
  }
  getEvolutionPokemon(url: string): Promise<AxiosResponse<EvolutionPokemon>> {
    return axiosApi.get(url);
  }
}
export default new PokeAPI();
