
import React from 'react';
import { Check, X, Star, Zap, Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
    const navigate = useNavigate();

    const tiers = [
        {
            name: "Osikani Basic",
            price: "Free",
            description: "For individuals starting their financial journey.",
            features: [
                "Limited Chatbot Usage (20 msgs/day)",
                "Core Financial Education",
                "Entry-level Gamification"
            ],
            notIncluded: [
                "Personalized Financial Plans",
                "SME Cashflow Tools"
            ],
            cta: "Get Started",
            popular: false,
            color: "bg-slate-50 border-slate-200"
        },
        {
            name: "Osikani Plus",
            price: "GHS 25",
            period: "/month",
            description: "For serious savers and planners.",
            features: [
                "Unlimited Chatbot Access",
                "Personalized Savings Plans",
                "Financial Dashboards",
                "Ad-Free Experience"
            ],
            notIncluded: [
                "SME Tools",
                "Priority Support"
            ],
            cta: "Upgrade to Plus",
            popular: true,
            color: "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20"
        },
        {
            name: "Osikani Pro",
            price: "GHS 60",
            period: "/month",
            description: "For business owners and power users.",
            features: [
                "Everything in Plus",
                "SME Cashflow & Inventory Tools",
                "Advanced Loan Simulations",
                "Priority Support (Human Agent)"
            ],
            notIncluded: [],
            cta: "Go Pro",
            popular: false,
            color: "bg-slate-900 text-white border-slate-800"
        }
    ];

    const handleSubscribe = async (tierName: string) => {
        // 1. Get User ID (Web Guest or Auth)
        let userId = localStorage.getItem('osikani_web_session');
        if (!userId) {
            alert("No active session found. Please start a chat first to create a guest session.");
            return;
        }

        // 2. Map display name to Enum
        const tierMap: Record<string, string> = {
            "Osikani Basic": "BASIC",
            "Osikani Plus": "PLUS",
            "Osikani Pro": "PRO"
        };
        const tierEnum = tierMap[tierName];

        if (!tierEnum) return;

        // 3. Simulated Payment Flow
        const confirmed = window.confirm(`[SIMULATED PAYMENT]\n\nDo you want to pay for ${tierName}?\n\nClick OK to process mock payment.`);

        if (confirmed) {
            try {
                const response = await fetch('/api/subscriptions/upgrade', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, tier: tierEnum })
                });

                if (response.ok) {
                    alert(`Success! You have been upgraded to ${tierName}. The AI will now unlock premium features.`);
                    // Ideally, refresh context or redirect
                    navigate('/');
                } else {
                    const err = await response.json();
                    alert(`Failed: ${err.error}`);
                }
            } catch (e) {
                console.error(e);
                alert("Network error occurred.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">

            {/* Navbar Placeholder / Back Button */}
            <div className="p-6 max-w-7xl mx-auto">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold uppercase text-xs tracking-widest transition-colors mb-8">
                    <ChevronLeft size={16} /> Back to Home
                </button>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Invest in your <span className="text-emerald-600">Financial Future.</span></h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Choose the plan that fits your goals. From basic literacy to advanced business tools, Osikani scales with you.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, index) => (
                        <div key={index} className={`rounded-[2rem] p-8 border relative ${tier.color} transition-all hover:scale-105 duration-300 shadow-xl`}>
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}
                            <h3 className={`text-xl font-bold mb-2 ${tier.name === 'Osikani Pro' ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className={`text-4xl font-black ${tier.name === 'Osikani Pro' ? 'text-white' : 'text-slate-900'}`}>{tier.price}</span>
                                {tier.period && <span className={`text-sm ${tier.name === 'Osikani Pro' ? 'text-slate-400' : 'text-slate-500'}`}>{tier.period}</span>}
                            </div>
                            <p className={`text-sm mb-8 ${tier.name === 'Osikani Pro' ? 'text-slate-400' : 'text-slate-500'}`}>{tier.description}</p>

                            <button
                                onClick={() => handleSubscribe(tier.name)}
                                className={`w-full py-3 rounded-xl font-bold mb-8 transition-all ${tier.name === 'Osikani Pro'
                                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                                    }`}>
                                {tier.cta}
                            </button>

                            <div className="space-y-4">
                                {tier.features.map((feat, i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <Check size={18} className="text-emerald-500 shrink-0" />
                                        <span className={tier.name === 'Osikani Pro' ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                                    </div>
                                ))}
                                {tier.notIncluded.map((feat, i) => (
                                    <div key={i} className="flex gap-3 text-sm opacity-50">
                                        <X size={18} className="text-slate-400 shrink-0" />
                                        <span className={tier.name === 'Osikani Pro' ? 'text-slate-600' : 'text-slate-500'}>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Signals */}
                <div className="mt-20 text-center border-t border-slate-100 pt-12">
                    <p className="text-slate-400 text-sm mb-6">TRUSTED BY PARTNERS</p>
                    <div className="flex justify-center gap-8 opacity-50 grayscale">
                        {/* Placeholders for logos */}
                        <div className="font-bold text-xl text-slate-300">Ecobank</div>
                        <div className="font-bold text-xl text-slate-300">MTN MoMo</div>
                        <div className="font-bold text-xl text-slate-300">Enterprise</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
