# 🎓 ConectaEscola

Sistema escolar em tempo real com backend Node.js + Express + Prisma (PostgreSQL no Neon) e app mobile React Native (Expo SDK 54).

## Estrutura do Projeto

- `backend/`: API REST (MVC), autenticação JWT, Socket.io, Prisma, Zod e bcrypt
- `mobile/`: Aplicativo Expo com React Navigation, Context API e Axios

## Como Rodar o Backend

1. Entre na pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Configure o `.env` com sua `DATABASE_URL` do Neon
4. Gere o cliente Prisma: `npx prisma generate`
5. Rode as migrations: `npx prisma migrate dev --name init`
6. Popule o banco (Seed): `npx prisma db seed`
7. Inicie o servidor: `npm run dev`

> **Nota:** A API rodará em `http://Seu_IP:4000` (ajuste para o seu IP atual).

### Credenciais de Teste (Seed)
- **Admin:** `admin@conectaescola.com` / `123456`
- **Professor:** `ana@conectaescola.com` / `123456`

## 📱 Como Rodar o Mobile

1. Entre na pasta: `cd mobile`
2. **Ajuste o IP:** No arquivo `src/api/client.js`, coloque o IP da sua máquina (Ex: `192.168.10.104`).
3. Instale as dependências: `npm install --force` (Necessário para compatibilidade do React 18 no SDK 54).
4. Inicie o Expo com reset de cache: `npx expo start -c`

## ✨ Funcionalidades
- Controle de permissões (Admin, Professor, Responsável, Aluno)
- Módulos acadêmicos: Notas, Faltas, Atividades e Ocorrências
- Notificações em tempo real com Socket.io
- Dashboard completo para acompanhamento escolar