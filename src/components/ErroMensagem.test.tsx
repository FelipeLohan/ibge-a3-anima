import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ErroMensagem from './ErroMensagem'

describe('ErroMensagem', () => {
  it('é um alerta e permite tentar novamente', async () => {
    const onRetry = vi.fn()
    render(<ErroMensagem mensagem="Falhou" onRetry={onRetry} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Falhou')
    await userEvent.click(screen.getByRole('button', { name: /tentar novamente/i }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
