import { useState } from "react";
import "./MessageSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

//cand ma gandesc ce o sa fie aici.. doamne
const Message = ({ sender, receiver, text }) => {
  const messageClass = sender === "me" ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      {receiver === "me" ? (
        <div className="sender-pfp">
          <img
            src="https://cdn.shopify.com/s/files/1/2289/1873/articles/Cook-at-Home-1.jpg?v=1668612979"
            alt="somebody"
          />
        </div>
      ) : null}
      <div className="message-box">
        <p>{text}</p>
      </div>
    </div>
  );
};

const NoSelectedChat = () => {
  return (
    <div className="no-selected-chat-container">
      <p>
        <strong>
          Select a chat or start a new one by sending a message to a user.
        </strong>
      </p>
      <p>
        We strongly encourage being polite to make the world a better place!
      </p>
    </div>
  );
};
const SelectedChat = ({ username }) => {
  const [message, setMessage] = useState("");
  const [sampleMessages, setSamples] = useState([
    {
      sender: "me",
      receiver: username,
      text: "When did you come up with that awesome recipe?",
    },
    {
      sender: username,
      receiver: "me",
      text: "LOL. I was looking on the web and found this awesome idea and thought of reinterpreting it to look like it looks now! Thanks for your message!",
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      let toPush = { sender: "me", receiver: username, text: message };
      setSamples([...sampleMessages, toPush]);

      setMessage("");
    }
  };
  return (
    <div className="active-chat">
      <div className="chat-header">
        <p className="chat-username">{username}</p>
      </div>
      <div className="message-container">
        {sampleMessages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            receiver={msg.receiver}
            text={msg.text}
          />
        ))}
      </div>
      <div className="send-message-section">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          placeholder="Type your message..."
          className="message-textarea"
        />
        <button className="send-button" onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

const SideChat = ({ photo, username, lastMessage, seen }) => {
  const isSeen = !seen ? "not-seen" : "seen";
  return (
    <div className="side-chat-container">
      <div className="pfp-image-container">
        <img src={photo} alt={username} />
        {!seen ? <div className="not-seen-circle"></div> : null}
      </div>
      <div className="username-and-message">
        <p className="username-sidechat">{username}</p>
        <p className={`message-sidechat ${isSeen}`}>{lastMessage}</p>
      </div>
    </div>
  );
};
export function MessageSidebar() {
  const [selectedChat, setSelectedChat] = useState(1);
  const sampleChats = [
    {
      photo:
        "https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg",
      username: "JoshuaBaker",
      lastMessage: "Thanks for the feedback on my last recipe!",
      seen: false,
    },
    {
      photo:
        "https://images.squarespace-cdn.com/content/v1/5c7c30767980b31affc87b09/1602396079712-4JS2RJYHTAP5OXOUQ1SB/image-asset.jpeg",
      username: "Amanda_2000",
      lastMessage: "Your recipes are awesome!",
      seen: true,
    },
  ];
  return (
    <div className="sidebar">
      <div className="chats-container">
        <h1>Inbox</h1>
        {sampleChats.map((chat) => (
          <SideChat
            photo={chat.photo}
            username={chat.username}
            lastMessage={chat.lastMessage}
            seen={chat.seen}
          />
        ))}
      </div>
      <div className="active-chat">
        {selectedChat ? (
          <SelectedChat username="MarkCooks" />
        ) : (
          <NoSelectedChat />
        )}
      </div>
    </div>
  );
}
