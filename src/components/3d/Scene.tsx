'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Float } from '@react-three/drei';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

function TechParticles({ isLight }: { isLight: boolean }) {
    return (
        <group>
            {Array.from({ length: 40 }).map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 10
                    ]}>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshStandardMaterial
                            color={isLight ? "#4F46E5" : "#6366F1"}
                            emissive={isLight ? "#4F46E5" : "#6366F1"}
                            emissiveIntensity={isLight ? 0.5 : 2}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

function FloatingShapes({ isLight }: { isLight: boolean }) {
    return (
        <>
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-5, 2, -5]}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color={isLight ? "#4F46E5" : "#6366F1"} wireframe opacity={isLight ? 0.2 : 0.5} transparent />
                </mesh>
            </Float>
            <Float speed={5} rotationIntensity={2} floatIntensity={3}>
                <mesh position={[5, -3, -2]}>
                    <torusGeometry args={[0.8, 0.2, 16, 32]} />
                    <meshStandardMaterial color={isLight ? "#0891B2" : "#22D3EE"} wireframe opacity={isLight ? 0.2 : 0.5} transparent />
                </mesh>
            </Float>
        </>
    );
}

export default function Scene() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 bg-background -z-10" />;

    const isLight = theme === 'light';

    return (
        <div className="fixed inset-0 -z-10 bg-background transition-colors duration-700 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-[0.2] dark:opacity-[0.05]" />
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={isLight ? 1 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={isLight ? 0.5 : 1} color="#6366F1" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22D3EE" />

                <TechParticles isLight={isLight} />
                <FloatingShapes isLight={isLight} />

                {!isLight && (
                    <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                )}

                <fog attach="fog" args={[isLight ? '#F9FAFB' : '#0B0E14', 10, 25]} />
            </Canvas>
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isLight ? 'to-[#F9FAFB]' : 'to-[#0B0E14]'}`} />
        </div>
    );
}
