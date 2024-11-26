import { useState, useEffect, useRef, useContext } from "react";
import "./MessageSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  getChatOfUsers,
  getChatsOfUser,
  getCurrentUser,
  getUserById,
} from "../../fetchers/fetchers";
import { WebSocketContext } from "../Providers/WebSocketProvider";

const Message = ({ sender, text }) => {
  const messageClass = sender === "me" ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      {sender !== "me" ? (
        <div className="sender-pfp">
          <img src={sender} alt="somebody" />
        </div>
      ) : null}
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

const SelectedChat = ({ username, onSendMessage, pfp, uid, me }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null);
  const { current: stompClient } = useContext(WebSocketContext);
  const [messages, setMessages] = useState([]);

  //try to fetch the chat and if there is one load the previous messages and display them
  useEffect(() => {
    setMessages([]);
  }, [uid]);
  useEffect(() => {
    if (chat && stompClient) {
      const topic = `/topic/chat/${chat.id}`;
      const subscription = stompClient.subscribe(topic, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("Message received:", newMessage);

        if (newMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: newMessage.senderId === uid ? pfp : "me",
              text: newMessage.text,
            },
          ]);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [chat, stompClient, uid, pfp]);
  useEffect(() => {
    const fetchChat = async (id1, id2) => {
      setChat(await getChatOfUsers(uid, me));
    };
    fetchChat();
  }, [me, uid]);

  const handleSend = (chat, message) => {
    if (chat && stompClient) {
      const messageData = {
        text: message,
        senderId: me,
        receiverId: uid,
        chatId: chat,
        seen: false,
        status: "SENT",
      };
      stompClient.publish({
        destination: `/app/chat/${chat}`,
        body: JSON.stringify(messageData),
      });

      //setMessages([...messages, { sender: "me", text: messageData.text }]);

      setMessage("");
    }
    //if there is not, create the chat, get its id
    //else, get the id from "chat"

    // let chatId = -1;
    // if (message.trim()) {
    //   onSendMessage({ sender: "me", receiver: username, text: message });
    //   setMessage("");
    // }
  };

  return (
    <div className="active-chat">
      <div className="chat-header">
        <p className="chat-username">{username}</p>
      </div>
      <div className="message-container">
        {messages?.map((msg, index) => (
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
        <button
          className="send-button"
          onClick={() => {
            handleSend(chat.id, message);
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

const SideChat = ({ key, photo, username, lastMessage, seen, func }) => (
  <div className="side-chat-container" onClick={func}>
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
  const [sideChats, setSideChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { current: stompClient } = useContext(WebSocketContext);
  const ws = useRef(null);

  useEffect(() => {
    const getCurrent = async () => {
      setCurrentUser(await getCurrentUser());
    };
    getCurrent();
  }, []);

  useEffect(() => {
    const getChats = async () => {
      if (currentUser != null)
        setChats(await getChatsOfUser(currentUser["id"]));
    };
    getChats();
  }, [currentUser]);
  const buildSelectedChat = async (user) => {
    let selected = {
      me: currentUser.id,
      uid: user.id,
      username: user.username,
      pfp: user.photoUrl,
      onSendMessage: () => {},
    };
    setSelectedChat(selected);
  };
  useEffect(() => {
    const createSidechats = async () => {
      if (currentUser) {
        const currId = currentUser["id"];
        const newSideChats = await Promise.all(
          chats.map(async (chat) => {
            if (chat && stompClient) {
              const topic = `/topic/chat/${chat.id}`;
              stompClient.subscribe(topic, (message) => {
                console.log("Received message:", message.body);
              });
            }

            const idToFetch =
              chat["user1Id"] !== currId ? chat["user1Id"] : chat["user2Id"];
            const userFetched = await getUserById(idToFetch);

            return {
              func: () => buildSelectedChat(userFetched),
              key: idToFetch,
              photo: userFetched.photoUrl,
              username: userFetched.username,
              lastMessage: "demo",
              seen: false,
            };
          })
        );
        setSideChats(newSideChats); // Update the state in one batch
      }
    };
    createSidechats();
  }, [chats, currentUser, stompClient]);

  const handleSendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <div className="sidebar">
      <div className="chats-container">
        <h1>Inbox</h1>
        {sideChats.map((chat) => (
          <SideChat
            key={chat.id}
            photo={chat.photo}
            username={chat.username}
            lastMessage={chat.lastMessage}
            seen={chat.seen}
            func={chat.func}
          />
        ))}
      </div>
      <div className="active-chat">
        {selectedChat ? (
          <SelectedChat
            username={selectedChat.username}
            onSendMessage={handleSendMessage}
            me={selectedChat.me}
            uid={selectedChat.uid}
            pfp={selectedChat.pfp}
          />
        ) : (
          <NoSelectedChat />
        )}
      </div>
    </div>
  );
}
