import React from "react";
import "./HarryPotterCard.css";

const HarryPotterCard = ({ character }) => {
  return (
    <div className="harryPotterCard">
      <img src={character.image} />
      <h3>名前：{character.name}</h3>
      <p>誕生日:{character.dateOfBirth}</p>
    </div>
  );
};

export default HarryPotterCard;
