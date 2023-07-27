import Cookies from "universal-cookie";
// TODO: decide over redirect to homepage:
// import { useNavigate } from "react-router-dom";

const ChatHeader = ({ user }) => {
  // TODO: decide over redirect to homepage:
  // const navigate = useNavigate();

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("user_id");
    cookies.remove("auth_token");
    cookies.remove("email");
    window.location.reload();
    // TODO: decide over redirect to homepage
    // navigate("/");
  };

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
