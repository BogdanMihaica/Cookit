import { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { getUserByUsername } from "../../fetchers/fetchers";
import { Client } from "@stomp/stompjs";

export default function Footer() {
  const jwt = sessionStorage.getItem("jwt");
  const [uid, setUid] = useState(null); // Inițializăm cu null
  const clientRef = useRef(null);

  useEffect(() => {
    const fetchAndSubscribe = async () => {
      if (jwt) {
        const payload = JSON.parse(atob(jwt.split(".")[1]));
        const username = payload.sub;

        if (username) {
          try {
            const user = await getUserByUsername(username);
            if (user && user.id) {
              const userId = user.id;
              setUid(userId);

              let notificationTopic = `/user/${userId}`;

              const wsUrl = `ws://localhost:8090/chat-system?token=${jwt}`;

              const client = new Client({
                brokerURL: wsUrl,
                debug: (str) => console.log(str),
                onConnect: () => {
                  console.log("Connected to STOMP server");
                  client.subscribe(notificationTopic, (message) => {
                    console.log("Received notification:", message.body);
                  });
                },
                onStompError: (frame) => {
                  console.error(
                    "Broker reported error:",
                    frame.headers["message"]
                  );
                  console.error("Additional details:", frame.body);
                },
              });

              clientRef.current = client;
              client.activate();
            }
          } catch (err) {
            console.error("Error fetching user ID:", err);
          }
        }
      }
    };

    fetchAndSubscribe();
  }, [jwt]);

  useEffect(() => {
    console.log("User ID:", uid);
  }, [uid]);

  return <footer className="footer"></footer>;
}
