'use client';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Globe, Rocket, Award, Coffee, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const milestones = [
    { year: '2020', event: 'Initial_Commit: Started journey in web engineering.' },
    { year: '2022', event: 'Scale_Up: Transitioned to full-stack architecture & cloud systems.' },
    { year: '2024', event: 'Brand_Launch: PixProcoder established as a technical studio.' },
    { year: '2026', event: 'Next_Gen: Mastering React 19, Next.js 15, and high-performance runtimes.' }
  ];

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <Terminal size={14} />
                <span>~/system/identity</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                About <span className="text-primary font-mono italic">PixProcoder.</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg md:text-xl font-mono">
                // Decoding the mission, the engineer, and the architecture.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Bio Section */}
            <div className="lg:col-span-7 space-y-8">
              <div className="prose prose-invert max-w-none font-mono text-gray-400">
                <p className="text-lg leading-relaxed text-white">
                  PixProcoder is a high-performance technical studio founded by <span className="text-primary font-bold">MD Samsul Kobir</span>, a Senior Software Engineer dedicated to architecting scalable digital solutions.
                </p>
                <p>
                  Our mission is to bridge the gap between complex engineering and elegant user experiences. We don't just "build websites"; we engineer robust ecosystems using the modern JavaScript stack, prioritizing performance, type-safety, and maintainable architecture.
                </p>
                <p>
                  With years of experience in the React ecosystem and a deep passion for open-source contribution, PixProcoder serves as a hub for professional developers seeking premium tools, high-impact insights, and engineering excellence.
                </p>
              </div>

              {/* Milestones / Logs */}
              <div className="space-y-4 pt-8">
                <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-[0.2em]">System_Milestones</h3>
                <div className="space-y-3">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-primary/20 transition-colors group">
                      <span className="text-primary font-bold font-mono text-sm">{m.year}</span>
                      <span className="text-gray-400 font-mono text-sm group-hover:text-white transition-colors">{m.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visuals / Stats Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group">
                <Image
                  src="/profile.jpg"
                  alt="MD Samsul Kobir"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Engineer_Lead</span>
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-mono text-white">ACTIVE_V15</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Code size={16} />, label: 'Commits', value: '5K+' },
                  { icon: <Zap size={16} />, label: 'Efficiency', value: '99%' },
                  { icon: <Award size={16} />, label: 'Experience', value: '5Y+' },
                  { icon: <Globe size={16} />, label: 'Clients', value: '20+' }
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-white/5 bg-muted/5 space-y-2">
                    <div className="text-primary">{stat.icon}</div>
                    <div className="text-xl font-bold font-mono text-white">{stat.value}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values / Documentation style */}
          <div className="mt-20 p-8 md:p-12 rounded-[2rem] border border-primary/20 bg-primary/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Rocket size={120} />
             </div>
             <div className="max-w-2xl relative z-10 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">The_PixProcoder_Manifesto</h2>
                <div className="grid gap-6 text-sm md:text-base font-mono text-gray-400">
                   <div className="flex gap-4">
                      <span className="text-primary font-bold">01</span>
                      <span>Prioritize system scalability over short-term "hacks".</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-primary font-bold">02</span>
                      <span>Maintain 100% architectural transparency with clients and community.</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-primary font-bold">03</span>
                      <span>Continuous integration of the latest stable high-performance runtimes.</span>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
