import { useState } from 'react'
import GraficoFrequencia from './components/GraficoFrequencia'
import LocalidadeSelector from './components/LocalidadeSelector'
import MapaVisualizador from './components/MapaVisualizador'
import NoticiaCard from './components/NoticiaCard'
import { useNoticias } from './hooks/useNoticias'

function App() {
  const noticias = useNoticias(6)
  const [ufId, setUfId] = useState<number>()
  const [municipioId, setMunicipioId] = useState<number>()

  const handleUfChange = (id?: number) => {
    setUfId(id)
    setMunicipioId(undefined)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-emerald-700 px-6 py-5 text-white">
        <h1 className="text-2xl font-bold">DataBrasil Explorer</h1>
        <p className="text-sm text-emerald-100">
          Painel demográfico e econômico com dados abertos do IBGE
        </p>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <LocalidadeSelector
          ufId={ufId}
          municipioId={municipioId}
          onUfChange={handleUfChange}
          onMunicipioChange={setMunicipioId}
        />
        <MapaVisualizador
          ufId={ufId}
          municipioId={municipioId}
          onSelectMunicipio={setMunicipioId}
        />
        <GraficoFrequencia />

        <section>
          <h2 className="mb-3 text-lg font-semibold">Notícias do IBGE</h2>
          {noticias.isLoading && (
            <p className="text-sm text-slate-500">Carregando...</p>
          )}
          {noticias.isError && (
            <p className="text-sm text-red-600">Erro ao carregar notícias.</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.data?.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
