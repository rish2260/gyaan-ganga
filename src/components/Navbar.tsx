'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tracks', href: '/#tracks' },
    { name: 'Prizes', href: '/#prizes' },
    { name: 'Community', href: '/#community' },
    { name: 'Sponsors', href: '/#sponsors' },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6',
                scrolled ? 'bg-background/80 backdrop-blur-xl py-4 border-b border-foreground/5' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
                        <Image
                            src="/logo.png"
                            alt="Gyaan Ganga Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-foreground">
                        GYAAN<span className="text-primary group-hover:text-accent transition-colors">GANGA</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs font-black uppercase tracking-widest text-soft-grey hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-[1px] bg-foreground/10" />

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-xl text-soft-grey hover:text-foreground transition-colors hover:bg-foreground/5"
                            aria-label="Toggle Theme"
                        >
                            {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
                        </button>

                        <Link
                            href="/register"
                            className="px-8 py-3 bg-foreground text-background rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-foreground/5"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-foreground/10 overflow-hidden md:hidden px-6 pb-12 pt-6 shadow-2xl"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-black text-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                                <span className="text-xs font-black uppercase tracking-widest text-soft-grey">Switch Theme</span>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-4 rounded-2xl bg-foreground/5 text-foreground"
                                >
                                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                </button>
                            </div>
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-5 bg-primary text-black rounded-2xl font-black text-center text-lg mt-4 shadow-xl shadow-primary/20"
                            >
                                Register Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
