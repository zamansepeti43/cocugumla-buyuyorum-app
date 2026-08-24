import type { Activity, ActivityCategory } from '../types/models'
import { sceneFor, type SceneId } from '../utils/activityScene'
import { getHowToSteps, type HowToStage } from '../utils/howToSteps'

/* ------------------------------------------------------------------ */
/* Compact mini-scenes: one small SVG panel per how-to step            */
/* ------------------------------------------------------------------ */

const SKIN = '#f2c79b'

function MiniChild({ x, y, scale = 0.42, reach = false, hold = false }: { x: number; y: number; scale?: number; reach?: boolean; hold?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1={-14} y1={-18} x2={-8} y2={0} stroke="#3d3d55" strokeWidth={9} strokeLinecap="round" />
      <line x1={14} y1={-18} x2={8} y2={0} stroke="#3d3d55" strokeWidth={9} strokeLinecap="round" />
      {reach ? (
        <g>
          <line x1={-16} y1={-54} x2={-40} y2={-30} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          <line x1={16} y1={-54} x2={44} y2={-34} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <line x1={-16} y1={-54} x2={-30} y2={-36} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
          <line x1={16} y1={-54} x2={30} y2={-36} stroke={SKIN} strokeWidth={8} strokeLinecap="round" />
        </g>
      )}
      <rect x={-17} y={-60} width={34} height={44} rx={12} fill="#58b39a" />
      <circle cx={0} cy={-82} r={21} fill={SKIN} />
      <path d={`M ${-20} ${-88} Q ${-20} ${-106} 0 ${-106} Q 20 ${-106} 20 ${-88} Q 20 ${-96} 8 ${-96} L 8 ${-102} L -4 ${-102} L -6 ${-94} Q ${-20} ${-95} -20 ${-88} Z`} fill="#3a2b1f" />
      <circle cx={-7} cy={-84} r={2.4} fill="#241b12" />
      <circle cx={7} cy={-84} r={2.4} fill="#241b12" />
      {hold && <circle cx={46} cy={-34} r={7} fill="#f4b93f" stroke="#241a06" strokeWidth={2} />}
    </g>
  )
}

function MiniParent({ x, y, scale = 0.4 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1={-17} y1={-22} x2={-12} y2={0} stroke="#3d3d55" strokeWidth={11} strokeLinecap="round" />
      <line x1={17} y1={-22} x2={12} y2={0} stroke="#3d3d55" strokeWidth={11} strokeLinecap="round" />
      <line x1={-19} y1={-66} x2={-38} y2={-50} stroke={SKIN} strokeWidth={9} strokeLinecap="round" />
      <line x1={19} y1={-66} x2={40} y2={-50} stroke={SKIN} strokeWidth={9} strokeLinecap="round" />
      <rect x={-21} y={-74} width={42} height={54} rx={14} fill="#a28fd0" />
      <circle cx={0} cy={-100} r={26} fill={SKIN} />
      <path d={`M ${-25} ${-108} Q ${-25} ${-128} 0 ${-128} Q 25 ${-128} 25 ${-108} Q 25 ${-118} 10 ${-118} L 10 ${-124} L -6 ${-124} L -8 ${-116} Q ${-25} ${-117} -25 ${-108} Z`} fill="#3a2b1f" />
      <circle cx={-9} cy={-103} r={2.6} fill="#241b12" />
      <circle cx={9} cy={-103} r={2.6} fill="#241b12" />
    </g>
  )
}

function MiniBox({ x, y, scale = 0.9, lidOpen = false, sparkle = false }: { x: number; y: number; scale?: number; lidOpen?: boolean; sparkle?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-26} y={-26} width={52} height={26} rx={3} fill="#f4b93f" stroke="#241a06" strokeWidth={2.5} />
      {lidOpen ? (
        <g transform={`rotate(-28 ${-26} ${-26})`}>
          <rect x={-27} y={-36} width={54} height={10} rx={2} fill="#f4b93f" stroke="#241a06" strokeWidth={2.5} />
        </g>
      ) : (
        <rect x={-26} y={-34} width={52} height={10} rx={2} fill="#f4b93f" stroke="#241a06" strokeWidth={2.5} />
      )}
      <text x={0} y={-12} textAnchor="middle" fontSize="9">🎁</text>
      {sparkle && (
        <g fill="#ffe28a">
          <path d="M 30 -10 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z" />
          <path d="M -30 6 l 1.5 4.5 l 4.5 1.5 l -4.5 1.5 l -1.5 4.5 l -1.5 -4.5 l -4.5 -1.5 l 4.5 -1.5 Z" transform="scale(0.7)" />
        </g>
      )}
    </g>
  )
}

function MiniCard({ x, y, w = 30, h = 40, label = '🐤' }: { x: number; y: number; w?: number; h?: number; label?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} fill="#1d1d28" stroke="#4a4a5a" strokeWidth={2} />
      <text x={0} y={6} textAnchor="middle" fontSize="16">{label}</text>
    </g>
  )
}

function MiniSound({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M ${x} ${y} q -6 -8 0 -16 q 6 -8 0 -16`} stroke="#f4b93f" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.9} />
      <path d={`M ${x + 9} ${y} q -6 -8 0 -16 q 6 -8 0 -16`} stroke="#f4b93f" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.5} />
      <text x={x + 18} y={y - 4} fontSize="15">🔊</text>
    </g>
  )
}

function MiniArrow({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#f4b93f" strokeWidth={3} fill="none" strokeLinecap="round">
      <path d={`M ${x - 14} ${y} h 28`} />
      <path d={`M ${x + 8} ${y} l -8 -5 M ${x + 8} ${y} l -8 5`} />
    </g>
  )
}

function MiniFootprints({ x, y }: { x: number; y: number }) {
  return (
    <g fill="#7dd3a8" opacity={0.9}>
      <ellipse cx={x} cy={y} rx={5} ry={8} />
      <ellipse cx={x + 14} cy={y + 4} rx={5} ry={8} transform={`rotate(-12 ${x + 14} ${y + 4})`} />
      <ellipse cx={x + 28} cy={y + 8} rx={5} ry={8} transform={`rotate(-10 ${x + 28} ${y + 8})`} />
    </g>
  )
}

function MiniNotes({ x, y }: { x: number; y: number }) {
  return (
    <g fill="#f4b93f">
      <circle cx={x} cy={y + 8} r={4} />
      <line x1={x} y1={y + 8} x2={x} y2={y - 12} stroke="#f4b93f" strokeWidth={2.5} />
      <circle cx={x + 14} cy={y + 4} r={4} />
      <line x1={x + 14} y1={y + 4} x2={x + 14} y2={y - 16} stroke="#f4b93f" strokeWidth={2.5} />
      <circle cx={x - 12} cy={y + 2} r={3.5} />
      <line x1={x - 12} y1={y + 2} x2={x - 12} y2={y - 14} stroke="#f4b93f" strokeWidth={2.5} />
    </g>
  )
}

function MiniBin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-16} y={-18} width={32} height={20} rx={3} fill="#58b39a" stroke="#241a06" strokeWidth={2} />
      <rect x={-20} y={-22} width={40} height={6} rx={3} fill="#f4b93f" stroke="#241a06" strokeWidth={2} />
    </g>
  )
}

function MiniBook({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-22} y={-16} width={18} height={32} rx={3} fill="#e8e6e0" stroke="#4a4a5a" strokeWidth={1.5} />
      <rect x={4} y={-16} width={18} height={32} rx={3} fill="#f0eeea" stroke="#4a4a5a" strokeWidth={1.5} />
      <line x1={-4} y1={-16} x2={-4} y2={16} stroke="#4a4a5a" strokeWidth={1.5} />
      <rect x={-18} y={-10} width={10} height={8} rx={2} fill="#f4b93f" />
      <rect x={8} y={-10} width={10} height={8} rx={2} fill="#58b39a" />
    </g>
  )
}

function MiniSparkles({ x, y }: { x: number; y: number }) {
  return (
    <g fill="#ffe28a">
      <path d={`M ${x} ${y} l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z`} />
      <path d={`M ${x + 14} ${y - 10} l 1.5 4 l 4 1.5 l -4 1.5 l -1.5 4 l -1.5 -4 l -4 -1.5 l 4 -1.5 Z`} />
    </g>
  )
}

function MiniFingers({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={SKIN} strokeWidth={7} strokeLinecap="round">
      <line x1={0} y1={10} x2={0} y2={-14} />
      <line x1={0} y1={10} x2={-9} y2={-10} />
      <line x1={0} y1={10} x2={9} y2={-10} />
    </g>
  )
}

function MiniWater({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 20} y={y - 14} width={40} height={22} rx={6} fill="#3b7d9e" stroke="#241a06" strokeWidth={2} />
      <path d={`M ${x - 12} ${y - 10} q 6 4 12 0 q 6 4 12 0`} stroke="#a8d7ef" strokeWidth={2} fill="none" />
    </g>
  )
}

function MiniPose({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-34} r={12} fill={SKIN} />
      <rect x={-10} y={-24} width={20} height={24} rx={6} fill="#f4b93f" />
      <line x1={-10} y1={-12} x2={-14} y2={6} stroke={SKIN} strokeWidth={4} strokeLinecap="round" />
      <line x1={10} y1={-12} x2={14} y2={6} stroke={SKIN} strokeWidth={4} strokeLinecap="round" />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Stage renderer                                                      */
/* ------------------------------------------------------------------ */

const CATEGORY_BG: Record<ActivityCategory, string> = {
  cognitive: '#1d2433',
  language: '#1c2830',
  motor: '#1c2a26',
  social: '#2d211f',
  creativity: '#251f31',
}

function StagePanel({ stage, category }: { stage: HowToStage; category: ActivityCategory }) {
  return (
    <svg viewBox="0 0 150 110" role="img" className="howto-panel-svg" aria-hidden="true">
      <rect width="150" height="110" fill={CATEGORY_BG[category]} />
      <ellipse cx="75" cy="104" rx="105" ry="22" fill="#0a0a10" opacity={0.6} />
      <circle cx="24" cy="14" r="2.5" fill="#f4b93f" opacity={0.5} />
      <circle cx="132" cy="18" r="2.5" fill="#f4b93f" opacity={0.4} />
      {(() => {
        switch (stage) {
          case 'boxClosed':
            return <MiniBox x={75} y={80} scale={1.1} lidOpen={false} />
          case 'boxOpen':
            return <MiniBox x={75} y={80} scale={1.1} lidOpen sparkle />
          case 'parentShowBox':
            return (
              <g>
                <MiniParent x={55} y={80} scale={0.62} />
                <MiniBox x={112} y={82} scale={0.85} lidOpen={false} />
                <MiniArrow x={82} y={62} />
              </g>
            )
          case 'childReach':
            return (
              <g>
                <MiniChild x={60} y={82} scale={0.58} reach />
                <MiniBox x={115} y={84} scale={0.85} lidOpen={false} />
              </g>
            )
          case 'childOpen':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} reach />
                <MiniBox x={112} y={84} scale={0.9} lidOpen sparkle />
              </g>
            )
          case 'childFind':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} />
                <MiniBox x={112} y={84} scale={0.9} lidOpen />
                <MiniSparkles x={130} y={28} />
              </g>
            )
          case 'parentShowCards':
            return (
              <g>
                <MiniParent x={52} y={80} scale={0.62} />
                <MiniCard x={108} y={72} label="🐤" />
                <MiniCard x={132} y={74} label="🐮" />
              </g>
            )
          case 'childHear':
            return (
              <g>
                <MiniChild x={75} y={82} scale={0.58} />
                <MiniSound x={60} y={30} />
              </g>
            )
          case 'childLookCards':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} />
                <MiniCard x={112} y={70} label="🐤" />
                <MiniCard x={134} y={72} label="🐮" />
              </g>
            )
          case 'childPick':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} reach />
                <MiniCard x={112} y={70} label="🐤" />
                <MiniArrow x={95} y={55} />
              </g>
            )
          case 'childHold':
            return (
              <g>
                <MiniChild x={75} y={82} scale={0.58} hold />
              </g>
            )
          case 'childMove':
            return (
              <g>
                <MiniChild x={52} y={82} scale={0.58} hold />
                <MiniArrow x={92} y={60} />
                <MiniBin x={122} y={80} />
              </g>
            )
          case 'dropInBin':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} reach />
                <MiniBin x={112} y={80} />
                <circle cx={112} cy={56} r={6} fill="#f4b93f" stroke="#241a06" strokeWidth={1.5} />
                <MiniArrow x={88} y={52} />
              </g>
            )
          case 'childTouch':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} reach />
                <circle cx={112} cy={74} r={12} fill="#d69d5e" stroke="#241a06" strokeWidth={2} />
              </g>
            )
          case 'musicNotes':
            return (
              <g>
                <MiniChild x={75} y={82} scale={0.58} />
                <MiniNotes x={62} y={24} />
              </g>
            )
          case 'walkLine':
            return (
              <g>
                <MiniChild x={40} y={82} scale={0.58} />
                <MiniFootprints x={92} y={84} />
              </g>
            )
          case 'sortBoxes':
            return (
              <g>
                <MiniBin x={56} y={78} />
                <MiniBin x={96} y={78} />
                <circle cx={128} cy={58} r={6} fill="#f4b93f" stroke="#241a06" strokeWidth={1.5} />
              </g>
            )
          case 'childDraw':
            return (
              <g>
                <MiniChild x={62} y={82} scale={0.58} reach />
                <rect x={108} y={52} width={34} height={34} rx={4} fill="#1d1d28" stroke="#4a4a5a" strokeWidth={2} />
                <path d="M 116 78 q 4 -14 10 -6 q 4 6 12 -8" stroke="#f4b93f" strokeWidth={2.5} fill="none" />
              </g>
            )
          case 'parentTalk':
            return (
              <g>
                <MiniParent x={50} y={80} scale={0.62} />
                <MiniChild x={104} y={82} scale={0.5} />
                <text x={78} y={40} fontSize="13">💬</text>
              </g>
            )
          case 'bookTogether':
            return (
              <g>
                <MiniParent x={52} y={80} scale={0.62} />
                <MiniBook x={118} y={70} />
              </g>
            )
          case 'ballRoll':
            return (
              <g>
                <MiniChild x={40} y={82} scale={0.58} />
                <circle cx={84} cy={84} r={9} fill="#ef4444" stroke="#1a1a24" strokeWidth={2} />
                <MiniArrow x={70} y={64} />
              </g>
            )
          case 'childKick':
            return (
              <g>
                <MiniChild x={58} y={82} scale={0.58} reach />
                <circle cx={110} cy={80} r={9} fill="#ef4444" stroke="#1a1a24" strokeWidth={2} />
                <MiniArrow x={92} y={66} />
              </g>
            )
          case 'mirrorPose':
            return (
              <g>
                <MiniPose x={78} y={80} />
                <MiniSparkles x={110} y={30} />
              </g>
            )
          case 'peekObject':
            return (
              <g>
                <MiniBox x={75} y={80} scale={1.05} lidOpen={false} />
                <MiniSparkles x={120} y={34} />
              </g>
            )
          case 'buildTower':
            return (
              <g>
                <rect x={64} y={60} width={24} height={12} rx={2} fill="#f4b93f" stroke="#241a06" strokeWidth={2} />
                <rect x={68} y={46} width={18} height={12} rx={2} fill="#58b39a" stroke="#241a06" strokeWidth={2} />
                <rect x={71} y={33} width={12} height={12} rx={2} fill="#a28fd0" stroke="#241a06" strokeWidth={2} />
              </g>
            )
          case 'matchPair':
            return (
              <g>
                <MiniCard x={56} y={72} label="🐤" />
                <MiniCard x={120} y={72} label="🐤" />
                <MiniArrow x={86} y={58} />
              </g>
            )
          case 'countFingers':
            return (
              <g>
                <MiniChild x={58} y={82} scale={0.58} reach />
                <MiniFingers x={110} y={64} />
              </g>
            )
          case 'waterPlay':
            return (
              <g>
                <MiniChild x={56} y={82} scale={0.55} />
                <MiniWater x={118} y={78} />
              </g>
            )
          default:
            return <MiniChild x={75} y={82} scale={0.58} />
        }
      })()}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export function HowToVisual({ activity }: { activity: Activity }) {
  const scene: SceneId = sceneFor(activity)
  const steps = getHowToSteps(scene)
  return (
    <div className="howto-strip" role="group" aria-label="Aktivitenin uygulama adımları">
      {steps.map((step, index) => (
        <div className="howto-panel" key={`${scene}-${index}`}>
          <span className="howto-panel-step">{index + 1}</span>
          <StagePanel stage={step.stage} category={activity.category} />
          <p>{step.label}</p>
        </div>
      ))}
    </div>
  )
}