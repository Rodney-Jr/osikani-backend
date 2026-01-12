
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Using react-router for redirect
import { Lock, Shield, Loader2 } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    // Switch between hooks based on router implementation.
    // If we are strictly using the 'activeTab' method, we might need a prop.
    // But per plan, we are switching to react-router.

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/partner/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                if (data.org.type !== 'ADMIN') {
                    throw new Error("Unauthorized Access: Admins Only.");
                }
                login(data.token, data.org);
                navigate('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center border border-red-500/20">
                        <Lock size={32} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-2">Restricted Area</h2>
                <p className="text-slate-500 text-center text-sm mb-8">Authorized Personnel Only</p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <Shield size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Admin Email"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-900/40 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Authenticate"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
