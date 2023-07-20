/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import "./App.css";
import socket from "./services/socket";

type MessageType = {
  id: number;
  message: string;
};

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<MessageType | null>();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3333/message", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data: MessageType[] = await response.json();

      setMessages(data);
    })();

    socket.on("front-messages", (message: MessageType) => {
      setNewMessage(message);
    });
  }, []);

  useEffect(() => {
    if (!newMessage) return;

    setMessages([...messages, newMessage]);
  }, [newMessage]);

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
