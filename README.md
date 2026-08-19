# Zon7 Core Platform

Quero construir uma plataforma web chamada Zon7 BET.

A aplicação deve ser uma plataforma moderna de apostas com foco em compliance, KYC, responsible gambling e auditoria.

IMPORTANTE:

Não implemente ainda jogos, apostas reais ou meios de pagamento.

Nesta etapa vamos construir a arquitetura, UI, navegação, autenticação e estrutura da plataforma.

A aplicação deve possuir 3 áreas principais:

1. ÁREA PÚBLICA

2. ÁREA DO APOSTADOR

3. PAINEL DE COMPLIANCE / ADMIN

Crie uma arquitetura de componentes escalável e profissional.

ROTAS PÚBLICAS:

/

Landing page institucional

/login

Login

/register

Cadastro

/terms

Termos de Uso

/privacy

Política de Privacidade

/responsible-gambling

Jogo Responsável

ROTAS DO USUÁRIO:

/account

Dashboard

/account/profile

Perfil

/account/verification

KYC / Verificação

/account/limits

Limites

/account/security

Segurança

/account/history

Histórico

ROTAS ADMIN:

/admin

Dashboard administrativo

/admin/users

Usuários

/admin/reviews

Fila de análise

/admin/reviews/:id

Caso de compliance

/admin/audit

Auditoria

/admin/settings

Configurações

Crie também diferentes layouts:

PublicLayout

AccountLayout

AdminLayout

A interface deve ser extremamente moderna, premium e minimalista.

Utilize:

- boa hierarquia visual

- grids

- cards

- tabelas

- status badges

- modais

- drawers

- skeleton loading

- empty states

- error states

- responsive design

Não coloque informações demais na mesma tela.

Todas as telas devem ter excelente UX.

Prepare o sistema para integração futura com backend, Supabase, KYC e FonteData.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://zon7-bet-core.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83083141-b8f7-493e-9107-3dcc77e47707).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
