import GraficoFrequencia from '../components/GraficoFrequencia'

export default function Nomes() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Nomes no Brasil</h1>
      <GraficoFrequencia />
    </div>
  )
}
