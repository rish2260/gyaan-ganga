'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="py-24 px-6 border-t border-panel-border bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-8 group">
                            <div className="relative w-14 h-14 group-hover:scale-110 transition-transform">
                                <Image
                                    src="/logo.png"
                                    alt="Gyaan Ganga Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-black text-2xl tracking-tighter text-foreground">
                                GYAAN<span className="text-primary group-hover:text-accent transition-colors">GANGA</span>
                            </span>
                        </Link>

                        <p className="text-soft-grey max-w-sm mb-10 text-lg leading-relaxed font-medium">
                            Empowering the next generation of builders. Join India&apos;s most immersive technical marathon and solve real-world challenges.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-surface border border-panel-border flex items-center justify-center text-soft-grey hover:border-primary hover:text-primary transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['About', 'Tracks', 'Prizes', 'Sponsors', 'Register'].map(item => (
                                <li key={item}>
                                    <Link href={item === 'Register' ? '/register' : `/#${item.toLowerCase()}`} className="text-soft-grey hover:text-primary transition-colors font-bold text-sm">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-8">Ecosystem</h4>
                        <ul className="space-y-4">
                            {['Community', 'Code of Conduct', 'Media Kit', 'Contact Us'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-soft-grey hover:text-primary transition-colors font-bold text-sm">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-panel-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-soft-grey">
                    <p>© 2026 GYAAN GANGA HACKATHON. ALL BITS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="mailto:contact@gyaanganga.in" className="hover:text-primary transition-colors">Support</a>
                        <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                        <a href="#" className="hover:text-primary transition-colors">Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
