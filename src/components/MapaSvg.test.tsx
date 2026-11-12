import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import MapaSvg from './MapaSvg'

const svg =
  '<svg viewBox="0 0 100 100"><path id="1" d="M0 0L10 10"/></svg>'

describe('MapaSvg', () => {
  it('expõe o mapa como grupo focável e o SVG como imagem rotulada', () => {
    render(<MapaSvg svg={svg} rotulo="Mapa de teste" zoomable />)
    expect(screen.getByRole('group', { name: 'Mapa de teste' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('img', { name: 'Mapa de teste' })).toBeInTheDocument()
  })

  it('move (com zoom), restaura e respeita os limites pelo teclado', async () => {
    render(<MapaSvg svg={svg} rotulo="Mapa de teste" zoomable />)
    const grupo = screen.getByRole('group', { name: 'Mapa de teste' })
    const el = grupo.querySelector('svg')!
    grupo.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(el.getAttribute('viewBox')).toBe('0 0 100 100') // sem zoom: não move
    await userEvent.keyboard('+')
    const [, , w] = el.getAttribute('viewBox')!.split(' ').map(Number)
    expect(w).toBeLessThan(100)
    for (let i = 0; i < 30; i++) await userEvent.keyboard('{ArrowRight}')
    const [x] = el.getAttribute('viewBox')!.split(' ').map(Number)
    expect(x + w).toBeLessThanOrEqual(100.0001) // não sai do mapa
    await userEvent.keyboard('0')
    expect(el.getAttribute('viewBox')).toBe('0 0 100 100')
  })

  it('não intercepta atalhos com Ctrl (zoom do navegador)', () => {
    render(<MapaSvg svg={svg} rotulo="Mapa de teste" zoomable />)
    const grupo = screen.getByRole('group', { name: 'Mapa de teste' })
    const ev = new KeyboardEvent('keydown', { key: '0', ctrlKey: true, bubbles: true, cancelable: true })
    grupo.dispatchEvent(ev)
    expect(ev.defaultPrevented).toBe(false)
  })
})
