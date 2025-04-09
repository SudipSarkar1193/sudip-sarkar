import React, { useState, useEffect, useRef } from "react";
import myDescription from "./sudip.json";
import { ImCross } from "react-icons/im";

const Chat = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const myFullName = "Sudip Sarkar";

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          text: `Hi, I am ${myFullName}. What do you want to know about me?`,
          sender: "ai",
        },
      ]);
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const chatHistory = messages
      .slice(-5)
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are an AI version of me, designed to respond in a friendly, engaging manner. Below is my structured profile:
    
    ${JSON.stringify(myDescription)}
    
    Conversation so far:
    ${chatHistory}

    Now respond to: "${input}" in a natural and informative way.`,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Oops, something went wrong!";

      setIsTyping(false);
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch (error) {
      console.error("API Error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn’t respond right now!", sender: "ai" },
      ]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center z-30 justify-end  md:p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md md:h-[75vh] h-full z-50 rounded-lg shadow-2xl flex flex-col animate-fadeIn">
        {/* Chat Header */}
        <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <h3 className="text-lg font-semibold">Chat with Sudip</h3>
          <button onClick={() => setIsChatOpen(false)} className="">
            <ImCross size={25} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100 dark:bg-gray-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg italic font-semibold dark:font-normal ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white dark:bg-blue-900"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 max-w-xs p-3 rounded-lg flex items-center space-x-1">
                <span>Typing</span>
                <span className="animate-bounce delay-0">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
