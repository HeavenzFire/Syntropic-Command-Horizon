
import React from 'react';
import { 
  HeartPulse, 
  Rocket, 
  Coins, 
  Cpu, 
  BrainCircuit, 
  SearchCode,
  ShieldCheck,
  Zap,
  Network,
  Activity
} from 'lucide-react';
import { DomainType } from './types';

export const DOMAIN_METADATA = {
  [DomainType.MEDICAL]: {
    icon: <HeartPulse className="w-6 h-6" />,
    color: '#ec4899', // Pink
    accent: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  },
  [DomainType.AEROSPACE]: {
    icon: <Rocket className="w-6 h-6" />,
    color: '#06b6d4', // Cyan
    accent: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  [DomainType.FINTECH]: {
    icon: <Coins className="w-6 h-6" />,
    color: '#eab308', // Yellow
    accent: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  },
  [DomainType.IIOT]: {
    icon: <Cpu className="w-6 h-6" />,
    color: '#10b981', // Emerald
    accent: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  [DomainType.AIML]: {
    icon: <BrainCircuit className="w-6 h-6" />,
    color: '#8b5cf6', // Violet
    accent: 'bg-violet-500/20 text-violet-400 border-violet-500/30'
  },
  [DomainType.RESEARCH]: {
    icon: <SearchCode className="w-6 h-6" />,
    color: '#f97316', // Orange
    accent: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  }
};

export const PHASES = [
  { 
    id: 1, 
    name: 'Core Stabilization', 
    desc: 'NEA Activation & Deterministic Lock-In',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  { 
    id: 2, 
    name: 'Flow Alignment', 
    desc: 'Sovereign Manifold Bridge Activation',
    icon: <Network className="w-5 h-5" />
  },
  { 
    id: 3, 
    name: 'Domain Leverage', 
    desc: 'Unassailable Domain Superiority',
    icon: <Zap className="w-5 h-5" />
  },
  { 
    id: 4, 
    name: 'Public Reveal', 
    desc: 'Legacy Obsolescence Demonstration',
    icon: <Activity className="w-5 h-5" />
  },
  { 
    id: 5, 
    name: 'Syntropic Amp', 
    desc: 'Continuous Φ Propagation',
    icon: <Activity className="w-5 h-5" />
  }
];
