import { useEffect, useMemo, useRef, type MouseEvent } from 'react'
import DOMPurify from 'dompurify'
import { Minus, Plus, RotateCcw } from 'lucide-react'

interface Props {
  svg: string
  // id do <path> a destacar (a malha usa o código IBGE como id)
  destaqueId?: number
  onSelect?: (id: number) => void
  zoomable?: boolean
}

type ViewBox = [x: number, y: number, w: number, h: number]

const MAX_ZOOM = 30
const DRAG_THRESHOLD = 4

const btnClass =
  'rounded-md bg-white p-1.5 text-slate-700 shadow hover:bg-slate-100'

export default function MapaSvg({ svg, destaqueId, onSelect, zoomable }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const original = useRef<ViewBox>([0, 0, 1, 1])
  const atual = useRef<ViewBox>([0, 0, 1, 1])
  const arrastou = useRef(false)

  // O SVG vem de fonte externa: sanitiza antes de injetar no DOM.
  const html = useMemo(
    () => DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true } }),
    [svg],
  )

  const aplicar = (vb: ViewBox) => {
    atual.current = vb
    ref.current?.querySelector('svg')?.setAttribute('viewBox', vb.join(' '))
  }

  // Zoom em torno de um ponto (coordenadas do viewBox) mantendo-o fixo na tela.
  const zoomEm = (fator: number, px: number, py: number) => {
    const [x, y, w, h] = atual.current
    const [, , w0, h0] = original.current
    const nw = Math.min(w0, Math.max(w0 / MAX_ZOOM, w / fator))
    const k = nw / w
    aplicar([px - (px - x) * k, py - (py - y) * k, nw, h * k > h0 ? h0 : h * k])
  }

  const zoomCentro = (fator: number) => {
    const [x, y, w, h] = atual.current
    zoomEm(fator, x + w / 2, y + h / 2)
  }

  useEffect(() => {
    const root = ref.current
    const svgEl = root?.querySelector('svg')
    if (!svgEl) return
    const vb = svgEl.viewBox.baseVal
    original.current = atual.current = [vb.x, vb.y, vb.width, vb.height]

    root!.querySelectorAll('path.destaque').forEach((p) => p.classList.remove('destaque'))
    if (destaqueId) {
      root!.querySelector(`path[id="${destaqueId}"]`)?.classList.add('destaque')
    }
  }, [html, destaqueId])

  useEffect(() => {
    const root = ref.current
    if (!zoomable || !root) return

    const paraViewBox = (cx: number, cy: number) => {
      const svgEl = root.querySelector('svg')!
      const p = new DOMPoint(cx, cy).matrixTransform(svgEl.getScreenCTM()!.inverse())
      return [p.x, p.y] as const
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const [px, py] = paraViewBox(e.clientX, e.clientY)
      zoomEm(e.deltaY < 0 ? 1.25 : 0.8, px, py)
    }

    const onDown = (e: PointerEvent) => {
      const svgEl = root.querySelector('svg')!
      const escala = svgEl.getScreenCTM()!.a
      const inicio = { x: e.clientX, y: e.clientY, vb: [...atual.current] as ViewBox }
      arrastou.current = false

      const onMove = (m: PointerEvent) => {
        const dx = m.clientX - inicio.x
        const dy = m.clientY - inicio.y
        if (Math.hypot(dx, dy) > DRAG_THRESHOLD) arrastou.current = true
        if (!arrastou.current) return
        const [x, y, w, h] = inicio.vb
        aplicar([x - dx / escala, y - dy / escala, w, h])
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('pointerdown', onDown)
    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('pointerdown', onDown)
    }
  }, [zoomable, html])

  const handleClick = (e: MouseEvent) => {
    if (arrastou.current) return
    const path = (e.target as Element).closest('path')
    if (path && onSelect) onSelect(Number(path.id))
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        onClick={handleClick}
        className={[
          'flex h-72 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50 p-2',
          '[&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full',
          // traço constante, independente do scale() aplicado pelo IBGE ao <g>
          '[&_path]:fill-emerald-100 [&_path]:stroke-emerald-700 [&_path]:stroke-1',
          '[&_path]:[vector-effect:non-scaling-stroke]',
          '[&_path.destaque]:fill-emerald-500',
          onSelect ? '[&_path]:cursor-pointer [&_path:hover]:fill-emerald-300' : '',
          zoomable ? 'cursor-grab touch-none select-none active:cursor-grabbing' : '',
        ].join(' ')}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {zoomable && (
        <div className="absolute right-2 top-2 flex flex-col gap-1">
          <button type="button" className={btnClass} aria-label="Aproximar" onClick={() => zoomCentro(1.5)}>
            <Plus size={16} />
          </button>
          <button type="button" className={btnClass} aria-label="Afastar" onClick={() => zoomCentro(1 / 1.5)}>
            <Minus size={16} />
          </button>
          <button type="button" className={btnClass} aria-label="Restaurar" onClick={() => aplicar(original.current)}>
            <RotateCcw size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
