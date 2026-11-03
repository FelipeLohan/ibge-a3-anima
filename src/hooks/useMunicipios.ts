import { useQuery } from '@tanstack/react-query'
import { getMunicipiosPorUF } from '../services/ibgeApi'

export function useMunicipios(ufId?: number) {
  return useQuery({
    queryKey: ['municipios', ufId],
    queryFn: () => getMunicipiosPorUF(ufId!),
    enabled: !!ufId,
    staleTime: Infinity,
  })
}
