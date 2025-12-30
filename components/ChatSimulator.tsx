
/**
 * CHAT SIMULATOR COMPONENT
 * Implements the WhatsApp-style UI, user onboarding, and MoMo Safe Mode.
 */
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Globe, Hash, ShieldAlert, Baby, Briefcase, Info, Loader2, ShieldCheck, Search, AlertTriangle, UserCheck, Mic, Square, Volume2, ChevronRight, Check, Sparkles, X, AlertOctagon, Lock, Languages } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import { ChatMessage, MessageRole, ProcessingLog } from '../types';
import { generateOsikaniResponse } from '../services/gemini';
import { searchKnowledgeBase } from '../utils/search';

const LANGUAGES = ['English', 'Pidgin', 'Twi (Akan)', 'Ga', 'Ewe'];

const ChatSimulator: React.FC = () => {
  // STATE: User Preferences
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // STATE: Persona management
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: '0', role: MessageRole.MODEL, text: "Chale, I be Osikani. How your pocket dey today? I fit help you manage your money or check suspicious MoMo messages.", timestamp: new Date() }]);
  const [input, setInput] = useState('');
  
  // STATE: Processing and Logging
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<ProcessingLog[]>([]);
  
  // STATE: Security Features
  const [fraudScanActive, setFraudScanActive] = useState(false);
  const [lastConfidence, setLastConfidence] = useState<number | null>(null);

  // AUTO-SCROLL logic
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isProcessing]);

  /**
   * Helper to push a new entry into the debug log
   */
  const addLog = (step: string, status: 'pending' | 'success' | 'warning' | 'error', details: string) => {
    const newLog: ProcessingLog = { id: Math.random().toString(), step, status, details, timestamp: Date.now() };
    setLogs(prev => [...prev, newLog]);
    return newLog.id;
  };

  /**
   * Helper to update an existing log entry status
   */
  const updateLog = (id: string, status: 'success' | 'warning' | 'error', details?: string) => {
    setLogs(prev => prev.map(log => log.id === id ? { ...log, status, details: details || log.details } : log));
  };

  /**
   * Core message handling function
   */
  const handleSend = async (text?: string, audioData?: { data: string, mimeType: string }) => {
    const textToSend = text || input;
    if (!textToSend.trim() && !audioData) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: MessageRole.USER, text: audioData ? "🎤 [Voice Note]" : textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInput('');
    setIsProcessing(true);

    try {
      const securityLogId = addLog('Security Shield', 'pending', `Ingesting ${activeLanguage} request...`);
      
      // Inject context if we find something in RAG
      const ragResults = await searchKnowledgeBase(textToSend);
      const context = ragResults.map(r => r.content).join("\n\n");
      if (ragResults.length > 0) {
        addLog('RAG Engine', 'success', `Found ${ragResults.length} relevant context chunks.`);
      }

      // Step 2: Trigger Gemini Inference
      const response = await generateOsikaniResponse(
        `[Language: ${activeLanguage}] ${textToSend}`, 
        [], 
        context,
        audioData
      );
      
      response.securityLogs.forEach(sLog => {
        addLog('Inference Gate', sLog.includes('🛑') ? 'error' : 'success', sLog);
      });
      updateLog(securityLogId, 'success', 'Request Processed');
      
      setLastConfidence(response.confidence || null);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: response.text,
        timestamp: new Date()
      }]);

      if (response.text.includes("🔴") || response.text.includes("[SCAM ALERT]")) {
        // Red visual pulse or alert could be here
      } else if (response.text.includes("🟢")) {
        confetti({ particleCount: 30, colors: ['#10b981'], spread: 70, origin: { y: 0.6 } });
      }
      
    } catch (error) {
      addLog('Gateway Error', 'error', 'AI Inference failed. Check internet connection.');
    } finally {
      setIsProcessing(false);
      setFraudScanActive(false);
    }
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      {/* PHONE MOCKUP VIEW */}
      <div className="flex-1 flex justify-center">
        <div className="w-[360px] h-[720px] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl relative border-[6px] border-slate-800 flex flex-col">
          {/* Top Speaker/Camera notch */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-20 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          </div>

          <div className="flex-1 bg-[#efeae2] rounded-[2.8rem] overflow-hidden flex flex-col relative mt-2">
            
            {/* WHATSAPP HEADER */}
            <div className={`text-white p-4 pt-10 flex items-center justify-between shrink-0 transition-all duration-500 ${fraudScanActive ? 'bg-rose-900' : 'bg-[#075e54]'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[#075e54] shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs">O</div>
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    Osikani {fraudScanActive && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded animate-pulse">SHIELD</span>}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] opacity-80">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span>Online | {activeLanguage}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Languages size={18} />
                </button>
                <button 
                  onClick={() => setFraudScanActive(!fraudScanActive)} 
                  className={`p-2 rounded-full transition-all ${fraudScanActive ? 'bg-white text-rose-600 shadow-lg scale-110' : 'hover:bg-white/10 text-white'}`}
                >
                  <ShieldAlert size={18} />
                </button>

                {showLangMenu && (
                  <div className="absolute top-10 right-0 bg-white text-slate-900 shadow-2xl rounded-xl py-2 w-32 border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setActiveLanguage(lang); setShowLangMenu(false); }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 transition-colors ${activeLanguage === lang ? 'text-emerald-600' : 'text-slate-600'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CHAT BUBBLES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-contain" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}>
              <div className="text-center">
                 <span className="bg-amber-100/80 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider backdrop-blur-sm">
                   End-to-End Encrypted Secure Gateway
                 </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-md relative ${msg.role === MessageRole.USER ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                    {msg.role === MessageRole.MODEL && lastConfidence && (
                      <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-1.5">
                        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${lastConfidence}%` }}></div>
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase">{lastConfidence}% Trust</span>
                      </div>
                    )}
                    <div className="prose prose-sm leading-relaxed text-slate-800">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    <div className="text-[9px] text-right mt-1 opacity-40 font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-md flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* FRAUD SHIELD UI */}
            {fraudScanActive && (
               <div className="p-3 bg-rose-50 border-y border-rose-200 flex items-center justify-between animate-in slide-in-from-bottom-4">
                  <span className="text-[10px] font-black text-rose-700 uppercase flex items-center gap-1.5">
                    <AlertTriangle size={12} className="animate-pulse" /> Scanning for Social Engineering
                  </span>
                  <button className="px-3 py-1 bg-rose-600 text-white rounded-full text-[10px] font-black flex items-center gap-1 shadow-md hover:bg-rose-700 transition-colors">
                    <Lock size={10} /> Fraud Guard Active
                  </button>
               </div>
            )}

            {/* MESSAGE INPUT BOX */}
            <div className="p-3 bg-[#f0f0f0] flex items-center gap-2 border-t border-slate-200">
              <div className="flex-1 flex items-center bg-white rounded-full border border-slate-300 px-4 py-1.5 shadow-sm">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={fraudScanActive ? "Paste MoMo SMS here..." : "Message Osikani..."}
                  className="flex-1 outline-none text-sm bg-transparent"
                />
              </div>
              <button onClick={() => handleSend()} disabled={isProcessing} className="w-11 h-11 rounded-full flex items-center justify-center text-white bg-[#075e54] hover:bg-[#128C7E] disabled:bg-slate-300 transition-all shadow-md active:scale-95">
                {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DEBUG SIDEBAR */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="bg-slate-900 text-white rounded-3xl flex-1 flex flex-col overflow-hidden border border-slate-700 shadow-2xl">
          <div className="p-5 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <Terminal size={14} className="text-emerald-400" /> Infrastructure Trace
            </h3>
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-black border border-emerald-500/20">LIVE-DLP</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-[11px]">
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center opacity-40">
                <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 mb-3"></div>
                <p className="uppercase tracking-widest text-[9px] font-black">No Active Logs</p>
                <p className="mt-2 leading-relaxed">System awaiting input<br/>from WhatsApp Simulator.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className={`p-4 rounded-2xl border transition-all ${log.status === 'error' ? 'bg-rose-950/20 border-rose-500/30 text-rose-200' : 'bg-slate-800/40 border-slate-700/50 text-slate-300'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black uppercase tracking-wider text-[10px] text-emerald-500">{log.step}</span>
                    <span className="opacity-30 text-[9px]">{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}</span>
                  </div>
                  <div className="opacity-80 leading-relaxed text-[10px] break-words">{log.details}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSimulator;
