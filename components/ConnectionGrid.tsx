
import React, { useMemo } from 'react';
import { Domain, DomainType } from '../types';
import { DOMAIN_METADATA } from '../constants';

const PHI = 1.61803398875;

interface ConnectionGridProps {
  domains: Domain[];
  activeDomain: DomainType | null;
  bridgeActive?: boolean;
  compressionActive?: boolean;
}

const ConnectionGrid: React.FC<ConnectionGridProps> = ({ domains, activeDomain, bridgeActive, compressionActive }) => {
  const spiralPath = useMemo(() => {
    let path = "M 400 400"; 
    const segments = 64; 
    const a = 1.2;
    const b = Math.log(PHI) / (Math.PI / 2);
    
    for (let i = 0; i < segments; i++) {
      const theta = i * (Math.PI / 8);
      const r = a * Math.exp(b * theta);
      const x = 400 + Math.cos(theta) * r;
      const y = 400 + Math.sin(theta) * r;
      path += ` L ${x} ${y}`;
    }
    return path;
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="glow-amber-ultra">
          <feGaussianBlur stdDeviation="12" result="blur12"/>
          <feGaussianBlur stdDeviation="4" result="blur4"/>
          <feMerge>
            <feMergeNode in="blur12"/>
            <feMergeNode in="blur4"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <linearGradient id="compression-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Grid Background */}
      <pattern id="lattice" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 60 M 0 0 L 60 60" fill="none" stroke="rgba(245, 158, 11, 0.03)" strokeWidth="0.5"/>
        <circle cx="30" cy="30" r="1.2" fill="rgba(6, 182, 212, 0.1)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#lattice)" />

      {/* Constraint Waves (Visualizing resource compression) */}
      {compressionActive && (
        <g className="animate-pulse">
           {[1, 2, 3, 4, 5].map(i => (
             <circle 
              key={i} 
              cx="400" cy="400" r={100 + i * 80} 
              fill="none" 
              stroke="rgba(245, 158, 11, 0.05)" 
              strokeWidth="4" 
              className="animate-ripple"
              style={{ animationDelay: `${i * 0.5}s` }}
             />
           ))}
        </g>
      )}

      {/* Golden Spiral Manifold */}
      {bridgeActive && (
        <g filter="url(#glow-amber-ultra)" className="transition-all duration-1000" opacity={compressionActive ? 0.8 : 0.4}>
          <path 
            d={spiralPath} 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth={compressionActive ? "4" : "2"} 
            className="animate-spiral-flow"
            style={{ transformOrigin: 'center' }}
          />
        </g>
      )}

      {/* Domain Connections */}
      <g>
        {domains.map((d, i) => {
          return domains.map((target, j) => {
            if (i >= j) return null;
            const angle1 = (i * 360 / domains.length) * (Math.PI / 180);
            const angle2 = (j * 360 / domains.length) * (Math.PI / 180);
            
            const x1 = 400 + Math.cos(angle1) * 280;
            const y1 = 400 + Math.sin(angle1) * 280;
            const x2 = 400 + Math.cos(angle2) * 280;
            const y2 = 400 + Math.sin(angle2) * 280;

            const isRelated = activeDomain === d.type || activeDomain === target.type;
            
            return (
              <path
                key={`link-${d.id}-${target.id}`}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                fill="none"
                stroke={isRelated ? "#f59e0b" : "rgba(255,255,255,0.03)"}
                strokeWidth={isRelated ? (compressionActive ? 3 : 2) : 0.5}
                strokeOpacity={isRelated ? 0.8 : 0.2}
                className="transition-all duration-700"
              />
            );
          });
        })}
      </g>

      <style>{`
        @keyframes ripple { from { transform: scale(0.5); opacity: 0.8; } to { transform: scale(1.5); opacity: 0; } }
        @keyframes spiral-flow { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
        .animate-ripple { animation: ripple 4s linear infinite; transform-origin: center; }
        .animate-spiral-flow { stroke-dasharray: 200; animation: spiral-flow 15s linear infinite; }
      `}</style>
    </svg>
  );
};

export default ConnectionGrid;
