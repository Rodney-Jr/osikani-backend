
import React, { useState } from 'react';
import { Layers, Palette, Smartphone, Save, Globe, Info, Check, RefreshCcw, Send, Mic, Search, ChevronRight, Upload, BookOpen } from 'lucide-react';
import { BrandingConfig } from '../types';

const WhiteLabelStudio: React.FC = () => {
  const [branding, setBranding] = useState<BrandingConfig>({
    primaryColor: '#059669',
    secondaryColor: '#0f172a',
    botDisplayName: 'Osikani Mentor',
    partnerName: 'Nexus Global',
    welcomeMessage: "Akwaaba! I be your digital financial mentor. How I fit help you grow today?",
    logoUrl: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Layers className="text-indigo-600" />
            White-Label Studio
          </h2>
          <p className="text-slate-600 mt-2">Create custom-branded instances of Osikani for your enterprise partners.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${isSaved ? 'bg-green-600' : 'bg-slate-900 hover:bg-slate-800'}`}
        >
          {isSaved ? <Check size={18} /> : <Save size={18} />}
          {isSaved ? 'Deployed to Tenant' : 'Save & Deploy Branding'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Branding Controls */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
              <Palette size={16} className="text-indigo-500" />
              Visual Identity
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Partner Name</label>
                <input 
                  type="text" 
                  value={branding.partnerName}
                  onChange={(e) => setBranding({...branding, partnerName: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Bot Display Name</label>
                <input 
                  type="text" 
                  value={branding.botDisplayName}
                  onChange={(e) => setBranding({...branding, botDisplayName: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                      className="w-10 h-10 p-1 bg-white border border-slate-200 rounded cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded text-xs font-mono uppercase"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Header Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                      className="w-10 h-10 p-1 bg-white border border-slate-200 rounded cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
               <BookOpen size={16} className="text-emerald-500" />
               Knowledge Augmentation
             </h3>
             <p className="text-xs text-slate-500 mb-4">Upload partner-specific PDFs (e.g., product brochures) to customize the RAG layer for this tenant.</p>
             <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all text-xs font-bold flex items-center justify-center gap-2">
               <Upload size={14} />
               Upload Supplemental Docs
             </button>
          </section>

          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3 items-start">
            <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-indigo-700 leading-relaxed font-medium">
              Enterprise branding propagates across WhatsApp avatars, Web Simulators, and the Learning Hub UI automatically.
            </p>
          </div>
        </div>

        {/* Right: Real-time Preview */}
        <div className="lg:col-span-8 flex flex-col">
           <div className="bg-slate-100 rounded-[3rem] p-12 flex-1 flex items-center justify-center border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              {/* Phone Mockup */}
              <div className="w-[340px] h-[680px] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl relative border-4 border-slate-800 z-10">
                 <div className="w-full h-full bg-[#efeae2] rounded-[3rem] overflow-hidden flex flex-col shadow-inner">
                    
                    {/* Dynamic Branded Header */}
                    <div className="text-white p-4 pt-8 flex items-center gap-3 shrink-0" style={{ backgroundColor: branding.secondaryColor }}>
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold shadow-md" style={{ color: branding.secondaryColor }}>
                         {branding.partnerName.charAt(0)}
                       </div>
                       <div>
                         <h4 className="font-bold text-xs">{branding.botDisplayName}</h4>
                         <p className="text-[9px] opacity-70">Powered by {branding.partnerName}</p>
                       </div>
                    </div>

                    <div className="flex-1 p-4 space-y-4 overflow-hidden opacity-50">
                       <div className="flex justify-start">
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-[11px] max-w-[80%] border border-slate-100">
                             {branding.welcomeMessage}
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <div className="bg-[#dcf8c6] p-3 rounded-2xl rounded-tr-none shadow-sm text-[11px] max-w-[80%]">
                             How I fit save for new shop?
                          </div>
                       </div>
                    </div>

                    {/* Branded Input Strip */}
                    <div className="p-3 bg-white flex gap-2 items-center border-t border-slate-200">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <Mic size={14} />
                       </div>
                       <div className="flex-1 h-8 bg-slate-50 border border-slate-200 rounded-full"></div>
                       <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md" style={{ backgroundColor: branding.primaryColor }}>
                          <Send size={14} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Learning Hub Preview Segment */}
              <div className="absolute bottom-10 right-10 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 transform rotate-3 hover:rotate-0 transition-transform hidden xl:block">
                 <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Learning Hub Skin</h5>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full w-[60%] transition-all" style={{ backgroundColor: branding.primaryColor }}></div>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-600">Level 4</span>
                    <button className="text-[9px] font-bold px-3 py-1 rounded text-white" style={{ backgroundColor: branding.primaryColor }}>Start Quiz</button>
                 </div>
              </div>
           </div>

           <div className="mt-6 flex justify-between items-center px-4">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Public Deployment Endpoint</span>
              </div>
              <div className="flex items-center gap-3">
                 <code className="bg-slate-100 p-2 rounded text-xs text-slate-600 font-mono">
                   https://osikani.nexus.gh/v1/{branding.partnerName.toLowerCase().replace(/\s+/g, '-')}
                 </code>
                 <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                   <RefreshCcw size={14} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelStudio;
