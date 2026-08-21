import { useEffect, useMemo, useState } from 'react'

type AnimatedSpriteProps = {
  frames: string[]
  fps?: number
  width?: number
  height?: number
  className?: string
  alt?: string
}

function publicAsset(path: string) {
  return path
    .split('/')
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join('/')
}

export function AnimatedSprite({ frames, fps = 10, width = 180, height = 180, className = '', alt = '' }: AnimatedSpriteProps) {
  const encodedFrames = useMemo(() => frames.map(publicAsset), [frames])
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    encodedFrames.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [encodedFrames])

  useEffect(() => {
    if (encodedFrames.length < 2) return
    const interval = window.setInterval(() => {
      setFrame((current) => (current + 1) % encodedFrames.length)
    }, 1000 / fps)
    return () => window.clearInterval(interval)
  }, [encodedFrames.length, fps])

  if (!encodedFrames.length) return null

  return (
    <img
      className={`animated-sprite ${className}`}
      src={encodedFrames[frame]}
      width={width}
      height={height}
      alt={alt}
      draggable={false}
    />
  )
}

export function duckFrames(animation: 'idle' | 'walk' | 'jump') {
  const base = '/animations/cc0/duck/FOWL ANIMAL DUCKY/Animation PNG/DUCKY/NUDE'
  const configs = {
    idle: ['01-Idle/01-Idle/FA_DUCKY_Idle_', 12],
    walk: ['03-Walk/FA_DUCKY_Walk_', 12],
    jump: ['06-Jump/01-Jump_Up/FA_DUCKY_Jump_UP_', 5],
  } as const
  const [folder, count] = configs[animation]
  return Array.from({ length: count }, (_, index) => `${base}/${folder}${String(index).padStart(3, '0')}.png`)
}
