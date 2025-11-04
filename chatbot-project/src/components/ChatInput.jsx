import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinner from '../assets/loading-spinner.gif'


export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState (false)

  function saveInputText(e) {
    setInputText(e.target.value);
  }

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setInputText('');

    setChatMessages(newChatMessages);
    
    setIsLoading(true)
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinner} className = "loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false)
    
  }

  return (
    <div className = "chat-input-container">
      <input 
        placeholder="Send a message to the Chatbot" 
        size="30"
        onChange = {saveInputText}
        value={inputText}
        onKeyDown = {(e) => {
          if (e.key === "Enter") {
            sendMessage();
          } else if (e.key === "Escape") {
            setInputText("")
          }
        }}
        disabled = {isLoading}
        className = "chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}