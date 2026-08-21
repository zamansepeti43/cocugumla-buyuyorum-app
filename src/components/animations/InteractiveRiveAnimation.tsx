import { Alignment, Fit, useRive } from '@rive-app/react-canvas'

type InteractiveRiveAnimationProps = {
  src: string
  stateMachines?: string
  className?: string
  title?: string
}

/**
 * Reusable Rive animation layer for Çocuğumla Büyüyorum.
 * Individual .riv assets must be checked separately for their own license.
 */
export function InteractiveRiveAnimation({
  src,
  stateMachines,
  className,
  title = 'Animasyonlu içerik',
}: InteractiveRiveAnimationProps) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines,
    layout: {
      fit: Fit.Contain,
      alignment: Alignment.Center,
    },
  })

  return (
    <div className={className} role="img" aria-label={title}>
      <RiveComponent />
    </div>
  )
}
