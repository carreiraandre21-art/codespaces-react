import './App.css';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const trend = [
  { month: 'Jan', media: 7.8, faltas: 3 },
  { month: 'Fev', media: 8.1, faltas: 2 },
  { month: 'Mar', media: 8.4, faltas: 1 },
  { month: 'Abr', media: 8.3, faltas: 2 },
  { month: 'Mai', media: 8.7, faltas: 1 },
];

const plans = [
  { name: 'Free', value: 4 },
  { name: 'Pro', value: 11 },
  { name: 'Enterprise', value: 3 },
];

export default function App() {
  return (
    <div className="admin-app">
      <header className="hero">
        <div>
          <h1>ConectaEscola SaaS</h1>
          <p>Painel admin multi-escola com monitoramento, analytics e operacao enterprise.</p>
        </div>
        <button>Exportar relatorio PDF</button>
      </header>

      <section className="cards">
        <article><h3>Escolas ativas</h3><strong>18</strong></article>
        <article><h3>Alunos ativos</h3><strong>12.430</strong></article>
        <article><h3>Risco academico</h3><strong>6.2%</strong></article>
        <article><h3>Uptime API</h3><strong>99.97%</strong></article>
      </section>

      <section className="charts">
        <article>
          <h3>Desempenho geral</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="mediaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="media" stroke="#2563eb" fillOpacity={1} fill="url(#mediaGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article>
          <h3>Distribuicao de planos</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={plans} dataKey="value" nameKey="name" outerRadius={80} fill="#2563eb" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="table-wrap">
        <h3>Gestao de escolas</h3>
        <table>
          <thead>
            <tr><th>Escola</th><th>Plano</th><th>Status</th><th>Ultima atividade</th></tr>
          </thead>
          <tbody>
            <tr><td>Jean Piaget</td><td>PRO</td><td><span className="ok">Ativa</span></td><td>2 min</td></tr>
            <tr><td>Colegio Delta</td><td>Enterprise</td><td><span className="ok">Ativa</span></td><td>6 min</td></tr>
            <tr><td>Instituto Futuro</td><td>Free</td><td><span className="warn">Trial</span></td><td>18 min</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
