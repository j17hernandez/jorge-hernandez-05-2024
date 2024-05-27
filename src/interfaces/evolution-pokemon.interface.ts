export interface Evolution {
  name: string;
  image: string;
  audio: string;
}

export interface EvolutionPokemon {
  baby_trigger_item: null;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionDetail {
  gender: null;
  held_item: null;
  item: Species | null;
  known_move: null;
  known_move_type: Species | null;
  location: Species | null;
  min_affection: number | null;
  min_beauty: null;
  min_happiness: number | null;
  min_level: null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: TimeOfDay;
  trade_species: null;
  trigger: Species;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}

export enum TimeOfDay {
  Day = "day",
  Empty = "",
  Night = "night",
}
