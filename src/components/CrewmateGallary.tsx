import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CrewmateCard from './CrewmateCard';
import supabaseInstance from "@/contexts/supabaseInstance";
import { Button } from './ui/button';

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState<any[]>([]);
  const supabase = supabaseInstance();

  useEffect(() => {
    const fetchCrewMates = async () => {
      const { data, error } = await supabase
        .from('crewMate')
        .select('*');

      if (error) {
        console.error('Error fetching crew mates:', error);
      } else {
        setCrewmates(data);
      }
    };

    fetchCrewMates();
  }, []);

  return (
    <>
      <Link to='/'><Button> Home </Button></Link>
      <div>
        <h1>CrewMate Gallery</h1>
        <div className="gallery">
          {crewmates.map(crewmate => (
            <CrewmateCard
              id={crewmate.id}
              name={crewmate.name}
              color={crewmate.color}
              speed={crewmate.speed}
              created_at={crewmate.created_at}
              imageUrl='../../assets/crewmate.ce385016.png' 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CrewmateGallery;
