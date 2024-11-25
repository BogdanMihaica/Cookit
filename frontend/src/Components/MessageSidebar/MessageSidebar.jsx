import { useState, useEffect, useRef } from "react";
import "./MessageSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Message = ({ sender, text }) => {
  const messageClass = sender === "me" ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <div className="message-box">
        <p>{text}</p>
      </div>
    </div>
  );
};

const NoSelectedChat = () => (
  <div className="no-selected-chat-container">
    <p>
      <strong>
        Select a chat or start a new one by sending a message to a user.
      </strong>
    </p>
    <p>We strongly encourage being polite to make the world a better place!</p>
  </div>
);

const SelectedChat = ({ username, messages, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({ sender: "me", receiver: username, text: message });
      setMessage("");
    }
  };

  return (
    <div className="active-chat">
      <div className="chat-header">
        <p className="chat-username">{username}</p>
      </div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
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

const SideChat = ({ photo, username, lastMessage, seen, onClick }) => (
  <div className="side-chat-container" onClick={onClick}>
    <div className="pfp-image-container">
      <img src={photo} alt={username} />
      {!seen && <div className="not-seen-circle"></div>}
    </div>
    <div className="username-and-message">
      <p className="username-sidechat">{username}</p>
      <p className={`message-sidechat ${seen ? "seen" : "not-seen"}`}>
        {lastMessage}
      </p>
    </div>
  </div>
);

export function MessageSidebar({ withUser = -1 }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const handleSendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Optionally fetch previous messages for the selected chat
  };

  return (
    <div className="sidebar">
      <div className="chats-container">
        <h1>Inbox</h1>
        {chats.map((chat) => (
          <SideChat
            key={chat.id}
            photo={chat.photo}
            username={chat.username}
            lastMessage={chat.lastMessage}
            seen={chat.seen}
            onClick={() => handleChatSelect(chat)}
          />
        ))}
      </div>
      <div className="active-chat">
        {selectedChat ? (
          <SelectedChat
            username={selectedChat.username}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <NoSelectedChat />
        )}
      </div>
    </div>
  );
}
