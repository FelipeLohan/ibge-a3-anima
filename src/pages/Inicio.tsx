import { useState } from 'react'
import LocalidadeSelector from '../components/LocalidadeSelector'
import MapaVisualizador from '../components/MapaVisualizador'
import NoticiasLista from '../components/NoticiasLista'

export default function Inicio() {
  const [ufId, setUfId] = useState<number>()
  const [municipioId, setMunicipioId] = useState<number>()

  const handleUfChange = (id?: number) => {
    setUfId(id)
    setMunicipioId(undefined)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Localidades e notícias</h1>
      <LocalidadeSelector
        ufId={ufId}
        municipioId={municipioId}
        onUfChange={handleUfChange}
        onMunicipioChange={setMunicipioId}
      />
      <MapaVisualizador ufId={ufId} municipioId={municipioId} onSelectMunicipio={setMunicipioId} />
      <NoticiasLista />
    </div>
  )
}
