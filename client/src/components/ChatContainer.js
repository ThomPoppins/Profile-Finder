import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import EmptyChatHeader from "./EmptyChatHeader";
import { useState } from "react";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  console.log("clickedUser:", clickedUser);

  return (
    <div className="chat-container">
      {(user && <ChatHeader user={user} />) || <EmptyChatHeader />}
      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {/* TODO: better visualization of loading */}
      {!clickedUser && user && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {clickedUser && user && (
        <ChatDisplay user={user} clickedUser={clickedUser} />
      )}
    </div>
  );
};

export default ChatContainer;
