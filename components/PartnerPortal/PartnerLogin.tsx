import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Mail, Lock, Building2, Loader2 } from 'lucide-react';

interface PartnerLoginProps {
    onLogin: (org: any) => void;
    onBack: () => void;
}

const PartnerLogin: React.FC<PartnerLoginProps> = ({ onLogin, onBack }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orgName, setOrgName] = useState('');
    const [orgType, setOrgType] = useState('BANK');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = isRegistering ? '/api/partner/register' : '/api/partner/login';
            const body = isRegistering
                ? { email, password, name: orgName, type: orgType }
                : { email, password };

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (res.ok) {
                if (isRegistering) {
                    alert("Registration Successful! Please wait for admin approval (or contact sales).");
                    setIsRegistering(false);
                } else {
                    onLogin(data.org);
                }
            } else {
                alert(data.error || "Action failed");
            }
        } catch (err) {
            console.error(err);
            alert("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

            <div className="relative z-10 w-full max-w-md">
                <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Osikani
                </button>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <ShieldCheck size={32} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                        {isRegistering ? "Partner Registration" : "Partner Portal"}
                    </h2>
                    <p className="text-slate-400 text-center text-sm mb-8">
                        Secure access for Financial Institutions.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegistering && (
                            <>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Organization Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="e.g. Acme Bank"
                                            value={orgName}
                                            onChange={e => setOrgName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Type</label>
                                    <select
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                        value={orgType}
                                        onChange={e => setOrgType(e.target.value)}
                                    >
                                        <option value="BANK">Commercial Bank</option>
                                        <option value="FINTECH">Fintech / EMI</option>
                                        <option value="INSURANCE">Insurance Provider</option>
                                        <option value="MFI">Microfinance (MFI)</option>
                                        <option value="DONOR">Donor / NGO</option>
                                        <option value="NGO">Humanitarian Org</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="partner@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (isRegistering ? "Submit Application" : "Access Dashboard")}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-sm text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-slate-400"
                        >
                            {isRegistering ? "Already have an account? Login" : "New Partner? Apply for Access"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerLogin;
