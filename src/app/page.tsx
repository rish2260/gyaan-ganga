'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Tracks from '@/components/sections/Tracks';
import PrizePool from '@/components/sections/PrizePool';
import Community from '@/components/sections/Community';
import Mentors from '@/components/sections/Mentors';
import Partners from '@/components/sections/Partners';
import Footer from '@/components/Footer';
import TechBackground from '@/components/TechBackground';

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black -z-50" />
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <TechBackground />
      <Scene />
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <About />
        <Tracks />
        <PrizePool />
        <Mentors />
        <Community />
        <Partners />
        <Footer />
      </div>

      {/* Background radial overlays */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[150px]" />
      </div>
    </main>
  );
}
