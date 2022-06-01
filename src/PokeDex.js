import "./App.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Modal from "react-modal";

import Loading from "./components/Loading";
import Sorting from "./components/Sorting";
import Pagination from "./components/Pagination";

import { sortPokemonData } from "./util";
import { POKEMON_API_URL } from "./constants";
import { modalStyles } from "./styles";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [currentPageUrl, setCurrentPageUrl] = useState(POKEMON_API_URL);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();

  const fetchPokemonData = async (url) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url);
      setError(null);
      setPokemons(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData(currentPageUrl);
  }, [currentPageUrl]);

  function onSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  function onSortChange(option) {
    setSortOption(option);
  }

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  const pokemonItems = useMemo(() => {
    const filteredData = pokemons.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return sortPokemonData(sortOption, filteredData);
  }, [pokemons, searchText, sortOption]);

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
        <Sorting sortOption={sortOption} onSortChange={onSortChange} />
        <br />
        <>{renderPokemonData()}</>
        <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={previousPageUrl ? gotoPreviousPage : null}
        />
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
          <p>Modal Content goes here...</p>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
