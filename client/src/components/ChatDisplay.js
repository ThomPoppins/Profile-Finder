import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const [usersMessages, setUsersMessages] = useState(null);

  const getUsersMessages = async (userId, clickedUserId) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/messages",
        {
          params: {
            userId: userId,
            correspondingUserId: clickedUserId,
          },
        }
      );

      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages(userId, clickedUserId);
  }, [usersMessages, clickedUserId, userId]);

  console.log("usersMessages:", usersMessages);

  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
