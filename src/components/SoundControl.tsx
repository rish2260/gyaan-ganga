'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function SoundControl() {
    const [isMuted, setIsMuted] = useState(true);
    const [mounted, setMounted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pathname = usePathname();

    // Don't show on admin pages
    const isAdminPage = pathname?.startsWith('/admin');

    useEffect(() => {
        setMounted(true);
        const savedPreference = localStorage.getItem('bgm_enabled');
        if (savedPreference === 'true') {
            // Browsers won't allow autoplay even if saved 'true' 
            // until user interacts, so we stay muted initially
            // but we could try to sync state. 
            // For safety and PRD adherence, we start Muted.
        }

        // Initialize audio
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'); // Ambient tech placeholder
        audioRef.current.loop = true;
        audioRef.current.volume = 0; // Start at 0 for fade in

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleSound = () => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.play().catch(err => console.log("Playback blocked:", err));
            // Fade in logic
            let vol = 0;
            const fadeIn = setInterval(() => {
                vol += 0.01;
                if (audioRef.current) {
                    audioRef.current.volume = Math.min(vol, 0.15); // Max 15% as per PRD
                    if (vol >= 0.15) clearInterval(fadeIn);
                }
            }, 50);
            setIsMuted(false);
            localStorage.setItem('bgm_enabled', 'true');
        } else {
            // Fade out logic
            let vol = audioRef.current.volume;
            const fadeOut = setInterval(() => {
                vol -= 0.01;
                if (audioRef.current) {
                    audioRef.current.volume = Math.max(vol, 0);
                    if (vol <= 0) {
                        audioRef.current.pause();
                        clearInterval(fadeOut);
                    }
                }
            }, 50);
            setIsMuted(true);
            localStorage.setItem('bgm_enabled', 'false');
        }
    };

    // Auto-pause if navigating to admin
    useEffect(() => {
        if (isAdminPage && audioRef.current && !isMuted) {
            audioRef.current.pause();
            setIsMuted(true);
        }
    }, [isAdminPage, isMuted]);

    if (!mounted || isAdminPage) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSound}
                className="group relative flex items-center justify-center w-12 h-12 glass-panel rounded-full border-primary/20 hover:border-primary/50 transition-all shadow-xl shadow-primary/10"
                title={isMuted ? "Enable sound" : "Mute sound"}
            >
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{ opacity: 0, rotate: -20 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 20 }}
                        >
                            <VolumeX size={20} className="text-soft-grey group-hover:text-primary transition-colors" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unmuted"
                            initial={{ opacity: 0, rotate: -20 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 20 }}
                        >
                            <Volume2 size={20} className="text-primary" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Visualizer bars when active */}
                {!isMuted && (
                    <div className="absolute -top-1 flex gap-0.5 items-end h-3">
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ repeat: Infinity, duration: 0.5 + i * 0.2 }}
                                className="w-0.5 bg-primary/40 rounded-full"
                            />
                        ))}
                    </div>
                )}

                <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-surface border border-panel-border text-[10px] font-black uppercase tracking-widest text-soft-grey opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0">
                    {isMuted ? "Enable Sound" : "Mute Audio"}
                </span>
            </motion.button>
        </div>
    );
}
