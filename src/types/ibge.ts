export interface Regiao {
  id: number
  sigla: string
  nome: string
}

export interface UF {
  id: number
  sigla: string
  nome: string
  regiao: Regiao
}

export interface Mesorregiao {
  id: number
  nome: string
  UF: UF
}

export interface Microrregiao {
  id: number
  nome: string
  mesorregiao: Mesorregiao
}

export interface Municipio {
  id: number
  nome: string
  microrregiao: Microrregiao
}

export interface NomePeriodo {
  periodo: string
  frequencia: number
}

export interface NomeFrequencia {
  nome: string
  sexo: string | null
  localidade: string
  res: NomePeriodo[]
}

export interface Noticia {
  id: number
  titulo: string
  introducao: string
  data_publicacao: string
  link: string
  editorias: string
}

export interface NoticiasResponse {
  items: Noticia[]
}
