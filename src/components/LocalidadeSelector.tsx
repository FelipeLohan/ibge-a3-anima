import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { useRegioes } from '../hooks/useRegioes'
import { useUFs } from '../hooks/useUFs'
import { useMunicipios } from '../hooks/useMunicipios'

const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:bg-slate-100 disabled:text-slate-400'

interface Props {
  ufId?: number
  municipioId?: number
  onUfChange: (id?: number) => void
  onMunicipioChange: (id?: number) => void
}

export default function LocalidadeSelector({
  ufId,
  municipioId,
  onUfChange,
  onMunicipioChange,
}: Props) {
  const [regiaoId, setRegiaoId] = useState<number>()

  const regioes = useRegioes()
  const ufs = useUFs(regiaoId)
  const municipios = useMunicipios(ufId)

  const municipio = municipios.data?.find((m) => m.id === municipioId)

  const toNumber = (value: string) => (value ? Number(value) : undefined)

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <MapPin size={18} /> Localidades
      </h2>

      <div className="grid gap-3 sm:grid-cols-3">
        <select
          className={selectClass}
          value={regiaoId ?? ''}
          onChange={(e) => {
            setRegiaoId(toNumber(e.target.value))
            onUfChange(undefined)
          }}
        >
          <option value="">Todas as regiões</option>
          {regioes.data?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nome}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={ufId ?? ''}
          onChange={(e) => {
            onUfChange(toNumber(e.target.value))
          }}
        >
          <option value="">Estado</option>
          {ufs.data?.map((uf) => (
            <option key={uf.id} value={uf.id}>
              {uf.nome}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          disabled={!ufId || municipios.isLoading}
          value={municipioId ?? ''}
          onChange={(e) => onMunicipioChange(toNumber(e.target.value))}
        >
          <option value="">
            {municipios.isLoading ? 'Carregando...' : 'Município'}
          </option>
          {municipios.data?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>

      {municipio && (
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Código IBGE</dt>
            <dd className="font-medium">{municipio.id}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Microrregião</dt>
            <dd className="font-medium">{municipio.microrregiao.nome}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Mesorregião</dt>
            <dd className="font-medium">
              {municipio.microrregiao.mesorregiao.nome}
            </dd>
          </div>
        </dl>
      )}
    </section>
  )
}
