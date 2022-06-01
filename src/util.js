import { ASC, DESC } from "./constants";

export const sortPokemonData = (sortValue, data) => {
  return sortValue === ASC
    ? data.sort((a, b) => (a.name < b.name ? -1 : 1))
    : sortValue === DESC
    ? data.sort((a, b) => (a.name > b.name ? -1 : 1))
    : data;
};

export const formatStatsForTable = (stats) => {
  return stats.map((st) => ({
    url: st?.stat.url,
    name: st?.stat.name,
    amount: st.base_stat,
  }));
};

export const formatStatsForChart = (stats, name) => {
  return {
    labels: stats.map((st) => st?.stat.name),
    datasets: [
      {
        label: name,
        data: stats.map((st) => st.base_stat),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
};
