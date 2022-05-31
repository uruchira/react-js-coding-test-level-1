import "./App.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Modal from "react-modal";

import Loading from "./components/Loading";
import { modalStyles } from "./styles";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");

  const fetchPokemonData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setError(null);
      setPokemons(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const pokemonItems = useMemo(
    () =>
      pokemons.filter(({ name }) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [pokemons, searchText]
  );

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const renderPokemonData = () => {
    if (isLoading) {
      return <Loading type="spin" color="white" />;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    if (!isLoading && pokemonItems.length === 0) {
      return <p>No pokemons found</p>;
    }
    if (pokemonItems.length) {
      return (
        <ul className="pokemon-list">
          {pokemonItems.map((pokemonItem) => (
            <li key={pokemonItem.url}>{pokemonItem.name}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <header className="App-header">
        <h1>Welcome to pokedex !</h1>
        <input
          type="text"
          className="App-input"
          value={searchText}
          onChange={(e) => onSearchTextChange(e)}
        />
        <br />
        <>{renderPokemonData()}</>
      </header>
      {pokemonDetail && (
        <Modal
          style={modalStyles}
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
        >
          <div>
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
