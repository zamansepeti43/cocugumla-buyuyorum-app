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


