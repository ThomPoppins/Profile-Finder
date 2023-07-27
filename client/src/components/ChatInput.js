import { useState } from "react";

const ChatInput = () => {
  const [textArea, setTextArea] = useState();

  return (
    /* Value of this text input field is always the value of const textArea, */
    /* onChange sets the value of textArea. */
    <div className="chat-input">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="secondary-button">Submit</button>
    </div>
  );
};

export default ChatInput;
