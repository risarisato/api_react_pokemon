import React from "react";
import "./HarryPotterCard.css";

const HarryPotterCard = ({ character }) => {
  return (
    <div className="harryPotterCard">
      <img src={character.image} />
      <h3>{character.name}</h3>
      <p>brithday:{character.dateOfBirth}</p>
    </div>
  );
};

export default HarryPotterCard;
