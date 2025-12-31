
import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Shield, TrendingUp, Users, Heart, Target, Globe, Award,
  Quote, Mic, BookOpen, AlertCircle, CheckCircle2, Smartphone, ChevronRight,
  PlayCircle, Star, ShieldCheck, Landmark, QrCode, GraduationCap, ArrowUpRight,
  Download, BarChart3, Briefcase, ChevronLeft, Volume2, Trophy, Zap, PieChart, Coins
} from 'lucide-react';

interface LandingPageProps {
  onNavigate?: (tab: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Concept Note Content Helpers
  const tools = [
    {
      icon: <PieChart size={24} />,
      title: "Budgeting Tool",
      desc: "Daily and monthly income and expense tracking with spending insights."
    },
    {
      icon: <Coins size={24} />,
      title: "Savings Planner",
      desc: "Goal-based savings plans with susu-style reminders."
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: "Loan Readiness",
      desc: "Non-lending assessment of borrowing capacity and risk."
    },
    {
      icon: <Briefcase size={24} />,
      title: "SMSE Tracker",
      desc: "Simple cash-flow and profitability tracking for small businesses."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Micro-Lessons",
      desc: "Short, practical lessons triggered by user behavior or on demand."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Pension Module",
      desc: "Education on SSNIT, Tier 2/3, and long-term savings discipline."
    }
  ];

  const beneficiaries = [
    "Individuals (Informal workers, salary earners)",
    "SMSE Owners (Market traders, artisans)",
    "Women- & Youth-led Enterprises",
    "Underserved & Informally Banked"
  ];

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50 h-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200">O</div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Osikani 🇬🇭</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
          <button onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors uppercase tracking-widest text-[11px]">The Problem</button>
          <button onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors uppercase tracking-widest text-[11px]">Our Solution</button>
          <button onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors uppercase tracking-widest text-[11px]">Impact</button>
        </div>
        <a href="https://wa.me/233555000000" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-md">
          <MessageCircle size={18} />
          <span>Start Chat</span>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[800px] bg-slate-950 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30 px-3 py-1 rounded-full">
              <Zap size={12} fill="currentColor" /> Nexus Technologies Limited
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1]">
              Financial <span className="text-emerald-500">Confidence</span> <br /> for Every Ghanaian.
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              A WhatsApp-based AI financial companion designed to improve financial literacy while helping individuals and SMSEs make practical money decisions.
            </p>
            <div className="flex gap-4">
              <a href="#solution" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20">
                Explore Solution <ChevronRight size={20} />
              </a>
              <button onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} className="text-white px-8 py-4 rounded-2xl font-bold border border-white/20 hover:bg-white/10 transition-all">
                View Impact Metrics
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">O</div>
                <div>
                  <p className="text-white font-bold">Osikani</p>
                  <p className="text-emerald-400 text-xs uppercase tracking-widest">AI Companion</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-500/10 p-4 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-emerald-100 text-sm">
                  Chale, I notice say you spend 200 cedis on risky bets last week. You for watch that thing o! 🛑
                </div>
                <div className="bg-white/10 p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl text-white text-sm ml-auto max-w-[80%]">
                  Oh true. How much I save for my school fees goal?
                </div>
                <div className="bg-emerald-500/10 p-4 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-emerald-100 text-sm">
                  You get <b>GHS 450</b>. You need 50 more to hit this month's target. Force small! 💪
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Problem Statement */}
      <section id="problem" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-100 mb-6">The Challenge</div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">Access Does Not Equal <span className="text-red-500">Capability.</span></h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Ghana has expanded access to financial services through mobile money, yet only <b>one-third of Ghanaians</b> are financially literate. This gap creates systemic risks:
              </p>
              <ul className="space-y-4">
                {[
                  "Over-indebtedness and exposure to fraud outside formal banking.",
                  "Poor resilience to economic shocks due to lack of savings.",
                  "Critical vulnerability in pension/retirement planning for informal workers.",
                  "Traditional workshops are too expensive and episodic to scale."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px] text-red-500"><AlertCircle size={20} /></div>
                    <p className="text-slate-600">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
              <p className="text-2xl font-medium text-slate-800 italic leading-relaxed">
                "Informal sector workers—who form the majority of the workforce—largely operate outside structured pension systems, creating growing long-term financial insecurity."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center"><BookOpen size={20} /></div>
                <div>
                  <p className="font-bold text-slate-900">Concept Note</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Problem Statement, Section 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Project Overview & Beneficiaries */}
      <section id="solution" className="py-32 px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-200 mb-6">Project Overview</div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Meet Osikani.</h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600">
            A digital solution that embeds financial education into daily money decisions.
            We verify understanding, not just attendance.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
          {beneficiaries.map((b, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <p className="font-bold text-slate-900">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Tools */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900">Core Tools & Modules</h2>
          <p className="text-slate-500 mt-4">Practical utilities delivered seamlessly via WhatsApp chat.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((t, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:border-emerald-200 transition-all hover:shadow-xl group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {t.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Impact Metrics */}
      <section id="impact" className="py-32 bg-slate-900 text-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-black mb-6">Designed for Measurable Impact.</h2>
              <p className="text-slate-400 text-lg mb-12">Osikani is not just an app; it's a behavior change intervention. We track anonymous, aggregated data to prove ROI for impact investors.</p>

              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-emerald-400 uppercase tracking-widest text-sm mb-4">Financial Behavior</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex gap-2"><ArrowUpRight size={18} /> % of users maintaining regular budgets</li>
                    <li className="flex gap-2"><ArrowUpRight size={18} /> Increase in average savings consistency</li>
                    <li className="flex gap-2"><ArrowUpRight size={18} /> Reduction in expense-to-income ratios</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 uppercase tracking-widest text-sm mb-4">Credit Readiness</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex gap-2"><CheckCircle2 size={18} /> % of users assessed as loan-ready</li>
                    <li className="flex gap-2"><CheckCircle2 size={18} /> Reduction in self-reported defaults</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
              <h3 className="text-2xl font-bold mb-8">SMSE Performance Metrics</h3>
              <div className="grid gap-6">
                <div className="bg-white/5 p-6 rounded-2xl">
                  <p className="text-4xl font-black text-white mb-2">Cash Flow</p>
                  <p className="text-slate-400 text-sm">Stability improvements tracked monthly</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl">
                  <p className="text-4xl font-black text-white mb-2">Records</p>
                  <p className="text-slate-400 text-sm">% of businesses maintaining digital ledgers</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl">
                  <p className="text-4xl font-black text-white mb-2">Growth</p>
                  <p className="text-slate-400 text-sm">Survival indicators for verified SMSEs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sustainability & Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 px-8 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h3 className="text-2xl font-bold mb-6">Sustainability Model</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Osikani ensures long-term viability through a blended model:
              </p>
              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex gap-3"><Landmark size={16} className="text-emerald-500" /> B2B Licensing for Banks & NGOs</li>
                <li className="flex gap-3"><Briefcase size={16} className="text-emerald-500" /> Premium Features for SMSEs</li>
                <li className="flex gap-3"><BarChart3 size={16} className="text-emerald-500" /> Aggregated Data Insights</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Execution Credibility</h3>
              <p className="text-slate-400 leading-relaxed">
                Developed by <b>Nexus Technologies Limited</b>, a technology-driven organization with deep experience in AI-enabled systems tailored for African contexts.
              </p>
              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500">Phase 1: Pilot</span>
                <span className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500">Phase 2: Iteration</span>
                <span className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-500">Phase 3: Scale-Up</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
              &copy; 2025 Osikani. Nexus Technologies Limited.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
