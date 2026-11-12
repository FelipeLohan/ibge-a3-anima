import { RefreshCw } from 'lucide-react'

interface Props {
  mensagem: string
  onRetry?: () => void
}

// Erro anunciado a leitores de tela (role="alert") com caminho de recuperação (Nielsen #9).
export default function ErroMensagem({ mensagem, onRetry }: Props) {
  return (
    <div role="alert" className="flex flex-wrap items-center gap-3 text-sm text-red-700">
      <span>{mensagem}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1 rounded-md border border-red-700 px-2 py-1 font-medium hover:bg-red-50"
        >
          <RefreshCw size={14} aria-hidden="true" /> Tentar novamente
        </button>
      )}
    </div>
  )
}
