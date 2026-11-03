import { Maximize2, Crosshair, Map as MapIcon } from 'lucide-react'
import {
  useMalhaEstado,
  useMalhaMunicipio,
  useMetadadosMunicipio,
} from '../hooks/useMalhas'
import MapaSvg from './MapaSvg'

interface Props {
  ufId?: number
  municipioId?: number
  onSelectMunicipio: (id: number) => void
}

const Carregando = () => <div className="h-72 w-full animate-pulse rounded-lg bg-slate-200" />

export default function MapaVisualizador({ ufId, municipioId, onSelectMunicipio }: Props) {
  const estado = useMalhaEstado(ufId)
  const municipio = useMalhaMunicipio(municipioId)
  const meta = useMetadadosMunicipio(municipioId)

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <MapIcon size={18} /> Mapa
      </h2>

      {!ufId && (
        <p className="text-sm text-slate-500">Selecione um estado para ver o mapa.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {ufId && (
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Estado (scroll para zoom, arraste para mover, clique para selecionar)
            </p>
            {estado.isLoading && <Carregando />}
            {estado.isError && (
              <p className="text-sm text-red-600">Erro ao carregar a malha.</p>
            )}
            {estado.data && (
              <MapaSvg
                svg={estado.data}
                destaqueId={municipioId}
                onSelect={onSelectMunicipio}
                zoomable
              />
            )}
          </div>
        )}

        {municipioId && (
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Município
              {meta.data && (
                <span className="font-semibold text-slate-800"> — {meta.data.nome}</span>
              )}
            </p>
            {municipio.isLoading && <Carregando />}
            {municipio.isError && (
              <p className="text-sm text-red-600">Erro ao carregar a malha.</p>
            )}
            {municipio.data && <MapaSvg svg={municipio.data} />}
          </div>
        )}
      </div>

      {meta.data && (
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="flex items-center gap-1 text-slate-500">
              <Maximize2 size={14} /> Área territorial
            </span>
            <span className="text-base font-semibold">
              {Number(meta.data.area.dimensao).toLocaleString('pt-BR')} km²
            </span>
          </div>
          <div className="rounded-lg bg-slate-100 p-3">
            <span className="flex items-center gap-1 text-slate-500">
              <Crosshair size={14} /> Centroide
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
