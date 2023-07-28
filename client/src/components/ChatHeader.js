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

    // TODO: decide over redirect to homepage OR window refresh
    // window.location.reload();
    // TODO: decide over redirect to homepage
    navigate("/");
  };

  return (
    <div className="chat-container-header">
      {/* TODO: remove console.log */}
      {console.log("USER:", user)}
      {/* if user: render user profile pic and name */}
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
