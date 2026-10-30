import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { KpiOverview } from './components/KpiOverview';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { FilterToolbar } from './components/FilterToolbar';
import { TransactionTable } from './components/TransactionTable';
import { TransactionModal } from './components/TransactionModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { DataModal } from './components/DataModal';
import { FilterState, KPIStats, Transaction } from './types';
import { getStoredTransactions, saveTransactions } from './services/storage';

export const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions());
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    type: 'all',
    categoryId: 'all',
    dateRange: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  // Sync with localStorage
  const refreshFromStorage = useCallback(() => {
    setTransactions(getStoredTransactions());
  }, []);

  // Filter & Sort Logic
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // Search
        if (filter.search.trim()) {
          const query = filter.search.toLowerCase().trim();
          const matchTitle = tx.title.toLowerCase().includes(query);
          const matchNotes = tx.notes ? tx.notes.toLowerCase().includes(query) : false;
          if (!matchTitle && !matchNotes) return false;
        }

        // Type
        if (filter.type !== 'all' && tx.type !== filter.type) {
          return false;
        }

        // Category
        if (filter.categoryId !== 'all' && tx.categoryId !== filter.categoryId) {
          return false;
        }

        // Date range
        if (filter.dateRange !== 'all') {
          const txDate = new Date(tx.date);
          const now = new Date();

          if (filter.dateRange === 'this_month') {
            // Check year and month
            const isSameMonth =
              txDate.getFullYear() === now.getFullYear() &&
              txDate.getMonth() === now.getMonth();
            if (!isSameMonth) return false;
          } else if (filter.dateRange === 'last_30_days') {
            const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (txDate < past30 || txDate > now) return false;
          } else if (filter.dateRange === 'last_90_days') {
            const past90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            if (txDate < past90 || txDate > now) return false;
          } else if (filter.dateRange === 'this_year') {
            if (txDate.getFullYear() !== now.getFullYear()) return false;
          } else if (filter.dateRange === 'custom') {
            if (filter.startDate && tx.date < filter.startDate) return false;
            if (filter.endDate && tx.date > filter.endDate) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const orderMod = filter.sortOrder === 'asc' ? 1 : -1;
        if (filter.sortBy === 'date') {
          return orderMod * (a.date.localeCompare(b.date));
        } else if (filter.sortBy === 'amount') {
          return orderMod * (a.amount - b.amount);
        } else if (filter.sortBy === 'title') {
          return orderMod * (a.title.localeCompare(b.title, 'tr'));
        }
        return 0;
      });
  }, [transactions, filter]);

  // KPI Calculations based on filtered or all transactions
  const stats: KPIStats = useMemo(() => {
    const list = filteredTransactions;
    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    for (const tx of list) {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
        incomeCount += 1;
      } else {
        totalExpense += tx.amount;
        expenseCount += 1;
      }
    }

    const netBalance = totalIncome - totalExpense;
    const savingsRate =
      totalIncome > 0 ? Math.max(0, Math.round((netBalance / totalIncome) * 100)) : 0;
    const totalCount = list.length;
    const avgIncome = incomeCount > 0 ? Math.round(totalIncome / incomeCount) : 0;
    const avgExpense = expenseCount > 0 ? Math.round(totalExpense / expenseCount) : 0;

    return {
      totalIncome,
      totalExpense,
      netBalance,
      savingsRate,
      incomeCount,
      expenseCount,
      totalCount,
      avgIncome,
      avgExpense,
    };
  }, [filteredTransactions]);

  // CRUD Handlers
  const handleSaveTransaction = (
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) => {
    const nowIso = new Date().toISOString();
    let updated: Transaction[];

    if (id) {
      // Edit existing
      updated = transactions.map((t) =>
        t.id === id
          ? {
              ...t,
              ...data,
              updatedAt: nowIso,
            }
          : t
      );
    } else {
      // Create new
      const newTx: Transaction = {
        id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        ...data,
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      updated = [newTx, ...transactions];
    }

    setTransactions(updated);
    saveTransactions(updated);
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingTransaction) return;
    const updated = transactions.filter((t) => t.id !== deletingTransaction.id);
    setTransactions(updated);
    saveTransactions(updated);
    setDeletingTransaction(null);
  };

  const handleOpenEdit = (tx: Transaction) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Header
        onOpenNewModal={handleOpenNew}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        totalTransactionsCount={transactions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* KPI Summary Cards */}
        <KpiOverview stats={stats} />

        {/* Analytics Charts */}
        <AnalyticsCharts transactions={filteredTransactions} />

        {/* Filter and Search Toolbar */}
        <FilterToolbar
          filter={filter}
          onFilterChange={setFilter}
          filteredCount={filteredTransactions.length}
          totalCount={transactions.length}
        />

        {/* Transactions Table */}
        <section aria-label="İşlem Listesi">
          <TransactionTable
            transactions={filteredTransactions}
            onEdit={handleOpenEdit}
            onDelete={(tx) => setDeletingTransaction(tx)}
            onAddNew={handleOpenNew}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">PulseBoard Lite</span>{' '}
            — Kurumsal Düzeyde Analitik Finans Paneli
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sistem Aktif (v1.0.0)</span>
            </span>
            <span>•</span>
            <span>DevHub Production Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        initialTransaction={editingTransaction}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingTransaction)}
        transaction={deletingTransaction}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTransaction(null)}
      />

      <DataModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        onDataChanged={refreshFromStorage}
      />
    </div>
  );
};
