import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Percent } from 'lucide-react';
import { KPIStats } from '../types';
import { formatCurrency } from '../utils/format';

interface KpiOverviewProps {
  stats: KPIStats;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({ stats }) => {
  const isPositiveBalance = stats.netBalance >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Net Balance */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Net Nakit Durumu
          </span>
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isPositiveBalance
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
            }`}
          >
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <div
            id="kpi-net-balance"
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isPositiveBalance
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {formatCurrency(stats.netBalance)}
          </div>
        </div>

        <div className="mt-2.5 flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span
            className={`inline-flex items-center font-medium px-1.5 py-0.5 rounded text-[11px] mr-1.5 ${
              isPositiveBalance
                ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-rose-100/70 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
            }`}
          >
            {isPositiveBalance ? '+ Fazla' : '- Açık'}
          </span>
          <span>{stats.totalCount} işlem üzerinden hesaplandı</span>
        </div>
      </div>

      {/* 2. Total Income */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Toplam Gelir
          </span>
          <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <div
            id="kpi-total-income"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            {formatCurrency(stats.totalIncome)}
          </div>
        </div>

        <div className="mt-2.5 flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded text-[11px] mr-1.5 bg-teal-100/70 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
            {stats.incomeCount} Tahsilat
          </span>
          <span>Ort. {formatCurrency(stats.avgIncome)}</span>
        </div>
      </div>

      {/* 3. Total Expense */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Toplam Gider
          </span>
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <div
            id="kpi-total-expense"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            {formatCurrency(stats.totalExpense)}
          </div>
        </div>

        <div className="mt-2.5 flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center font-medium px-1.5 py-0.5 rounded text-[11px] mr-1.5 bg-rose-100/70 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
            {stats.expenseCount} Ödeme
          </span>
          <span>Ort. {formatCurrency(stats.avgExpense)}</span>
        </div>
      </div>

      {/* 4. Savings Rate */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Tasarruf Oranı
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <div
            id="kpi-savings-rate"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            %{stats.savingsRate.toFixed(1)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">gelir oranı</span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              stats.savingsRate > 30
                ? 'bg-emerald-500'
                : stats.savingsRate > 0
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(Math.max(stats.savingsRate, 0), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
