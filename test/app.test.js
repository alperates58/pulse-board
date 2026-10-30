import test from 'node:test';
import assert from 'node:assert/strict';

// Test Category definitions & constants
const CATEGORIES = [
  { id: 'salary', name: 'Maaş & Bordro', type: 'income', color: '#10b981' },
  { id: 'freelance', name: 'Freelance & Danışmanlık', type: 'income', color: '#06b6d4' },
  { id: 'investment', name: 'Yatırım & Temettü', type: 'income', color: '#3b82f6' },
  { id: 'rental', name: 'Kira Geliri', type: 'income', color: '#8b5cf6' },
  { id: 'other_income', name: 'Diğer Gelir', type: 'income', color: '#14b8a6' },
  { id: 'housing', name: 'Kira & Konut', type: 'expense', color: '#ef4444' },
  { id: 'food', name: 'Market & Gıda', type: 'expense', color: '#f97316' },
  { id: 'transport', name: 'Ulaşım & Yakıt', type: 'expense', color: '#eab308' },
  { id: 'utilities', name: 'Faturalar & Abonelik', type: 'expense', color: '#6366f1' },
  { id: 'entertainment', name: 'Eğlence & Sosyal', type: 'expense', color: '#ec4899' },
  { id: 'health', name: 'Sağlık & Bakım', type: 'expense', color: '#14b8a6' },
  { id: 'education', name: 'Eğitim & Kitap', type: 'expense', color: '#a855f7' },
  { id: 'shopping', name: 'Giyim & Elektronik', type: 'expense', color: '#f43f5e' },
  { id: 'other_expense', name: 'Diğer Gider', type: 'expense', color: '#64748b' },
];

function calculateKPIs(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  for (const tx of transactions) {
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
  const totalCount = transactions.length;
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
}

function filterTransactions(transactions, filter) {
  return transactions
    .filter((tx) => {
      if (filter.search && filter.search.trim()) {
        const query = filter.search.toLowerCase().trim();
        const matchTitle = tx.title.toLowerCase().includes(query);
        const matchNotes = tx.notes ? tx.notes.toLowerCase().includes(query) : false;
        if (!matchTitle && !matchNotes) return false;
      }
      if (filter.type && filter.type !== 'all' && tx.type !== filter.type) {
        return false;
      }
      if (filter.categoryId && filter.categoryId !== 'all' && tx.categoryId !== filter.categoryId) {
        return false;
      }
      if (filter.startDate && tx.date < filter.startDate) {
        return false;
      }
      if (filter.endDate && tx.date > filter.endDate) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const order = filter.sortOrder === 'asc' ? 1 : -1;
      if (filter.sortBy === 'amount') return order * (a.amount - b.amount);
      if (filter.sortBy === 'title') return order * a.title.localeCompare(b.title);
      return order * a.date.localeCompare(b.date);
    });
}

test('PulseBoard Lite — KPI calculation test', () => {
  const sample = [
    { id: '1', title: 'Maaş', amount: 50000, type: 'income', categoryId: 'salary', date: '2026-10-01' },
    { id: '2', title: 'Kira', amount: 20000, type: 'expense', categoryId: 'housing', date: '2026-10-02' },
    { id: '3', title: 'Market', amount: 5000, type: 'expense', categoryId: 'food', date: '2026-10-03' },
    { id: '4', title: 'Ek Gelir', amount: 10000, type: 'income', categoryId: 'freelance', date: '2026-10-04' },
  ];

  const kpis = calculateKPIs(sample);
  assert.equal(kpis.totalIncome, 60000);
  assert.equal(kpis.totalExpense, 25000);
  assert.equal(kpis.netBalance, 35000);
  assert.equal(kpis.savingsRate, 58); // 35000 / 60000 = 58.33% -> 58%
  assert.equal(kpis.incomeCount, 2);
  assert.equal(kpis.expenseCount, 2);
  assert.equal(kpis.totalCount, 4);
  assert.equal(kpis.avgIncome, 30000);
  assert.equal(kpis.avgExpense, 12500);
});

test('PulseBoard Lite — Filter by type test', () => {
  const sample = [
    { id: '1', title: 'Maaş', amount: 50000, type: 'income', categoryId: 'salary', date: '2026-10-01' },
    { id: '2', title: 'Kira', amount: 20000, type: 'expense', categoryId: 'housing', date: '2026-10-02' },
    { id: '3', title: 'Market', amount: 5000, type: 'expense', categoryId: 'food', date: '2026-10-03' },
  ];

  const incomeOnly = filterTransactions(sample, { type: 'income', sortBy: 'date', sortOrder: 'desc' });
  assert.equal(incomeOnly.length, 1);
  assert.equal(incomeOnly[0].id, '1');

  const expenseOnly = filterTransactions(sample, { type: 'expense', sortBy: 'date', sortOrder: 'desc' });
  assert.equal(expenseOnly.length, 2);
});

test('PulseBoard Lite — Search filter test', () => {
  const sample = [
    { id: '1', title: 'Ofis Kirası', amount: 15000, type: 'expense', categoryId: 'housing', date: '2026-10-01', notes: 'Levent plaza' },
    { id: '2', title: 'Elektrik Faturası', amount: 1200, type: 'expense', categoryId: 'utilities', date: '2026-10-02', notes: 'Enerjisa' },
  ];

  const searchKira = filterTransactions(sample, { search: 'kira' });
  assert.equal(searchKira.length, 1);
  assert.equal(searchKira[0].id, '1');

  const searchNote = filterTransactions(sample, { search: 'enerjisa' });
  assert.equal(searchNote.length, 1);
  assert.equal(searchNote[0].id, '2');
});

test('PulseBoard Lite — Sorting order test', () => {
  const sample = [
    { id: '1', title: 'B', amount: 100, type: 'expense', categoryId: 'food', date: '2026-10-01' },
    { id: '2', title: 'A', amount: 500, type: 'expense', categoryId: 'food', date: '2026-10-02' },
  ];

  const sortedByAmountDesc = filterTransactions(sample, { sortBy: 'amount', sortOrder: 'desc' });
  assert.equal(sortedByAmountDesc[0].id, '2');

  const sortedByTitleAsc = filterTransactions(sample, { sortBy: 'title', sortOrder: 'asc' });
  assert.equal(sortedByTitleAsc[0].id, '2');
});

test('PulseBoard Lite — Category registry validity test', () => {
  assert.ok(CATEGORIES.length >= 10);
  const incomeCategories = CATEGORIES.filter((c) => c.type === 'income');
  const expenseCategories = CATEGORIES.filter((c) => c.type === 'expense');
  assert.ok(incomeCategories.length > 0);
  assert.ok(expenseCategories.length > 0);
  assert.ok(CATEGORIES.every((c) => c.id && c.name && c.color));
});
