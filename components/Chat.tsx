"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaRegComment, FaTimes, FaPen } from 'react-icons/fa';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto replies
  const autoReplies = {
    default: 'Thanks for your message! 😊 I’m here to help with your website needs.',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
    if (editingMessageIndex !== null && inputRef.current) inputRef.current.focus();
  }, [isOpen, editingMessageIndex]);

  const handleSendMessage = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const newUserMessage = { text: trimmedInput, sender: 'user', id: Date.now() };
      setMessages((prev) => [...prev, newUserMessage]);
      setInput('');

      setTimeout(() => {
        const botResponse = { text: autoReplies.default, sender: 'bot', id: Date.now() + 1 };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-9999 pointer-events-none">

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-[#CECECE] rounded-lg shadow-xl sm:w-80 w-64 max-w-full flex flex-col max-h-[70vh] pointer-events-auto">
          <header className="flex justify-between items-center bg-pink-500 text-white py-3 px-4 rounded-t-lg shrink-0">
            <h3 className="text-lg font-semibold">Chat with Qamrul</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat">
              <FaTimes />
            </button>
          </header>

          <div className="grow overflow-y-auto p-4 border-t border-gray-200 bg-white">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center text-sm px-2">Say hi! 🚀</p>
            ) : (
              messages.map((msg, index) => (
                <div key={msg.id} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`relative group max-w-[85%] px-3 py-2 rounded-lg text-sm shadow-sm ${msg.sender === 'user' ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center border-t border-gray-300 p-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              className="grow border border-gray-300 outline-none bg-white p-2 rounded-l-lg text-gray-800 placeholder-gray-500 text-sm focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Chat input"
            />
            <button
              onClick={handleSendMessage}
              className={`px-4 py-2 rounded-r-lg text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-200 ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 bg-pink-600 text-white rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 pointer-events-auto animate-[bounce_1.5s_infinite]`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes className="text-2xl hover:text-blue-500" /> : <FaRegComment className="text-2xl hover:text-blue-500" />}
      </button>
    </div>
  );
};

export default Chat;
