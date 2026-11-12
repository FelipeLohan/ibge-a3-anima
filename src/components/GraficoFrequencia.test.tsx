import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import GraficoFrequencia from './GraficoFrequencia'

const renderizar = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <GraficoFrequencia />
    </QueryClientProvider>,
  )

describe('GraficoFrequencia', () => {
  it('campo de busca tem rótulo acessível', () => {
    renderizar()
    expect(screen.getByLabelText(/nome a pesquisar/i)).toBeInTheDocument()
  })

  it('valida busca vazia com mensagem anunciada', async () => {
    renderizar()
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/digite um nome/i)
    expect(screen.getByLabelText(/nome a pesquisar/i)).toHaveAttribute('aria-invalid', 'true')
  })
})
