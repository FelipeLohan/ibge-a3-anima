import { useState, type FormEvent } from 'react'
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

// Períodos vêm como "1930[", "[1930,1940[", ... — usamos o ano inicial como rótulo.
const formatarPeriodo = (periodo: string) => {
  const anos = periodo.match(/\d{4}/g)
  return anos ? `${anos[0]}s` : periodo
}

export default function GraficoFrequencia() {
  const [input, setInput] = useState('')
  const [nome, setNome] = useState('')
  const { data, isLoading, isError } = useNomeFrequencia(nome)

  const serie = data?.[0]?.res.map((r) => ({
    periodo: formatarPeriodo(r.periodo),
    frequencia: r.frequencia,
  }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setNome(input)
  }

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Explorador de nomes</h2>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Digite um nome (ex: Maria)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <Search size={16} /> Buscar
        </button>
      </form>

      {isLoading && <p className="text-sm text-slate-500">Carregando...</p>}
      {isError && (
        <p className="text-sm text-red-600">Erro ao buscar o nome.</p>
      )}
      {nome && !isLoading && !isError && !serie && (
        <p className="text-sm text-slate-500">Nome não encontrado no Censo.</p>
      )}

      {serie && (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={serie}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="frequencia"
                stroke="#059669"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}
