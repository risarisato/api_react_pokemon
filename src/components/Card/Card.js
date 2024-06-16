// ポケモン詳細情報を表示するコンポーネント
import React from "react";
import "./Card.css";

const Card = ({ pokemon }) => {
    return (
      <div className="card">
        <div className="cardImg">
          <img src={pokemon.sprites.front_default} alt="正面画像" />
          <img src={pokemon.sprites.front_shiny} alt="キャラ色画像" />
        </div>
        <h3 className="cardName">{pokemon.name}</h3>
    </div>
    );
};

export default Card;