import logo from "./logo.svg";
import { useQuery, gql } from '@apollo/client';
import "./App.css";

const first_flight = gql`
    query {
      launch(flight_number: 1) {
        flight_number
        mission_name
        launch_year
        launch_date_local
        launch_sucess
        rocket {
          rocket_id
          rocket_name
          rocket_type
        }
      }
    }
  `; 

function App() {
  const { loading, error, data } = useQuery(first_flight);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <h1>SpaceX First Flight</h1>
      <p><span>Flight number: </span>{data.launch.flight_number}</p>
      <p><span>Mission name: </span>{data.launch.mission_name}</p>
      <p><span>Launch year: </span>{data.launch.launch_year}</p>
      <p><span>Launch date: </span>{data.launch.launch_date_local}</p>
      <p><span>Launch success: </span>{(data.launch.launch_sucess) ? (data.launch.launch_sucess) : 'Null'}</p>
      <p><span>Rocket ID: </span>{data.launch.rocket.rocket_id}</p>
      <p><span>Rocket Name: </span>{data.launch.rocket.rocket_name}</p>
      <p><span>Rocket Type: </span>{data.launch.rocket.rocket_type}</p>
      <p style={{marginTop: '50px', color: 'red'}}>
        This application obtains data from the <a href="https://docs.spacexdata.com/">SpaceX API</a>. It then uses GraphQL to knit pick specific data 
        and then uses Apollo client to connect to the GraphQL Server which ultimate gets displayed with React </p>
    </div>
  );
}

export default App;
