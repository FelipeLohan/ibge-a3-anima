import axios from 'axios'
import type { MetadadosMalha } from '../types/ibge'

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v4/malhas',
  responseType: 'text',
})

export const getMalhaSvgEstado = async (ufId: number): Promise<string> => {
  const { data } = await api.get<string>(`/estados/${ufId}`, {
    params: { intrarregiao: 'municipio', qualidade: 'intermediaria' },
  })
  return data
}

export const getMalhaSvgMunicipio = async (municipioId: number): Promise<string> => {
  const { data } = await api.get<string>(`/municipios/${municipioId}`, {
    params: { qualidade: 'maxima' },
  })
  return data
}

export const getMetadadosMunicipio = async (
  municipioId: number,
): Promise<MetadadosMalha> => {
  const { data } = await api.get<MetadadosMalha[]>(
    `/municipios/${municipioId}/metadados`,
    { responseType: 'json' },
  )
  return data[0]
}
