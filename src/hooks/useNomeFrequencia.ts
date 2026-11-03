import { useQuery } from '@tanstack/react-query'
import { getHistoricoNome } from '../services/ibgeApi'

export function useNomeFrequencia(nome: string) {
  return useQuery({
    queryKey: ['nome', nome.trim().toLowerCase()],
    queryFn: () => getHistoricoNome(nome),
    enabled: nome.trim().length > 0,
    staleTime: Infinity,
  })
}
