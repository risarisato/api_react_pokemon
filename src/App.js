import { useEffect, useState } from "react";
import './App.css';
import Card from "./components/pokemonCard/pokemonCard";
import ImageCard from "./components/ImageCard/ImageCard";
import Navbar from "./components/Navber/Navbar";
import HarryPotterCard from "./components/HarryPotter/HarryPotterCard";
import { getAllPokemon, getPokemon } from "./utiles/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const imagesURL = "https://picsum.photos/v2/list?page=2&limit=20";
  const harryPotterURL = "https://hp-api.onrender.com/api/characters";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [images, setImages] = useState([]);
  const [harryPotterData, setHarryPotterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonRes, imagesRes, harryPotterRes] = await Promise.all([
          getAllPokemon(initialURL),
          fetch(imagesURL),
          fetch(harryPotterURL)
        ]);

        const pokemonData = await loadPokemon(pokemonRes.results);
        const imagesData = await imagesRes.json();
        const harryPotterData = await harryPotterRes.json();

        setPokemonData(pokemonData);
        setImages(imagesData);
        setHarryPotterData(harryPotterData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };

    const loadPokemon = async (data) => {
      const _pokemonData = await Promise.all(
        data.map(pokemon => getPokemon(pokemon.url))
      );
      return _pokemonData;
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...ロード中です。</h1>
        ) : (
          <div className="container">
            <div className="imageContainer">
              {images.map((image, index) => (
                <ImageCard key={index} image={image} />
              ))}
            </div>
            <div className="harryPotterContainer">
              {harryPotterData.map((character, index) => (
                <HarryPotterCard key={index} character={character} />
              ))}
            </div>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => (
                <Card key={i} pokemon={pokemon} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
