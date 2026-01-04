import React, { useState } from 'react';
import { User, Lock, Mail, Save, Building } from 'lucide-react';

interface PartnerSettingsProps {
    org: any;
}

const PartnerSettings: React.FC<PartnerSettingsProps> = ({ org }) => {
    const [formData, setFormData] = useState({
        name: org.name,
        email: org.email,
        type: org.type,
        currentPassword: '',
        newPassword: ''
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Settings Updated (Mock)");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Settings</h2>
                <p className="text-slate-500 text-sm">Manage your organization profile and security preferences.</p>
            </header>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Building size={20} className="text-slate-400" /> Organization Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Organization Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-colors font-medium text-slate-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Industry Type</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={formData.type}
                                    disabled
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 font-medium cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contact Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 font-medium cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Lock size={20} className="text-slate-400" /> Security
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Current Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.currentPassword}
                                onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-colors bg-slate-50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.newPassword}
                                onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-colors bg-slate-50"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                    <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg flex items-center gap-2">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerSettings;
