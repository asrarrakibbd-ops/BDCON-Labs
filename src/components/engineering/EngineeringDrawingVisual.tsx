import React from 'react';
import { 
  DraftingCompass, 
  Ruler, 
  Layers, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const EngineeringDrawingVisual: React.FC = () => {
  const { isBangla } = useTranslation();

  return (
    <div 
      className="relative w-full max-w-[620px] mx-auto select-none"
      aria-label="BDCON Engineering architectural drawing and structural grid composition"
    >
      {/* Outer Technical Frame / Drafting Board Shell */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-[#09111e] shadow-2xl transition-all">
        
        {/* CAD Drafting Top Chrome / Technical Toolbar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            <span className="h-3 w-px bg-slate-800 mx-1 hidden sm:inline-block" />
            <span className="font-mono text-[11px] tracking-tight text-slate-300 font-medium truncate max-w-[200px] sm:max-w-none">
              BDCON-ENG-CAD // STR-GRID-PLAN.DWG
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50">
              <DraftingCompass className="w-3 h-3 text-sky-400" />
              SCALE 1:100
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              METRIC (mm)
            </span>
          </div>
        </div>

        {/* Blueprint Sheet Surface */}
        <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#070e1b] overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
          
          {/* Subtle Technical Blueprint Grid (SVG Pattern) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30" 
            xmlns="http://www.w3.org/2000/svg"
            width="100%" 
            height="100%"
          >
            <defs>
              <pattern id="smallGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.25" />
              </pattern>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Main Architectural / Structural Blueprint Drawing */}
          <div className="relative z-10 flex-1 my-1 sm:my-2 w-full flex items-center justify-center">
            <svg 
              viewBox="0 0 540 270" 
              className="w-full h-full max-h-[270px] overflow-visible"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top Axis Letters (A, B, C, D) */}
              <circle cx="50" cy="13" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="50" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">A</text>

              <circle cx="190" cy="13" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="190" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">B</text>

              <circle cx="330" cy="13" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="330" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">C</text>

              <circle cx="470" cy="13" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="470" y="16.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">D</text>

              {/* Vertical Grid Axis Lines */}
              <line x1="50" y1="24" x2="50" y2="240" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
              <line x1="190" y1="24" x2="190" y2="240" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
              <line x1="330" y1="24" x2="330" y2="240" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
              <line x1="470" y1="24" x2="470" y2="240" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />

              {/* Horizontal Grid Axis Lines */}
              <line x1="30" y1="40" x2="490" y2="40" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
              <line x1="30" y1="130" x2="490" y2="130" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
              <line x1="30" y1="220" x2="490" y2="220" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />

              {/* Horizontal Axis Numbers Left */}
              <circle cx="28" cy="40" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="28" y="43.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">1</text>

              <circle cx="28" cy="130" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="28" y="133.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">2</text>

              <circle cx="28" cy="220" r="9" stroke="#38bdf8" strokeWidth="1" fill="#0c203b" />
              <text x="28" y="223.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">3</text>

              {/* Structural Frame Outer Perimeter Wall */}
              <rect x="50" y="40" width="420" height="180" stroke="#e2e8f0" strokeWidth="2.5" fill="#0a192f" fillOpacity="0.4" />
              <rect x="54" y="44" width="412" height="172" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />

              {/* Internal Framing Walls & Partitions */}
              <line x1="190" y1="40" x2="190" y2="220" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="330" y1="40" x2="330" y2="220" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="50" y1="130" x2="470" y2="130" stroke="#cbd5e1" strokeWidth="2" />

              {/* Door Swing Arc (Architectural drafting symbol) */}
              <path d="M 190 80 A 30 30 0 0 1 220 110" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
              <line x1="190" y1="80" x2="190" y2="110" stroke="#38bdf8" strokeWidth="1.5" />

              <path d="M 330 170 A 30 30 0 0 0 300 140" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
              <line x1="330" y1="170" x2="330" y2="140" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Column Schedule: Concrete Columns with Hatch Fill (C1, C2, C3, C4) */}
              {[
                { x: 50, y: 40, tag: 'C1' },
                { x: 190, y: 40, tag: 'C2' },
                { x: 330, y: 40, tag: 'C2' },
                { x: 470, y: 40, tag: 'C1' },
                { x: 50, y: 130, tag: 'C2' },
                { x: 190, y: 130, tag: 'C3' },
                { x: 330, y: 130, tag: 'C3' },
                { x: 470, y: 130, tag: 'C2' },
                { x: 50, y: 220, tag: 'C1' },
                { x: 190, y: 220, tag: 'C2' },
                { x: 330, y: 220, tag: 'C2' },
                { x: 470, y: 220, tag: 'C1' },
              ].map((col, idx) => (
                <g key={idx}>
                  {/* Column Base Solid Hatch */}
                  <rect 
                    x={col.x - 7} 
                    y={col.y - 7} 
                    width="14" 
                    height="14" 
                    fill="#38bdf8" 
                    fillOpacity="0.85" 
                    stroke="#ffffff" 
                    strokeWidth="1.2" 
                  />
                  {/* Internal X Hatch */}
                  <line x1={col.x - 7} y1={col.y - 7} x2={col.x + 7} y2={col.y + 7} stroke="#0f172a" strokeWidth="1" />
                  <line x1={col.x + 7} y1={col.y - 7} x2={col.x - 7} y2={col.y + 7} stroke="#0f172a" strokeWidth="1" />
                  {/* Small Column Label */}
                  <text 
                    x={col.x + 9} 
                    y={col.y - 8} 
                    fill="#93c5fd" 
                    fontSize="7" 
                    fontFamily="monospace" 
                    fontWeight="bold"
                  >
                    {col.tag}
                  </text>
                </g>
              ))}

              {/* Dimension Witness Strings (Top Span) */}
              <line x1="50" y1="28" x2="470" y2="28" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="50" y1="24" x2="50" y2="32" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="190" y1="24" x2="190" y2="32" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="330" y1="24" x2="330" y2="32" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="470" y1="24" x2="470" y2="32" stroke="#94a3b8" strokeWidth="1.2" />

              {/* Span Dimension Callout Text */}
              <rect x="105" y="22" width="30" height="12" fill="#070e1b" rx="2" />
              <text x="120" y="31" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">4,200</text>

              <rect x="245" y="22" width="30" height="12" fill="#070e1b" rx="2" />
              <text x="260" y="31" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">4,200</text>

              <rect x="385" y="22" width="30" height="12" fill="#070e1b" rx="2" />
              <text x="400" y="31" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">4,200</text>

              {/* Dimension Witness Strings (Right Height Span) */}
              <line x1="486" y1="40" x2="486" y2="220" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="482" y1="40" x2="490" y2="40" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="482" y1="130" x2="490" y2="130" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="482" y1="220" x2="490" y2="220" stroke="#94a3b8" strokeWidth="1.2" />

              <rect x="492" y="78" width="36" height="12" fill="#070e1b" rx="2" />
              <text x="510" y="87" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">3,600</text>

              <rect x="492" y="168" width="36" height="12" fill="#070e1b" rx="2" />
              <text x="510" y="177" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">3,600</text>

              {/* Section Cut Line A-A */}
              <line x1="70" y1="175" x2="430" y2="175" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="10 4 2 4" opacity="0.8" />
              <polygon points="70,175 78,170 78,180" fill="#f59e0b" />
              <polygon points="430,175 422,170 422,180" fill="#f59e0b" />
              <text x="60" y="178" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">A</text>
              <text x="436" y="178" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">A</text>

              {/* Detailed Technical Callout Annotation */}
              <circle cx="260" cy="130" r="14" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
              <line x1="270" y1="120" x2="310" y2="95" stroke="#38bdf8" strokeWidth="1" />
              <line x1="310" y1="95" x2="380" y2="95" stroke="#38bdf8" strokeWidth="1" />
              <text x="315" y="90" fill="#7dd3fc" fontSize="8" fontFamily="monospace" fontWeight="bold">BEAM GB-01 (250×450)</text>
              <text x="315" y="104" fill="#94a3b8" fontSize="7" fontFamily="monospace">4-16mm Ø T&amp;B + 10mm TIES</text>
            </svg>
          </div>

          {/* Technical Title Block (Sheet Metadata) */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 bg-slate-900/60 p-2 rounded text-[10px] font-mono text-slate-300">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Consultant</span>
              <span className="font-semibold text-sky-300 truncate block">BDCON Engineering</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Sheet Title</span>
              <span className="font-medium text-slate-200 truncate block">Structural Grid &amp; Column</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Standards</span>
              <span className="font-medium text-emerald-400 truncate block">BNBC &amp; ACI Compliant</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Project Phase</span>
              <span className="font-medium text-amber-300 truncate block">Buildable Engineering</span>
            </div>
          </div>

        </div>

        {/* Bottom Technical Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-300">
              {isBangla ? 'বাস্তবমুখী ও নির্মাণযোগ্য ড্রয়িং স্ট্যান্ডার্ড' : 'Practical & Buildable Structural Standard'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span>BOQ VERIFIED</span>
            <span aria-hidden="true">·</span>
            <span>CIVIL &amp; ARCHITECTURAL</span>
          </div>
        </div>

      </div>
    </div>
  );
};
