import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { chatWithAI } from '../../services/fakeAI';
import { useStudent } from '../../context/StudentContext';

const AIChatPanel = ({ isOpen, onClose, topic, profile }) => {
  const { updateStudent } = useStudent();
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi ${profile?.name || ''}! I'm here to help you understand ${topic}. What's on your mind?`, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isBot: false }]);
    setIsTyping(true);

    try {
      const response = await chatWithAI(userMsg, topic, profile);
      setMessages(prev => [...prev, { id: Date.now(), text: response, isBot: true }]);
      
      // Update profile with questions asked and XP
      if (updateStudent) {
        updateStudent({
          questionsAsked: (profile?.questionsAsked || 0) + 1,
          xp: (profile?.xp || 0) + 5
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: "Sorry, I'm having trouble thinking right now.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    `Can you simplify ${topic}?`,
    "Give me a real-life example.",
    "Why is this important?"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 md:right-6 md:left-auto md:w-96 bg-white dark:bg-slate-900 shadow-2xl md:rounded-t-2xl border-t border-x border-slate-200 dark:border-slate-800 flex flex-col h-[80vh] md:h-[600px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} items-end gap-2`}
              >
                {msg.isBot && (
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200 dark:border-slate-700' 
                      : 'bg-indigo-600 text-white rounded-br-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-sm border border-slate-200 dark:border-slate-700 flex gap-1">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && !isTyping && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar bg-slate-50 dark:bg-slate-950">
              {suggestedQuestions.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => setInput(sq)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/50 rounded-full text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  {sq}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the topic..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Send size={18} className="ml-1" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatPanel;
