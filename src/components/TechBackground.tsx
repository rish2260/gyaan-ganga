'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TechBackground() {
    const [mounted, setMounted] = useState(false);
    const [elements, setElements] = useState<{
        hBars: { y: string, duration: number, delay: number }[],
        vBars: { x: string, duration: number, delay: number }[],
        nodes: { x: string, y: string, duration: number, delay: number }[]
    }>({ hBars: [], vBars: [], nodes: [] });

    useEffect(() => {
        // Generate random values only on the client
        const hBars = [...Array(8)].map(() => ({
            y: Math.random() * 100 + '%',
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 15
        }));
        const vBars = [...Array(6)].map(() => ({
            x: Math.random() * 100 + '%',
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 15
        }));
        const nodes = [...Array(15)].map(() => ({
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            duration: Math.random() * 4 + 2,
            delay: Math.random() * 5
        }));

        setElements({ hBars, vBars, nodes });
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Animated Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating Tech Bars */}
            <div className="absolute inset-0">
                {elements.hBars.map((bar, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-[300px]"
                        initial={{ x: -300, y: bar.y, opacity: 0 }}
                        animate={{ x: '120vw', opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: bar.duration,
                            repeat: Infinity,
                            delay: bar.delay,
                            ease: "linear"
                        }}
                    />
                ))}

                {elements.vBars.map((bar, i) => (
                    <motion.div
                        key={`v-${i}`}
                        className="absolute w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent h-[300px]"
                        initial={{ y: -300, x: bar.x, opacity: 0 }}
                        animate={{ y: '120vh', opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: bar.duration,
                            repeat: Infinity,
                            delay: bar.delay,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Glowing Nodes */}
            <div className="absolute inset-0">
                {elements.nodes.map((node, i) => (
                    <motion.div
                        key={`node-${i}`}
                        className="absolute w-1 h-1 bg-accent/30 rounded-full blur-[1px]"
                        initial={{ x: node.x, y: node.y, opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: node.duration,
                            repeat: Infinity,
                            delay: node.delay,
                        }}
                    />
                ))}
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
