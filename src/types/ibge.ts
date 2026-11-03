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

export interface MetadadosMalha {
  id: string
  nome: string
  'nivel-geografico': string
  centroide: { longitude: number; latitude: number }
  'regiao-limitrofe': { longitude: number; latitude: number }[]
  // A API devolve a dimensão como string (ex: "218.843")
  area: { dimensao: string; unidade: { id: string; nome: string } }
}
