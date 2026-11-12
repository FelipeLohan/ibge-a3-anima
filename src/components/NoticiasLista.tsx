import { useNoticias } from '../hooks/useNoticias'
import Carregando from './Carregando'
import ErroMensagem from './ErroMensagem'
import NoticiaCard from './NoticiaCard'

export default function NoticiasLista() {
  const { data, isLoading, isError, refetch } = useNoticias(6)

  return (
    <section aria-labelledby="titulo-noticias">
      <h2 id="titulo-noticias" className="mb-3 text-lg font-semibold">
        Notícias do IBGE
      </h2>
      {isLoading && <Carregando texto="Carregando notícias..." />}
      {isError && (
        <ErroMensagem mensagem="Não foi possível carregar as notícias." onRetry={() => refetch()} />
      )}
      {data && data.length === 0 && (
        <p className="text-sm text-slate-600">Nenhuma notícia disponível no momento.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((n) => <NoticiaCard key={n.id} noticia={n} />)}
      </div>
    </section>
  )
}
