# ConectaEscola Enterprise SaaS

## Stack
- Backend: Node.js, Express, Prisma, PostgreSQL, Redis, Socket.io
- Segurança: JWT access/refresh, bcrypt, helmet, CORS, rate-limit, Zod
- Observabilidade: Winston, auditoria, healthcheck
- Mobile: React Native (Expo) + TypeScript + design system
- Admin Web: React + Vite + Recharts

## Arquitetura
- Multi-tenant por `schoolId`
- MVC + Services + Repository Pattern
- Middlewares globais
- Cache de dashboard no Redis
- Auditoria de ações e login
- Paginação padronizada
- Docker e docker-compose

## Execução local

### 1) Infra
```bash
docker-compose up -d postgres redis
```

### 2) Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name enterprise_init
npx prisma db seed
npm run dev
```

API: `http://localhost:4000/api/v1`

### 3) Mobile
```bash
cd mobile
npm install
npm run web
```

### 4) Admin Web
```bash
npm install
npm run start
```

## Seeds
- SAAS_ADMIN: owner@conectaescola.com / 123456
- SCHOOL_ADMIN: admin@conectaescola.com / 123456
- TEACHER: ana@conectaescola.com / 123456
- PARENT: carlos@email.com / 123456
- STUDENT: marina@email.com / 123456

## Endpoints principais
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/schools` (SAAS_ADMIN)
- `GET /api/v1/dashboard/responsavel/:studentId`
- `GET /api/v1/dashboard/aluno/:studentId/historico`
- `POST /api/v1/academic/grades`
- `POST /api/v1/academic/absences`

## Backup
```bash
cd backend
npm run backup:db
```
