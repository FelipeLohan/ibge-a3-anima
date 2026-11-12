import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NoticiaCard from './NoticiaCard'

const noticia = {
  id: 1,
  titulo: 'Censo divulgado',
  introducao: 'Resumo',
  data_publicacao: '05/11/2026 10:30:00',
  link: 'https://agenciadenoticias.ibge.gov.br/x',
  editorias: 'x',
}

describe('NoticiaCard', () => {
  it('avisa que o link abre em nova aba e usa <time>', () => {
    render(<NoticiaCard noticia={noticia} />)
    expect(screen.getByRole('link', { name: /abre em nova aba/i })).toHaveAttribute('target', '_blank')
    expect(document.querySelector('time')).toHaveAttribute('datetime', '2026-11-05')
  })
})
