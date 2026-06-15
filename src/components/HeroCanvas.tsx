"use client";

// Node positions as % of viewport (deterministic, looks good at all sizes)
const NODES = [
  { x: 6,  y: 18 }, { x: 14, y: 72 }, { x: 22, y: 38 },
  { x: 30, y: 85 }, { x: 36, y: 12 }, { x: 44, y: 58 },
  { x: 50, y: 28 }, { x: 56, y: 78 }, { x: 63, y: 44 },
  { x: 70, y: 14 }, { x: 76, y: 68 }, { x: 82, y: 32 },
  { x: 88, y: 54 }, { x: 93, y: 82 }, { x: 18, y: 52 },
  { x: 39, y: 42 }, { x: 60, y: 62 }, { x: 85, y: 22 },
  { x: 47, y: 88 }, { x: 96, y: 38 }, { x: 10, y: 35 },
  { x: 72, y: 90 },
];

// Compute edges: connect nodes closer than 28 units (% distance)
const EDGES: [number, number][] = [];
const THRESHOLD = 28;
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const dx = NODES[i].x - NODES[j].x;
    const dy = NODES[i].y - NODES[j].y;
    if (Math.sqrt(dx * dx + dy * dy) < THRESHOLD) {
      EDGES.push([i, j]);
    }
  }
}

// Animation delays spread across nodes
const animDelay = (i: number) => `${(i * 0.37).toFixed(2)}s`;
const edgeDelay = (i: number) => `${(i * 0.25).toFixed(2)}s`;

export default function HeroCanvas() {
  return (
    <>
      <style>{`
        @keyframes nodePulse {
          0%, 100% { opacity: 0.18; r: 2.5; }
          50%       { opacity: 0.55; r: 3.5; }
        }
        @keyframes edgeFade {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.16; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.10; }
        }
        .hero-node       { animation: nodePulse 4s ease-in-out infinite; }
        .hero-node-glow  { animation: glowPulse 4s ease-in-out infinite; }
        .hero-edge       { animation: edgeFade  5s ease-in-out infinite; }
      `}</style>

      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "visible",
        }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={`e${i}`}
            className="hero-edge"
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="#006EB7"
            strokeWidth="0.15"
            style={{ animationDelay: edgeDelay(i) }}
          />
        ))}

        {/* Glow halos */}
        {NODES.map((n, i) => (
          <circle
            key={`g${i}`}
            className="hero-node-glow"
            cx={n.x} cy={n.y}
            r="5"
            fill="#006EB7"
            style={{ animationDelay: animDelay(i) }}
          />
        ))}

        {/* Core dots */}
        {NODES.map((n, i) => (
          <circle
            key={`n${i}`}
            className="hero-node"
            cx={n.x} cy={n.y}
            r="2.5"
            fill="#006EB7"
            style={{ animationDelay: animDelay(i) }}
          />
        ))}
      </svg>
    </>
  );
}
