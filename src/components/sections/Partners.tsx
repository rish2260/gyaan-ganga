'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Star, Shield, Trophy, Diamond } from 'lucide-react';
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
        benefits: ["Logo on Website", "Social Media Shoutout", "Certificate of Participation"]
    },
    {
        name: "Gold",
        price: "20,000",
        color: "#FBBF24",
        icon: Star,
        benefits: ["Everything in Silver", "Logo on Event T-shirts", "Brand Mention during Event"]
    },
    {
        name: "Platinum",
        price: "35,000",
        color: "#6366F1",
        icon: Diamond,
        featured: true,
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

export default function Partners() {
    return (
        <section id="sponsors" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Collaborate with us</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-foreground"
                    >
                        TRUSTED BY THE <span className="text-gradient">BEST</span>
                    </motion.h2>
                    <p className="text-soft-grey max-w-2xl mx-auto text-lg font-medium">
                        Join the ecosystem of visionary organizations fueling technological progress.
                    </p>
                </div>

                {/* Logo Wall */}
                <div className="space-y-20 mb-32">
                    {Object.entries(sponsors).map(([key, tier], i) => (
                        <div key={key}>
                            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 mb-10">{tier.name}</h3>
                            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                {tier.items.map((item) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ y: -5, opacity: 1 }}
                                        className="w-32 md:w-40 aspect-[3/1] flex items-center justify-center grayscale opacity-80 transition-all cursor-pointer"
                                    >
                                        <div className="w-full h-4 bg-foreground/10 rounded-full" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sponsorship Tiers */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-foreground">Sponsorship Tiers</h3>
                    <p className="text-soft-grey font-medium mb-12">Partner with us to empower the next generation of innovators.</p>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className={cn(
                                "glass-panel p-8 flex flex-col h-full tech-card",
                                tier.featured ? 'border-primary shadow-2xl shadow-primary/10' : ''
                            )}
                        >
                            <div className="mb-8 p-4 rounded-2xl w-fit" style={{ backgroundColor: tier.color + '15' }}>
                                <tier.icon size={28} style={{ color: tier.color }} />
                            </div>

                            <div className="mb-8">
                                <h4 className="text-xl font-black mb-2 tracking-tight text-foreground">{tier.name}</h4>
                                <div className="text-2xl font-black text-foreground">
                                    ₹{tier.price}<span className="text-xs text-soft-grey align-top ml-1">+</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.benefits.map((benefit, j) => (
                                    <li key={j} className="flex gap-3 text-[11px] text-soft-grey leading-snug font-medium">
                                        <Check size={14} className="text-primary shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="mailto:contact@gyaanganga.in"
                                className={cn(
                                    "w-full py-4 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                    tier.featured ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-surface border border-panel-border text-foreground hover:bg-surface"
                                )}
                            >
                                Get Started <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
