'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Zap, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 px-6">
            <div className="max-w-5xl mx-auto w-full relative z-10">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Registration Open for 2026</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tight text-foreground"
                    >
                        GYAAN GANGA <br />
                        <span className="text-gradient">HACKATHON 2026</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-soft-grey max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Innovate. Code. Dominate. <br className="hidden md:block" />
                        Join India&apos;s most immersive 36-hour sprint to build the future.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-5"
                    >
                        <Link
                            href="/register"
                            className="px-10 py-5 bg-primary text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 hover:bg-primary/90"
                        >
                            Register Now <ChevronRight size={20} />
                        </Link>
                        <a
                            href="https://chat.whatsapp.com/DsrSJLHlTaMDxmFyNUYuZK"
                            target="_blank"
                            className="px-10 py-5 bg-background border border-panel-border text-foreground font-bold rounded-2xl flex items-center gap-3 hover:bg-foreground/5 transition-all"
                        >
                            Join Community
                        </a>
                    </motion.div>

                    {/* Stat Strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-20 pt-10 border-t border-panel-border flex flex-wrap justify-center gap-10 md:gap-20"
                    >
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Trophy size={24} /></div>
                            <div>
                                <div className="text-2xl font-black text-foreground">₹6L+</div>
                                <div className="text-xs font-black uppercase tracking-widest text-soft-grey">Prize Pool</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Users size={24} /></div>
                            <div>
                                <div className="text-2xl font-black text-foreground">1000+</div>
                                <div className="text-xs font-black uppercase tracking-widest text-soft-grey">Developers</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Zap size={24} /></div>
                            <div>
                                <div className="text-2xl font-black text-foreground">36H</div>
                                <div className="text-xs font-black uppercase tracking-widest text-soft-grey">Of Hacking</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </section>
    );
}
