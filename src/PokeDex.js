import "./App.css";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Loading from "./components/Loading";
import Sorting from "./components/Sorting";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import BarChart from "./components/BarChart";

import {
  sortPokemonData,
  formatStatsForTable,
  formatStatsForChart,
} from "./util";
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

  const pdfRef = useRef();

  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("pokemon-detail.pdf");
  };

  const fetchPokemonData = async (url) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url);
      setError(null);
      if (data.hasOwnProperty("results")) {
        setPokemons(data.results);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
      } else {
        setPokemonDetail(data);
      }
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

  function onPokemonSelect(apiUrl) {
    setCurrentPageUrl(apiUrl);
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
        <>
          <ul className="pokemon-list">
            {pokemonItems.map((pokemonItem) => (
              <li
                key={pokemonItem.url}
                onClick={() => onPokemonSelect(pokemonItem.url)}
              >
                {pokemonItem.name}
              </li>
            ))}
          </ul>
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={previousPageUrl ? gotoPreviousPage : null}
          />
        </>
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
      </header>
      {pokemonDetail && (
        <Modal
          style={modalStyles}
          ariaHideApp={false}
          isOpen={!!pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
        >
          <div className="pokemon-detail" ref={pdfRef}>
            <h2>{pokemonDetail.name}</h2>
            <img
              src={pokemonDetail.sprites.front_default}
              alt={pokemonDetail.name}
            />
            <div className="pokemon-stats">
              <Table
                columns={["Name", "Value"]}
                rows={formatStatsForTable(pokemonDetail.stats)}
              />
              <BarChart
                data={formatStatsForChart(
                  pokemonDetail?.stats,
                  pokemonDetail.name
                )}
              />
            </div>
          </div>
          <br />
          <div className="download-section">
            <button type="button" onClick={handleDownloadPdf}>
              Download as PDF
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
