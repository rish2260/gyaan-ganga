'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, User, Mail, Phone, BookOpen, MapPin, Briefcase, Link as LinkIcon } from 'lucide-react';
import { tracks } from '@/data/hackathonData';
import { supabase } from '@/lib/supabase';

type Step = 1 | 2 | 3 | 4;

export default function RegistrationForm() {
    const [step, setStep] = useState<Step>(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        teamName: '',
        teamSize: '3',
        track: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        college: '',
        city: '',
        member2Name: '',
        member2Email: '',
        member3Name: '',
        member3Email: '',
        member4Name: '',
        member4Email: '',
        member5Name: '',
        member5Email: '',
        experience: 'Beginner',
        portfolio: '',
        agreed: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
        if (error) setError(null);
    };

    const nextStep = () => setStep(prev => (prev < 4 ? (prev + 1) as Step : prev));
    const prevStep = () => setStep(prev => (prev > 1 ? (prev - 1) as Step : prev));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const members = [];
            if (formData.member2Name) members.push({ name: formData.member2Name, email: formData.member2Email });
            if (formData.member3Name) members.push({ name: formData.member3Name, email: formData.member3Email });
            if (Number(formData.teamSize) >= 4 && formData.member4Name) {
                members.push({ name: formData.member4Name, email: formData.member4Email });
            }
            if (Number(formData.teamSize) >= 5 && formData.member5Name) {
                members.push({ name: formData.member5Name, email: formData.member5Email });
            }

            const { error: submitError } = await supabase
                .from('registrations')
                .insert([{
                    team_name: formData.teamName,
                    track: formData.track,
                    team_size: Number(formData.teamSize),
                    leader_name: formData.leaderName,
                    leader_email: formData.leaderEmail,
                    leader_phone: formData.leaderPhone,
                    college: formData.college,
                    city: formData.city,
                    experience_level: formData.experience,
                    github_link: formData.portfolio,
                    members: members,
                    status: 'NEW'
                }]);

            if (submitError) throw submitError;
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto p-16 glass-panel text-center shadow-2xl"
            >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10 text-primary">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tight text-foreground">Registration Successful!</h2>
                <p className="text-soft-grey mb-12 text-lg font-medium leading-relaxed">
                    We&apos;re excited to have you. A confirmation email has been sent to the team leader with further instructions.
                </p>
                <a
                    href="https://chat.whatsapp.com/DsrSJLHlTaMDxmFyNUYuZK"
                    target="_blank"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-green-500/20"
                >
                    Join the Community
                </a>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Clear Modern Stepper */}
            <div className="flex justify-between items-center mb-16 relative">
                <div className="absolute top-5 left-0 w-full h-[2px] bg-foreground/5 -z-10" />
                {[
                    { id: 1, label: 'Team' },
                    { id: 2, label: 'Leader' },
                    { id: 3, label: 'Squad' },
                    { id: 4, label: 'Finish' }
                ].map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-3 bg-background px-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= s.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-surface border border-panel-border text-soft-grey'}`}>
                            {s.id}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-foreground' : 'text-soft-grey'}`}>{s.label}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="glass-panel p-10 md:p-14 shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight text-foreground">Team Essentials</h3>
                                <p className="text-soft-grey font-medium">Start by defining your team identity and preferred track.</p>
                            </div>
                            <div className="grid gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Team Name</label>
                                    <div className="relative group">
                                        <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                        <input required name="teamName" value={formData.teamName} onChange={handleInputChange} placeholder="E.g. Binary Beasts" className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary transition-all text-foreground font-medium" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Team Size</label>
                                        <select name="teamSize" value={formData.teamSize} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all appearance-none">
                                            {[2, 3, 4, 5].map(n => <option key={n} value={n} className="bg-surface text-foreground">{n} Members</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Innovation Track</label>
                                        <select required name="track" value={formData.track} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all appearance-none">
                                            <option value="" className="bg-surface text-foreground">Select a Track</option>
                                            {tracks.map(t => <option key={t.id} value={t.title} className="bg-surface text-foreground">{t.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight text-foreground">Leader Contact</h3>
                                <p className="text-soft-grey font-medium">Who will be the primary point of contact for the team?</p>
                            </div>
                            <div className="grid gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                        <input required name="leaderName" value={formData.leaderName} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                            <input required type="email" name="leaderEmail" value={formData.leaderEmail} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Phone</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                            <input required name="leaderPhone" value={formData.leaderPhone} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">College</label>
                                        <div className="relative group">
                                            <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                            <input required name="college" value={formData.college} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">City</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                            <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight text-foreground">SQUAD DETAILS</h3>
                                <p className="text-soft-grey font-medium">Add details for other team members.</p>
                            </div>
                            <div className="grid gap-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                {[2, 3, 4, 5].filter(num => num <= Number(formData.teamSize)).map((num) => (
                                    <div key={num} className="p-8 rounded-3xl border border-panel-border bg-background/50 group hover:border-primary/20 transition-all">
                                        <div className="text-[10px] font-black text-primary mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                                            <div className="w-6 h-[2px] bg-primary/20" /> Member 0{num}
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Full Name</label>
                                                <input required name={`member${num}Name`} value={(formData as any)[`member${num}Name`]} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-4 rounded-xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Email</label>
                                                <input required name={`member${num}Email`} value={(formData as any)[`member${num}Email`]} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-4 rounded-xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight text-foreground">FINAL SUBMISSION</h3>
                                <p className="text-soft-grey font-medium">Almost there. Tell us about your experience.</p>
                            </div>
                            <div className="grid gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Overall Experience Level</label>
                                    <select name="experience" value={formData.experience} onChange={handleInputChange} className="w-full bg-background border border-panel-border p-5 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all appearance-none">
                                        <option value="Beginner" className="bg-surface text-foreground">Beginner - First Hackathon</option>
                                        <option value="Intermediate" className="bg-surface text-foreground">Intermediate - Built several projects</option>
                                        <option value="Advanced" className="bg-surface text-foreground">Advanced - Industry professional / Serial winner</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Portfolio or GitHub Link</label>
                                    <div className="relative group">
                                        <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-soft-grey group-hover:text-primary transition-colors" size={20} />
                                        <input name="portfolio" value={formData.portfolio} onChange={handleInputChange} placeholder="https://github.com/yourusername" className="w-full bg-background border border-panel-border p-5 pl-14 rounded-2xl outline-none focus:border-primary text-foreground font-medium transition-all" />
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4">
                                    <input required type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} className="mt-1 w-5 h-5 accent-primary shrink-0" />
                                    <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                                        I confirm that all provided details are correct. I understand there is a nominal fee of ₹299 per team member payable at the venue for logistics and hospitality.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">{error}</div>}

                <div className="mt-14 flex justify-between items-center gap-6">
                    {step > 1 ? (
                        <button type="button" onClick={prevStep} className="flex items-center gap-3 text-soft-grey hover:text-foreground font-bold transition-all px-6 py-4 rounded-2xl hover:bg-foreground/5">
                            <ChevronLeft size={20} /> Previous
                        </button>
                    ) : <div />}

                    {step < 4 ? (
                        <button type="button" onClick={nextStep} className="px-10 py-5 bg-background border border-panel-border text-foreground font-black rounded-2xl hover:border-primary transition-all flex items-center gap-2 shadow-xl shadow-black/5 hover:translate-x-1">
                            Next Stage <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button type="submit" disabled={isSubmitting} className="px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                            {isSubmitting ? "Processing..." : "Submit Registration"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
