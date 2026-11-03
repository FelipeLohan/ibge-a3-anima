import { useQuery } from '@tanstack/react-query'
import {
  getMalhaSvgEstado,
  getMalhaSvgMunicipio,
  getMetadadosMunicipio,
} from '../services/malhaService'

export function useMalhaEstado(ufId?: number) {
  return useQuery({
    queryKey: ['malha', 'estado', ufId],
    queryFn: () => getMalhaSvgEstado(ufId!),
    enabled: !!ufId,
    staleTime: Infinity,
  })
}

export function useMalhaMunicipio(municipioId?: number) {
  return useQuery({
    queryKey: ['malha', 'municipio', municipioId],
    queryFn: () => getMalhaSvgMunicipio(municipioId!),
    enabled: !!municipioId,
    staleTime: Infinity,
  })
}

export function useMetadadosMunicipio(municipioId?: number) {
  return useQuery({
    queryKey: ['malha', 'metadados', municipioId],
    queryFn: () => getMetadadosMunicipio(municipioId!),
    enabled: !!municipioId,
    staleTime: Infinity,
  })
}
