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
  const [genderedUsers, setGenderedUsers] = useState(null);
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

  // TODO: remove genderedUsers functionality when replacing Tinder matches with company profiles.
  // TODO: render company profile list based on search criteria
  const getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/gendered-users",
        {
          params: {
            gender: user?.gender_interest,
          },
        }
      );
      setGenderedUsers(response.data);
    } catch (error) {
      // log any errors to the console
      console.log(error);
    }
  };

  // useEffect() hook:
  // call getUser() and getGenderedUsers() when the component is mounted
  // call getUser()  and getGenderedUsers() when the component is unmounted
  // call getUser()  and getGenderedUsers() when the component is updated
  // call getUser()  and getGenderedUsers() when user or genderedUsers state change
  // TODO: BUG: investigate why the useEffect() is looping and how to solve this isSecureContext, it has something to do with the state change of users and genderedUsers. Find how it has to work when not run on state changes of user and genderedUsers.
  useEffect(() => {
    getUser();
    getGenderedUsers();
    // }, [user, genderedUsers]); // TODO: enable this one to execute when state changes in case /dashboard is not up to date. BUG!: Results in infinite loop.
  }, []);

  // TODO: remove console.log() statements
  console.log("DASHBOARD USER:", user);
  console.log("DASHBOARD GENDERED USERS:", genderedUsers);

  // save last swipe direction in state
  const [lastDirection, setLastDirection] = useState();

  // TODO: remove match logic when replacing Tinder matches with clickable company profiles.
  // call /matches endpoint to update the matches
  const updatedMatches = async (matchedUserId) => {
    // if there is no user, return
    if (!user) return;

    // call /matches endpoint to update the matches
    try {
      await axios.put(process.env.REACT_APP_BACKEND_URL + "/matches", {
        user_id: user.user_id,
        matched_user_id: matchedUserId,
      });
    } catch (error) {
      console.log("CATCHED UPDATED USER ERROR", error);
    }
  };

  // console.log() to log which name will be deleted, but not really (yet)
  // setLastDirection() to save the direction
  // TODO: remove match logic when replacing Tinder matches with clickable company profiles.
  const swiped = (direction, swipedUser) => {
    if (direction === "right") {
      updatedMatches(swipedUser.user_id);
    }

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
        {/* Display a loading text and animation when the genderedUsers aren't loaded yet */}
        {/* TODO: display a message when there are no more cards */}
        {/* Replace genderedUsers with company profiles */}
        {genderedUsers && (
          <div className="card-container">
            {/* the cards are created with the map() function */}
            {genderedUsers?.map((genderedUsers) => (
              // the swiped() function is called when a card is swiped
              // the outOfFrame() function is called when a card leaves the screen
              // the swiped() and outOfFrame() functions are passed as props to the TinderCard component
              <TinderCard
                className="swipe"
                key={genderedUsers.first_name}
                onSwipe={(dir) => swiped(dir, genderedUsers.user_id)}
                onCardLeftScreen={() => outOfFrame(genderedUsers.first_name)}
              >
                {/* each card contains the genderedUser name and image */}
                <div
                  style={{ backgroundImage: "url(" + genderedUsers.url + ")" }}
                  className="card"
                >
                  <h3>{genderedUsers.first_name}</h3>
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
        )}
        {!genderedUsers && (
          <div className="card-container">
            <div className="card">
              <h3>Loading...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
