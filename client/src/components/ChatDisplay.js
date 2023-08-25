import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getUsersMessages = async () => {
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

      // TODO:: fix all loopings in the app using this:
      // Prevent looping when usersMessages state changes
      if (usersMessages === response.data) return;

      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/messages",
        {
          params: {
            userId: clickedUserId,
            correspondingUserId: userId,
          },
        }
      );

      // TODO:: fix all loopings in the app using this:
      // Prevent looping when usersMessages state changes
      if (clickedUsersMessages === response.data) return;

      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  console.log("descendingOrderMessages: ", descendingOrderMessages);

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
