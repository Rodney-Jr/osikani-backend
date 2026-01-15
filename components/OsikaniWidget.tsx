
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ChevronDown, Minimize2, Maximize2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
    role: 'user' | 'model';
    content: string;
}

const OsikaniWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [isMinimized, setIsMinimized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Session
    useEffect(() => {
        let storedSession = localStorage.getItem('osikani_web_session');
        if (!storedSession) {
            storedSession = `web-guest-${uuidv4().substring(0, 8)}`; // Short persistent ID
            localStorage.setItem('osikani_web_session', storedSession);
        }
        setSessionId(storedSession);

        // Initial greeting if empty
        if (messages.length === 0) {
            setMessages([
                { role: 'model', content: "Chale, welcome! 👋 I am Osikani, your personal finance partner.\n\nTo help you well, abeg tell me your **Name** and what **Business** you dey do? (e.g. 'I be Kofi, I dey sell shoes')" }
            ]);
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMsg = inputText.trim();
        setInputText('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3002/api/chat/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    userId: sessionId, // Use persistent Web Guest ID
                    history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })) // Format for Gemini
                })
            });

            const data = await response.json();

            if (data.text) {
                setMessages(prev => [...prev, { role: 'model', content: data.text }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: "Sorry o, network wahala. Try again." }]);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "My brain dey buffer small. Check your internet." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Minimized View (Just the button)
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50 flex items-center gap-2 group animate-bounce-slow"
                aria-label="Chat with Osikani"
            >
                <div className="relative">
                    <MessageCircle size={28} />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
                    Chat with Osikani
                </span>
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col transition-all duration-300 ${isMinimized ? 'h-16 w-72' : 'h-[600px] w-[400px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)]'}`}>

            {/* Header */}
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center shrink-0 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg border-2 border-emerald-400">
                        O
                    </div>
                    <div>
                        <h3 className="font-bold">Osikani</h3>
                        <p className="text-[10px] text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:bg-red-500/20 hover:text-red-400 p-1.5 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200">

                        {/* Security/Privacy Notice */}
                        <div className="text-center text-[10px] text-slate-400 mb-4 bg-slate-100 py-2 rounded-lg">
                            🔒 Chat is anonymous. No personal info saved.
                        </div>

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mr-2 mt-1 shrink-0">O</div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mr-2 mt-1 shrink-0">O</div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask Osikani..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 placeholder:text-slate-400 p-2"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !inputText.trim()}
                                className={`p-2 rounded-lg transition-all ${isLoading || !inputText.trim()
                                    ? 'bg-slate-200 text-slate-400'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                                    }`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OsikaniWidget;
