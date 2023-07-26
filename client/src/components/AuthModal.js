import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setShowModal, isSignUp }) => {
  // state variables that store the values of the input fields
  // they are updated when the input fields are changed
  // TODO: maybe keep the following commend: they are used to make a POST request to the backend
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  // useNavigate is a function that is used to navigate to a different page
  let navigate = useNavigate;

  console.log(email, password, confirmPassword);

  // a function that is called when the X on the div is clicked
  // it sets the state variable to false, which closes the modal
  const handleClick = () => {
    setShowModal(false);
  };

  // a function that is called when the form is submitted
  // it makes a POST request to the backend
  // e is the event object
  const handleSubmit = async (e) => {
    // prevent the default behaviour of the form
    e.preventDefault();
    // check if the passwords match if it is a signup
    // if they don't, set an error message
    // try to make a POST request to the backend
    // if it doesn't work, catch the error and log it to the console
    // TODO: show error message to the user if password don't match
    // TODO: make a POST request to the backend
    // TODO: if the request is successful, close the modal
    // TODO: if the request is not successful, show an error message
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords do not match");
        console.log("Passwords do not match");
        return;
      }

      // call database and post the email and password
      // response is the response from the database
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/signup",
        {
          email,
          password,
        }
      );

      // if the response is successful, redirect user to /onboarding
      // 201 is the success status code
      // TODO: find another way to redirect the user to /onboarding
      // if (response.status === 201) navigate("/onboarding");
      // TODO: remove console.log
      console.log(response.status);
      if (response.status === 201) {
        // TODO: redirect the user to /onboarding instead of closing the modal
        // navigate("/onboarding");
        console.log("I should have been redirected");
        setShowModal(false); // close the modal after registration
      }
    } catch (error) {
      // if the response is not successful, log the error to the console
      console.log(error);
    }
  };

  return (
    // this modal pops up when the user clicks the login or signup button
    <div className="auth-modal">
      {/* the div that is clicked to close the modal */}
      <div className="close-icon" onClick={handleClick}>
        X
      </div>
      {/* the title of the modal changes depending on isSingup*/}
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        With clicking Log In you agree to our terms. <br />
        Learn how we process your data in our Privacy Policy and Cookie Policy.
      </p>
      {/* the form is rendered */}
      <form onSubmit={handleSubmit}>
        {/* the input fields are rendered */}
        {/* the values of the input fields are set to the state variables */}
        {/* the state variables are updated when the input fields are changed */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* the confirm password input field is only rendered when isSignup is true */}
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="Confirm Password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input type="submit" className="secondary-button" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
