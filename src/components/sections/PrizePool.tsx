'use client';

import { motion } from 'framer-motion';
import { Trophy, Gift, Utensils, Star, ArrowUpRight, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

function CountUp({ end, duration = 2 }: { end: number, duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const finalEnd = end;
            const timer = setInterval(() => {
                start += finalEnd / (duration * 60);
                if (start >= finalEnd) {
                    setCount(finalEnd);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [inView, end, duration]);

    return <span ref={ref}>{count.toLocaleString('en-IN')}</span>;
}

export default function PrizePool() {
    return (
        <section id="prizes" className="py-24 px-6 relative overflow-hidden bg-background">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Global Reward Pool</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-[64px] font-black mb-8 tracking-tighter text-foreground"
                    >
                        VALUING YOUR <span className="text-gradient">CREATION</span>
                    </motion.h2>
                    <p className="text-soft-grey max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        We don&apos;t just reward winners. Every participant gets access to a builder ecosystem worth millions in digital credits and technical support.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                    {/* Main Prize Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="tech-card p-12 md:p-16 flex flex-col justify-center relative overflow-hidden group shadow-premium-xl bg-surface"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                            <Sparkles size={180} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-6xl md:text-[96px] font-black mb-8 tracking-tighter text-foreground leading-none">
                                ₹<CountUp end={600000} />+ <br />
                                <span className="text-2xl text-primary font-black uppercase tracking-widest block mt-4">Growth Resources</span>
                            </h3>
                            <p className="text-soft-grey mb-16 max-w-md text-lg leading-relaxed font-medium">
                                A curated combination of direct cash bounties, infrastructure credits, and premium development toolkits.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-10">
                                {[
                                    { icon: Trophy, title: "₹1L+ Cash", desc: "Main Bounty Pool" },
                                    { icon: Gift, title: "₹5L+ Credits", desc: "Cloud & AI Credits" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 items-center group/stat">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover/stat:bg-primary group-hover/stat:text-white transition-all duration-300">
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <div className="font-black text-foreground text-xl tracking-tight">{item.title}</div>
                                            <div className="text-[10px] text-soft-grey font-black uppercase tracking-widest">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Tiers */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="grid grid-rows-2 gap-8"
                    >
                        <div className="tech-card p-12 flex flex-col justify-center relative group bg-surface">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Track Category Bounty</div>
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                            <div className="text-5xl md:text-6xl font-black text-foreground mb-3 tracking-tighter">₹70,000<span className="text-primary text-4xl">+</span></div>
                            <p className="text-xs text-soft-grey font-black uppercase tracking-[0.15em] flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-panel-border" /> Per Track Domain
                            </p>
                        </div>

                        <div className="p-[1px] bg-gradient-to-br from-primary to-accent rounded-[16px] group overflow-hidden">
                            <div className="h-full w-full bg-surface rounded-[15px] p-12 flex flex-col justify-center relative overflow-hidden transition-colors group-hover:bg-primary/5">
                                <div className="relative z-10">
                                    <div className="text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-6">Overall Champion Bounty</div>
                                    <div className="text-5xl md:text-6xl font-black text-foreground mb-3 tracking-tighter text-gradient">₹1,00,000<span className="text-4xl">+</span></div>
                                    <p className="text-xs text-soft-grey font-black uppercase tracking-[0.15em] flex items-center gap-3">
                                        <span className="w-8 h-[1px] bg-panel-border" /> National Recognition
                                    </p>
                                </div>
                                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/15 transition-all duration-700" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px section-divider" />
        </section>
    );
}
