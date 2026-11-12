import { useId, useState, type FormEvent } from 'react'
import { Search } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useNomeFrequencia } from '../hooks/useNomeFrequencia'
import Carregando from './Carregando'
import ErroMensagem from './ErroMensagem'

// Períodos vêm como "1930[", "[1930,1940[", ... — usamos o ano inicial como rótulo.
const formatarPeriodo = (periodo: string) => {
  const anos = periodo.match(/\d{4}/g)
  return anos ? `${anos[0]}s` : periodo
}

export default function GraficoFrequencia() {
  const [input, setInput] = useState('')
  const [nome, setNome] = useState('')
  const [validacao, setValidacao] = useState('')
  const base = useId()
  const { data, isLoading, isError, refetch } = useNomeFrequencia(nome)

  const serie = data?.[0]?.res.map((r) => ({
    periodo: formatarPeriodo(r.periodo),
    frequencia: r.frequencia,
  }))

  const resumo =
    serie && serie.length > 0
      ? (() => {
          const maior = serie.reduce((a, b) => (b.frequencia > a.frequencia ? b : a))
          return `Gráfico de linhas da frequência do nome ${nome} por década. Pico na década de ${maior.periodo.replace('s', '')}, com ${maior.frequencia.toLocaleString('pt-BR')} registros.`
        })()
      : ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const valor = input.trim()
    if (!valor) {
      setValidacao('Digite um nome para buscar.')
      return
    }
    setValidacao('')
    setNome(valor)
  }

  return (
    <section aria-labelledby={`${base}-titulo`} className="rounded-xl bg-white p-5 shadow-sm">
      <h2 id={`${base}-titulo`} className="mb-4 text-lg font-semibold">
        Explorador de nomes
      </h2>

      <form onSubmit={handleSubmit} className="mb-4" noValidate>
        <label htmlFor={`${base}-nome`} className="mb-1 block text-sm font-medium">
          Nome a pesquisar
        </label>
        <div className="flex gap-2">
          <input
            id={`${base}-nome`}
            className="flex-1 rounded-lg border border-slate-500 px-3 py-2 text-sm"
            placeholder="Ex.: Maria"
            value={input}
            aria-invalid={!!validacao}
            aria-describedby={validacao ? `${base}-erro` : undefined}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            <Search size={16} aria-hidden="true" /> Buscar
          </button>
        </div>
        {validacao && (
          <p id={`${base}-erro`} role="alert" className="mt-1 text-sm text-red-700">
            {validacao}
          </p>
        )}
      </form>

      {isLoading && <Carregando texto="Buscando nome..." />}
      {isError && <ErroMensagem mensagem="Erro ao buscar o nome." onRetry={() => refetch()} />}
      {nome && !isLoading && !isError && !serie && (
        <p role="status" className="text-sm text-slate-600">
          Nome “{nome}” não encontrado no Censo. Verifique a grafia e tente novamente.
        </p>
      )}
      {!nome && (
        <p className="text-sm text-slate-600">
          Digite um nome para ver quantas pessoas o receberam em cada década.
        </p>
      )}

      {serie && (
        <>
          <p role="status" className="sr-only">
            {resumo}
          </p>
          <div className="h-72" role="img" aria-label={resumo}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serie}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="frequencia" stroke="#047857" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-medium text-emerald-800">
              Ver dados em tabela
            </summary>
            <table className="mt-2 w-full text-left">
              <caption className="sr-only">Frequência do nome {nome} por década</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-b border-slate-300 py-1">
                    Década
                  </th>
                  <th scope="col" className="border-b border-slate-300 py-1">
                    Registros
                  </th>
                </tr>
              </thead>
              <tbody>
                {serie.map((s) => (
                  <tr key={s.periodo}>
                    <th scope="row" className="py-1 font-normal">
                      {s.periodo}
                    </th>
                    <td className="py-1">{s.frequencia.toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </section>
  )
}
