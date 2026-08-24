import type { ReactElement, ReactNode } from 'react'
import type { Activity, ActivityCategory } from '../types/models'
import { sceneFor, sceneLabel, type SceneId } from '../utils/activityScene'

/* ------------------------------------------------------------------ */
/* SVG scene renderers. Scene selection logic lives in activityScene.ts */
/* ------------------------------------------------------------------ */

const SKIN = '#f2c79b'
const HAIR = '#3a2b1f'

type Pose = 'stand' | 'reach' | 'point' | 'sit'

function ChildFigure({ x, y, scale = 1, pose = 'stand', shirt = '#58b39a' }: { x: number; y: number; scale?: number; pose?: Pose; shirt?: string }) {
  const arms = (() => {
    switch (pose) {
      case 'reach':
        return (
          <g>
            <line x1={x - 16} y1={y - 52} x2={x - 42} y2={y - 30} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
            <line x1={x + 16} y1={y - 52} x2={x + 50} y2={y - 28} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          </g>
        )
      case 'point':
        return (
          <g>
            <line x1={x - 16} y1={y - 52} x2={x - 34} y2={y - 34} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
            <line x1={x + 16} y1={y - 52} x2={x + 34} y2={y - 74} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
            <circle cx={x + 36} cy={y - 76} r={4} fill={SKIN} />
          </g>
        )
      case 'sit':
        return (
          <g>
            <line x1={x - 16} y1={y - 54} x2={x - 30} y2={y - 24} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
            <line x1={x + 16} y1={y - 54} x2={x + 30} y2={y - 24} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          </g>
        )
      default:
        return (
          <g>
            <line x1={x - 16} y1={y - 54} x2={x - 34} y2={y - 38} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
            <line x1={x + 16} y1={y - 54} x2={x + 34} y2={y - 38} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          </g>
        )
    }
  })()

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1={-14} y1={-18} x2={-8} y2={0} stroke="#3d3d55" strokeWidth={9} strokeLinecap="round" />
      <line x1={14} y1={-18} x2={8} y2={0} stroke="#3d3d55" strokeWidth={9} strokeLinecap="round" />
      {arms}
      <rect x={-17} y={-60} width={34} height={44} rx={12} fill={shirt} />
      <circle cx={0} cy={-82} r={21} fill={SKIN} />
      <path d={`M ${-20} ${-88} Q ${-20} ${-106} 0 ${-106} Q 20 ${-106} 20 ${-88} Q 20 ${-96} 8 ${-96} L 8 ${-102} L -4 ${-102} L -6 ${-94} Q ${-20} ${-95} -20 ${-88} Z`} fill={HAIR} />
      <circle cx={-7} cy={-84} r={2.4} fill="#241b12" />
      <circle cx={7} cy={-84} r={2.4} fill="#241b12" />
      <path d={`M ${-6} ${-76} Q 0 ${-71} 6 ${-76}`} stroke="#241b12" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  )
}

function ParentFigure({ x, y, scale = 1, shirt = '#a28fd0' }: { x: number; y: number; scale?: number; shirt?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1={-17} y1={-22} x2={-12} y2={0} stroke="#3d3d55" strokeWidth={11} strokeLinecap="round" />
      <line x1={17} y1={-22} x2={12} y2={0} stroke="#3d3d55" strokeWidth={11} strokeLinecap="round" />
      <line x1={-19} y1={-66} x2={-40} y2={-48} stroke={SKIN} strokeWidth={9} strokeLinecap="round" />
      <line x1={19} y1={-66} x2={40} y2={-48} stroke={SKIN} strokeWidth={9} strokeLinecap="round" />
      <rect x={-21} y={-74} width={42} height={54} rx={14} fill={shirt} />
      <circle cx={0} cy={-100} r={26} fill={SKIN} />
      <path d={`M ${-25} ${-108} Q ${-25} ${-128} 0 ${-128} Q 25 ${-128} 25 ${-108} Q 25 ${-118} 10 ${-118} L 10 ${-124} L -6 ${-124} L -8 ${-116} Q ${-25} ${-117} -25 ${-108} Z`} fill={HAIR} />
      <circle cx={-9} cy={-103} r={2.6} fill="#241b12" />
      <circle cx={9} cy={-103} r={2.6} fill="#241b12" />
      <path d={`M ${-8} ${-94} Q 0 ${-88} 8 ${-94}`} stroke="#241b12" strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  )
}

function BoxWithLid({ x, y, scale = 1, lidOpen = true, color = '#f4b93f' }: { x: number; y: number; scale?: number; lidOpen?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-34} y={-34} width={68} height={34} rx={4} fill={color} stroke="#241a06" strokeWidth={3} />
      {lidOpen ? (
        <g transform={`rotate(-28 ${-34} ${-34})`}>
          <rect x={-36} y={-48} width={72} height={14} rx={3} fill={color} stroke="#241a06" strokeWidth={3} />
        </g>
      ) : (
        <rect x={-34} y={-44} width={68} height={14} rx={3} fill={color} stroke="#241a06" strokeWidth={3} />
      )}
      <text x={0} y={-16} textAnchor="middle" fontSize="12">🎁</text>
    </g>
  )
}

function Ball({ x, y, r = 22, color = '#ef4444' }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} stroke="#1a1a24" strokeWidth={2} />
      <path d={`M ${x - r} ${y} A ${r * 0.72} ${r * 0.72} 0 1 1 ${x + r} ${y}`} fill="none" stroke="#1a1a24" strokeWidth={2.5} opacity={0.35} />
    </g>
  )
}

function SoundWaves({ x, y, color = '#f4b93f' }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9}>
      <path d={`M ${x} ${y} q -7 -8 0 -16 q 7 -8 0 -16`} />
      <path d={`M ${x + 12} ${y} q -7 -8 0 -16 q 7 -8 0 -16`} opacity={0.6} />
      <path d={`M ${x + 24} ${y} q -7 -8 0 -16 q 7 -8 0 -16`} opacity={0.35} />
    </g>
  )
}

function MotionArrows({ x1, y1, x2, y2, color = '#f4b93f' }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g stroke={color} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.9}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} strokeDasharray="2 10" />
      <path d={`M ${x2} ${y2} l -12 -2 l 6 8 Z`} fill={color} stroke="none" />
    </g>
  )
}

function SpeechBubble({ x, y, text, color = '#f4b93f' }: { x: number; y: number; text: string; color?: string }) {
  return (
    <g>
      <rect x={x - 40} y={y - 30} width={80} height={34} rx={16} fill="#1a1a24" stroke={color} strokeWidth={2} />
      <path d={`M ${x} ${y + 4} l -8 12 l 16 -6 Z`} fill="#1a1a24" stroke={color} strokeWidth={2} />
      <text x={x} y={y - 8} textAnchor="middle" fontSize={17} fill={color}>{text}</text>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Scene renderers                                                     */
/* ------------------------------------------------------------------ */

const CATEGORY_BG: Record<ActivityCategory, string> = {
  cognitive: '#1d2433',
  language: '#1c2830',
  motor: '#1c2a26',
  social: '#2d211f',
  creativity: '#251f31',
}

function SceneFrame({ category, children }: { category: ActivityCategory; children: ReactNode }) {
  return (
    <svg viewBox="0 0 480 320" role="img" preserveAspectRatio="xMidYMid slice" className="activity-visual-svg">
      <defs>
        <linearGradient id="scene-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CATEGORY_BG[category]} />
          <stop offset="100%" stopColor="#0d0d14" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#scene-bg)" />
      <ellipse cx="240" cy="300" rx="300" ry="90" fill="#0a0a10" opacity={0.6} />
      <circle cx="60" cy="40" r="4" fill="#f4b93f" opacity={0.5} />
      <circle cx="120" cy="24" r="3" fill="#f4b93f" opacity={0.4} />
      <circle cx="430" cy="52" r="4" fill="#f4b93f" opacity={0.5} />
      <circle cx="380" cy="28" r="3" fill="#f4b93f" opacity={0.4} />
      <circle cx="250" cy="18" r="2.5" fill="#f4b93f" opacity={0.3} />
      {children}
    </svg>
  )
}

function Scene({ category, scene }: { category: ActivityCategory; scene: SceneId }): ReactElement {
  switch (scene) {
    case 'lid':
      return (
        <SceneFrame category={category}>
          <BoxWithLid x={330} y={260} scale={1.7} lidOpen />
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
          <MotionArrows x1={250} y1={180} x2={300} y2={205} />
          <SpeechBubble x={120} y={70} text="Aç!" />
        </SceneFrame>
      )
    case 'animal':
      return (
        <SceneFrame category={category}>
          <text x={330} y={250} fontSize={120} textAnchor="middle">🐱</text>
          <text x={380} y={180} fontSize={48}>🐶</text>
          <text x={275} y={170} fontSize={46}>🐦</text>
          <ChildFigure x={150} y={250} scale={1.2} pose="point" />
          <SoundWaves x={265} y={210} />
          <SpeechBubble x={120} y={70} text="Ses!" />
        </SceneFrame>
      )
    case 'ball':
      return (
        <SceneFrame category={category}>
          <Ball x={340} y={240} r={30} />
          <ChildFigure x={170} y={250} scale={1.25} pose="reach" />
          <MotionArrows x1={230} y1={230} x2={300} y2={230} />
          <text x={110} y={80} fontSize={26}>🤸</text>
        </SceneFrame>
      )
    case 'colors':
      return (
        <SceneFrame category={category}>
          <circle cx={350} cy={225} r={30} fill="#ef4444" />
          <circle cx={415} cy={200} r={26} fill="#3f7fe0" />
          <circle cx={385} cy={280} r={28} fill="#f4b93f" />
          <ChildFigure x={175} y={250} scale={1.25} pose="point" />
          <SpeechBubble x={105} y={70} text="Kırmızı!" color="#ef4444" />
        </SceneFrame>
      )
    case 'shapes':
      return (
        <SceneFrame category={category}>
          <rect x={315} y={200} width={54} height={54} rx={6} fill="#3f7fe0" />
          <circle cx={420} cy={228} r={27} fill="#f4b93f" />
          <path d="M 345 300 l -30 -56 l 60 0 Z" fill="#ef4444" />
          <ChildFigure x={170} y={250} scale={1.25} pose="point" />
        </SceneFrame>
      )
    case 'paper':
      return (
        <SceneFrame category={category}>
          <circle cx={360} cy={235} r={26} fill="#e8e6df" />
          <circle cx={325} cy={260} r={18} fill="#d6d4cb" />
          <circle cx={350} cy={270} r={15} fill="#c9c7bd" />
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
          <MotionArrows x1={240} y1={215} x2={305} y2={235} />
        </SceneFrame>
      )
    case 'music':
      return (
        <SceneFrame category={category}>
          <text x={360} y={245} fontSize={70} textAnchor="middle">🥁</text>
          <text x={280} y={180} fontSize={34} fill="#f4b93f">♪</text>
          <text x={340} y={150} fontSize={40} fill="#f4b93f">♫</text>
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
          <SoundWaves x={300} y={200} />
        </SceneFrame>
      )
    case 'book':
      return (
        <SceneFrame category={category}>
          <g transform="translate(330 250)">
            <rect x={-30} y={-22} width={60} height={44} rx={3} fill="#f4b93f" />
            <rect x={-30} y={-22} width={28} height={44} rx={3} fill="#e0a72c" />
            <path d="M 0 -22 L 0 22" stroke="#241a06" strokeWidth={2} />
          </g>
          <ChildFigure x={180} y={250} scale={1.25} pose="sit" />
          <SpeechBubble x={110} y={70} text="Oku!" />
        </SceneFrame>
      )
    case 'face':
      return (
        <SceneFrame category={category}>
          <circle cx={140} cy={120} r={40} fill="#f2c79b" />
          <path d={`M ${108} ${112} Q ${108} ${92} 140 ${92} Q ${172} ${92} 172 ${112} Q ${172} ${102} 156 ${102} L 156 ${96} L 138 ${96} L 136 ${104} Q ${108} ${103} 108 ${112} Z`} fill="#3a2b1f" />
          <circle cx={128} cy={120} r={3} fill="#241b12" />
          <circle cx={152} cy={120} r={3} fill="#241b12" />
          <path d={`M ${130} ${132} Q 140 ${138} 150 ${132}`} stroke="#241b12" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <circle cx={330} cy={120} r={40} fill="#f2c79b" />
          <path d={`M ${298} ${112} Q ${298} ${92} 330 ${92} Q ${362} ${92} 362 ${112} Q ${362} ${102} 346 ${102} L 346 ${96} L 328 ${96} L 326 ${104} Q ${298} ${103} 298 ${112} Z`} fill="#3a2b1f" />
          <path d={`M ${318} ${126} Q 330 ${120} 342 ${126}`} stroke="#241b12" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d={`M ${316} ${112} Q 330 ${120} 344 ${112}`} stroke="#241b12" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.4} />
          <MotionArrows x1={185} y1={120} x2={288} y2={120} />
          <text x={240} y={200} textAnchor="middle" fontSize={18} fill="#c9c6d0">Mimik oyunu</text>
        </SceneFrame>
      )
    case 'walk':
      return (
        <SceneFrame category={category}>
          <line x1={80} y1={270} x2={420} y2={270} stroke="#f4b93f" strokeWidth={5} strokeDasharray="14 8" />
          <ChildFigure x={160} y={250} scale={1.15} pose="point" />
          <ChildFigure x={280} y={250} scale={1.05} pose="point" shirt="#3f7fe0" />
          <text x={230} y={90} fontSize={24} fill="#c9c6d0">Adım adım</text>
        </SceneFrame>
      )
    case 'beads':
      return (
        <SceneFrame category={category}>
          <path d="M 250 150 Q 320 130 360 160 Q 400 190 340 230 Q 280 270 240 250" stroke="#f4b93f" strokeWidth={4} fill="none" />
          <circle cx={295} cy={138} r={13} fill="#ef4444" />
          <circle cx={355} cy={172} r={13} fill="#3f7fe0" />
          <circle cx={330} cy={235} r={13} fill="#58b39a" />
          <circle cx={262} cy={255} r={13} fill="#f4b93f" />
          <ChildFigure x={150} y={250} scale={1.25} pose="reach" />
        </SceneFrame>
      )
    case 'sort':
      return (
        <SceneFrame category={category}>
          <rect x={320} y={225} width={56} height={52} rx={6} fill="#3f7fe0" stroke="#1a1a24" strokeWidth={3} />
          <rect x={392} y={225} width={56} height={52} rx={6} fill="#ef4444" stroke="#1a1a24" strokeWidth={3} />
          <circle cx={292} cy={245} r={16} fill="#ef4444" />
          <circle cx={368} cy={245} r={16} fill="#3f7fe0" />
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
          <MotionArrows x1={250} y1={210} x2={330} y2={230} />
        </SceneFrame>
      )
    case 'count':
      return (
        <SceneFrame category={category}>
          <text x={330} y={180} fontSize={70} textAnchor="middle" fill="#f4b93f">1</text>
          <text x={400} y={210} fontSize={70} textAnchor="middle" fill="#f4b93f">2</text>
          <text x={365} y={270} fontSize={70} textAnchor="middle" fill="#f4b93f">3</text>
          <ChildFigure x={170} y={250} scale={1.25} pose="point" />
          <SpeechBubble x={105} y={70} text="1, 2, 3" />
        </SceneFrame>
      )
    case 'memory':
      return (
        <SceneFrame category={category}>
          <g transform="translate(310 205)">
            <rect x={-22} y={-16} width={44} height={32} rx={6} fill="#58b39a" stroke="#1a1a24" strokeWidth={2.5} />
            <text x={0} y={6} textAnchor="middle" fontSize={16}>?</text>
          </g>
          <g transform="translate(380 205)">
            <rect x={-22} y={-16} width={44} height={32} rx={6} fill="#58b39a" stroke="#1a1a24" strokeWidth={2.5} />
            <text x={0} y={6} textAnchor="middle" fontSize={16}>?</text>
          </g>
          <g transform="translate(345 260)">
            <rect x={-22} y={-16} width={44} height={32} rx={6} fill="#58b39a" stroke="#1a1a24" strokeWidth={2.5} />
            <text x={0} y={6} textAnchor="middle" fontSize={16}>?</text>
          </g>
          <ChildFigure x={175} y={250} scale={1.25} pose="sit" />
          <text x={240} y={90} textAnchor="middle" fontSize={18} fill="#c9c6d0">Hangisi nerede?</text>
        </SceneFrame>
      )
    case 'match':
      return (
        <SceneFrame category={category}>
          <circle cx={320} cy={220} r={24} fill="#f4b93f" />
          <circle cx={410} cy={220} r={24} fill="#f4b93f" opacity={0.55} />
          <path d="M 330 300 l -24 -46 l 48 0 Z" fill="#3f7fe0" />
          <path d="M 420 300 l -24 -46 l 48 0 Z" fill="#3f7fe0" opacity={0.55} />
          <ChildFigure x={180} y={250} scale={1.25} pose="point" />
          <MotionArrows x1={340} y1={220} x2={378} y2={220} />
        </SceneFrame>
      )
    case 'sensory':
      return (
        <SceneFrame category={category}>
          <circle cx={330} cy={230} r={34} fill="#ef4444" />
          <circle cx={395} cy={215} r={28} fill="#3f7fe0" />
          <circle cx={360} cy={275} r={24} fill="#58b39a" />
          <circle cx={420} cy={265} r={20} fill="#f4b93f" />
          <ChildFigure x={170} y={250} scale={1.25} pose="reach" />
          <MotionArrows x1={240} y1={210} x2={292} y2={225} />
        </SceneFrame>
      )
    case 'water':
      return (
        <SceneFrame category={category}>
          <path d="M 300 260 q 15 -24 30 0 q 15 -24 30 0 q 15 -24 30 0 q 15 -24 30 0" fill="none" stroke="#6ba9c4" strokeWidth={6} strokeLinecap="round" />
          <circle cx={420} cy={225} r={20} fill="#6ba9c4" opacity={0.5} />
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
        </SceneFrame>
      )
    case 'nature':
      return (
        <SceneFrame category={category}>
          <path d="M 320 200 q 6 -22 22 -24 q -14 -6 -10 -26 q 20 -2 30 12 q 4 -16 20 -14 q 0 18 -12 26 q 16 4 12 24 q -20 0 -28 -12 Z" fill="#58b39a" />
          <path d="M 395 235 q 5 -18 18 -20 q -12 -5 -8 -22 q 17 -2 25 10 q 3 -13 17 -11 q 0 15 -10 21 q 13 3 10 20 q -17 0 -23 -10 Z" fill="#4a9c83" />
          <circle cx={345} cy={280} r={16} fill="#f4b93f" />
          <circle cx={415} cy={290} r={13} fill="#ef4444" />
          <ChildFigure x={175} y={250} scale={1.25} pose="point" />
        </SceneFrame>
      )
    case 'shadow':
      return (
        <SceneFrame category={category}>
          <ellipse cx={385} cy={120} rx={55} ry={90} fill="#1a1a24" opacity={0.85} />
          <g>
            <circle cx={300} cy={130} r={24} fill="#f2c79b" />
            <path d={`M ${282} ${124} Q ${282} ${112} 300 ${112} Q ${318} ${112} 318 ${124} Q ${318} ${118} 306 ${118} L 306 ${114} L 294 ${114} L 293 ${119} Q ${282} ${120} 282 ${124} Z`} fill="#3a2b1f" />
            <circle cx={293} cy={130} r={2.5} fill="#241b12" />
            <circle cx={307} cy={130} r={2.5} fill="#241b12" />
            <rect x={292} y={140} width={16} height={30} rx={8} fill="#a28fd0" />
          </g>
          <path d="M 255 100 L 290 120" stroke="#f4b93f" strokeWidth={5} strokeLinecap="round" />
          <text x={120} y={120} fontSize={22}>🕯️</text>
          <ChildFigure x={150} y={250} scale={1.25} pose="point" />
        </SceneFrame>
      )
    case 'puppet':
      return (
        <SceneFrame category={category}>
          <text x={330} y={200} fontSize={60} textAnchor="middle">🧸</text>
          <text x={400} y={235} fontSize={44} textAnchor="middle">🐰</text>
          <ChildFigure x={175} y={250} scale={1.25} pose="reach" />
          <SpeechBubble x={110} y={70} text="Ne yapmalı?" />
        </SceneFrame>
      )
    case 'help':
      return (
        <SceneFrame category={category}>
          <rect x={330} y={235} width={70} height={42} rx={6} fill="#f4b93f" stroke="#241a06" strokeWidth={3} />
          <text x={365} y={262} textAnchor="middle" fontSize={20}>🧸</text>
          <ChildFigure x={185} y={250} scale={1.2} pose="reach" />
          <ParentFigure x={330} y={250} scale={1.35} />
          <SpeechBubble x={120} y={70} text="Birlikte!" />
        </SceneFrame>
      )
    case 'craft':
      return (
        <SceneFrame category={category}>
          <text x={340} y={250} fontSize={70} textAnchor="middle">🎨</text>
          <rect x={300} y={150} width={120} height={80} rx={4} fill="#e8e6df" />
          <path d="M 310 210 l 20 -20 l 14 12 l 18 -24 l 16 18 l 14 -10 l 16 24 Z" fill="#ef4444" />
          <circle cx={340} cy={180} r={12} fill="#f4b93f" />
          <ChildFigure x={175} y={250} scale={1.25} pose="reach" shirt="#f28b6f" />
        </SceneFrame>
      )
    case 'blocks':
      return (
        <SceneFrame category={category}>
          <rect x={330} y={250} width={46} height={46} rx={5} fill="#ef4444" />
          <rect x={338} y={210} width={38} height={40} rx={5} fill="#f4b93f" />
          <rect x={346} y={172} width={30} height={38} rx={5} fill="#3f7fe0" />
          <text x={330} y={150} fontSize={30}>🏆</text>
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
        </SceneFrame>
      )
    case 'puzzle':
      return (
        <SceneFrame category={category}>
          <path d="M 300 210 h 40 v 16 h 12 v -16 h 44 v 44 h -16 v 12 h 16 v 44 h -96 v -40 h 14 v -12 h -14 Z" fill="#a28fd0" stroke="#1a1a24" strokeWidth={3} />
          <path d="M 404 210 h 0 v 40 h -12 v 12 h 12 v 40 h 16 v -16 h 12 v -36 Z" fill="#a28fd0" opacity={0.5} stroke="#1a1a24" strokeWidth={2.5} />
          <ChildFigure x={180} y={250} scale={1.25} pose="reach" />
        </SceneFrame>
      )
    case 'contrast':
      return (
        <SceneFrame category={category}>
          <g>
            <rect x={270} y={120} width={160} height={100} rx={6} fill="#0d0d14" stroke="#f4b93f" strokeWidth={2} />
            <circle cx={310} cy={170} r={22} fill="#fff" />
            <path d="M 380 220 h -70 q 35 -40 70 0 Z" fill="#fff" />
            <rect x={280} y={135} width={14} height={70} fill="#f4b93f" />
          </g>
          <ChildFigure x={180} y={250} scale={1.3} pose="sit" />
          <MotionArrows x1={350} y1={110} x2={350} y2={90} />
        </SceneFrame>
      )
    case 'talk':
      return (
        <SceneFrame category={category}>
          <ChildFigure x={150} y={250} scale={1.25} />
          <ParentFigure x={330} y={250} scale={1.35} />
          <SpeechBubble x={110} y={80} text="Selam!" />
          <SpeechBubble x={400} y={80} text="Merhaba!" color="#6ba9c4" />
          <SoundWaves x={240} y={150} />
        </SceneFrame>
      )
    case 'track':
      return (
        <SceneFrame category={category}>
          <circle cx={150} cy={120} r={26} fill="#f2c79b" />
          <path d={`M ${130} ${114} Q ${130} ${100} 150 ${100} Q ${170} ${100} 170 ${114} Q ${170} ${108} 158 ${108} L 158 ${104} L 148 ${104} L 147 ${109} Q ${130} ${110} 130 ${114} Z`} fill="#3a2b1f" />
          <circle cx={142} cy={121} r={2.6} fill="#241b12" />
          <circle cx={158} cy={121} r={2.6} fill="#241b12" />
          <circle cx={360} cy={150} r={28} fill="#f4b93f" />
          <circle cx={360} cy={150} r={44} fill="none" stroke="#f4b93f" strokeWidth={3} opacity={0.4} />
          <MotionArrows x1={260} y1={150} x2={320} y2={150} />
          <text x={230} y={70} textAnchor="middle" fontSize={20} fill="#c9c6d0">Gözlerinle takip et</text>
        </SceneFrame>
      )
    case 'carry':
      return (
        <SceneFrame category={category}>
          <rect x={300} y={240} width={62} height={44} rx={6} fill="#3f7fe0" stroke="#1a1a24" strokeWidth={3} />
          <circle cx={230} cy={230} r={20} fill="#ef4444" />
          <text x={300} y={120} fontSize={34} textAnchor="middle">🏃</text>
          <ChildFigure x={180} y={250} scale={1.2} pose="reach" />
          <MotionArrows x1={265} y1={215} x2={305} y2={230} />
        </SceneFrame>
      )
    case 'throw':
      return (
        <SceneFrame category={category}>
          <path d="M 340 260 a 40 24 0 0 1 80 0 Z" fill="#58b39a" stroke="#1a1a24" strokeWidth={3} />
          <circle cx={270} cy={170} r={16} fill="#e8e6df" />
          <ChildFigure x={185} y={250} scale={1.25} pose="reach" />
          <MotionArrows x1={235} y1={190} x2={285} y2={170} />
        </SceneFrame>
      )
    case 'mirror':
      return (
        <SceneFrame category={category}>
          <ellipse cx={350} cy={180} rx={55} ry={85} fill="#6ba9c4" opacity={0.35} stroke="#6ba9c4" strokeWidth={3} />
          <circle cx={350} cy={150} r={26} fill="#f2c79b" />
          <path d={`M ${330} ${144} Q ${330} ${128} 350 ${128} Q ${370} ${128} 370 ${144} Q ${370} ${136} 358 ${136} L 358 ${132} L 344 ${132} L 342 ${138} Q ${330} ${140} 330 ${144} Z`} fill="#3a2b1f" />
          <circle cx={342} cy={150} r={3} fill="#241b12" />
          <circle cx={358} cy={150} r={3} fill="#241b12" />
          <path d={`M ${343} ${162} Q 350 ${167} 357 ${162}`} stroke="#241b12" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <ChildFigure x={180} y={250} scale={1.25} pose="point" />
          <MotionArrows x1={250} y1={180} x2={292} y2={180} />
        </SceneFrame>
      )
    case 'turn':
      return (
        <SceneFrame category={category}>
          <ChildFigure x={150} y={250} scale={1.2} />
          <ParentFigure x={330} y={250} scale={1.35} />
          <Ball x={240} y={225} r={20} color="#f4b93f" />
          <MotionArrows x1={185} y1={225} x2={222} y2={225} />
          <MotionArrows x1={258} y1={225} x2={295} y2={225} />
          <text x={240} y={80} textAnchor="middle" fontSize={18} fill="#c9c6d0">Sıra bende, sıra sende</text>
        </SceneFrame>
      )
    case 'peek':
      return (
        <SceneFrame category={category}>
          <ParentFigure x={340} y={250} scale={1.4} />
          <path d="M 300 150 L 340 200" stroke="#3a2b1f" strokeWidth={9} strokeLinecap="round" />
          <circle cx={368} cy={196} r={24} fill="#f2c79b" />
          <path d={`M ${350} ${190} Q ${350} ${176} 368 ${176} Q ${386} ${176} 386 ${190} Q ${386} ${184} 374 ${184} L 374 ${180} L 360 ${180} L 358 ${186} Q ${350} ${187} 350 ${190} Z`} fill="#3a2b1f" />
          <circle cx={360} cy={197} r={2.6} fill="#241b12" />
          <circle cx={376} cy={197} r={2.6} fill="#241b12" />
          <path d={`M ${362} ${207} Q 368 ${212} 374 ${207}`} stroke="#241b12" strokeWidth={2.2} fill="none" strokeLinecap="round" />
          <ChildFigure x={160} y={250} scale={1.25} pose="sit" />
          <SpeechBubble x={110} y={70} text="Cee!" />
        </SceneFrame>
      )
    default:
      return (
        <SceneFrame category={category}>
          <ChildFigure x={220} y={250} scale={1.3} />
          <text x={240} y={120} textAnchor="middle" fontSize={40}>🌟</text>
        </SceneFrame>
      )
  }
}

export function ActivityVisual({ activity, className }: { activity: Activity; className?: string }) {
  return <div className={`activity-visual ${className ?? ''}`} aria-label={sceneLabel(activity)}>{Scene({ category: activity.category, scene: sceneFor(activity) })}</div>
}