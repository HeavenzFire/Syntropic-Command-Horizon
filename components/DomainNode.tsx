
import React from 'react';
import { Domain, DomainType } from '../types';
import { Share2, Zap, ShieldCheck, AlertCircle } from 'lucide-react';

interface DomainNodeProps {
  domain: Domain;
  isActive: boolean;
  isBridgeActive?: boolean;
  isMedicalFlagged?: boolean;
  metadata: {
    icon: React.ReactNode;
    color: string;
    accent: string;
  };
}

const DomainNode: React.FC<DomainNodeProps> = ({ domain, isActive, isBridgeActive, isMedicalFlagged, metadata }) => {
  return (
    <div className="group relative">
      {/* Fractal Resonance Rings */}
      {isActive && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border-2 border-amber-500/30 rounded-full animate-ping [animation-duration:3s]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 border border-cyan-500/10 rounded-full animate-ping [animation-duration:6s]" />
        </>
      )}

      {isMedicalFlagged && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-3 py-1 rounded-full text-[10px] font-bold shadow-2xl animate-bounce flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" />
          12 INVARIANTS LOCKED
        </div>
      )}

      {/* Main Node */}
      <div 
        className={`
          relative w-32 h-32 rounded-[2.5rem] flex items-center justify-center transition-all duration-1000
          ${isActive 
            ? 'scale-125 z-30 shadow-[0_0_80px_rgba(245,158,11,0.3)] rotate-[360deg]' 
            : 'hover:scale-110 grayscale-[0.2] hover:grayscale-0'
          }
        `}
      >
        {/* Glowing Fractal Core */}
        <div 
          className={`absolute inset-0 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-60 transition-opacity ${isActive ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: isMedicalFlagged ? '#06b6d4' : metadata.color }}
        />
        
        <div 
          className={`
            absolute inset-0 rounded-[2.5rem] border-4 transition-all duration-700
            ${isActive ? 'border-amber-400 bg-slate-900/90' : 'border-white/10 bg-slate-950/80 group-hover:border-amber-500/40'}
            backdrop-blur-3xl
          `}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`transition-all duration-700 ${isActive ? 'text-amber-400 scale-125' : 'text-slate-400 group-hover:text-amber-200'}`}>
            {metadata.icon}
          </div>
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase font-mono text-white/90">{domain.type.split(' ')[0]}</span>
        </div>

        {/* 144 / Phi Badge */}
        <div className="absolute -top-3 -right-3 flex flex-col items-center gap-2">
          <div className={`w-8 h-8 rounded-full border-4 border-[#010206] ${domain.stats.neaActive ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)]' : 'bg-slate-800'} flex items-center justify-center`}>
            {isActive ? <Lock className="w-4 h-4 text-white" /> : <Zap className="w-4 h-4 text-white" />}
          </div>
        </div>
      </div>

      {/* Tooltip Label */}
      <div className={`absolute top-full mt-8 left-1/2 -translate-x-1/2 px-6 py-4 bg-[#080c26] border-2 border-amber-500/30 rounded-2xl text-[11px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-40 shadow-[0_30px_60px_rgba(0,0,0,0.8)] ${isActive ? 'opacity-100 translate-y-4' : 'translate-y-0'}`}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-6">
            <span className="text-amber-500 font-bold uppercase tracking-widest">Resonance</span> 
            <span className="font-bold text-xl">{domain.stats.fractalResonance}Hz</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-cyan-400 font-bold uppercase tracking-widest">Invariants</span> 
            <span className="font-bold text-xl">LOCKED</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-1">
             <div className="h-full bg-gradient-to-r from-amber-500 to-cyan-500 animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainNode;
