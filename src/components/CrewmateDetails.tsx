// src/components/CrewmateDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabaseInstance from "@/contexts/supabaseInstance";
import { CrewmateCardProps } from '@/interfaces';
import { Button } from './ui/button';

const CrewmateDetails = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState<CrewmateCardProps| null>(null);
  const supabase = supabaseInstance();

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewMate')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching crewmate:', error);
      } else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div style={{display: 'flex' , flexDirection:'column', alignContent: 'center', alignItems: 'center'}}>
      <Link to="/gallary"><Button>Back to Gallery</Button></Link>
      <br />
      <img src='../../assets/crewmate.ce385016.png' style={{width: '200px', height:'auto'}} alt="Crewmate" />
      <h1>{crewmate.name}</h1>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed}</p>
      <p>Created at: {new Date(crewmate.created_at).toLocaleDateString()}</p>
      
      <Link to={`/crewmates/${id}/edit`}><Button>Wanna edit this Crewmate?</Button></Link>
    </div>
  );
};

export default CrewmateDetails;
