import { Maximize2, Crosshair, Map as MapIcon } from 'lucide-react'
import {
  useMalhaEstado,
  useMalhaMunicipio,
  useMetadadosMunicipio,
} from '../hooks/useMalhas'
import ErroMensagem from './ErroMensagem'
import MapaSvg from './MapaSvg'

interface Props {
  ufId?: number
  municipioId?: number
  onSelectMunicipio: (id: number) => void
}

const Skeleton = () => (
  <div role="status" aria-label="Carregando mapa" className="h-72 w-full animate-pulse rounded-lg bg-slate-200" />
)

export default function MapaVisualizador({ ufId, municipioId, onSelectMunicipio }: Props) {
  const estado = useMalhaEstado(ufId)
  const municipio = useMalhaMunicipio(municipioId)
  const meta = useMetadadosMunicipio(municipioId)

  return (
    <section aria-labelledby="titulo-mapa" className="rounded-xl bg-white p-5 shadow-sm">
      <h2 id="titulo-mapa" className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <MapIcon size={18} aria-hidden="true" /> Mapa
      </h2>

      {!ufId && (
        <p className="text-sm text-slate-600">Selecione um estado para ver o mapa.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {ufId && (
          <div>
            <p className="mb-2 text-sm text-slate-600">
              Estado (Ctrl + rolagem para zoom, arraste ou setas para mover, clique para selecionar)
            </p>
            {estado.isLoading && <Skeleton />}
            {estado.isError && (
              <ErroMensagem mensagem="Erro ao carregar o mapa do estado." onRetry={() => estado.refetch()} />
            )}
            {estado.data && (
              <MapaSvg
                svg={estado.data}
                destaqueId={municipioId}
                onSelect={onSelectMunicipio}
                rotulo="Mapa do estado dividido em municípios"
                zoomable
              />
            )}
          </div>
        )}

        {municipioId && (
          <div>
            <p className="mb-2 text-sm text-slate-600">
              Município
              {meta.data && (
                <span className="font-semibold text-slate-800"> — {meta.data.nome}</span>
              )}
            </p>
            {municipio.isLoading && <Skeleton />}
            {municipio.isError && (
              <ErroMensagem mensagem="Erro ao carregar o mapa do município." onRetry={() => municipio.refetch()} />
            )}
            {municipio.data && <MapaSvg svg={municipio.data} rotulo={`Mapa do município${meta.data ? ` de ${meta.data.nome}` : ''}`} />}
          </div>
        )}
      </div>

      {meta.isError && municipioId && (
        <div className="mt-4">
          <ErroMensagem mensagem="Erro ao carregar os dados do município." onRetry={() => meta.refetch()} />
        </div>
      )}

      {meta.data && (
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="flex items-center gap-1 text-slate-600">
              <Maximize2 size={14} aria-hidden="true" /> Área territorial
            </span>
            <span className="text-base font-semibold">
              {Number(meta.data.area.dimensao).toLocaleString('pt-BR')} km²
            </span>
          </div>
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="flex items-center gap-1 text-slate-600">
              <Crosshair size={14} aria-hidden="true" /> Centroide
            </span>
            <span className="text-base font-semibold">
              {meta.data.centroide.latitude.toFixed(4)},{' '}
              {meta.data.centroide.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
