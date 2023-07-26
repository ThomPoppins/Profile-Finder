import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

const Home = () => {
  // a state variable that is used to toggle the modal
  const [showModal, setShowModal] = useState(false);

  // a state variable that is used to toggle between the login and signup forms
  const [isSignUp, setIsSignUp] = useState(true);

  // a token that is used to check if the user is logged in
  const authToken = false;

  // a function that is called when the button is clicked
  const handleClick = () => {
    // it sets the state variable showModal to true, which opens the modal
    setShowModal(true);

    // it sets the state variable isSignUp to true, which renders the signup form
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      {/* the Nav component is imported and rendered */}
      {/* the authToken and setShowModal variables are passed as props */}
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">VIND-EXPERT</h1>

        <h2 className="secondary-title">Door Thom Veldpaus</h2>

        {/* if the user is logged in, the button says "Signout" */}
        {/* if the user is not logged in, the button says "Create Account" */}
        {/* when the button is clicked, the handleClick function is called */}
        {/* the handleClick function sets the state variable showModal to true */}
        {/* which opens the modal */}
        {/* the handleClick function sets the state variable isSignUp to true */}
        {/* which renders the signup form */}
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>

        {/* if showModal is true, the AuthModal component is rendered */}
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
