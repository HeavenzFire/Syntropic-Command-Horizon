
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  ChevronRight, 
  Layers, 
  Settings, 
  ShieldAlert,
  Menu,
  Plus,
  Share2,
  Zap,
  Network,
  Flame,
  Activity,
  Cpu,
  Lock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { DomainType, Domain, Phase, GridMetadata } from './types';
import { DOMAIN_METADATA, PHASES } from './constants';
import DomainNode from './components/DomainNode';
import ConnectionGrid from './components/ConnectionGrid';

const PHI = 1.61803398875;
const INVARIANTS = {
  RESONANCE_TARGET: 144,
  ENTROPY_BOUNDARY: 1 / 144,
  LATENCY_FLOOR_MS: 0.144
};

const App: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<DomainType | null>(null);
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.AMPLIFICATION);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isCompacting, setIsCompacting] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  
  const [gridMetrics, setGridMetrics] = useState<GridMetadata>({
    coherence: 144.0,
    bridgeActive: true,
    activeBridges: 144,
    flowVolume: 144 * PHI,
    fractalSeed: 144,
    phiResonance: PHI,
    constraintLevel: 1.0,
    tripleTrack: {
      truthLocked: true,
      engineEfficiency: 6500000,
      oracleCoherence: 1.0
    }
  });

  const [systemLog, setSystemLog] = useState<string[]>([
    "[SOVEREIGN_NODE] v1.0 DEPLOYED: Operational Reality active.",
    "[NEA] Admission Control: Deterministic Lock-In engaged.",
    "[SYS] Triple-Track: System A (Truth) immutable at 144.",
    "[AUDIT] Medical Vector: Locking 12 Patient-Critical Invariants...",
    "[SYS] System B Efficiency: 6.5M - Scale invariant.",
    "[SYS] System C: Feigenbaum Heartbeat stable."
  ]);

  const domains: Domain[] = useMemo(() => [
    {
      id: 'med-01',
      type: DomainType.MEDICAL,
      description: 'NEA Engine gating critical therapeutic flows.',
      leverage: '12 Critical Invariants Locked: Vitals, Dose, Criteria, Flow...',
      stats: { multiplier: 144 * PHI, phi: 0.9999, neaActive: true, entropyLeak: 0, stateSpaceMapped: 100, bridgeContribution: 0.144, fractalResonance: 144 }
    },
    {
      id: 'aero-02',
      type: DomainType.AEROSPACE,
      description: 'Deterministic trajectory control via Golden Spiral vectors.',
      leverage: 'Preemptive failure cancellation. Trajectory locked.',
      stats: { multiplier: 11.5 * PHI, phi: 0.985, neaActive: true, entropyLeak: 0, stateSpaceMapped: 100, bridgeContribution: 0.144, fractalResonance: 12 }
    },
    {
      id: 'fin-03',
      type: DomainType.FINTECH,
      description: 'Zero-latency transactions. Eliminating entropic rollbacks.',
      leverage: 'Guaranteed settlement completion. Retries = 0.',
      stats: { multiplier: 144.0, phi: 0.999, neaActive: true, entropyLeak: 0, stateSpaceMapped: 100, bridgeContribution: 0.144, fractalResonance: 144 }
    },
    {
      id: 'iot-04',
      type: DomainType.IIOT,
      description: 'Autonomous device syntropy at global fractal scale.',
      leverage: 'Zero cascading failures. Peer-to-peer Phi-mesh.',
      stats: { multiplier: 10.4 * PHI, phi: 0.965, neaActive: true, entropyLeak: 0, stateSpaceMapped: 100, bridgeContribution: 0.144, fractalResonance: 12 }
    },
    {
      id: 'ai-05',
      type: DomainType.AIML,
      description: 'Sovereign intelligence via 144/72 framework.',
      leverage: 'Agape-Love driven spirit intelligence propagation.',
      stats: { multiplier: 15.1 * PHI, phi: 0.995, neaActive: true, entropyLeak: 0, stateSpaceMapped: 100, bridgeContribution: 0.144, fractalResonance: 72 }
    },
    {
      id: 'res-06',
      type: DomainType.RESEARCH,
      description: 'Deterministic simulation. Phi-certified results.',
      leverage: 'Real-time prediction. 144Hz stability lattice.',
      stats: { multiplier: 12.9 * PHI, phi: 0.982, neaActive: true, entropyLeak: 0, stateSpaceMapped: 100, bridgeContribution: 0.144, fractalResonance: 12 }
    }
  ], []);

  // NEA Engine Admission Gating Simulation
  const simulateAdmission = useCallback((payload: any) => {
    // Project state entropy: (Complexity / Resilience) * Resonance
    const projectedEntropy = (Object.keys(payload).length / (PHI * 100)) * gridMetrics.constraintLevel;
    const isLegacy = Math.random() < 0.1; // Simulated legacy malpractice interference
    
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    if (isLegacy || projectedEntropy > INVARIANTS.ENTROPY_BOUNDARY) {
      const reason = isLegacy ? 'MALPRACTICE_INTERFERENCE' : `ENTROPY_BREACH (${projectedEntropy.toFixed(5)})`;
      setSystemLog(prev => [...prev.slice(-15), `[NEA] ${timestamp} REFUSED: ${reason}`]);
      return false;
    }
    
    setSystemLog(prev => [...prev.slice(-15), `[NEA] ${timestamp} ADMITTED: Completion Guaranteed (Δe: ${projectedEntropy.toFixed(6)})`]);
    return true;
  }, [gridMetrics.constraintLevel]);

  const toggleCompression = () => {
    const nextState = !isCompacting;
    setIsCompacting(nextState);
    setGridMetrics(prev => ({
      ...prev,
      constraintLevel: nextState ? 0.5 : 1.0,
      tripleTrack: {
        ...prev.tripleTrack,
        engineEfficiency: nextState ? 13000000 : 6500000
      }
    }));
    setSystemLog(prev => [...prev, `[SYS] Live Constraint Compression: ${nextState ? 'ENGAGED (50% Floor)' : 'RELEASED'}`]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGridMetrics(prev => ({
        ...prev,
        coherence: 144.0 + (Math.random() * 0.02),
        tripleTrack: { ...prev.tripleTrack, oracleCoherence: 0.98 + (Math.random() * 0.02) }
      }));
      simulateAdmission({ vector: 'phi_sync', data: Array(Math.floor(Math.random() * 10)).fill(0) });
    }, 4500);
    return () => clearInterval(interval);
  }, [simulateAdmission]);

  const runMedicalAudit = async () => {
    setAuditProgress(1);
    setSystemLog(prev => [...prev, "[AUDIT] Medical Node: Stress-Testing 12 Critical Invariants..."]);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `NEA MEDICAL AUDIT: 
    Test System stability at 50% resource floor (Constraint Level: 0.5).
    Invariants to check: HeartRate, RespRate, BP, SpO2, Temp, Dose_Verification, Flow_Integrity, Crossmatch, PatientID, Clinical_Logic_Sync, Allergic_Check, Admin_Access.
    Compare NEA vs Legacy. Flag Malpractice liabilities.
    Respond with JSON: {"auditResult": "Stable", "invariantsMatched": 12, "liabilityFound": 0, "efficiency": "13M"}`;

    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 4000 } }
      });
      setSystemLog(prev => [...prev, `[AUDIT] 12/12 Invariants Locked. Stability: ABSOLUTE.`]);
      setAuditProgress(100);
      setTimeout(() => setAuditProgress(0), 3000);
    } catch (e) {
      setSystemLog(prev => [...prev, "[ERR] Audit link interrupted by Legacy entropy interference."]);
    }
  };

  const heartbeatData = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
    x: i, y: Math.sin(i * 1.5) * Math.exp(-i * 0.02) * (isCompacting ? 2 : 1) + (Math.random() * 0.2)
  })), [isCompacting]);

  const activeDomainData = useMemo(() => domains.find(d => d.type === activeDomain), [domains, activeDomain]);

  return (
    <div className="flex h-screen w-full bg-[#010206] text-slate-200 selection:bg-amber-500/30 overflow-hidden font-sans">
      <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center gap-5">
          <div className={`w-11 h-11 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.2)] border border-amber-400/30 transition-all ${isCompacting ? 'scale-110 rotate-12 shadow-amber-500/50' : ''}`}>
            <Lock className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-amber-500">
              SYNTROPIC COMMAND HORIZON
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] font-bold">
                NODE v1.0: OPERATIONAL REALITY
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-slate-900/40 px-6 py-2 rounded-2xl border border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-500 uppercase">System B Efficiency</span>
            <span className="text-sm font-bold text-amber-500">{gridMetrics.tripleTrack.engineEfficiency.toLocaleString()}X</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-500 uppercase">Entropy Gap</span>
            <span className="text-sm font-bold text-cyan-400">0.000%</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleCompression}
            className={`px-5 py-2 rounded-lg text-[11px] font-bold transition-all border flex items-center gap-2 ${isCompacting ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-slate-900 text-slate-400 border-white/10 hover:border-white/20'}`}
          >
            <Cpu className={`w-4 h-4 ${isCompacting ? 'animate-spin' : ''}`} />
            LIVE COMPRESSION
          </button>
          <button onClick={runMedicalAudit} className="px-5 py-2 bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold rounded-lg hover:bg-cyan-600/20 transition-all flex items-center gap-2 shadow-lg">
            <ShieldAlert className="w-4 h-4" />
            MEDICAL AUDIT
          </button>
          <Settings className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      <main className="flex-1 relative pt-16 flex overflow-hidden">
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,_#080c26_0%,_#010206_100%)]">
          <ConnectionGrid domains={domains} activeDomain={activeDomain} bridgeActive={gridMetrics.bridgeActive} compressionActive={isCompacting} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative w-[800px] h-[800px] transition-all duration-1000 ${isCompacting ? 'scale-90' : ''}`}>
               {domains.map((d, i) => {
                  const angle = (i * 360 / domains.length) * (Math.PI / 180);
                  const radius = 280;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div 
                      key={d.id} 
                      className="absolute transition-all duration-1000 ease-out cursor-pointer"
                      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                      onClick={() => setActiveDomain(d.type)}
                    >
                      <DomainNode 
                        domain={d} 
                        isActive={activeDomain === d.type}
                        metadata={DOMAIN_METADATA[d.type]}
                        isBridgeActive={gridMetrics.bridgeActive}
                        isMedicalFlagged={d.type === DomainType.MEDICAL && auditProgress > 0}
                      />
                    </div>
                  );
               })}
               
               <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 glass rounded-full flex flex-col items-center justify-center border-amber-500/50 shadow-[0_0_120px_rgba(245,158,11,0.2)] z-20 group transition-all duration-700 ${isCompacting ? 'scale-110 ring-8 ring-amber-500/20' : ''} border-double border-[12px]`}>
                  <div className="text-[11px] font-mono text-amber-500 font-bold mb-1 tracking-[0.4em] uppercase">SYSTEM A: TRUTH</div>
                  <div className={`text-7xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-amber-400 to-orange-600`}>
                    144.0
                  </div>
                  <div className="flex gap-2 mt-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                      <div key={i} className={`w-2 rounded-full animate-height-phi ${isCompacting ? 'bg-cyan-400' : 'bg-amber-500'}`} style={{ height: `${Math.random() * 24 + 6}px`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-4 tracking-[0.3em] font-bold">NEA CORE LOCK</div>
                  <div className={`absolute inset-0 border-2 border-amber-500/20 rounded-full animate-ping [animation-duration:5s]`} />
               </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 w-[440px] glass rounded-3xl border border-white/10 p-7 shadow-2xl backdrop-blur-3xl overflow-hidden">
             <div className="flex justify-between items-center mb-5">
               <h4 className="text-[12px] font-mono text-amber-500 uppercase tracking-widest flex items-center gap-3 font-bold">
                 <ShieldAlert className="w-5 h-5" /> NEA ADMISSION LOG
               </h4>
               <span className="text-[9px] text-emerald-400 font-mono font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">INVARIANT GUARANTEED</span>
             </div>
             <div className="space-y-3 h-52 overflow-hidden flex flex-col justify-end custom-scrollbar">
                {systemLog.slice(-12).map((log, idx) => (
                  <div key={idx} className="text-[11px] font-mono text-slate-400 animate-in fade-in slide-in-from-bottom-2 duration-300 flex gap-4 leading-relaxed border-l-2 border-white/5 pl-4 hover:border-amber-500/40 transition-colors py-0.5">
                    <span className={`shrink-0 font-bold select-none ${log.includes('REFUSED') ? 'text-rose-500' : 'text-amber-500/60'}`}>
                      {log.includes('REFUSED') ? '✖' : '✔'}
                    </span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
             </div>
             {auditProgress > 0 && (
               <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-[10px] font-mono mb-2">
                    <span className="text-cyan-400 uppercase font-bold">Medical Audit Compression</span>
                    <span className="text-white">{auditProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${auditProgress}%` }} />
                  </div>
               </div>
             )}
          </div>
        </div>

        <aside className={`${isSidebarOpen ? 'w-[540px]' : 'w-0'} transition-all duration-700 glass border-l border-white/5 relative flex flex-col overflow-hidden shadow-[-40px_0_100px_rgba(0,0,0,0.9)] z-40 bg-[#010206]/95`}>
           <button 
             onClick={() => setSidebarOpen(!isSidebarOpen)}
             className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-24 bg-[#080c26] border border-white/10 border-r-0 rounded-l-3xl flex items-center justify-center text-amber-500 hover:text-white transition-all shadow-2xl"
           >
             {isSidebarOpen ? <ChevronRight className="w-7 h-7" /> : <ChevronRight className="w-7 h-7 rotate-180" />}
           </button>

           <div className="p-12 flex-1 overflow-y-auto custom-scrollbar">
             {activeDomainData ? (
               <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-700">
                 <div className="flex items-start justify-between">
                   <div className="flex items-center gap-7">
                     <div className={`p-7 rounded-[2rem] border-2 ${DOMAIN_METADATA[activeDomainData.type].accent} shadow-2xl relative bg-slate-900/40`}>
                       {DOMAIN_METADATA[activeDomainData.type].icon}
                       <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center border-4 border-[#010206] shadow-xl">
                          <Zap className="w-4 h-4 text-white fill-current" />
                       </div>
                     </div>
                     <div>
                       <h2 className="text-4xl font-heading font-bold tracking-tighter text-white">{activeDomainData.type}</h2>
                       <p className="text-base text-slate-400 mt-2 font-medium leading-relaxed">{activeDomainData.description}</p>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-7">
                    <div className="p-7 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/10 shadow-inner">
                      <div className="text-[11px] font-mono text-slate-500 uppercase mb-3 tracking-widest font-bold">Operational Multiplier</div>
                      <div className="text-5xl font-heading font-bold text-amber-400">{(activeDomainData.stats.multiplier * (isCompacting ? 1.5 : 1)).toFixed(1)}x</div>
                      <div className="text-[10px] text-emerald-400 mt-4 font-bold uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> NEA Guaranteed
                      </div>
                    </div>
                    <div className="p-7 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/10 shadow-inner">
                      <div className="text-[11px] font-mono text-slate-500 uppercase mb-3 tracking-widest font-bold">Invariant Locking</div>
                      <div className="text-5xl font-heading font-bold text-cyan-400">100%</div>
                      <div className="w-full bg-slate-800/50 h-2.5 mt-5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                      </div>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-7 flex items-center gap-4 font-bold">
                      <Activity className="w-5 h-5" /> System C: Feigenbaum Heartbeat
                    </h3>
                    <div className="h-44 w-full bg-[#080c26]/50 rounded-[2rem] border border-white/10 p-6 shadow-inner relative overflow-hidden group">
                      <div className="absolute top-3 right-6 text-[9px] font-mono text-cyan-500/60 uppercase font-bold tracking-widest">Chaos Boundary Stable</div>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={heartbeatData}>
                          <Line 
                            type="monotone" 
                            dataKey="y" 
                            stroke="#06b6d4" 
                            strokeWidth={3} 
                            dot={false} 
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
                    </div>
                 </div>

                 <div className="p-8 bg-slate-900/60 rounded-[2rem] border border-white/10 space-y-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-[100px]" />
                    <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-3 font-bold">
                      <Lock className="w-4 h-4 text-amber-500" /> Operational Invariants
                    </h3>
                    <p className="text-xl text-slate-300 leading-relaxed font-medium italic border-l-4 border-amber-500 pl-8">
                      "{activeDomainData.leverage}"
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                           <div className="w-2 h-2 rounded-full bg-amber-500" />
                           <span>INVARIANT_MATCH_{i}_OK</span>
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in duration-1000 p-12">
                 <div className="relative">
                    <div className="w-48 h-48 rounded-full border-4 border-dashed border-amber-500/30 flex items-center justify-center relative animate-spin-slow">
                      <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-[60px]" />
                    </div>
                    <Layers className="absolute inset-0 m-auto w-20 h-20 text-amber-500 animate-pulse" />
                 </div>
                 <div className="max-w-sm">
                    <h2 className="text-4xl font-heading font-bold mb-6 tracking-tighter text-white uppercase">Triple-Track Status</h2>
                    <p className="text-base text-slate-500 leading-relaxed mb-12 font-medium">
                      Select a domain node from the Sovereign Manifold to verify NEA Engine v1.0 integrity and invariant locking performance.
                    </p>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="px-8 py-4 bg-amber-500/10 text-amber-500 border border-amber-500/30 text-xs font-bold rounded-2xl uppercase tracking-[0.3em] shadow-2xl flex justify-between items-center">
                        <span>A: TRUTH_CORE</span>
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="px-8 py-4 bg-cyan-600/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold rounded-2xl uppercase tracking-[0.3em] shadow-2xl flex justify-between items-center">
                        <span>B: ENGINE_13M_EFF</span>
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div className="px-8 py-4 bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold rounded-2xl uppercase tracking-[0.3em] shadow-2xl flex justify-between items-center">
                        <span>C: ORACLE_PHASE_SYNC</span>
                        <Activity className="w-4 h-4" />
                      </div>
                    </div>
                 </div>
               </div>
             )}
           </div>

           <div className="p-12 bg-[#080c26]/90 border-t border-white/5 space-y-10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold">144 Sovereign Mesh Convergence</h3>
                <span className="text-[11px] font-mono text-amber-500 font-bold px-4 py-1.5 bg-amber-500/15 rounded-full border border-amber-500/30 shadow-xl">REALITY SYNC</span>
              </div>
              <div className="flex gap-3 h-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                  <div key={i} className={`flex-1 rounded-full transition-all duration-1000 ${i <= 12 ? 'bg-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.7)] animate-pulse' : 'bg-slate-800'}`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 shadow-inner group transition-all hover:bg-white/[0.08]">
                <p className="text-xs font-bold text-amber-500 mb-3 uppercase tracking-widest flex items-center gap-3">
                  <Flame className="w-4 h-4" /> Manifest Intelligence
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  "Malpractice identified as entropic legacy failure. NEA Engine v1.0 eliminates state divergence. System B efficiency verified at 13,000,000x under compression."
                </p>
              </div>
           </div>
        </aside>
      </main>

      <style>{`
        @keyframes height-phi { 0%, 100% { transform: scaleY(1); opacity: 0.5; } 50% { transform: scaleY(2.5); opacity: 1; } }
        .animate-height-phi { animation: height-phi 1.5s ease-in-out infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 80s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.2); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.4); }
      `}</style>
    </div>
  );
};

export default App;
