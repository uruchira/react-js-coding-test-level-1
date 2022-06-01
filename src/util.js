import { ASC, DESC } from "./constants";

export const sortPokemonData = (sortValue, data) => {
  return sortValue === ASC
    ? data.sort((a, b) => (a.name < b.name ? -1 : 1))
    : sortValue === DESC
    ? data.sort((a, b) => (a.name > b.name ? -1 : 1))
    : data;
};
