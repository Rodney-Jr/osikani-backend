import React from 'react';
import { Heart, Globe, Target, Users, ShieldCheck, TrendingUp, Award, Download, ArrowUpRight, BarChart3, BookOpen, Landmark, Briefcase, GraduationCap } from 'lucide-react';

const ImpactDonorView: React.FC = () => {
  const sdgs = [
    {
      id: 1,
      title: "No Poverty",
      description: "Reducing vulnerability to debt cycles by teaching the 'Chop vs Seed' money principle.",
      color: "bg-red-600",
      icon: <Heart size={20} />
    },
    {
      id: 4,
      title: "Quality Education",
      description: "Democratizing elite financial literature via WhatsApp & local dialects.",
      color: "bg-red-700",
      icon: <GraduationCap size={20} />
    },
    {
      id: 8,
      title: "Decent Work & Growth",
      description: "Empowering 12,000+ market traders (SMEs) with cash-flow management tools.",
      color: "bg-red-800",
      icon: <TrendingUp size={20} />
    },
    {
      id: 10,
      title: "Reduced Inequality",
      description: "Closing the gap for the 68% illiterate through Voice-First AI interaction.",
      color: "bg-pink-600",
      icon: <Globe size={20} />
    },
    {
      id: 16,
      title: "Strong Institutions",
      description: "Educating 50k+ citizens on Tax Compliance (GRA) & Civic Responsibility.",
      color: "bg-blue-700",
      icon: <ShieldCheck size={20} />
    }
  ];

  const [showPartnerModal, setShowPartnerModal] = React.useState(false);

  const handleExport = () => {
    alert("Impact Report (PDF) generation started. This will download shortly.");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto pb-20">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Award className="text-emerald-600" />
            Impact & Sustainability Dashboard
          </h2>
          <p className="text-slate-600 mt-2">Strategic reporting for Donors, ESG Partners, and Policy Makers.</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md">
          <Download size={18} />
          Export Impact Report (PDF)
        </button>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Financial Capital Safeguarded</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">GHS 1.2M</span>
            <span className="text-emerald-600 text-xs font-bold flex items-center">
              <ArrowUpRight size={12} /> +12%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Estimated MoMo scams blocked + optimized SME savings.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Inclusion Velocity</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">14.2%</span>
            <span className="text-blue-600 text-xs font-bold flex items-center">
              Target: 68%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Reduction in the baseline financial illiteracy rate among users.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Youth Literacy Uplift</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">4,200+</span>
            <span className="text-purple-600 text-xs font-bold">Kids</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Students currently engaged with the 'Money Smart Kids' module.</p>
        </div>
      </div>

      {/* SDG Mapping */}
      <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
        <Landmark size={14} className="text-slate-400" />
        UN Sustainable Development Goals (SDG) Alignment
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {sdgs.map(sdg => (
          <div key={sdg.id} className="group cursor-default">
            <div className={`p-6 rounded-2xl h-full border border-slate-100 shadow-sm hover:shadow-md transition-all bg-white`}>
              <div className={`w-12 h-12 ${sdg.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {sdg.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-2">SDG {sdg.id}: {sdg.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{sdg.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SDG Deep Dive Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 mb-12">
        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen size={18} className="text-emerald-600" />
          Strategic Alignment Deep Dive
        </h4>
        <div className="space-y-6">
          <div className="grid md:grid-cols-[1fr_3fr] gap-4 border-b border-slate-100 pb-4">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SDG 1</span>
              No Poverty
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              By targeting the "poverty premium" and preventing wealth erosion through scams, Osikani protects the meagre capital of the most vulnerable. The 'Chop vs Seed' module directly combats consumption-driven poverty cycles by distinguishing business capital from personal spending.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_3fr] gap-4 border-b border-slate-100 pb-4">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">SDG 4</span>
              Quality Education
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Functional literacy is a prerequisite for economic participation. Osikani delivers "Just-in-Time" financial education in local dialects (Twi, Ga, Pidgin), bypassing the barriers of formal classroom settings and English proficiency to reach the 68% illiterate demographic.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_3fr] gap-4 border-b border-slate-100 pb-4">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-red-800 text-white text-xs font-bold px-2 py-1 rounded">SDG 8</span>
              Decent Work & Growth
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              For the 80% of Ghanaians in the informal sector, scaling a business is impossible without separation of accounts. The SMSE Tracker validates cash flow, creating a "digital footprint" that makes these micro-enterprises credit-worthy and bankable.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_3fr] gap-4 border-b border-slate-100 pb-4">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">SDG 10</span>
              Reduced Inequality
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Traditional banking interfaces exclude the illiterate. Our Voice-First AI interface is a technological equalizer, giving a Kayayo (market porter) the same quality of financial advice and fraud protection as a corporate professional.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_3fr] gap-4 pb-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded">SDG 16</span>
              Strong Institutions
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tax compliance and civic duty are often low due to complexity. Osikani simplifies GRA tax laws and compliance requirements, fostering a culture of civic responsibility and strengthening public trust in financial institutions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Impact Viz */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold">The Journey to 0% Illiteracy</h3>
                <p className="text-slate-400 text-sm mt-1">Real-time engagement across language demographics.</p>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                <span className="text-2xl font-bold text-emerald-400">84k</span>
                <span className="text-[10px] block opacity-60 uppercase font-bold">Total Interactions</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="opacity-70">Twi & Ga (Vernacular Engagement)</span>
                  <span className="font-bold">42%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[42%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="opacity-70">Pidgin (Street/Youth Engagement)</span>
                  <span className="font-bold">38%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[38%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="opacity-70">Standard English (Formal Sector)</span>
                  <span className="font-bold">20%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[20%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div className="text-center">
                <div className="text-xl font-bold">128</div>
                <p className="text-[10px] uppercase opacity-50 font-bold">Village Groups</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">2.4k</div>
                <p className="text-[10px] uppercase opacity-50 font-bold">Market Traders</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">94%</div>
                <p className="text-[10px] uppercase opacity-50 font-bold">Retention</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Target size={16} />
            </div>
            <h3 className="font-bold text-slate-800">Donor ROI</h3>
          </div>

          <div className="flex-1 space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Literacy Cost-Efficiency</h4>
              <p className="text-lg font-bold text-slate-900 mt-1">$0.12 <span className="text-slate-400 text-xs font-normal">per student / month</span></p>
              <p className="text-[10px] text-slate-500 mt-1">Bypasses the $15+ cost of physical book distribution.</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-tighter">Impact Multiplier</h4>
              <p className="text-lg font-bold text-emerald-900 mt-1">8.4x</p>
              <p className="text-[10px] text-emerald-700 mt-1">Estimated return in social stability per $1 invested.</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowPartnerModal(true)}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2">
              Become a Partner
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Partner Registration Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowPartnerModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">Partner with Osikani</h3>
            <p className="text-slate-600 mb-6">Join our network of financial institutions and Impact Donors.</p>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              alert("Request Sent! Our partnerships team will contact you.");
              setShowPartnerModal(false);
            }}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Organization Name</label>
                <input className="w-full border border-slate-300 rounded-lg p-3" placeholder="e.g. Acme Bank" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Contact Email</label>
                <input className="w-full border border-slate-300 rounded-lg p-3" type="email" placeholder="partner@example.com" required />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800">
                Submit Interest
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quote Section */}
      <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] text-center">
        <BookOpen className="mx-auto text-slate-300 mb-4" size={32} />
        <p className="text-xl font-medium text-slate-700 italic max-w-2xl mx-auto">
          "Financial literacy is not a luxury; it is the fundamental infrastructure for a nation's dignity. Osikani takes the library to the people."
        </p>
        <div className="mt-6">
          <p className="font-bold text-slate-900">Expertise Digitized</p>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">The Osikani Vision</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactDonorView;
