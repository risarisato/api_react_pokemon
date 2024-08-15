import React from "react";
import "./HarryPotterCard.css";

const HarryPotterCard = ({ character }) => {
  return (
    <div className="harryPotterCard">
      <img src={character.image} />
      <h3>name：{character.name}</h3>
      <p>dateOfBirth:{character.dateOfBirth}</p>
    </div>
  );
};

export default HarryPotterCard;
