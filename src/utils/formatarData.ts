export interface DataFormatada {
  texto: string
  iso?: string
}

// A API de notícias devolve "dd/MM/yyyy HH:mm:ss". Converte para exibição e <time dateTime>.
export function formatarData(valor: string): DataFormatada {
  const m = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})/)
  if (m) {
    const [, dd, mm, yyyy] = m
    const data = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
    return {
      iso: `${yyyy}-${mm}-${dd}`,
      texto: data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
    }
  }
  const d = new Date(valor)
  if (Number.isNaN(d.getTime())) return { texto: valor }
  return {
    iso: d.toISOString().slice(0, 10),
    texto: d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
  }
}
