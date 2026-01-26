'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Users2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const stats = [
    { label: 'Innovation Tracks', value: '7' },
    { label: 'Hours of Hacking', value: '36' },
    { label: 'National Reach', value: 'PAN India' },
];

export default function About() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative z-10 glass-panel aspect-square flex items-center justify-center p-16 shadow-2xl border-panel-border/50"
                        >
                            <div className="absolute inset-0 bg-primary/5 rounded-[60px] blur-[100px] -z-10" />
                            {mounted ? (
                                <div className="text-center group relative w-full h-full flex items-center justify-center">
                                    <div className="relative w-72 h-72 group-hover:scale-105 transition-transform duration-700">
                                        <Image
                                            src="/logo.png"
                                            alt="Gyaan Ganga Logo"
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-surface/80 backdrop-blur px-6 py-3 rounded-2xl border border-panel-border text-[10px] font-black tracking-widest uppercase text-foreground/40 shadow-xl">
                                        Established 2026
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full bg-surface animate-pulse rounded-[40px]" />
                            )}
                        </motion.div>
                    </div>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                            >
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">About the mission</span>
                            </motion.div>

                            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tight text-foreground">
                                DECODING THE <br />
                                <span className="text-gradient">FUTURE</span>
                            </h2>
                            <p className="text-lg text-soft-grey mb-12 leading-relaxed font-medium">
                                Gyaan Ganga Hackathon 2026 is an elite confluence of developers, designers, and innovators. We provide the platform and the tools; you provide the vision to solve complex real-world challenges.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-16">
                                {[
                                    { icon: Target, title: 'Our Mission', desc: 'Accelerating digital transformation through collaborative innovation.' },
                                    { icon: Eye, title: 'Our Vision', desc: 'Creating an ecosystem where code solves complex human challenges.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 rounded-[32px] bg-surface/50 border border-panel-border hover:border-primary/30 transition-all group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                            <item.icon size={24} />
                                        </div>
                                        <h4 className="font-black text-xl mb-2 text-foreground tracking-tight">{item.title}</h4>
                                        <p className="text-soft-grey text-sm leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-8 py-10 border-t border-panel-border">
                                {stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-4xl font-black text-foreground mb-1 tracking-tighter">{stat.value}</div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
