# Zon7 BET — Arquitetura, UI e Navegação (Fase 1)

Plataforma de apostas com foco em compliance, KYC, jogo responsável e auditoria. Nesta fase: arquitetura, layouts, rotas, autenticação simulada e todas as telas em pt-BR. Sem jogos, apostas reais ou pagamentos.

## Direção visual

Dark premium neon, minimalista:
- Fundo `#0A0C0B`, superfícies `#121614`, acento lima `#C6F24E`, texto `#E9F5EC`
- Tokens semânticos em `src/styles.css` (oklch), sem cores hardcoded nos componentes
- Tipografia: display geométrica para títulos + sans neutra para texto; números em tabular
- Densidade controlada: cada tela tem um objetivo principal, resto vai para drawer/modal

## Estrutura de áreas

**Pública** — `/`, `/login`, `/register`, `/terms`, `/privacy`, `/responsible-gambling`
Landing institucional (hero, pilares de compliance, licenciamento, jogo responsável, CTA), páginas legais com sumário lateral e navegação por seções.

**Apostador** — `/account`, `/profile`, `/verification`, `/limits`, `/security`, `/history`
- Dashboard: status da conta, nível de KYC, limites ativos, próximos passos
- Perfil: dados pessoais, endereço, contato
- Verificação: stepper de KYC (documento, selfie, comprovante) com upload simulado e estados pendente/aprovado/recusado
- Limites: depósito, perda, tempo de sessão, autoexclusão e cooling-off (com modal de confirmação e período de espera)
- Segurança: senha, 2FA, sessões ativas, dispositivos
- Histórico: tabela filtrável de eventos da conta com drawer de detalhe

**Compliance/Admin** — `/admin`, `/users`, `/reviews`, `/reviews/:id`, `/audit`, `/settings`
- Dashboard: KPIs de fila, SLA, alertas de risco
- Usuários: tabela com busca, filtros, badges de status/KYC, drawer de perfil
- Fila de análise: casos por prioridade e tipo (KYC, AML, risco)
- Caso: layout de duas colunas — evidências e linha do tempo à esquerda, decisão (aprovar/recusar/pedir info) à direita
- Auditoria: log imutável com filtros por ator, ação e período
- Configurações: regras de risco, limites padrão, integrações (KYC, FonteData) em modo desconectado

## Sistema de UI compartilhado

Componentes reutilizáveis: `StatusBadge`, `DataTable` (busca, filtros, ordenação, paginação), `PageHeader`, `StatCard`, `EmptyState`, `ErrorState`, `Skeleton` por tipo de tela, `ConfirmDialog`, `DetailDrawer`, `Stepper`, `Timeline`.
Todas as telas cobrem os quatro estados: carregando (skeleton), vazio, erro e com dados.

## Autenticação simulada

Contexto de auth no front com sessão em `localStorage`, papéis `apostador` e `compliance`, e um seletor de papel visível apenas em desenvolvimento para navegar entre as áreas. Guardas de rota via layouts `_account` e `_admin` redirecionando para `/login`.

## Preparação para backend

- Dados em camada `src/data/` com tipos e mocks isolados por domínio (usuários, casos, auditoria, limites)
- Acesso via hooks TanStack Query com chaves já definidas, para trocar o mock por Cloud/Supabase sem tocar nas telas
- Tipos de domínio (`KycStatus`, `CaseStatus`, `AuditEvent`, `RiskLevel`) centralizados
- Pontos de integração de KYC e FonteData isolados em adapters com interface estável

## Detalhes técnicos

- TanStack Start com rotas em arquivo: layouts `PublicLayout` (`_public`), `AccountLayout` (`_account`), `AdminLayout` (`_admin`); `/admin/reviews/$id` para o caso
- `src/routes/index.tsx` passa a ser a landing (substitui o placeholder)
- `head()` próprio em cada rota de conteúdo com título e descrição únicos; áreas privadas com `noindex`
- shadcn/ui como base, tokens de tema em `src/styles.css`
- Responsivo: sidebar colapsa em drawer no mobile; tabelas viram cards empilhados
