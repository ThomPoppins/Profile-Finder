import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import Cookies from "universal-cookie";

// TODO: write documentation
const Dashboard = () => {
  // TODO: write documentation
  // state variable that stores the user
  const [user, setUser] = useState(null);

  // create a new instance of the Cookies class
  const cookies = new Cookies();

  // TODO: write documentation
  // the user state changes when the user_id is saved in cookies
  // the user_id is saved in cookies short after when the user logs in
  // get user_id from cookies
  const getUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/user",
        {
          params: { user_id: cookies.get("user_id") },
        }
      );
      // TODO: handle response
      setUser(response.data);
    } catch (error) {
      // TODO: handle error
      // TODO: redirect to homepage
      console.log(error);
    }
  };

  // useEffect() hook:
  // call getUser() when the component is mounted
  // call getUser() when the component is unmounted
  // call getUser() when the component is updated
  // call getUser() when the user state changes
  useEffect(() => {
    getUser();
  }, []);

  // TODO: remove console.log()
  console.log("USER: ", user);

  // fill {const characters} with sampledata
  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://i.imgur.com/wUgn48u.jpeg",
    },
    {
      name: "Erlich Bachman",
      url: "https://i.imgur.com/wUgn48u.jpeg",
    },
    {
      name: "Monica Hall",
      url: "https://i.imgur.com/wUgn48u.jpeg",
    },
    {
      name: "Jared Dunn",
      url: "https://i.imgur.com/wUgn48u.jpeg",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://i.imgur.com/wUgn48u.jpeg",
    },
  ];

  // save last direction
  const [lastDirection, setLastDirection] = useState();

  // TODO: write documentation
  // arrow function with 2 parameters (direction, nameToDelete)
  // console.log() to log which name will be deleted
  // setLastDirection() to save the direction
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  // TODO: write documentation
  // arrow function with 1 parameter (name)
  // console.log() to log which name left the screen
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  // the TinderCard component is imported from the react-tinder-card library
  return (
    // here the actual dashboard component is returned
    <div className="dashboard">
      {/* the first time the dashboard is loaded, the user state is null */}
      {/* the user state is updated when the user_id is saved in cookies */}
      {/* the user state is updated when the user state changes */}
      {/* the user state is updated when the component is updated */}
      {/* the user state is updated when the component is unmounted */}
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
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
