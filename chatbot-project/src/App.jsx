import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css';

function Welcome({ chatMessages }) {
  if (chatMessages.length === 0) {
    return (
      <div className = "welcome-message">
        <p>Welcome to the chatbot project! Send a message using the textbox below.</p>
      </div>
    )
  }
}

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  
  return (
    <div className="app-container">
      <Welcome chatMessages = {chatMessages} />
      <ChatMessages 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
