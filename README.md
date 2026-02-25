# ConectaEscola

Sistema escolar em tempo real com backend Node.js + Express + Prisma/PostgreSQL e app mobile React Native (Expo).

## Estrutura

- `backend/` API REST (MVC), autenticação JWT, Socket.io, Prisma, Zod, bcrypt.
- `mobile/` aplicativo Expo com React Navigation, Context API e Axios.

## Requisitos

- Node.js 18+
- PostgreSQL 14+

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

API em `http://localhost:4000`.

### Credenciais seed

- Admin: `admin@conectaescola.com` / `123456`
- Professor: `ana@conectaescola.com` / `123456`
- Responsável: `carlos@email.com` / `123456`
- Aluno: `marina@email.com` / `123456`

## Mobile

```bash
cd mobile
npm install
npm start
```

No Expo, configure o backend rodando em `http://localhost:4000` (ajuste `mobile/src/api/client.js` para IP da máquina quando necessário).

## Funcionalidades implementadas

- Autenticação: login, cadastro responsável + aluno, recuperação de senha (stub).
- Controle de permissões por perfil: admin, professor, responsável e aluno.
- Módulos: faltas, notas, atividades, provas e ocorrências.
- Dashboard do responsável/aluno com resumo acadêmico.
- Notificações em tempo real com Socket.io para responsáveis.
- Seed com dados iniciais de demonstração.

## Padrão de pastas do backend (MVC)

- `src/controllers`
- `src/services`
- `src/routes`
- `src/middlewares`
- `src/schemas`
- `src/config`
- `src/sockets`
- `src/utils`

## Produção

- Definir variáveis seguras em `.env`.
- Executar migrations em pipeline CI/CD.
- Configurar CORS com domínio real no `CLIENT_URL`.
- Usar HTTPS e rotação de segredo JWT.
