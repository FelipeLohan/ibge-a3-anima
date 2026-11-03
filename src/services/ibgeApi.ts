import axios from 'axios'
import type {
  Municipio,
  NomeFrequencia,
  Noticia,
  NoticiasResponse,
  Regiao,
  UF,
} from '../types/ibge'

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api',
})

export const getRegioes = async (): Promise<Regiao[]> => {
  const { data } = await api.get<Regiao[]>('/v1/localidades/regioes?orderBy=nome')
  return data
}

export const getUFs = async (): Promise<UF[]> => {
  const { data } = await api.get<UF[]>('/v1/localidades/estados?orderBy=nome')
  return data
}

export const getUFsPorRegiao = async (regiaoId: number): Promise<UF[]> => {
  const { data } = await api.get<UF[]>(
    `/v1/localidades/regioes/${regiaoId}/estados?orderBy=nome`,
  )
  return data
}

export const getMunicipiosPorUF = async (ufId: number): Promise<Municipio[]> => {
  const { data } = await api.get<Municipio[]>(
    `/v1/localidades/estados/${ufId}/municipios?orderBy=nome`,
  )
  return data
}

export const getHistoricoNome = async (nome: string): Promise<NomeFrequencia[]> => {
  const { data } = await api.get<NomeFrequencia[]>(
    `/v2/censos/nomes/${encodeURIComponent(nome.trim().toLowerCase())}`,
  )
  return data
}

export const getNoticias = async (qtd = 6): Promise<Noticia[]> => {
  const { data } = await api.get<NoticiasResponse>('/v3/noticias/', {
    params: { qtd },
  })
  return data.items
}
