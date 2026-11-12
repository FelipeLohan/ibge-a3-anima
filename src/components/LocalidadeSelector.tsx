import { useId, useState } from 'react'
import { MapPin } from 'lucide-react'
import { useRegioes } from '../hooks/useRegioes'
import { useUFs } from '../hooks/useUFs'
import { useMunicipios } from '../hooks/useMunicipios'
import ErroMensagem from './ErroMensagem'

const selectClass =
  'w-full rounded-lg border border-slate-500 bg-white px-3 py-2 text-sm disabled:bg-slate-100 disabled:text-slate-600'

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
  const base = useId()

  const regioes = useRegioes()
  const ufs = useUFs(regiaoId)
  const municipios = useMunicipios(ufId)

  const municipio = municipios.data?.find((m) => m.id === municipioId)
  const toNumber = (value: string) => (value ? Number(value) : undefined)

  const erro = regioes.isError || ufs.isError || municipios.isError
  const refazer = () => {
    if (regioes.isError) regioes.refetch()
    if (ufs.isError) ufs.refetch()
    if (municipios.isError) municipios.refetch()
  }

  return (
    <section aria-labelledby={`${base}-titulo`} className="rounded-xl bg-white p-5 shadow-sm">
      <h2 id={`${base}-titulo`} className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <MapPin size={18} aria-hidden="true" /> Localidades
      </h2>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor={`${base}-regiao`} className="mb-1 block text-sm font-medium">
            Região
          </label>
          <select
            id={`${base}-regiao`}
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
        </div>

        <div>
          <label htmlFor={`${base}-uf`} className="mb-1 block text-sm font-medium">
            Estado
          </label>
          <select
            id={`${base}-uf`}
            className={selectClass}
            value={ufId ?? ''}
            onChange={(e) => onUfChange(toNumber(e.target.value))}
          >
            <option value="">Selecione um estado</option>
            {ufs.data?.map((uf) => (
              <option key={uf.id} value={uf.id}>
                {uf.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${base}-municipio`} className="mb-1 block text-sm font-medium">
            Município
          </label>
          <select
            id={`${base}-municipio`}
            className={selectClass}
            disabled={!ufId || municipios.isLoading}
            value={municipioId ?? ''}
            onChange={(e) => onMunicipioChange(toNumber(e.target.value))}
          >
            <option value="">
              {!ufId
                ? 'Escolha um estado primeiro'
                : municipios.isLoading
                  ? 'Carregando municípios...'
                  : 'Selecione um município'}
            </option>
            {municipios.data?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {erro && (
        <div className="mt-3">
          <ErroMensagem mensagem="Não foi possível carregar as localidades." onRetry={refazer} />
        </div>
      )}

      <div aria-live="polite">
        {municipio && (
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-600">Código IBGE</dt>
              <dd className="font-medium">{municipio.id}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Microrregião</dt>
              <dd className="font-medium">{municipio.microrregiao.nome}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Mesorregião</dt>
              <dd className="font-medium">{municipio.microrregiao.mesorregiao.nome}</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  )
}
