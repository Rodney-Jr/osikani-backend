
import React, { useState, useEffect } from 'react';
import { 
  Save, Sliders, Check, Info, Network, 
  Loader2, Activity, Key, BookOpen, 
  Lock, Terminal, ShieldCheck, Eye, EyeOff, AlertTriangle 
} from 'lucide-react';
import { OSIKANI_SYSTEM_INSTRUCTION } from '../constants';
import { getChannelStatus, sendWhatsAppMessage } from '../services/whatsapp';
import { EnvService, AppEnv } from '../services/env';

const BotSettings: React.FC = () => {
  const [systemInstruction, setSystemInstruction] = useState(OSIKANI_SYSTEM_INSTRUCTION);
  const [env, setEnv] = useState<AppEnv>(EnvService.getEnv());
  const [showSecrets, setShowSecrets] = useState(false);
  const [testNumber, setTestNumber] = useState("");
  
  // Testing States
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setSystemInstruction(localStorage.getItem('osikani_system_instruction') || OSIKANI_SYSTEM_INSTRUCTION);
    const savedTestNum = localStorage.getItem('osikani_test_number');
    if (savedTestNum) setTestNumber(savedTestNum);
  }, []);

  const handleSave = () => {
    EnvService.saveEnv(env);
    localStorage.setItem('osikani_system_instruction', systemInstruction);
    localStorage.setItem('osikani_test_number', testNumber);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleRunDiagnostics = async () => {
    setIsTesting(true);
    setTestResult({ status: 'idle', message: 'Verifying environment variables...' });
    
    try {
      const status = await getChannelStatus();
      setTestResult({ 
        status: 'success', 
        message: `Environment Verified: ${status.device_name}` 
      });
    } catch (err: any) {
      setTestResult({ status: 'error', message: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSendTestMessage = async () => {
    if (!testNumber) return;
    setIsSending(true);
    try {
      const response = await sendWhatsAppMessage(undefined, undefined, testNumber, "Chale! Testing credentials from the new EnvService.");
      alert(`Success! Message ID: ${response.messages?.[0]?.id}`);
    } catch (err: any) {
      alert("Failed: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
            <Terminal className="text-indigo-600" />
            Environment & Secrets
          </h2>
          <p className="text-slate-600 mt-2">Manage infrastructure variables and secure credentials.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSecrets(!showSecrets)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs flex items-center gap-2 hover:bg-slate-50 transition-all"
          >
            {showSecrets ? <EyeOff size={14} /> : <Eye size={14} />}
            {showSecrets ? 'Hide Secrets' : 'Show Secrets'}
          </button>
          <button 
            onClick={handleSave}
            className={`px-6 py-2 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${isSaved ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'}`}
          >
            {isSaved ? <Check size={18} /> : <Save size={18} />}
            {isSaved ? 'Environment Saved' : 'Commit Changes'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Environment Editor (.env Style) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-indigo-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Osikani Virtual .env</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            
            <div className="p-6 space-y-8 font-mono overflow-y-auto">
              {/* SYSTEM VARIABLE: GEMINI */}
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-2"># System Managed AI Key</label>
                <div className="flex items-center gap-3 text-emerald-400 text-xs">
                  <span className="shrink-0 text-slate-400 select-none">GEMINI_API_KEY=</span>
                  <div className="flex-1 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 italic opacity-60">
                    {"*".repeat(24)} (Injection Mode)
                  </div>
                </div>
              </div>

              {/* USER VARIABLE: META TOKEN */}
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-2"># Meta Cloud Access Token</label>
                <div className="flex items-center gap-3 text-indigo-400 text-xs">
                  <span className="shrink-0 text-slate-400 select-none">META_ACCESS_TOKEN=</span>
                  <input 
                    type={showSecrets ? "text" : "password"}
                    value={env.META_ACCESS_TOKEN}
                    onChange={(e) => setEnv({...env, META_ACCESS_TOKEN: e.target.value})}
                    placeholder="EAA..."
                    className="flex-1 bg-slate-800/50 p-2 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </div>

              {/* USER VARIABLE: PHONE ID */}
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-2"># Meta Phone Number ID</label>
                <div className="flex items-center gap-3 text-indigo-400 text-xs">
                  <span className="shrink-0 text-slate-400 select-none">META_PHONE_ID=</span>
                  <input 
                    type="text"
                    value={env.META_PHONE_NUMBER_ID}
                    onChange={(e) => setEnv({...env, META_PHONE_NUMBER_ID: e.target.value})}
                    placeholder="1234..."
                    className="flex-1 bg-slate-800/50 p-2 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </div>

              {/* USER VARIABLE: PROXY */}
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-2"># CORS Anywhere Proxy</label>
                <div className="flex items-center gap-3 text-amber-400 text-xs">
                  <span className="shrink-0 text-slate-400 select-none">CORS_PROXY=</span>
                  <input 
                    type="text"
                    value={env.CORS_PROXY}
                    onChange={(e) => setEnv({...env, CORS_PROXY: e.target.value})}
                    placeholder="https://..."
                    className="flex-1 bg-slate-800/50 p-2 rounded-lg border border-slate-700 outline-none focus:border-amber-500 text-white"
                  />
                </div>
              </div>

              {/* MOCK MODE TOGGLE */}
              <div className="flex items-center justify-between py-2 border-t border-slate-800/50 mt-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase">MOCK_MODE</div>
                <button 
                  onClick={() => setEnv({...env, MOCK_MODE: !env.MOCK_MODE})}
                  className={`w-10 h-5 rounded-full transition-colors flex items-center px-1 ${env.MOCK_MODE ? 'bg-emerald-600' : 'bg-slate-700'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${env.MOCK_MODE ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 mt-auto">
               <button 
                onClick={handleRunDiagnostics}
                disabled={isTesting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {isTesting ? <Loader2 size={12} className="animate-spin" /> : <Activity size={12} />}
                Verify Environment
              </button>
            </div>
          </div>
        </div>

        {/* Personality & Test Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden h-[540px] flex flex-col">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-xs uppercase tracking-widest">
              <BookOpen className="text-indigo-500" size={16} /> Global Mentor Instruction
            </h3>
            <textarea 
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              className="flex-1 w-full p-6 font-mono text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none resize-none leading-relaxed focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Outbound Test</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  placeholder="233..."
                  className="flex-1 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={handleSendTestMessage} 
                  disabled={isSending || !testNumber} 
                  className="px-6 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {isSending ? '...' : 'Send'}
                </button>
              </div>
            </div>

            <div className={`bg-white p-6 rounded-[2rem] border transition-colors flex items-center gap-4 ${testResult.status === 'success' ? 'border-emerald-200 bg-emerald-50/30' : testResult.status === 'error' ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200'}`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${testResult.status === 'success' ? 'bg-emerald-100 text-emerald-600' : testResult.status === 'error' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'}`}>
                  {testResult.status === 'success' ? <ShieldCheck size={20} /> : testResult.status === 'error' ? <AlertTriangle size={20} /> : <Activity size={20} />}
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Verification Status</p>
                  <p className={`text-xs font-bold ${testResult.status === 'success' ? 'text-emerald-700' : testResult.status === 'error' ? 'text-rose-700' : 'text-slate-600'}`}>
                    {testResult.message || 'Waiting for diagnostic...'}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
