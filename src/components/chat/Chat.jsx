import React, { useState, useEffect, useRef } from "react";
import myDescription from "./sudip.json";
import { ImCross } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { chatServer } from "./chatServer";


const Chat = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const myFullName = "Sudip Sarkar";

  // Initialize session_id on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    if (!storedSessionId) {
      const newSessionId = crypto.randomUUID();
      localStorage.setItem("session_id", newSessionId);
      setSessionId(newSessionId);
    } else {
      setSessionId(storedSessionId);
    }
    console.log("sessionId : ", sessionId);
  }, []);

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

    try {
      const response = await fetch(`${chatServer}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_message: input,
          metadata: { session_id: sessionId },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response || "Oops, something went wrong!";

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

  const formatResponse = (text) => {
    // Convert markdown-like formatting to HTML
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
      .replace(/^# (.*$)/gm, "<h3>$1</h3>") // Headings
      .replace(/^## (.*$)/gm, "<h4>$1</h4>") // Subheadings
      .replace(/^### (.*$)/gm, "<h5>$1</h5>") // Sub-subheadings
      .replace(/^\> (.*$)/gm, "<blockquote>$1</blockquote>") // Blockquotes
      .replace(/\n/g, "<br>"); // Line breaks

    // Handle lists
    formattedText = formattedText.replace(/^\* (.*$)/gm, "<li>$1</li>");
    formattedText = formattedText.replace(/<li>.*<\/li>/g, (match) => {
      if (!formattedText.includes("<ul>")) {
        return "<ul>" + match;
      }
      return match;
    });
    formattedText = formattedText.replace(/(<\/li>)(?!.*<li>)/, "$1</ul>");

    // Handle code blocks
    formattedText = formattedText.replace(
      /```(\w*)\n([\s\S]*?)\n```/g,
      '<pre><code class="language-$1">$2</code></pre>'
    );

    return { __html: formattedText };
  };

  return (
    <div className="fixed top-16 bottom-0 w-full  flex items-center z-30 justify-end bg-black/50 dark:bg-black/70 backdrop-blur-sm md:p-4">
      <div className=" bg-white dark:bg-gray-900 w-full max-w-2xl md:h-[85vh] h-full z-50 rounded-none md:rounded-xl shadow-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 ease-in-out">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-purple-800 dark:to-blue-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sudip</h3>
              <p className="text-xs opacity-80">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            aria-label="Close chat"
          >
            <ImCross size={16} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-100 dark:bg-gray-950">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] p-4 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {msg.sender === "ai" ? (
                    <FaRobot className="text-blue-500 mt-1 flex-shrink-0" />
                  ) : (
                    <IoMdPerson className="text-blue-200 mt-1 flex-shrink-0" />
                  )}
                  <div
                    className="prose prose-sm max-w-none text-gray-900 dark:text-gray-100"
                    dangerouslySetInnerHTML={formatResponse(msg.text)}
                  />
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[90%] p-4 rounded-2xl rounded-bl-none bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <FaRobot className="text-blue-500" />
                  <div className="flex space-x-2">
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={input.trim() === ""}
              className={`p-3 rounded-xl ${
                input.trim() === ""
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              } text-white transition-all duration-200 flex items-center justify-center`}
            >
              <IoSend className="text-lg" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Gurudev AI may produce inaccurate information. Verify critical
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;