import { Project } from '@/types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'f87a911e-21ea-42b7-8ce6-a708a2879001',
    title: 'Aetherform Audio Engine',
    slug: 'aetherform-audio-engine',
    hook: 'Real-time generative spatial audio canvas for ambient producers & sound sculptors.',
    description:
      'An unconventional web-based modular sound synthesizer and spatializer engineered during our midnight workshop. Built for music tech researchers and ambient electronic musicians, Aetherform lets creators position audio nodes in 3D binaural space with zero perceptible latency.',
    tags: ['Client Site', 'Concept Build'],
    tech_stack: ['Next.js', 'Web Audio API', 'Three.js', 'Tailwind CSS', 'TypeScript'],
    thumbnail_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    live_url: 'https://aetherform.thenightbuild.dev',
    featured: true,
    created_at: '2026-02-14T02:30:00Z',
    client: 'Resonance Research Lab',
    year: '2026',
    role: 'Full-stack Creative Engineering & DSP Interface',
    challenge:
      'Standard web audio interfaces rely on flat sliders and 2D knobs that fail to capture multidimensional spatial sound propagation. The client needed a latency-free interactive environment capable of handling 32 simultaneous polyphonic oscillators directly in Chrome and Safari without crashing mobile memory boundaries.',
    solution:
      'We engineered a custom WebGL node canvas synchronized to the Web Audio AudioContext thread via Web Workers. Sound nodes radiate procedural wave rings whose speed and opacity reflect frequency modulation, letting artists visually sculpt acoustic fields in real time.',
  },
  {
    id: 'b149b5c3-d9ea-4d8e-a2fe-33d31e9a2002',
    title: 'Chronos: Distributed Kernel Visualizer',
    slug: 'chronos-kernel-visualizer',
    hook: 'Interactive visual debugger for multi-core memory barrier races & Raft consensus.',
    description:
      'A final-year CS Capstone build turned open-source benchmark. Chronos models hardware concurrency, cache coherence lines, and distributed state machines in a high-fidelity visual replay canvas that universities now use in advanced operating systems labs.',
    tags: ['Student Project'],
    tech_stack: ['Rust (Wasm)', 'React', 'Canvas API', 'TypeScript', 'Web Workers'],
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://chronos-kernel.thenightbuild.dev',
    featured: true,
    created_at: '2026-01-20T03:15:00Z',
    client: 'CS Honours Capstone / Systems Lab',
    year: '2026',
    role: 'Core Systems Simulation & UI Architecture',
    challenge:
      'Debugging race conditions in distributed Paxos and multi-threaded cache coherence protocols typically involves reading hundreds of megabytes of dry ASCII trace logs. Students struggled to build mental models of memory barriers and leader election cycles under network partitions.',
    solution:
      'Compiled a cycle-accurate event-driven simulator to WebAssembly (Rust) that emits chronological memory bus state frames. Our front-end renders a scrubbable timeline with interactive packet-loss toggles and microsecond step-through execution.',
  },
  {
    id: 'c35a828e-9087-4d9f-93d1-4328ec809003',
    title: 'Vesperal Atelier',
    slug: 'vesperal-atelier',
    hook: 'High-contrast digital archive and e-commerce artifact for a bespoke Tokyo ceramics kiln.',
    description:
      'Rejected the cookie-cutter Shopify template for a Japanese ceramic craft atelier. We engineered a sculptural, tactile digital exhibition with custom GLSL lighting passes reacting to cursor proximity, reproducing the glazes of wood-fired pottery.',
    tags: ['Client Site'],
    tech_stack: ['Next.js', 'WebGL', 'Shopify Storefront API', 'Tailwind CSS'],
    thumbnail_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://vesperal.thenightbuild.dev',
    featured: true,
    created_at: '2025-11-28T01:40:00Z',
    client: 'Vesperal Craft Kiln, Tokyo',
    year: '2025',
    role: 'Art Direction & Headless Storefront Development',
    challenge:
      'Ceramic collectors need to perceive subtle surface variations — the crackle of tenmoku glaze, the raw texture of unglazed stoneware. Generic multi-image carousels failed to convey tactile depth, flattening the work.',
    solution:
      'Captured micro-photogrammetry scans and developed a custom GLSL normal-map displacement shader that responds to natural mouse drift like an overhead tungsten lamp moving across the workbench. Pageload remains under 1.1s through WebP compression and lazy buffer streaming.',
  },
  {
    id: 'd92a106f-4c5b-4682-8419-75f10b719004',
    title: 'Komorebi Neural Shader Lab',
    slug: 'komorebi-shader-lab',
    hook: 'Procedural light-refraction playground exploring dynamic raymarched caustics.',
    description:
      'An experimental concept build exploring procedural organic mathematics. Users construct GLSL fragment shaders using intuitive node graphs and render interactive lighting calculations in real-time at 60 FPS on mobile GPUs.',
    tags: ['Concept Build'],
    tech_stack: ['Three.js', 'GLSL', 'TypeScript', 'Vite', 'Framer Motion'],
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://komorebi.thenightbuild.dev',
    featured: false,
    created_at: '2025-10-12T04:20:00Z',
    client: 'Internal Nightbuild R&D',
    year: '2025',
    role: 'Creative Coding & Mathematical Shader Design',
    challenge:
      'Mathematical lighting phenomena like sunlight filtering through tree canopies ("komorebi") require expensive volumetric raymarching that usually slows down browser viewports.',
    solution:
      'Devised an analytical caustics approximation algorithm executed directly in fragment shaders, rendering fluid caustic lattices at 60fps on modern smartphones without battery drain.',
  },
  {
    id: 'e4719b21-4d1a-47cc-9883-fa53609a3005',
    title: 'Boreal Bioacoustics Sentinel',
    slug: 'boreal-bioacoustics',
    hook: 'Edge-AI avian migration telemetry platform monitoring sub-arctic boreal ecosystems.',
    description:
      'A joint CS + Forestry senior capstone deployment. Pairs Solar LoRa edge sensors in northern Canada with a real-time spectrogram ingestion dashboard to identify rare songbird frequencies and early migratory anomalies.',
    tags: ['Student Project'],
    tech_stack: ['Next.js', 'Python FastAPI', 'WebSockets', 'Chart.js', 'Tailwind CSS'],
    thumbnail_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://boreal-sentinel.thenightbuild.dev',
    featured: true,
    created_at: '2025-09-04T00:55:00Z',
    client: 'Subarctic Wildlife Research Collective',
    year: '2025',
    role: 'Telemetry Dashboard & Data Visualization',
    challenge:
      'Field researchers in remote subarctic zones operate on high-latency satellite connections and need instantaneous visualization of acoustic anomaly bursts without waiting for heavy telemetry downloads.',
    solution:
      'Designed a compressed binary WebSocket stream that sends vectorised spectrogram coefficients directly to a lightweight HTML5 canvas renderer, dropping bandwidth consumption by 84%.',
  },
];
