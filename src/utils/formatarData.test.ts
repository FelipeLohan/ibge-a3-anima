import { describe, expect, it } from 'vitest'
import { formatarData } from './formatarData'

describe('formatarData', () => {
  it('converte o formato dd/MM/yyyy da API do IBGE', () => {
    const r = formatarData('05/11/2026 10:30:00')
    expect(r.iso).toBe('2026-11-05')
    expect(r.texto).toContain('2026')
  })

  it('devolve o texto original quando a data é inválida', () => {
    expect(formatarData('sem data')).toEqual({ texto: 'sem data' })
  })
})
