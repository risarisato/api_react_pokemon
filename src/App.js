import { useEffect, useState } from "react";
import './App.css';
import Card from "./components/Card/Card";
import ImageCard from "./components/ImageCard/ImageCard";
import Navbar from "./components/Navber/Navbar";
import { getAllPokemon, getPokemon } from "./utiles/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const imagesURL = "https://picsum.photos/v2/list?page=2&limit=20";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonRes, imagesRes] = await Promise.all([
          getAllPokemon(initialURL),
          fetch(imagesURL)
        ]);

        const pokemonData = await loadPokemon(pokemonRes.results);
        const imagesData = await imagesRes.json();

        setPokemonData(pokemonData);
        setImages(imagesData);
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
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => (
                <Card key={i} pokemon={pokemon} />
              ))}
            </div>
            <div className="imageContainer">
              {images.map((image, index) => (
                <ImageCard key={index} image={image} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
