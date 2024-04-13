import { Link } from 'react-router-dom';
import {Button} from './components/ui/button'

function App() {
  return (
    <>
      <div style={{display: 'flex' , flexDirection:'column', alignContent: 'center', alignItems: 'center'}}>
      <h1> Welcome to the Crewmate Creator! </h1>
      <p> Here is where you can create your very own set of crewmates before sending them off into space!</p>
      <img src="./assets/crewmates.43d07b24.png" style ={{width:'500px', height:'auto'  }} alt="Crewmate" />
      <br />
      <Link to="/create"> <Button> Create a new Crewmate  </Button></Link>
      <br /> 
      <br />
      <Link to="/gallary"><Button> Crewmate Gallary </Button></Link>
      </div>
    </>
  )
}

export default App
