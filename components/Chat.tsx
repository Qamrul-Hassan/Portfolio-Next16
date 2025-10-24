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

  // --- Auto Replies  ---
  const autoReplies = {
    'hi|hello|hey': 'Hello! Thanks for reaching out! 👋 I’m Qamrul Hassan, a front-end web developer. Where are you from, and how can I help with your website needs?',
    'where are you from|where r u from|where you from': 'I’m Qamrul Hassan, based in Dhaka, Bangladesh, crafting stunning websites for clients worldwide. 🌍 Tell me about your project—what kind of website do you need?',
    'make a web page|create a website|build a website|make a website|need a website': 'Let’s create something amazing! 🚀 I specialize in building responsive, modern websites using React, Tailwind CSS and Next.js. Whether it’s a portfolio, business site, or e-commerce platform, I’ve got you covered. What’s your vision?',
    'how much does a website cost|website price|cost of website|how much for a site': 'Great question! Website costs depend on features like design complexity, e-commerce, or custom functionality. A simple portfolio starts around $500, while advanced sites like e-commerce can go higher. Let’s discuss your needs to get you a tailored quote!',
    'e-commerce|online store|shop website|sell online': 'I can build you a sleek, user-friendly e-commerce website using React and Next.js, with secure payment integration and responsive design. Perfect for selling products online! What kind of store are you planning?',
    'portfolio website|personal website|portfolio site': 'A portfolio site is my specialty! I’ll create a stunning, responsive portfolio with React and Tailwind CSS to showcase your work. Want to highlight specific projects or skills? Let me know!',
    'how long to build a website|how long does it take|website timeline': 'Timelines depend on the project scope. A simple website takes 1-2 weeks, while complex sites like e-commerce may take 3-4 weeks. I use React and Next.js for fast, efficient development. What’s your timeline?',
    'your process|how do you work|development process': 'My process is simple and client-focused: 1) Discuss your goals, 2) Design a custom mockup, 3) Develop with React and Tailwind CSS, 4) Test and deploy on Vercel or Netlify. Let’s start with your ideas—what’s the project?',
    'what is html': 'HTML is the foundation of every website, structuring content like text and images. I use it to create clean, SEO-friendly layouts for clients’ sites. Need a website built?',
    'what is css': 'CSS styles websites to look amazing, from layouts to colors. I use Tailwind CSS to craft responsive, modern designs efficiently. Want a custom design for your site?',
    'what is tailwind css': 'Tailwind CSS is a powerful framework I use to build sleek, responsive websites without writing tons of custom CSS. It’s perfect for professional, fast-loading sites. Interested in a Tailwind-powered project?',
    'what is javascript': 'JavaScript adds interactivity to websites, like this chat feature! I use it to make your site engaging and dynamic. Got an idea for an interactive feature?',
    'what is react': 'React is a JavaScript library I use to build fast, interactive user interfaces for websites and apps. It’s great for portfolios or dynamic platforms. Want to see React in action?',
    'what is next js': 'Next.js is a React framework I use for fast, SEO-friendly websites with server-side rendering. It’s ideal for professional sites or e-commerce. Ready to start your project?',
    'what is firebase': 'Firebase is a Google platform I use for backend services like databases and authentication, making your website secure and scalable. Need backend features for your site?',
    'how to deploy a react app|deploy website': 'I can deploy your website to Vercel or Netlify for a fast, professional launch. I handle everything from build to hosting. Want me to set up your site?',
    'about my services|your services|what do you do|what services': 'I’m a front-end web developer specializing in React, Tailwind CSS, and Next.js. I build responsive, user-friendly websites—portfolios, e-commerce, or custom apps. Let’s bring your vision to life! What’s your project?',
    'who are you': 'I’m Qamrul Hassan, a front-end web developer from Dhaka, Bangladesh. I create modern, responsive websites with React and Tailwind CSS. What’s your next web project?',
    'what is your name': 'I’m Qamrul Hassan, a passionate front-end developer ready to build your dream website with React and Tailwind CSS. What can I help you with?',
    'default': 'Thanks for your message! 😊 I’m here to help with your website needs. Want to build a portfolio, e-commerce site, or something custom? Tell me more!',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
     if (editingMessageIndex !== null && inputRef.current) {
        inputRef.current.focus();
     }
  }, [isOpen, editingMessageIndex]);


  const handleSendMessage = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const newUserMessage = { text: trimmedInput, sender: 'user', id: Date.now() };
      setMessages((prev) => [...prev, newUserMessage]);
      setInput('');

      
      setTimeout(() => {
        const lowerCaseInput = trimmedInput.toLowerCase();
        const responseKey = Object.keys(autoReplies).find((key) =>
          new RegExp(key, 'i').test(lowerCaseInput)
        );
        const botResponse = {
            text: autoReplies[responseKey] || autoReplies.default,
            sender: 'bot',
            id: Date.now() + 1 
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); 
        if (editingMessageIndex !== null) {
            handleUpdateMessage();
        } else {
            handleSendMessage();
        }
    }
  };


  const handleEditMessage = (index: number) => {
    setEditingMessageIndex(index);
    setInput(messages[index].text);
  };

  const handleUpdateMessage = () => {
      const trimmedInput = input.trim();
    if (trimmedInput && editingMessageIndex !== null) {
      const updatedMessages = messages.map((msg, index) => {
        if (index === editingMessageIndex) {
          return { ...msg, text: trimmedInput };
        }
        return msg;
      });
      setMessages(updatedMessages);
      setInput('');
      setEditingMessageIndex(null);

      
    }
  };

  return (
    
    <div className="fixed bottom-4 right-4 z-9999 sm:w-80 w-64 min-w-[16rem] pointer-events-none">

      
      {isOpen && (
         
        <div className="absolute bottom-full right-0 mb-2 bg-[#CECECE] rounded-lg shadow-xl sm:w-80 w-64 min-w-[16rem] flex flex-col max-h-[70vh] pointer-events-auto"> {/* Added flex, max-h, pointer-events-auto */}
          {/* Header */}
          <header className="flex justify-between items-center bg-pink-500 text-white py-3 px-4 rounded-t-lg shrink-0">
            <h3 className="text-lg font-semibold">Chat with Qamrul</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat">
                 <FaTimes />
            </button>
          </header>

          {/* Message Area */}
          <div className="grow overflow-y-auto p-4 border-t border-gray-200 bg-white">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center text-sm px-2">Say hi or ask about your dream website! 🚀</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={msg.id} 
                  className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                     className={`relative group max-w-[85%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                      msg.sender === 'user' ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>

                    
                    {msg.sender === 'user' && index === messages.length - (messages[messages.length-1]?.sender === 'bot' ? 2 : 1) && editingMessageIndex === null && (
                      <button
                        className="absolute -bottom-1 -left-1 p-1 text-[10px] text-blue-600 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                        onClick={() => handleEditMessage(index)}
                        title="Edit Message"
                        aria-label="Edit last message"
                      >
                        <FaPen />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
             
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
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
              onClick={editingMessageIndex !== null ? handleUpdateMessage : handleSendMessage}
               className={`px-4 py-2 rounded-r-lg text-white transition-colors duration-200 ${editingMessageIndex !== null ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'} ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={!input.trim()}
               aria-label={editingMessageIndex !== null ? "Update message" : "Send message"}
            >
              {editingMessageIndex !== null ? 'Update' : 'Send'}
            </button>
          </div>
        </div>
      )}

        {/* Toggle Button */}
       <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 bg-pink-600 text-white rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 pointer-events-auto ${ // Added pointer-events-auto
          isOpen ? 'animate-pulse' : 'animate-[bounce_1.5s_infinite]'
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      >
        {isOpen ? <FaTimes className="text-2xl hover:text-blue-500" /> : <FaRegComment className="text-2xl hover:text-blue-500" />}
      </button>

    </div>
  );
};

export default Chat;