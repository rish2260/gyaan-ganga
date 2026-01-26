'use client';

import { motion } from 'framer-motion';
import { Trophy, Gift, Utensils, Star, ArrowUpRight } from 'lucide-react';

export default function PrizePool() {
    return (
        <section id="prizes" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Rewards & Recognition</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground"
                    >
                        THE <span className="text-gradient">PRIZE POOL</span>
                    </motion.h2>
                    <p className="text-soft-grey max-w-2xl mx-auto font-medium">
                        Recognizing innovation and technical excellence. Winning at Gyaan Ganga is not just about prizes; it&apos;s about prestige and opportunity.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="glass-panel p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group tech-card"
                    >
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all" />

                        <div className="relative z-10">
                            <h3 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-foreground">
                                ₹6L<span className="text-primary">+</span>
                            </h3>
                            <p className="text-soft-grey mb-12 max-w-sm text-lg font-medium leading-relaxed">
                                Total prize pool including cash rewards, cloud credits, and specialized development toolkits.
                            </p>

                            <div className="flex gap-10">
                                <div>
                                    <div className="text-2xl font-black text-foreground">₹1L+</div>
                                    <div className="text-[10px] text-soft-grey font-black uppercase tracking-widest">Cash Bounties</div>
                                </div>
                                <div className="h-10 w-[1px] bg-panel-border" />
                                <div>
                                    <div className="text-2xl font-black text-foreground">₹5L+</div>
                                    <div className="text-[10px] text-soft-grey font-black uppercase tracking-widest">Growth Credits</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="grid gap-6"
                    >
                        <div className="glass-panel p-10 flex flex-col justify-center relative group tech-card">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-[10px] font-black tracking-widest uppercase text-primary">Track Bounty</div>
                                <ArrowUpRight className="text-soft-grey group-hover:text-primary transition-all" />
                            </div>
                            <div className="text-4xl font-black text-foreground mb-1 tracking-tight">₹70,000+</div>
                            <p className="text-soft-grey text-xs font-black uppercase tracking-widest">Per Category Winner</p>
                        </div>

                        <div className="glass-panel p-10 flex flex-col justify-center relative group tech-card bg-primary/5 border-primary/20">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-[10px] font-black tracking-widest uppercase text-primary">National Champion</div>
                                <Trophy className="text-primary animate-pulse" />
                            </div>
                            <div className="text-4xl font-black text-foreground mb-1 tracking-tight">₹1,00,000+</div>
                            <p className="text-soft-grey text-xs font-black uppercase tracking-widest">Total Empowerment Package</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
