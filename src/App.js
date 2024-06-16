import { useEffect, useState } from "react";
import './App.css';
import Card from "./components/Card/Card";
import Navbar from "./components/Navber/Navbar";

import { getAllPokemon, getPokemon } from "./utiles/pokemon.js";

function App() {
  // APIのURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const imagesURL = "https://picsum.photos/v2/list?page=2&limit=20";
  //useState: Reactの状態を管理する→ページの読み込み状態を管理
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [images, setImages] = useState([]);
  // 次のページのURL
  //const [nextUrl, setNextUrl] = useState("");
  // 前のページのURL
  //const [prevUrl, setPrevUrl] = useState("");

  // userEffect: ページが読み込まれた時に実行される
  useEffect(() => {
    const fetchPokemonDate = async () => {
      // 全体ポケモンのデータを取得(awaitで「getAllPokemon」を待つ)
      let res = await getAllPokemon(initialURL);
      //console.log(res);
      // loadPokemonで各ポケモンの詳細データを取得
      loadPokemon(res.results);
      //console.log(res);
      // setNextUrlで次のAPIページのURLを取得
      //setNextUrl(res.next);
      // setPrevUrlで前のAPIページのURLを取得
      //setPrevUrl(res.previous); // 最初のページの場合はnullになる
      setLoading(false);
    };
    fetchPokemonDate();
  //}, []); →配列形式になっているのでここをコメントアウトを戻せばOK

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

  // picsum.photosAPI画像データを取得する
  const fetchImages = async () => {
    const response = await fetch(imagesURL);
    const data = await response.json();
    setImages(data);
  };
  fetchImages();
  }, []);


  //console.log(pokemonData);

  // 次ページのボタンを押した時の処理
  //const handleNextPage = async () => {
  //  setLoading(true);
  //  // 次のページのAPIページ全体を取得
  //  let date = await getAllPokemon(nextUrl);
  //  // loadPokemonで各ポケモンの詳細データを取得
  //  await loadPokemon(date.results);
  //  // 3ページ目以降のページネーション
  //  setNextUrl(date.next);
  //  setPrevUrl(date.previous); // 前のページのURLを取得
  //  setLoading(false);
  //};
//
  //// 前ページのボタンを押した時の処理
  //const handlePrevPage = async () => {
  //  // 1ページで前ページのボタンを押した場合は処理をreturnで終了させる
  //  if (!prevUrl) return;
//
  //  setLoading(true);
  //  let date = await getAllPokemon(prevUrl);
  //  await loadPokemon(date.results);
  //  setNextUrl(date.next);
  //  setPrevUrl(date.previous);
  //  setLoading(false);
  //};


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
        <div className="container">
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              // Cardコンポーネント化して、別ファイルに記述src\components\Card\Card.js
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="imageContainer">
          {images.map((image, index) => (
            <img key={index} src={image.download_url} />
          ))}
          </div>
          {/*<div className="btn">*/}
            {/* <button onClick={handlePrevPage}>Previous</button> */}
            {/* <button onClick={handleNextPage}>Next</button> */}
          {/*</div>*/}
        </div>
      </>
    )}
    </div>
  </>
  );
}

export default App;
