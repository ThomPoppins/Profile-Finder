import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthModal = ({ setShowModal, isSignUp }) => {
  // state variables that store the values of the input fields
  // they are updated when the input fields are changed
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // state variable that stores the error message
  // it is updated when the passwords don't match
  // TODO: better error handling: https://www.developerway.com/posts/how-to-handle-errors-in-react
  const [error, setError] = useState(null);
  // useNavigate is a function that is used to navigate to a different page
  let navigate = useNavigate();

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
    // prevent the default behavior of the form
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
      // OR the request is made to the /login endpoint
      // the request body contains the email and password
      // the backend will return a response
      // the response contains the status code and the data
      // the data contains the user_id, email and auth_token
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/${isSignUp ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );

      // console.log("RESPONSE.DATA: ", response.data);

      // set the cookies
      // the cookies are used to keep the user logged in
      // the cookies are set to expire in 1 day
      //  TODO: set the cookies to expire in 1 year
      const cookies = new Cookies();
      cookies.set("user_id", response.data.user_id, { path: "/" });
      cookies.set("email", response.data.email, { path: "/" });
      // the auth_token is used to authenticate the user
      // the auth_token is stored in the cookies
      // the auth_token is sent to the backend with every request
      // the backend checks if the auth_token is valid
      // if the auth_token is valid, the user is authenticated
      // the auth_token is generated when the user logs in
      // the auth_token is generated with the in DB inserted user data and the email
      // the auth_token is signed with a secret key
      // the secret key is only known to the server
      // the secret key is used to verify the auth_token
      // if the auth_token is not signed with the secret key, it is not valid
      // the auth_token is sent to the client and stored in the local storage
      cookies.set("auth_token", response.data.auth_token, { path: "/" });

      console.log(response.status);
      // if the response is successful, redirect user to /onboarding
      // 201 is the success status code
      if (response.status === 201 && isSignUp) navigate("/onboarding");
      if (response.status === 201 && !isSignUp) navigate("/dashboard");
    } catch (error) {
      // if the response is not successful, catch the error
      // log the error to the console
      // TODO: better error handling. https://www.developerway.com/posts/how-to-handle-errors-in-react
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
