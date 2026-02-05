"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaRegComment, FaTimes } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const autoReplies = {
    default: "Thanks for your message! 😊 I’m here to help with your website needs.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { text: trimmed, sender: "user", id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg = {
        text: autoReplies.default,
        sender: "bot",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-70">
      {/* CHAT BOX */}
      {isOpen && (
        <div className="absolute right-0 bottom-20 bg-[#CECECE] rounded-lg shadow-xl sm:w-80 w-64 flex flex-col max-h-[70vh]">
          {/* HEADER */}
          <header className="flex justify-between items-center bg-pink-600 text-white py-3 px-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat with Qamrul</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-white hover:text-gray-200" />
            </button>
          </header>

          {/* MESSAGES */}
          <div className="grow overflow-y-auto p-4 bg-white border-t">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">Say hi! 🚀</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm shadow 
                      ${
                        msg.sender === "user"
                          ? "bg-slate-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }
                    `}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="flex items-center border-t p-2 bg-white">
            <input
              ref={inputRef}
              type="text"
              className="grow border p-2 rounded-l-md text-sm outline-none focus:ring-1 focus:ring-pink-500 text-gray-900 placeholder:text-gray-400 caret-pink-600 bg-white"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSendMessage}
              className={`px-4 py-2 bg-pink-600 text-white rounded-r-md ${
                !input.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-700"
              }`}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-pink-600 text-white rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 animate-[bounce_1.5s_infinite]"
      >
        {isOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaRegComment className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default Chat;
