import logo from "../images/logo.png";
import colorlogo from "../images/colorlogo.png";

// the Nav component is a functional component that takes in props
const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => {
  // a function that is called when the button is clicked
  const handleClick = () => {
    // it sets the state variable showModal to true, which opens the modal
    setShowModal(true);
    // it sets the state variable isSignUp to false, which renders the login form
    setIsSignUp(false);
  };

  // a variable that normally is true if the user is logged in
  const authToken = false;

  return (
    <nav>
      <div className="logo-container">
        {/* if minimal is true, the logo is the minimal logo, otherwise it is the color logo */}
        <img className="logo" alt="logo" src={minimal ? logo : colorlogo} />
      </div>

      {/* if minimal and authToken are false, the Log In button is rendered */}
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

// export the component so it can be imported in other files
export default Nav;
