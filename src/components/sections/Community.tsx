'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Zap, Shield, Heart, ExternalLink, ArrowRight } from 'lucide-react';

export default function Community() {
    return (
        <section id="community" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Pre-event network</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-foreground"
                    >
                        THE <span className="text-gradient">ECOSYSTEM</span>
                    </motion.h2>
                    <p className="text-soft-grey max-w-2xl mx-auto text-lg font-medium">
                        Join 2,400+ developers, mentors, and industry pioneers. Get early access to workshops, job boards, and partner perks.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-panel p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group tech-card">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all opacity-50" />

                        <div className="relative z-10 max-w-md">
                            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-foreground">Join the Developer Hub</h3>
                            <p className="text-soft-grey mb-10 text-lg leading-relaxed font-medium">
                                Real-time updates, teammate matchmaking, and direct lines to mentors. Our WhatsApp community is the heartbeat of the mission.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://chat.whatsapp.com/DsrSJLHlTaMDxmFyNUYuZK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                >
                                    Join WhatsApp <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="mt-16 flex items-center gap-6 relative z-10 p-6 rounded-2xl bg-surface/50 border border-panel-border w-fit">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-accent/40 shadow-sm"></div>
                                ))}
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary">100+ new members today</div>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {[
                            { icon: Zap, color: 'text-primary', title: 'Beta Mentorship', desc: 'Direct 1-on-1 access to senior developers from top-tier SaaS companies.' },
                            { icon: Shield, color: 'text-accent', title: 'Talent Pipeline', desc: 'Accelerated hiring opportunities with our curated network of partners.' },
                            { icon: Heart, color: 'text-primary', title: 'Builder Perks', desc: 'Exclusive access to cloud credits, dev tools, and networking events.' }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 hover:border-primary/20 transition-all tech-card">
                                <item.icon className={`${item.color} mb-6`} size={28} />
                                <h4 className="text-xl font-black mb-2 text-foreground tracking-tight">{item.title}</h4>
                                <p className="text-sm text-soft-grey leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
