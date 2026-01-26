'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Star, Shield, Trophy, Diamond, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const sponsors = {
    platinum: { name: 'Platinum Partner', items: [1] },
    gold: { name: 'Gold Sponsors', items: [1, 2, 3] },
    silver: { name: 'Silver Sponsors', items: [1, 2, 3, 4] },
    community: { name: 'Community Partners', items: [1, 2, 3, 4, 5, 6] }
};

const tiers = [
    {
        name: "Silver",
        price: "10,000",
        color: "#94A3B8",
        icon: Shield,
        benefits: ["Logo on Website", "Social Media Shoutout", "Certificate of Participation", "Digital Branding"]
    },
    {
        name: "Gold",
        price: "20,000",
        color: "#FBBF24",
        icon: Star,
        benefits: ["Everything in Silver", "Logo on Event T-shirts", "Brand Mention during Event", "1 Physical Banner"]
    },
    {
        name: "Platinum",
        price: "35,000",
        color: "#6366F1",
        icon: Diamond,
        featured: true,
        tag: "Best Value",
        benefits: ["Everything in Gold", "Dedicated Demo Booth", "Speaking Slot (10 mins)", "Recruitment Access"]
    },
    {
        name: "Title",
        price: "50,000",
        color: "#F43F5E",
        icon: Trophy,
        benefits: ["Everything in Platinum", "Naming Rights (Event Name)", "Main Stage Branding", "Grand Prize Presenter"]
    },
    {
        name: "Power",
        price: "60,000",
        color: "#22D3EE",
        icon: Zap,
        benefits: ["Exclusive VIP Dinner", "Lead Generation Access", "Brand Integrated Challenges", "Premium Placement"]
    }
];

const stats = [
    { label: "Developer Reach", value: "50,000+" },
    { label: "Impressions", value: "250K+" },
    { label: "Project Verticals", value: "7 Tracks" }
];

export default function Partners() {
    return (
        <section id="sponsors" className="py-24 px-6 relative overflow-hidden bg-surface/20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Partner Ecosystem</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-[64px] font-black mb-10 tracking-tighter text-foreground"
                    >
                        TRUSTED BY THE <span className="text-gradient">BEST</span>
                    </motion.h2>
                    <p className="text-soft-grey max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-16">
                        Join an elite group of organizations driving the future. Showcase your brand to India&apos;s most talented developers and innovators.
                    </p>

                    {/* Trust Builder Stats */}
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-black text-foreground mb-1 tracking-tight">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-soft-grey">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logo Wall with Enriched Styling */}
                <div className="space-y-24 mb-32 relative">
                    <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent blur-[100px] pointer-events-none" />
                    {Object.entries(sponsors).map(([key, tier], i) => (
                        <div key={key} className="relative z-10">
                            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 mb-12">{tier.name}</h3>
                            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                                {tier.items.map((item) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ y: -5, opacity: 1, scale: 1.05 }}
                                        className="w-40 md:w-56 aspect-[4/1] flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-all cursor-pointer bg-foreground/5 rounded-2xl border border-foreground/5 hover:border-primary/20 hover:bg-primary/5"
                                    >
                                        <div className="w-1/2 h-4 bg-foreground/10 rounded-full" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-center pt-8">
                        <p className="text-xs font-bold text-soft-grey uppercase tracking-widest italic opacity-50">
                            Partner logos arriving shortly...
                        </p>
                    </div>
                </div>

                {/* Sponsorship Tiers Grid */}
                <div className="text-center mb-16 relative z-10">
                    <h3 className="text-4xl font-black mb-4 tracking-tight text-foreground">Sponsorship Strategy</h3>
                    <p className="text-soft-grey font-medium text-lg">Pick a tier that matches your brand&apos;s vision and impact.</p>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className={cn(
                                "tech-card p-10 flex flex-col h-full group bg-surface shadow-premium-lg",
                                tier.featured ? 'border-primary ring-1 ring-primary/20' : ''
                            )}
                        >
                            {tier.tag && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl pointer-events-none">
                                    {tier.tag}
                                </div>
                            )}

                            <div className="mb-10 p-5 rounded-[20px] w-fit bg-primary/5 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <tier.icon size={32} style={{ color: tier.featured ? undefined : tier.color }} className={tier.featured ? 'text-primary group-hover:text-white' : ''} />
                            </div>

                            <div className="mb-10">
                                <h4 className="text-2xl font-black mb-2 tracking-tight text-foreground">{tier.name}</h4>
                                <div className="text-3xl font-black text-foreground tabular-nums">
                                    ₹{tier.price}<span className="text-sm text-soft-grey align-top ml-1 font-bold">+</span>
                                </div>
                            </div>

                            <ul className="space-y-5 mb-12 flex-1">
                                {tier.benefits.map((benefit, j) => (
                                    <li key={j} className="flex gap-4 text-xs text-soft-grey leading-relaxed font-medium">
                                        <Check size={16} className="text-primary shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="mailto:contact@gyaanganga.in?subject=Sponsorship Inquiry: Gyaan Ganga 2026"
                                className={cn(
                                    "w-full py-5 rounded-2xl text-center text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3",
                                    tier.featured
                                        ? "bg-primary text-white shadow-2xl shadow-primary/30 hover:bg-primary/90"
                                        : "bg-background border border-panel-border text-foreground hover:border-primary hover:text-primary"
                                )}
                            >
                                Inquire Now <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px section-divider" />
        </section>
    );
}
