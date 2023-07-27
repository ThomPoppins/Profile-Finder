import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import EmptyChatHeader from "./EmptyChatHeader";

const ChatContainer = ({ user }) => {
  return (
    <div className="chat-container">
      {(user && <ChatHeader user={user} />) || <EmptyChatHeader />}
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>

      <MatchesDisplay />

      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
