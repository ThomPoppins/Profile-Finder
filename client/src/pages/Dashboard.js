import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";

// TODO: write documentation
const Dashboard = () => {
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
      {/* it contains the chat container and the swipe container */}
      <ChatContainer />
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
