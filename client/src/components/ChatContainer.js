import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import EmptyChatHeader from "./EmptyChatHeader";
import { useState } from "react";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

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
      {(user && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )) || <div>Loading...</div>}

      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
