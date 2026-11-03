import { useQuery } from '@tanstack/react-query'
import { getUFs, getUFsPorRegiao } from '../services/ibgeApi'

export function useUFs(regiaoId?: number) {
  return useQuery({
    queryKey: ['ufs', regiaoId ?? 'todas'],
    queryFn: () => (regiaoId ? getUFsPorRegiao(regiaoId) : getUFs()),
    staleTime: Infinity,
  })
}
