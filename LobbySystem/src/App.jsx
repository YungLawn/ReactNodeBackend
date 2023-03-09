import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5173');

function Lobby() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (currentMessage) {
      socket.emit('message', currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <div>
      <h1>Lobby</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.id}: {message.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Lobby;
