import Cookies from "universal-cookie";

// import { useNavigate } from "react-router-dom";
// Render a empty header when user is not logged in
// EmptyChatHeader is used in ChatContainer in case the user is not logged in and no information about the user is available
const EmptyChatHeader = () => {
  const login = () => {
    alert("Log in!");
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img
            src={
              "http://localhost:3000/static/media/colorlogo2.82fff75c874f0bd21541.png"
            }
            alt="profile pic"
          />
        </div>

        <h3>Loading...</h3>
      </div>

      {/* <i className="log-out-icon" onClick={login}>
        Log in!
      </i> */}
    </div>
  );
};

export default EmptyChatHeader;
