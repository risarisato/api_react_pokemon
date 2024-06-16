// ポケモン詳細情報を表示するコンポーネント
import React from "react";

const Card = ({ pokemon }) => {
    return (
      <div className="card">
        <div className="cardImg">
          <img src={pokemon.sprites.front_default} alt="正面画像" />
          <img src={pokemon.sprites.back_default} alt="背面画像" />
        </div>
        <h3 className="cardName">{pokemon.name}</h3>
        <div className="cardTypes">
            <div>属性タイプ</div>
            {pokemon.types.map((type) => {
              return (
                <div>
                  <span className="typeName">{type.type.name}</span>
                </div>
              );
            })}
        </div>
        <div className="cardInfo">
          <div className="cardData">
            <p className="title">体重：{pokemon.weight}</p>
        </div>
        <div className="cardData">
            <p className="title">身長：{pokemon.height}</p>
        </div>
        <div className="cardData">
            <p className="title">属性：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
    );
};

export default Card;