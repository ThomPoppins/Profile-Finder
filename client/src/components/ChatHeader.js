import Cookies from "universal-cookie";
// TODO: decide over redirect to homepage:
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ user }) => {
  // TODO: decide over redirect to homepage:
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logout = () => {
    cookies.remove("user_id");
    cookies.remove("auth_token");
    cookies.remove("email");

    // TODO: q: is there a way to hide the Log out button when user is not logged in without window.location.reload()?
    // a: yes, by using conditional rendering in ChatContainer.js

    // window.location.reload();
    // TODO: decide over redirect to homepage
    navigate("/");
  };

  // TODO: decide over redirect to homepage OR not
  // when user is not logged in, redirect to homepage
  if (cookies.get("auth_token") === undefined) {
    navigate("/");
  }

  return (
    <div className="chat-container-header">
      {console.log("USER:", user)}
      {user && (
        <div className="profile">
          <div className="img-container">
            <img src={user.url} alt="profile pic" />
          </div>

          <h3>{user.first_name}</h3>
        </div>
      )}
      {user && (
        <i className="log-out-icon" onClick={logout}>
          {user ? "Log out" : ""}
        </i>
      )}
    </div>
  );
};

export default ChatHeader;
