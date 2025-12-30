
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Shield, TrendingUp, Users, Heart, Target, Globe, Award, 
  Quote, Mic, BookOpen, AlertCircle, CheckCircle2, Smartphone, ChevronRight, 
  PlayCircle, Star, ShieldCheck, Landmark, QrCode, GraduationCap, ArrowUpRight,
  Download, BarChart3, Briefcase, ChevronLeft, Volume2, Trophy
} from 'lucide-react';

interface LandingPageProps {
  onNavigate?: (tab: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activePreviewLang, setActivePreviewLang] = useState('English');
  const slideCount = 4;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const previewContent = {
    'English': "Your 'Seed Money' is your business future. Use 'Mastering Your Money' principles to separate daily chop from capital.",
    'Twi (Akan)': "Wo 'Dua Aba' sika no ne wo nnwuma daakye. Fa sika a ɛyɛ adwuma sika no sie na mfa ntɔ aduane.",
    'Pidgin': "Your 'Seed Money' na your business future. No use your capital buy chop money, make you keep am for tomorrow market."
  };

  const sdgs = [
    { id: 1, title: "No Poverty", color: "bg-red-600", icon: <Heart size={16} /> },
    { id: 4, title: "Quality Education", color: "bg-red-700", icon: <GraduationCap size={16} /> },
    { id: 8, title: "Decent Work", color: "bg-red-800", icon: <TrendingUp size={16} /> },
    { id: 10, title: "Reduced Inequality", color: "bg-pink-600", icon: <Globe size={16} /> }
  ];

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slideCount);
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Unified Scroll & Slide Function
  const handleNavClick = (sectionId: string, slideIndex: number) => {
    setActiveSlide(slideIndex);
    setIsPaused(true); // Pause auto-play when user manually navigates
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Resume auto-play after a delay
    setTimeout(() => setIsPaused(false), 10000);
  };

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50 h-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200">O</div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Osikani 🇬🇭</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
          <button 
            onClick={() => handleNavClick('how-it-works', 2)} 
            className="hover:text-emerald-600 transition-colors uppercase tracking-widest text-[11px]"
          >
            How it Works
          </button>
          <button 
            onClick={() => handleNavClick('impact', 1)} 
            className="hover:text-emerald-600 transition-colors uppercase tracking-widest text-[11px]"
          >
            Social Impact
          </button>
          <button 
            onClick={() => onNavigate?.('learning')} 
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest text-[11px] font-black"
          >
            <Trophy size={14} /> Student Portal
          </button>
        </div>
        <a href="https://wa.me/233555000000" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-md">
          <MessageCircle size={18} />
          <span>Demo</span>
        </a>
      </nav>

      {/* Dynamic Storyboard Hero */}
      <section 
        className="relative h-[85vh] lg:h-[750px] bg-slate-950 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide Progress Bars */}
        <div className="absolute top-4 left-0 w-full px-8 flex gap-2 z-30">
          {Array.from({ length: slideCount }).map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={() => setActiveSlide(i)}>
              <div 
                className={`h-full bg-emerald-500 transition-all duration-[7000ms] ease-linear ${activeSlide === i ? 'w-full' : activeSlide > i ? 'w-full' : 'w-0'}`}
                style={{ transitionDuration: activeSlide === i ? '7000ms' : '300ms' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Slides Content */}
        <div className="relative h-full">
          
          {/* Slide 1: Wisdom & Dialects */}
          <div className={`absolute inset-0 flex items-center p-8 lg:px-20 transition-all duration-700 ease-in-out ${activeSlide === 0 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'}`}>
             <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                   <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                     <Mic size={14} className="animate-pulse" /> Language Inclusive Technology
                   </div>
                   <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1]">
                     Financial Wisdom <br/> 
                     <span className="text-emerald-500">In Your Tongue.</span>
                   </h1>
                   <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                     Osikani turns elite financial literature into simple, voice-first WhatsApp conversations in Twi, Ga, and Pidgin.
                   </p>
                   
                   <div className="flex flex-wrap gap-4 pt-4">
                      <a href="https://wa.me/233555000000" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20">
                         <MessageCircle size={20} /> Chat on WhatsApp
                      </a>
                      <button 
                        onClick={() => onNavigate?.('learning')}
                        className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
                      >
                         <Trophy size={20} className="text-yellow-400" /> Enter Learning Hub
                      </button>
                   </div>

                   <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md max-w-md shadow-2xl mt-8">
                      <div className="flex gap-2 mb-4">
                        {['English', 'Twi (Akan)', 'Pidgin'].map(lang => (
                          <button key={lang} onClick={() => setActivePreviewLang(lang)} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${activePreviewLang === lang ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'}`}>
                            {lang}
                          </button>
                        ))}
                      </div>
                      <p className="text-sm italic text-slate-200 leading-relaxed">"{previewContent[activePreviewLang as keyof typeof previewContent]}"</p>
                   </div>
                </div>
                <div className="hidden lg:block flex-1 relative group">
                   <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] group-hover:bg-emerald-500/30 transition-all rounded-full"></div>
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/233555000000&color=059669&bgcolor=ffffff" className="relative z-10 w-72 h-72 rounded-[3rem] border-8 border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] mx-auto transform group-hover:scale-105 transition-transform" alt="QR" />
                </div>
             </div>
          </div>

          {/* Slide 2: Impact & SDGs */}
          <div className={`absolute inset-0 flex items-center p-8 lg:px-20 transition-all duration-700 ease-in-out ${activeSlide === 1 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'}`}>
             <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                   <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                     <Award size={14} /> ESG & Sustainability Focus
                   </div>
                   <h2 className="text-4xl md:text-6xl font-extrabold text-white">Impact You Can <span className="text-blue-400">Measure.</span></h2>
                   <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Digitizing the libraries of financial experts to bridge the national inclusion gap.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-center backdrop-blur-sm group hover:bg-white/10 transition-all">
                      <div className="text-5xl font-extrabold text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors">GHS 1.2M</div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Capital Safeguarded</p>
                   </div>
                   <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-center backdrop-blur-sm group hover:bg-white/10 transition-all">
                      <div className="text-5xl font-extrabold text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors">14.2%</div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Inclusion Velocity</p>
                   </div>
                   <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 text-center backdrop-blur-sm group hover:bg-white/10 transition-all">
                      <div className="text-5xl font-extrabold text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors">4.2k+</div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Students Empowered</p>
                   </div>
                </div>
                <div className="flex justify-center gap-6 mt-16">
                   {sdgs.map(sdg => (
                     <div key={sdg.id} className={`${sdg.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transform hover:-translate-y-2 transition-all cursor-help`} title={sdg.title}>
                       {sdg.icon}
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Slide 3: The Journey */}
          <div className={`absolute inset-0 flex items-center p-8 lg:px-20 transition-all duration-700 ease-in-out ${activeSlide === 2 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'}`}>
             <div className="max-w-7xl mx-auto w-full text-center">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Smartphone size={14} /> Simplified User Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16">Zero Adoption Friction. <span className="text-amber-400">Voice-First.</span></h2>
                <div className="grid md:grid-cols-3 gap-16">
                   <div className="space-y-6 group">
                      <div className="w-20 h-20 bg-white/5 text-white rounded-3xl flex items-center justify-center mx-auto border border-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all text-2xl font-black">1</div>
                      <h3 className="font-bold text-xl text-white">Scan Secure QR</h3>
                      <p className="text-sm text-slate-500 px-8">No logins, no downloads, no registration forms.</p>
                   </div>
                   <div className="space-y-6 group">
                      <div className="w-20 h-20 bg-white/5 text-white rounded-3xl flex items-center justify-center mx-auto border border-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all text-2xl font-black">2</div>
                      <h3 className="font-bold text-xl text-white">Send Voice Note</h3>
                      <p className="text-sm text-slate-500 px-8">Ask in your dialect. Osikani understands your context.</p>
                   </div>
                   <div className="space-y-6 group">
                      <div className="w-20 h-20 bg-emerald-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 text-2xl font-black">3</div>
                      <h3 className="font-bold text-xl text-white">Grow Capital</h3>
                      <p className="text-sm text-slate-500 px-8">Get expert advice tailored to your small business.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Slide 4: Testimonials */}
          <div className={`absolute inset-0 flex items-center p-8 lg:px-20 transition-all duration-700 ease-in-out ${activeSlide === 3 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'}`}>
             <div className="max-w-4xl mx-auto w-full">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Quote size={40} className="text-emerald-500" />
                </div>
                <p className="text-2xl md:text-4xl font-medium text-white italic text-center leading-relaxed tracking-tight">
                  "I be market trader for Makola. Sometimes I no know how I take use my money, but Osikani teach me 'Chop Money' vs 'Seed Money'. My business dey grow small small now."
                </p>
                <div className="mt-16 flex items-center justify-center gap-6">
                   <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xl shadow-xl">AK</div>
                   <div className="text-left">
                      <p className="font-black text-xl text-white">Auntie Kojo</p>
                      <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Makola Market Trader</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Manual Controls */}
        <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-center z-30">
           <div className="flex gap-3">
             {Array.from({ length: slideCount }).map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setActiveSlide(i)}
                 className={`h-2 rounded-full transition-all duration-500 ${activeSlide === i ? 'bg-emerald-500 w-12' : 'bg-white/20 w-3 hover:bg-white/40'}`}
               />
             ))}
           </div>
           <div className="flex gap-4">
             <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all group">
               <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
             </button>
             <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all group">
               <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
             </button>
           </div>
        </div>

        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-emerald-600/10 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none opacity-50"></div>
      </section>

      {/* Trust Strip */}
      <div className="bg-white py-12 border-y border-slate-100 overflow-hidden">
         <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between items-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3 font-black text-xl text-slate-900 tracking-tighter"><Landmark size={24} /> CENTRAL BANK COMPLIANT</div>
            <div className="flex items-center gap-3 font-black text-xl text-slate-900 tracking-tighter"><ShieldCheck size={24} /> MOMO FRAUD SHIELD</div>
            <div className="flex items-center gap-3 font-black text-xl text-slate-900 tracking-tighter"><Award size={24} /> ESG CERTIFIED 2025</div>
         </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10">
        
        {/* Journey Section */}
        <section id="how-it-works" className="py-32 px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 mb-2">The Platform</div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Bridge the Literacy Gap.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">We digitized elite financial libraries to create a personal mentor that speaks your language.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="p-10 rounded-[3rem] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all group">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                 <QrCode size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Immediate Link</h3>
               <p className="text-slate-500 leading-relaxed">No apps to download. No memory to consume on your phone. Just scan a QR or click a link to start chatting.</p>
            </div>
            <div className="p-10 rounded-[3rem] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all group">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                 <Mic size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. Dialect Support</h3>
               <p className="text-slate-500 leading-relaxed">Send a voice note in Twi, Ga, or Pidgin. Osikani uses advanced LLM logic to provide professional advice you can trust.</p>
            </div>
            <div className="p-10 rounded-[3rem] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all group">
               <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 group-hover:text-white transition-all">
                 <TrendingUp size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Economic Safety</h3>
               <p className="text-slate-500 leading-relaxed">Apply expert principles to protect your business capital and escape the debt trap. Built for the modern trader.</p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-32 bg-slate-50 px-8 border-y border-slate-200 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <div className="max-w-xl">
                 <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 mb-4">ESG Transparency</div>
                <h2 className="text-5xl font-black text-slate-900 flex items-center gap-4 tracking-tight">
                  Impact Reporting.
                </h2>
                <p className="text-slate-500 mt-6 text-lg leading-relaxed">
                  Osikani is an intervention strategy designed to align with UN Sustainable Development Goals and national inclusion targets.
                </p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl mt-8 md:mt-0">
                <Download size={20} />
                2025 Impact Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                 <h3 className="text-3xl font-black mb-12 tracking-tight">Engagement by Dialect</h3>
                 <div className="space-y-10 relative z-10">
                    <div>
                       <div className="flex justify-between text-sm font-bold mb-3">
                         <span className="opacity-60 uppercase tracking-widest">Twi & Ga Engagement</span>
                         <span className="text-emerald-400">42%</span>
                       </div>
                       <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[42%] transition-all duration-1000"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-sm font-bold mb-3">
                         <span className="opacity-60 uppercase tracking-widest">Pidgin & Street Slang</span>
                         <span className="text-yellow-400">38%</span>
                       </div>
                       <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 w-[38%] transition-all duration-1000"></div>
                       </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 pt-12 mt-12 border-t border-white/10">
                        <div className="text-center">
                          <p className="text-4xl font-black text-white">94%</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Retention</p>
                        </div>
                        <div className="text-center">
                          <p className="text-4xl font-black text-white">128</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">Districts</p>
                        </div>
                        <div className="text-center">
                          <p className="text-4xl font-black text-white">2.4k</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">SME Partners</p>
                        </div>
                    </div>
                 </div>
               </div>
               <div className="flex flex-col justify-center space-y-10 pl-4">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <Target size={28} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Financial Velocity.</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                      By leveraging WhatsApp's 96% penetration, we've reduced educational delivery costs from $15.00 to just **$0.12** per citizen.
                    </p>
                  </div>
                  <div className="pt-10 border-t border-slate-200">
                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3">
                       Invest in Inclusion
                       <ArrowUpRight size={22} />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Voices Section */}
        <section id="testimonials" className="py-32 px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
             <div className="lg:w-1/3">
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-100 mb-4">User Voices</div>
                <h2 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">Citizen <br/><span className="text-emerald-600">Growth.</span></h2>
                <p className="text-slate-500 mt-8 text-lg leading-relaxed">Real stories from the markets and streets of Ghana. Digital inclusion that actually works for the informal economy.</p>
                <div className="flex gap-1 text-yellow-400 mt-8">
                   {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">4.9/5 User Rating</p>
             </div>
             <div className="lg:w-2/3 grid md:grid-cols-2 gap-10">
                <div className="p-12 rounded-[3.5rem] border border-slate-100 bg-white shadow-xl space-y-8 relative group hover:scale-[1.02] transition-all">
                   <Quote className="text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity" size={40} />
                   <p className="text-slate-700 italic text-xl leading-relaxed">"The Fraud Shield saved my shop last month. Someone sent me a fake MoMo message and I almost sent money back, but Osikani warned me in time."</p>
                   <div className="flex items-center gap-4 pt-4">
                      <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg">SM</div>
                      <div>
                        <p className="font-black text-slate-900">Seth Mensah</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Boutique Owner, Kumasi</p>
                      </div>
                   </div>
                </div>
                <div className="p-12 rounded-[3.5rem] border border-slate-100 bg-white shadow-xl space-y-8 relative group hover:scale-[1.02] transition-all">
                   <Quote className="text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity" size={40} />
                   <p className="text-slate-700 italic text-xl leading-relaxed">"My daughter is only 12 but she listens to the Junior lessons every evening. She knows more about 'Seed Money' than I did at 30."</p>
                   <div className="flex items-center gap-4 pt-4">
                      <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-lg">JA</div>
                      <div>
                        <p className="font-black text-slate-900">Janet Appiah</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent & Civil Servant</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 py-24 px-8 text-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-6 max-w-sm">
               <div className="flex items-center gap-2">
                 <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black text-xl">O</div>
                 <span className="font-black text-2xl text-white tracking-tighter">Osikani 🇬🇭</span>
               </div>
               <p className="text-slate-400 leading-relaxed text-sm">
                 Empowering every Ghanaian citizen with the library of financial experts. Built on the Google Gemini Pro infrastructure for extreme localized intelligence.
               </p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer"><Globe size={20} /></div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer"><MessageCircle size={20} /></div>
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
               <div className="space-y-6">
                  <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] opacity-40">Platform</h4>
                  <ul className="space-y-4 text-sm text-slate-400 font-bold">
                    <li><button onClick={() => onNavigate?.('knowledge')} className="hover:text-emerald-400 transition-colors">Knowledge Core</button></li>
                    <li><button onClick={() => onNavigate?.('learning')} className="hover:text-emerald-400 transition-colors text-yellow-400">Student Portal</button></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">API Status</a></li>
                  </ul>
               </div>
               <div className="space-y-6">
                  <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] opacity-40">Partner</h4>
                  <ul className="space-y-4 text-sm text-slate-400 font-bold">
                    <li><button onClick={() => onNavigate?.('whitelabel')} className="hover:text-emerald-400 transition-colors">B2B Licensing</button></li>
                    <li><button onClick={() => onNavigate?.('impact')} className="hover:text-emerald-400 transition-colors">Donor Portal</button></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Impact Data</a></li>
                  </ul>
               </div>
               <div className="space-y-6">
                  <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] opacity-40">Nexus</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="font-black text-white">Accra, Ghana</li>
                    <li>East Legon Office</li>
                    <li className="pt-2 font-mono text-xs opacity-50">v2.5.0-build</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/10 text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">&copy; 2025 Osikani. Digitizing Financial Wisdom. Nexus Technologies.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
