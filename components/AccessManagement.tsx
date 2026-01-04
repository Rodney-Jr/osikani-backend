
import React, { useState } from 'react';
import {
  ShieldCheck, Users, Lock, Key, Eye, UserPlus,
  Search, ShieldAlert, History, Mail, Fingerprint,
  MoreVertical, Check, X, ShieldX, Clock, Globe, Zap, Settings2
} from 'lucide-react';
import { SystemUser, AuditLog, UserRole } from '../types';

const MOCK_USERS: SystemUser[] = [
  { id: 'u1', name: 'Kwame Mensah', email: 'kwame@osikani.nexus.gh', role: 'superuser', status: 'active', lastLogin: '2m ago', mfaEnabled: true },
  { id: 'u2', name: 'Abena Appiah', email: 'abena@nexus.gh', role: 'admin', status: 'active', lastLogin: '1h ago', mfaEnabled: true },
  { id: 'u3', name: 'Kwame Mensah', email: 'auditor@investor.com', role: 'auditor', status: 'active', lastLogin: 'Yesterday', mfaEnabled: false },
  { id: 'u4', name: 'Ama Kojo', email: 'ama@osikani.nexus.gh', role: 'admin', status: 'pending', lastLogin: 'Never', mfaEnabled: false },
];

const MOCK_AUDIT: AuditLog[] = [
  { id: 'a1', userId: 'u1', userName: 'Kwame Mensah', action: 'API Key Rotation', resource: 'Meta Cloud API', timestamp: '14:20 PM', ipAddress: '197.255.12.4' },
  { id: 'a2', userId: 'u2', userName: 'Abena Appiah', action: 'Knowledge Core Update', resource: 'Mastering_Your_Money.pdf', timestamp: '11:05 AM', ipAddress: '197.255.12.8' },
  { id: 'a3', userId: 'u1', userName: 'Kwame Mensah', action: 'User Suspended', resource: 'Temp_Employee_4', timestamp: '09:12 AM', ipAddress: '197.255.12.4' },
];

const AccessManagement: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentViewRole, setCurrentViewRole] = useState<UserRole>('superuser');

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'superuser': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'admin': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
            <ShieldCheck className="text-rose-600" />
            Governance & Access
          </h2>
          <p className="text-slate-500 font-medium">Manage enterprise roles and platform security compliance.</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 px-3">View As:</span>
          {(['superuser', 'admin', 'auditor'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => setCurrentViewRole(r)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${currentViewRole === r ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      {currentViewRole === 'auditor' ? (
        <div className="bg-amber-50 border border-amber-200 p-8 rounded-[2.5rem] text-center mb-8">
          <ShieldAlert className="mx-auto text-amber-500 mb-4" size={40} />
          <h3 className="text-xl font-black text-amber-900">Read-Only Access</h3>
          <p className="text-amber-700 max-w-md mx-auto mt-2">You are currently in Auditor mode. Administrative actions like "Invite User" or "Rotate Keys" are restricted.</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-inner">
            <Fingerprint size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MFA Adoption</p>
            <p className="text-2xl font-black text-slate-900">75%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
            <Globe size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Login Jurisdictions</p>
            <p className="text-2xl font-black text-slate-900">Ghana Only</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
            <Lock size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Superusers</p>
            <p className="text-2xl font-black text-slate-900">1 / 3 Limit</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4 bg-slate-50/50">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Users className="text-indigo-500" size={16} /> Identity Management
              </h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-indigo-500 bg-white w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">MFA</th>
                    {currentViewRole !== 'auditor' && <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                            <p className="text-[10px] text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          <span className="text-[10px] font-bold text-slate-600 capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.mfaEnabled ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-rose-500" />
                        )}
                      </td>
                      {currentViewRole !== 'auditor' && (
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-slate-900 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {currentViewRole === 'superuser' && (
            <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <h3 className="font-black flex items-center gap-3 uppercase text-[10px] tracking-[0.3em] mb-8">
                <ShieldX size={16} className="text-rose-500" /> Enterprise Hardening Config
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-sm font-bold">Strict AI DLP Scan</p>
                      <p className="text-[10px] text-slate-500">Run expensive semantic pass on all inputs.</p>
                    </div>
                    <button className="w-10 h-5 bg-rose-600 rounded-full flex items-center px-1">
                      <div className="w-3 h-3 bg-white rounded-full translate-x-5"></div>
                    </button>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-sm font-bold">Session Hardening</p>
                      <p className="text-[10px] text-slate-500">Auto-logout after 15m of inactivity.</p>
                    </div>
                    <button className="w-10 h-5 bg-slate-800 rounded-full flex items-center px-1">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-sm font-bold">Regional Fencing</p>
                      <p className="text-[10px] text-slate-500">Restrict admin access to Ghana IPs.</p>
                    </div>
                    <button className="w-10 h-5 bg-rose-600 rounded-full flex items-center px-1">
                      <div className="w-3 h-3 bg-white rounded-full translate-x-5"></div>
                    </button>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-sm font-bold">Audit Notifications</p>
                      <p className="text-[10px] text-slate-500">Instant email on admin role changes.</p>
                    </div>
                    <button className="w-10 h-5 bg-rose-600 rounded-full flex items-center px-1">
                      <div className="w-3 h-3 bg-white rounded-full translate-x-5"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 uppercase text-[10px] tracking-widest">
              <History className="text-rose-500" size={16} /> Security Audit Trail
            </h3>
            <div className="space-y-6">
              {MOCK_AUDIT.map(log => (
                <div key={log.id} className="relative pl-6 pb-6 border-l border-slate-100 last:pb-0">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-black text-slate-900 leading-none">{log.action}</p>
                    <span className="text-[8px] font-black text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{log.userName} modified {log.resource}</p>
                  <div className="flex items-center gap-1 mt-2 text-[8px] font-mono text-slate-400">
                    <Globe size={8} /> {log.ipAddress}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-xs font-black hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
              Download Forensic Logs
            </button>
          </div>

          <div className={`p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden transition-colors duration-500 ${currentViewRole === 'superuser' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
            <ShieldAlert className="absolute -bottom-6 -right-6 opacity-10" size={120} />
            <h3 className="font-black text-sm uppercase tracking-widest mb-4">Role Context</h3>
            <p className="text-xs opacity-80 leading-relaxed mb-6">
              {currentViewRole === 'superuser'
                ? "You are currently logged in as a Superuser. Full platform authority granted."
                : currentViewRole === 'admin'
                  ? "Standard Administrative access. Content and user management enabled."
                  : "Auditor Mode. System configuration is read-only."
              }
            </p>
            <div className={`flex items-center gap-2 text-[10px] font-black w-fit px-3 py-1 rounded-full border ${currentViewRole === 'superuser' ? 'bg-white/10 border-white/20' : 'bg-slate-200 border-slate-300'}`}>
              <Key size={12} />
              SESSION ACTIVE: {currentViewRole.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;
