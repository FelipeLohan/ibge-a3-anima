import { useQuery } from '@tanstack/react-query'
import { getRegioes } from '../services/ibgeApi'

export function useRegioes() {
  return useQuery({
    queryKey: ['regioes'],
    queryFn: getRegioes,
    staleTime: Infinity,
  })
}
