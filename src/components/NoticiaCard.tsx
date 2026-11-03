import { ExternalLink } from 'lucide-react'
import type { Noticia } from '../types/ibge'

interface Props {
  noticia: Noticia
}

export default function NoticiaCard({ noticia }: Props) {
  return (
    <article className="flex flex-col gap-2 rounded-xl bg-white p-4 shadow-sm">
      <span className="text-xs text-slate-500">{noticia.data_publicacao}</span>
      <h3 className="font-semibold leading-snug">{noticia.titulo}</h3>
      <p className="line-clamp-3 text-sm text-slate-600">{noticia.introducao}</p>
      <a
        href={noticia.link}
        target="_blank"
        rel="noreferrer"
        className="mt-auto flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline"
      >
        Ler mais <ExternalLink size={14} />
      </a>
    </article>
  )
}
