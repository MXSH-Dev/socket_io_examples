import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(`http://localhost:3003`);

const App = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState<string[]>([]);

  const sendMessage = () => {
    socket.emit("message", { message: message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("broadcast", (data) => {
      setMessageReceived((current) => [...current, data.message]);
    });
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Message..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(event.target.value);
        }}
        value={message}
      />
      <button onClick={sendMessage}>Send Message</button>
      <hr />
      <h2>Messges:</h2>

      <ul>
        {messageReceived.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>

      <h3>Messages String:</h3>
      <p>{messageReceived}</p>
    </div>
  );
};

export default App;
