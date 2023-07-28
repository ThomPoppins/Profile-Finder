import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // TODO: write documentation
  // state variable that stores the user
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // create a new instance of the Cookies class
  const cookies = new Cookies();

  // the user state changes when the user_id is saved in cookies
  // the user_id is saved in cookies short after when the user logs in
  // get user_id from cookies and use it as filter to get the user from the backend
  const getUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/user",
        {
          params: { user_id: cookies.get("user_id") },
        }
      );
      setUser(response.data);
    } catch (error) {
      // TODO: handle error
      console.log(error);
      // redirect to homepage
      navigate("/");
    }
  };

  // useEffect() hook:
  // call getUser() when the component is mounted
  // call getUser() when the component is unmounted
  // call getUser() when the component is updated
  // the component is updated when the user state changes
  // the user state changes when the user_id is saved in cookies
  useEffect(() => {
    getUser();
  }, []);

  // TODO: remove console.log()
  console.log("USER: ", user);

  // sample data for the cards
  const characters = [
    {
      name: "Richard Hendricks",
      url: "http://localhost:3000/static/media/colorlogo2.82fff75c874f0bd21541.png",
    },
    {
      name: "Erlich Bachman",
      url: "http://localhost:3000/static/media/colorlogo2.82fff75c874f0bd21541.png",
    },
    {
      name: "Monica Hall",
      url: "http://localhost:3000/static/media/colorlogo2.82fff75c874f0bd21541.png",
    },
    {
      name: "Jared Dunn",
      url: "http://localhost:3000/static/media/colorlogo2.82fff75c874f0bd21541.png",
    },
    {
      name: "Dinesh Chugtai",
      url: "http://localhost:3000/static/media/colorlogo2.82fff75c874f0bd21541.png",
    },
  ];

  // save last swipe direction in state
  const [lastDirection, setLastDirection] = useState();

  // arrow function with 2 parameters (direction, nameToDelete)
  // console.log() to log which name will be deleted, but not really (yet)
  // setLastDirection() to save the direction
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  // arrow function with 1 parameter (name)
  // console.log() to log which name left the screen
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // the TinderCard component is imported from the react-tinder-card library
  return (
    // here the actual dashboard component is returned
    <div className="dashboard">
      {/* it contains the chat container and the swipe container */}
      <ChatContainer user={user} />
      {/* the swipe container contains the card container */}
      <div className="swipe-container">
        {/* the card container contains the cards */}
        <div className="card-container">
          {/* the cards are created with the map() function */}

          {characters.map((character) => (
            // the swiped() function is called when a card is swiped
            // the outOfFrame() function is called when a card leaves the screen
            // the swiped() and outOfFrame() functions are passed as props to the TinderCard component
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              {/* each card contains the character name and image */}
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          {/* the swipe-info container contains the last direction */}
          {/* the last direction is saved in the state */}
          {/* TODO: remove tekst "You swiped right!" etc. */}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
