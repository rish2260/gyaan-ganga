'use client';

import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Users,
    CheckCircle2,
    Clock,
    XCircle,
    Download,
    Search,
    Eye,
    TrendingUp,
    Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface Team {
    id: string;
    team_name: string;
    track: string;
    leader_name: string;
    leader_email: string;
    leader_phone: string;
    team_size: number;
    college: string;
    city: string;
    experience_level: string;
    github_link: string;
    members: any[];
    status: string;
    payment_status: string;
    amount_paid: number;
    created_at: string;
}

export default function AdminDashboard() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    const fetchTeams = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setTeams(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('registrations')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setTeams(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
            if (selectedTeam?.id === id) {
                setSelectedTeam(prev => prev ? { ...prev, status: newStatus } : null);
            }
        }
    };

    const filteredTeams = teams.filter(team => {
        const matchesStatus = activeTab === 'all' || team.status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = team.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.leader_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.leader_name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = [
        { label: 'Total Registrations', value: teams.length, icon: Users, color: 'text-primary' },
        { label: 'Approved Teams', value: teams.filter(t => t.status === 'Approved').length, icon: CheckCircle2, color: 'text-green-500' },
        { label: 'Pending Review', value: teams.filter(t => t.status === 'NEW' || t.status === 'Pending').length, icon: Clock, color: 'text-yellow-500' },
        { label: 'Waitlist', value: teams.filter(t => t.status === 'Rejected').length, icon: XCircle, color: 'text-red-500' },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* SaaS Sidebar */}
            <aside className="w-72 border-r border-panel-border bg-surface/30 backdrop-blur-xl p-8 flex flex-col fixed h-full">
                <div className="flex items-center gap-4 mb-20">
                    <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-primary/20">GG</div>
                    <div>
                        <span className="font-black text-xl tracking-tighter block leading-none">Console</span>
                        <span className="text-[10px] uppercase font-bold text-soft-grey tracking-widest">Admin Dashboard</span>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    <button className="w-full flex items-center gap-3 px-5 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/10 transition-all">
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-soft-grey hover:bg-foreground/5 rounded-2xl transition-all font-bold">
                        <Users size={20} /> Teams
                    </button>
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-soft-grey hover:bg-foreground/5 rounded-2xl transition-all font-bold">
                        <TrendingUp size={20} /> Analytics
                    </button>
                </nav>

                <div className="pt-8 border-t border-panel-border">
                    <Link href="/" className="text-xs font-bold text-soft-grey hover:text-primary transition-colors flex items-center gap-2">
                        ← Exit Admin Portal
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-72 p-12">
                <header className="flex justify-between items-center mb-16">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Registration Manager</h1>
                        <p className="text-soft-grey font-medium">Monitoring track distributions and team statuses.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-80">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search teams, leaders..."
                                className="w-full bg-surface border border-panel-border py-4 pl-14 pr-6 rounded-2xl outline-none focus:border-primary transition-all text-sm font-medium"
                            />
                        </div>
                        <button className="p-4 bg-surface border border-panel-border rounded-2xl text-soft-grey hover:text-foreground transition-all">
                            <Filter size={20} />
                        </button>
                    </div>
                </header>

                {/* Key Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-panel p-8 tech-card group">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-surface border border-panel-border group-hover:scale-110 transition-transform", stat.color)}>
                                <stat.icon size={24} />
                            </div>
                            <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                            <div className="text-xs font-bold text-soft-grey uppercase tracking-widest mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Data Table Container */}
                <div className="glass-panel overflow-hidden shadow-2xl bg-surface/20">
                    <div className="p-6 border-b border-panel-border flex gap-3 bg-surface/50">
                        {['All', 'NEW', 'Approved', 'Rejected'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                    activeTab === tab.toLowerCase()
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-soft-grey hover:bg-foreground/5 hover:text-foreground'
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 border-b border-panel-border bg-surface/30">
                                    <th className="px-10 py-5">Team Identifier</th>
                                    <th className="px-10 py-5">Innovation Track</th>
                                    <th className="px-10 py-5">Status Badge</th>
                                    <th className="px-10 py-5">Action Matrix</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-panel-border/30">
                                {isLoading ? (
                                    <tr><td colSpan={4} className="p-20 text-center text-soft-grey animate-pulse font-bold tracking-widest uppercase text-xs">Loading Repository...</td></tr>
                                ) : filteredTeams.length === 0 ? (
                                    <tr><td colSpan={4} className="p-20 text-center text-soft-grey font-bold">No matching records found.</td></tr>
                                ) : (
                                    filteredTeams.map(team => (
                                        <tr key={team.id} className="hover:bg-foreground/[0.02] transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="font-bold text-foreground text-lg tracking-tight">{team.team_name}</div>
                                                <div className="text-xs text-soft-grey font-medium">{team.leader_name} • {team.leader_email}</div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className="text-sm font-semibold text-foreground/80">{team.track}</span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className={cn(
                                                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                    team.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        team.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                )}>
                                                    <div className={cn("w-1.5 h-1.5 rounded-full",
                                                        team.status === 'Approved' ? 'bg-green-500' :
                                                            team.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                                    )} />
                                                    {team.status}
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all justify-end translate-x-4 group-hover:translate-x-0">
                                                    <button onClick={() => setSelectedTeam(team)} className="p-3 bg-surface border border-panel-border rounded-xl text-soft-grey hover:text-primary transition-all shadow-sm"><Eye size={18} /></button>
                                                    <button onClick={() => updateStatus(team.id, 'Approved')} className="p-3 bg-surface border border-panel-border rounded-xl text-soft-grey hover:text-green-500 transition-all shadow-sm"><CheckCircle2 size={18} /></button>
                                                    <button onClick={() => updateStatus(team.id, 'Rejected')} className="p-3 bg-surface border border-panel-border rounded-xl text-soft-grey hover:text-red-500 transition-all shadow-sm"><XCircle size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Team Details Sheet (Modern Slide-over replacement) */}
                <AnimatePresence>
                    {selectedTeam && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-end p-6 bg-black/40 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                className="w-full max-w-xl h-full bg-surface border-l border-panel-border shadow-2xl flex flex-col p-12 overflow-y-auto rounded-[40px] md:rounded-none md:rounded-l-[40px]"
                            >
                                <div className="flex justify-between items-center mb-12">
                                    <div className="text-xs font-black uppercase tracking-[0.3em] text-primary">Team Profile</div>
                                    <button onClick={() => setSelectedTeam(null)} className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"><XCircle size={24} /></button>
                                </div>

                                <h2 className="text-4xl font-black mb-10 tracking-tight">{selectedTeam.team_name}</h2>

                                <div className="space-y-10">
                                    <section className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-[10px] font-black text-soft-grey uppercase tracking-widest mb-2">Innovation Track</div>
                                            <div className="font-bold text-foreground text-lg">{selectedTeam.track}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-soft-grey uppercase tracking-widest mb-2">Team Size</div>
                                            <div className="font-bold text-foreground text-lg">{selectedTeam.team_size} Members</div>
                                        </div>
                                    </section>

                                    <section className="space-y-6">
                                        <div className="text-[10px] font-black text-soft-grey uppercase tracking-widest mb-4">Leadership Contact</div>
                                        <div className="p-6 rounded-3xl bg-background border border-panel-border space-y-4">
                                            <div className="flex justify-between border-b border-panel-border/50 pb-4">
                                                <span className="text-sm font-medium text-soft-grey">Leader Name</span>
                                                <span className="text-sm font-bold">{selectedTeam.leader_name}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-panel-border/50 pb-4">
                                                <span className="text-sm font-medium text-soft-grey">Email Identity</span>
                                                <span className="text-sm font-bold">{selectedTeam.leader_email}</span>
                                            </div>
                                            <div className="flex justify-between pb-4">
                                                <span className="text-sm font-medium text-soft-grey">Phone Comms</span>
                                                <span className="text-sm font-bold">{selectedTeam.leader_phone}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <div className="text-[10px] font-black text-soft-grey uppercase tracking-widest mb-4">Institutional Details</div>
                                        <div className="text-lg font-bold text-foreground">{selectedTeam.college}</div>
                                        <div className="text-sm text-soft-grey">{selectedTeam.city}</div>
                                    </section>

                                    <div className="pt-10 flex gap-3">
                                        <button onClick={() => updateStatus(selectedTeam.id, 'Approved')} className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">Approve Team</button>
                                        <button onClick={() => updateStatus(selectedTeam.id, 'Rejected')} className="px-6 py-4 bg-surface border border-panel-border text-soft-grey rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:text-red-500">Waitlist</button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
