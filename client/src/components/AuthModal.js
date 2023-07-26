import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {
  // state variables that store the values of the input fields
  // they are updated when the input fields are changed
  // TODO: maybe keep the following commend: they are used to make a POST request to the backend
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // state variable that stores the error message
  // it is updated when the passwords don't match
  // TODO: better error handling
  const [error, setError] = useState(null);
  // useNavigate is a function that is used to navigate to a different page
  let navigate = useNavigate();
  // useCookies is a function that is used to set and remove cookies
  // cookies are used to store the token
  // setCookie is a function that is used to set a cookie
  // removeCookie is a function that is used to remove a cookie
  // useCookies returns an array with the following values:
  // 1. the value of the cookie
  // 2. the function that is used to set the cookie
  // 3. the function that is used to remove the cookie
  // TODO: maybe keep the following comment: the following line is used to set the cookies
  const [cookies, setCookie, removeCookie] = useCookie([
    "Email",
    "UserId",
    "AuthToken",
  ]);
  // cookies are used to store the token
  // the token is used to authenticate the user
  // the token is sent to the server with every request
  // the server checks if the token is valid
  // if the token is valid, the user is authenticated

  // TODO: remove the following console.log
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
    // TODO: show error message direct after losing focus, say to the user if password don't match
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords do not match");
        console.log("Passwords do not match");
        return;
      }

      // make a POST request to the backend
      // the request is made to the /signup endpoint
      // the request body contains the email and password
      // the backend will return a response
      // the response contains the status code and the data
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/signup",
        {
          email,
          password,
        }
      );

      console.log("BEFORE CREATE COOKIES: ", cookies);
      // set the cookie values after the response:
      setCookie("Email", response.data.email);
      setCookie("UserId", response.data.userId);
      // the cookies are used to store the token
      // the token is used to authenticate the user
      // the token is sent to the server with every request
      // the server checks if the token is valid
      // if the token is valid, the user is authenticated
      setCookie("AuthToken", response.data.token);
      console.log("AFTER CREATE COOKIES: ", cookies);

      // if the response is successful, redirect user to /onboarding
      // 201 is the success status code
      if (response.status === 201) navigate("/onboarding");
    } catch (error) {
      // if the response is not successful, catch the error
      // log the error to the console
      // TODO: better error handling
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
        <input type="submit" className="secondary-button" value="Submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
