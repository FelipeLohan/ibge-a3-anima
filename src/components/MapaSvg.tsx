import { useEffect, useMemo, useRef, type MouseEvent } from 'react'
import DOMPurify from 'dompurify'

interface Props {
  svg: string
  // id do <path> a destacar (a malha usa o código IBGE como id)
  destaqueId?: number
  onSelect?: (id: number) => void
}

export default function MapaSvg({ svg, destaqueId, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  // O SVG vem de fonte externa: sanitiza antes de injetar no DOM.
  const html = useMemo(
    () => DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true } }),
    [svg],
  )

  useEffect(() => {
    const root = ref.current
    if (!root) return
    root.querySelectorAll('path.destaque').forEach((p) => p.classList.remove('destaque'))
    if (destaqueId) {
      root.querySelector(`path[id="${destaqueId}"]`)?.classList.add('destaque')
    }
  }, [html, destaqueId])

  const handleClick = (e: MouseEvent) => {
    const path = (e.target as Element).closest('path')
    if (path && onSelect) onSelect(Number(path.id))
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={[
        'flex h-72 w-full items-center justify-center rounded-lg bg-slate-50 p-2',
        '[&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full',
        // traço constante, independente do scale() aplicado pelo IBGE ao <g>
        '[&_path]:fill-emerald-100 [&_path]:stroke-emerald-700 [&_path]:stroke-1',
        '[&_path]:[vector-effect:non-scaling-stroke]',
        '[&_path.destaque]:fill-emerald-500',
        onSelect ? '[&_path]:cursor-pointer [&_path:hover]:fill-emerald-300' : '',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
