import { lazy, Suspense, useEffect, useRef } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Carregando from './components/Carregando'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'

// Recharts é pesado: só carrega ao abrir a página de nomes.
const Nomes = lazy(() => import('./pages/Nomes'))

const TITULOS: Record<string, string> = {
  '/': 'Localidades e notícias',
  '/nomes': 'Nomes no Brasil',
  '/sobre': 'Sobre e acessibilidade',
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium ${
    isActive ? 'bg-white text-emerald-900' : 'text-white hover:bg-emerald-800'
  }`

function App() {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  const primeira = useRef(true)

  // Atualiza o título e move o foco ao trocar de rota (WCAG 2.4.2 e 2.4.3)
  useEffect(() => {
    document.title = `${TITULOS[pathname] ?? 'Página não encontrada'} · DataBrasil Explorer`
    if (primeira.current) {
      primeira.current = false
      return
    }
    main.current?.focus()
  }, [pathname])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-emerald-900"
      >
        Ir para o conteúdo principal
      </a>

      <header className="bg-emerald-800 px-6 py-5 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-bold">DataBrasil Explorer</p>
            <p className="text-sm text-emerald-50">
              Painel demográfico e econômico com dados abertos do IBGE
            </p>
          </div>
          <nav aria-label="Principal" className="flex gap-1">
            <NavLink to="/" end className={linkClass}>
              Início
            </NavLink>
            <NavLink to="/nomes" className={linkClass}>
              Nomes
            </NavLink>
            <NavLink to="/sobre" className={linkClass}>
              Sobre
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="conteudo" ref={main} tabIndex={-1} className="mx-auto max-w-5xl p-6 outline-none">
        <Suspense fallback={<Carregando texto="Carregando página..." />}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/nomes" element={<Nomes />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route
              path="*"
              element={
                <div>
                  <h1 className="mb-2 text-2xl font-bold">Página não encontrada</h1>
                  <NavLink to="/" className="font-medium text-emerald-800 underline">
                    Voltar ao início
                  </NavLink>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <footer className="mx-auto max-w-5xl px-6 pb-6 text-sm text-slate-600">
        Fonte: IBGE — Serviço de Dados (servicodados.ibge.gov.br)
      </footer>
    </div>
  )
}

export default App
