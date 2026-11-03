import { useQuery } from '@tanstack/react-query'
import { getNoticias } from '../services/ibgeApi'

export function useNoticias(qtd = 6) {
  return useQuery({
    queryKey: ['noticias', qtd],
    queryFn: () => getNoticias(qtd),
  })
}
