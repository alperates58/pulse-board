import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '../types';
import { formatCurrency, getCategoryById } from '../utils/format';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';

interface AnalyticsChartsProps {
  transactions: Transaction[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ transactions }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartTheme = {
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#94a3b8' : '#64748b',
    tooltipBg: isDark ? '#1e293b' : '#ffffff',
    tooltipBorder: isDark ? '#334155' : '#e2e8f0',
  };

  // 1. Monthly aggregated data
  const monthlyData = useMemo(() => {
    const map: { [month: string]: { month: string; income: number; expense: number; net: number } } = {};

    transactions.forEach((tx) => {
      if (!tx.date) return;
      const monthKey = tx.date.substring(0, 7); // "2026-10"
      if (!map[monthKey]) {
        map[monthKey] = { month: monthKey, income: 0, expense: 0, net: 0 };
      }
      if (tx.type === 'income') {
        map[monthKey].income += tx.amount;
      } else {
        map[monthKey].expense += tx.amount;
      }
      map[monthKey].net = map[monthKey].income - map[monthKey].expense;
    });

    const sorted = Object.values(map).sort((a, b) => a.month.localeCompare(b.month));

    // Format month labels nicely, e.g. "Eki 2026"
    return sorted.map((item) => {
      const [year, month] = item.month.split('-');
      const d = new Date(Number(year), Number(month) - 1, 1);
      const label = new Intl.DateTimeFormat('tr-TR', { month: 'short', year: '2-digit' }).format(d);
      return {
        ...item,
        displayMonth: label,
      };
    });
  }, [transactions]);

  // 2. Category distribution for expenses
  const categoryData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const map: { [catId: string]: number } = {};

    expenses.forEach((tx) => {
      map[tx.categoryId] = (map[tx.categoryId] || 0) + tx.amount;
    });

    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

    const list = Object.entries(map).map(([categoryId, value]) => {
      const cat = getCategoryById(categoryId);
      const percent = totalExpense > 0 ? (value / totalExpense) * 100 : 0;
      return {
        name: cat.name,
        value,
        color: cat.color,
        percent,
      };
    });

    // Sort descending by amount
    return list.sort((a, b) => b.value - a.value);
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 rounded-xl shadow-xl border text-xs"
          style={{
            backgroundColor: chartTheme.tooltipBg,
            borderColor: chartTheme.tooltipBorder,
          }}
        >
          <p className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center justify-between space-x-4 py-0.5">
              <span className="flex items-center space-x-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-50">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div
          className="p-2.5 rounded-xl shadow-xl border text-xs"
          style={{
            backgroundColor: chartTheme.tooltipBg,
            borderColor: chartTheme.tooltipBorder,
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.color }} />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{data.name}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between space-x-3 text-slate-600 dark:text-slate-300">
            <span>Tutar:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(data.value)}</span>
          </div>
          <div className="flex items-baseline justify-between space-x-3 text-slate-500 dark:text-slate-400">
            <span>Pay:</span>
            <span>%{data.payload.percent.toFixed(1)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Monthly Trend Area Chart (2 cols) */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                Aylık Gelir & Gider Trendi
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                Dönemsel nakit giriş-çıkış karşılaştırması
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs self-start sm:self-auto">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Gelir</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Gider</span>
            </div>
          </div>
        </div>

        {monthlyData.length === 0 ? (
          <div className="h-56 sm:h-72 flex flex-col items-center justify-center text-slate-400 text-xs">
            Grafik için yeterli veri bulunamadı.
          </div>
        ) : (
          <div className="h-60 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} />
                <XAxis
                  dataKey="displayMonth"
                  stroke={chartTheme.text}
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: chartTheme.grid }}
                />
                <YAxis
                  stroke={chartTheme.text}
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: chartTheme.grid }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Gelir"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#incomeGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  name="Gider"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#expenseGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Category Breakdown Donut / Pie Chart (1 col) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-sm flex flex-col">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex-shrink-0">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              Gider Dağılımı
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Kategori bazlı harcama dağılımı
            </p>
          </div>
        </div>

        {categoryData.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs py-8">
            Harcama kaydı bulunamadı.
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top categories breakdown list */}
            <div className="mt-3 space-y-2 overflow-y-auto max-h-36 pr-1">
              {categoryData.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate text-slate-700 dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 font-medium">
                    <span className="text-slate-500 dark:text-slate-400">%{item.percent.toFixed(0)}</span>
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
