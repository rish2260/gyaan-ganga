'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ExternalLink, X, Quote, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const mentors = [
    {
        name: "Dr. Arvind Kumar",
        role: "Head of AI, TechCorp",
        expertise: "AI & Machine Learning",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind",
        bio: "Dr. Arvind has over 15 years of experience in developing large-scale AI systems. He has previously worked at Google Brain and contributed to several open-source deep learning libraries."
    },
    {
        name: "Sophia Chen",
        role: "Senior Blockchain Engineer",
        expertise: "Web3 & Blockchain",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        bio: "Sophia is a leading voice in decentralized finance and smart contract security. She has successfully led multiple Web3 projects and is a frequent speaker at global ether conferences."
    },
    {
        name: "Rajesh Sharma",
        role: "Founder, Innovation Labs",
        expertise: "Entrepreneurship",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
        bio: "Rajesh has mentored over 100+ startups and is an expert in product-market fit. He specializes in helping early-stage companies scale their operations and secure venture funding."
    },
    {
        name: "Elena Rodriguez",
        role: "HealthTech Researcher",
        expertise: "Medical Technology",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        bio: "Elena specializes in the intersection of AI and medical diagnostics. Her research has been published in several top-tier medical journals and she holds multiple patents in HealthTech."
    }
];

export default function Mentors() {
    const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

    return (
        <section id="mentors" className="py-24 px-6 relative overflow-hidden bg-surface/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Industry Guides</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground"
                    >
                        LEARN FROM THE <span className="text-gradient">GURUS</span>
                    </motion.h2>
                    <p className="text-soft-grey max-w-2xl mx-auto font-medium">
                        World-class developers and industry leaders dedicated to guiding your 36-hour sprint from concept to deployment.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mentors.map((mentor, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedMentor(mentor)}
                            className="glass-panel p-10 text-center group cursor-pointer tech-card"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-8">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Image
                                    src={mentor.image}
                                    alt={mentor.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full rounded-3xl relative z-10 border border-panel-border grayscale group-hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-100 shadow-xl"
                                />
                            </div>

                            <h3 className="text-2xl font-black mb-1 text-foreground tracking-tight group-hover:text-primary transition-colors">{mentor.name}</h3>
                            <p className="text-primary font-black uppercase tracking-widest text-[9px] mb-4">{mentor.role}</p>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-panel-border text-[9px] uppercase tracking-widest font-black text-soft-grey">
                                {mentor.expertise}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedMentor && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-surface border border-panel-border rounded-[32px] overflow-hidden p-8 md:p-14 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedMentor(null)}
                                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-foreground" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left mb-10">
                                <div className="w-40 h-40 rounded-[32px] overflow-hidden shrink-0 border border-panel-border bg-background shadow-2xl">
                                    <Image
                                        src={selectedMentor.image}
                                        alt={selectedMentor.name}
                                        width={160}
                                        height={160}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="pt-4">
                                    <h3 className="text-4xl font-black mb-2 text-foreground tracking-tight">{selectedMentor.name}</h3>
                                    <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">{selectedMentor.role}</p>
                                    <div className="flex justify-center md:justify-start gap-4">
                                        <a href="#" className="w-10 h-10 rounded-xl bg-background border border-panel-border flex items-center justify-center text-soft-grey hover:text-primary hover:border-primary transition-all shadow-sm">
                                            <Linkedin size={20} />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-xl bg-background border border-panel-border flex items-center justify-center text-soft-grey hover:text-primary hover:border-primary transition-all shadow-sm">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-6 -left-6 w-16 h-16 text-foreground/5 -z-10" />
                                <p className="text-soft-grey leading-relaxed text-xl border-l-[3px] border-primary/30 pl-8 py-2 font-medium">
                                    {selectedMentor.bio}
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-panel-border flex flex-wrap gap-2 text-foreground/60">
                                <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-primary/10 text-primary rounded-xl">
                                    {selectedMentor.expertise}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-foreground/5 rounded-xl">
                                    Mentor 2026
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
