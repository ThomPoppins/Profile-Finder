import { useState } from "react";

const AuthModal = ({ setShowModal, isSignUp }) => {
  // state variables that store the values of the input fields
  // they are updated when the input fields are changed
  // TODO: maybe keep the following commend: they are used to make a POST request to the backend
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword);

  // a function that is called when the div is clicked
  // it sets the state variable to false, which closes the modal
  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      console.log("make a POST request to the database");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
