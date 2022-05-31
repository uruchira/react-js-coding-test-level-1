import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

import Loading from "./components/Loading";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

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

  if (error) {
    return (
      <header className="App-header">
        <p>{error.message}</p>
      </header>
    );
  }

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name. (DONE)
            </li>
            <li>Implement React Loading and show it during API call (DONE)</li>
            <li>
              when hover on the list item , change the item color to yellow.
              (DONE)
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <Loading type="spin" color="white" />
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <ul className="pokemon-list">
              {pokemons.map((pokemon) => (
                <li key={pokemon.url}>{pokemon.name}</li>
              ))}
            </ul>
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          style={customStyles}
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
