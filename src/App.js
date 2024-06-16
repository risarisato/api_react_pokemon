import { useEffect, useState } from "react";
import './App.css';
import { getAllPokemon } from "./utiles/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // useState: Reactの状態を管理する→ページの読み込み状態を管理
  const [loading, setLoading] = useState(true);

  // userEffect: ページが読み込まれた時に実行される
  useEffect(() => {
    const fetchPokemonDate = async () => {
      // ポケモンのデータを取得(awaitで「getAllPokemon」を待つ)
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonDate();
  }, []);

  // JSX記号の三項演算子:ブラウザに表示される箇所
  return<div className="App">
    {loading ? (
      <h1>Loading...ロード中です。</h1>
     ) : (
      <>
        <h1>pokemonAPI取得しました！</h1>
      </>
    )}
  </div>;
}

export default App;
