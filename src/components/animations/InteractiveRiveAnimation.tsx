import { useRive } from '@rive-app/react-canvas'

type InteractiveRiveAnimationProps = {
  src: string
  stateMachines?: string
  className?: string
  title?: string
}

/**
 * Reusable animation layer for Çocuğumla Büyüyorum.
 *
 * The Rive runtime is MIT licensed. Individual .riv assets must be checked
 * separately for their own license before being shipped commercially.
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
      fit: 'contain',
      alignment: 'center',
    },
  })

  return (
    <div className={className} role="img" aria-label={title}>
      <RiveComponent />
    </div>
  )
}
