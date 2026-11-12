export default function Sobre() {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <h1 className="text-2xl font-bold">Sobre e acessibilidade</h1>
      <p>
        O DataBrasil Explorer apresenta dados abertos do IBGE: localidades, malhas territoriais,
        frequência de nomes (Censo) e notícias. Os dados vêm das APIs públicas em{' '}
        <a
          className="font-medium text-emerald-800 underline"
          href="https://servicodados.ibge.gov.br/api/docs"
          target="_blank"
          rel="noreferrer"
        >
          servicodados.ibge.gov.br<span className="sr-only"> (abre em nova aba)</span>
        </a>
        .
      </p>

      <h2 className="text-lg font-semibold">Recursos de acessibilidade</h2>
      <ul className="list-disc space-y-1 pl-6">
        <li>Todo o site pode ser usado só com o teclado, com indicador de foco visível.</li>
        <li>Link “Ir para o conteúdo principal” no início de cada página.</li>
        <li>Campos de formulário com rótulos e mensagens de erro anunciadas por leitores de tela.</li>
        <li>Gráfico com descrição textual e tabela de dados equivalente.</li>
        <li>Respeito à preferência por movimento reduzido.</li>
      </ul>

      <h2 className="text-lg font-semibold">Atalhos do mapa</h2>
      <p>Com o foco no mapa do estado:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd>: mover
        </li>
        <li>
          <kbd>+</kbd> / <kbd>-</kbd>: aproximar / afastar
        </li>
        <li>
          <kbd>0</kbd>: restaurar a visualização
        </li>
        <li>Ctrl (ou ⌘) + rolagem do mouse: zoom</li>
      </ul>
      <p>Para escolher um município sem o mouse, use a lista “Município” em Localidades.</p>
    </div>
  )
}
