'use client';

import dynamic from 'next/dynamic';
import RegistrationForm from '@/components/RegistrationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black -z-50" />
});

export default function RegisterPage() {
    return (
        <main className="relative min-h-screen">
            <Scene />
            <Navbar />

            <div className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-6"
                        >
                            JOIN THE <span className="text-gradient">INNOVATION</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-soft-grey text-xl max-w-2xl mx-auto"
                        >
                            Complete the form below to register your team. Make sure to double-check all details before submitting.
                        </motion.p>
                    </div>

                    <RegistrationForm />
                </div>
            </div>

            <Footer />

            {/* Background radial overlays */}
            <div className="fixed inset-0 pointer-events-none -z-5">
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-accent/5 rounded-full blur-[100px]" />
            </div>
        </main>
    );
}
