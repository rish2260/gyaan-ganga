'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code,
    Stethoscope,
    Database,
    Leaf,
    Sprout,
    GraduationCap,
    Lightbulb,
    X,
    Award,
    ArrowRight
} from 'lucide-react';
import { tracks } from '@/data/hackathonData';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
    Code,
    Stethoscope,
    Database,
    Leaf,
    Sprout,
    GraduationCap,
    Lightbulb
};

export default function Tracks() {
    const [selectedTrack, setSelectedTrack] = useState<typeof tracks[0] | null>(null);

    return (
        <section id="tracks" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Choose your path</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">
                        INNOVATION <span className="text-gradient">TRACKS</span>
                    </h2>
                    <p className="text-soft-grey max-w-2xl mx-auto font-medium">
                        Solve real-world challenges across these 7 specialized domains. Every track comes with its own prize pool and mentorship.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tracks.map((track, idx) => {
                        const IconComponent = iconMap[track.icon] || Code;
                        return (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedTrack(track)}
                                className="glass-panel p-8 cursor-pointer group hover:border-primary/50 transition-all flex flex-col h-full tech-card"
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-background border border-panel-border mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
                                    style={{ color: track.color }}
                                >
                                    <IconComponent size={28} />
                                </div>
                                <h3 className="text-2xl font-black mb-3 text-foreground tracking-tight">{track.title}</h3>
                                <p className="text-soft-grey mb-8 flex-1 text-sm font-medium leading-relaxed">
                                    {track.description}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                                    Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedTrack && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-surface border border-panel-border rounded-[32px] overflow-hidden p-8 md:p-14 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedTrack(null)}
                                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-foreground" />
                            </button>

                            <div className="flex items-center gap-6 mb-10">
                                <div
                                    className="w-20 h-20 rounded-[28px] flex items-center justify-center bg-background border border-panel-border shadow-xl"
                                    style={{ color: selectedTrack.color }}
                                >
                                    <Code size={40} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-foreground tracking-tight">{selectedTrack.title}</h3>
                                    <div className="text-primary font-black uppercase tracking-widest text-[10px] mt-1 shadow-primary/20">
                                        Active Track 2026
                                    </div>
                                </div>
                            </div>

                            <p className="text-soft-grey leading-relaxed text-lg mb-10 font-medium">{selectedTrack.description}</p>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4">Focus Ideas</h4>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {selectedTrack.useCases.map((useCase: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-panel-border font-medium text-sm text-foreground/80">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {useCase}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-panel-border flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-soft-grey uppercase tracking-widest font-black">Prize Category</div>
                                            <div className="text-xl font-black text-foreground tracking-tight">Track Excellence</div>
                                        </div>
                                    </div>
                                    <Link
                                        href="/register"
                                        onClick={() => setSelectedTrack(null)}
                                        className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                    >
                                        Register for this Track
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
