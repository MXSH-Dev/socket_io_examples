import React from "react";
import Reac, { useState, useEffect } from "react";
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
      let str_list = [...messageReceived];
      str_list.push(data.message);
      setMessageReceived(str_list);
    });
  }, [socket]);

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
      <p>{messageReceived}</p>
    </div>
  );
};

export default App;
