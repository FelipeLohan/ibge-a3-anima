interface Props {
  texto?: string
}

export default function Carregando({ texto = 'Carregando...' }: Props) {
  return (
    <p role="status" className="text-sm text-slate-600">
      {texto}
    </p>
  )
}
