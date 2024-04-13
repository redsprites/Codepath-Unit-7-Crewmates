import React from 'react';
import './CrewmateCard.css';
import { Link } from 'react-router-dom';
import { CrewmateCardProps } from '../interfaces';

const CrewmateCard: React.FC<CrewmateCardProps> = ({ id, name, color, speed, created_at, imageUrl }) => {
      return (
    
    <div className="card">
        <Link to={`/crewmates/${id}`}>
        <div className="content">
          <div style={{backgroundColor: 'grey'}}>
          <img src={imageUrl} alt="Crewmate" />    
          </div>
       
        <h2>{name}</h2>
        <p>Color: {color}</p>
        <p>Speed: {speed}</p>
        <p>Created at: {new Date(created_at).toLocaleDateString()}</p>
        </div>
        </Link>   
        <Link to={`/crewmates/${id}/edit`}>
          <button>Edit</button>
        </Link>
    </div>
   
  );
};

export default CrewmateCard;
