import { ExternalLink } from 'lucide-react'
import type { Noticia } from '../types/ibge'
import { formatarData } from '../utils/formatarData'

interface Props {
  noticia: Noticia
}

export default function NoticiaCard({ noticia }: Props) {
  const data = formatarData(noticia.data_publicacao)
  return (
    <article className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm">
      <time dateTime={data.iso} className="text-xs text-slate-600">
        {data.texto}
      </time>
      <h3 className="font-semibold leading-snug">{noticia.titulo}</h3>
      <p className="line-clamp-3 text-sm text-slate-700">{noticia.introducao}</p>
      <a
        href={noticia.link}
        target="_blank"
        rel="noreferrer"
        className="mt-auto flex items-center gap-1 text-sm font-medium text-emerald-800 hover:underline"
      >
        Ler mais<span className="sr-only">: {noticia.titulo} (abre em nova aba)</span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </article>
  )
}
