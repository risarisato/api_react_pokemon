import { useEffect, useState } from "react";
import './App.css';
import Card from "./components/Card/Card";
import Navbar from "./components/Navber/Navbar";

import { getAllPokemon, getPokemon } from "./utiles/pokemon.js";

function App() {
  // APIのURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //useState: Reactの状態を管理する→ページの読み込み状態を管理
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  // userEffect: ページが読み込まれた時に実行される
  useEffect(() => {
    const fetchPokemonDate = async () => {
      // 全体ポケモンのデータを取得(awaitで「getAllPokemon」を待つ)
      let res = await getAllPokemon(initialURL);

      // loadPokemonで各ポケモンの詳細データを取得
      loadPokemon(res.results);
      //console.log(res);
      setLoading(false);
    };
    fetchPokemonDate();
  }, []);

  // loadPokemonの詳細ポケモンデータを取得
  const loadPokemon = async(date) => {
    // Promise.allで全ての詳細ポケモンデータを取得
    let _pokemonDate = await Promise.all(
      // map: 配列の要素を変換する
      date.map((pokemon) => {
        // getPokemonで各ポケモンの詳細データURLを取得
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonDate);
  };
  //console.log(pokemonData);

  /*
   JSX記号の三項演算子:ブラウザに表示される箇所
   Reactの書き方: {}で囲む→JSX記号を埋め込むJSXフラグメント<></>
   ここはHTMLのように見えるが、JSX記号で記述されている
  */
  return (
    <>
      <Navbar />
      <div className="App">
      {loading ? (
        <h1>Loading...ロード中です。</h1>
       ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              // Cardコンポーネント化して、別ファイルに記述src\components\Card\Card.js
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
      </div>
    </>
  );
}

export default App;
