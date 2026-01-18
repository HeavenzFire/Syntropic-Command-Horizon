
export enum DomainType {
  MEDICAL = 'Medical',
  AEROSPACE = 'Aerospace',
  FINTECH = 'FinTech',
  IIOT = 'Industrial IoT',
  AIML = 'AI/ML',
  RESEARCH = 'Research & Discovery'
}

export interface DomainStats {
  multiplier: number;
  phi: number;
  neaActive: boolean;
  entropyLeak: number;
  stateSpaceMapped: number; 
  bridgeContribution: number;
  fractalResonance: number;
}

export interface Domain {
  id: string;
  type: DomainType;
  description: string;
  leverage: string;
  stats: DomainStats;
}

export enum Phase {
  STABILIZATION = 1,
  ORCHESTRATION = 2,
  LEVERAGE = 3,
  REVEAL = 4,
  AMPLIFICATION = 5
}

export interface TripleTrackStatus {
  truthLocked: boolean;   // System A
  engineEfficiency: number; // System B
  oracleCoherence: number; // System C
}

export interface GridMetadata {
  coherence: number;
  bridgeActive: boolean;
  activeBridges: number;
  flowVolume: number;
  fractalSeed: number; // 144
  phiResonance: number;
  tripleTrack: TripleTrackStatus;
  constraintLevel: number; // 0.5 to 1.0 (Lower is higher compression)
}
