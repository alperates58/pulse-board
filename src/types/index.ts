export type TransactionType = 'income' | 'expense';

export interface CategoryDef {
  id: string;
  name: string;
  type: TransactionType;
  color: string; // Tailwind color or hex
  icon: string;
}

export const CATEGORIES: CategoryDef[] = [
  // Income categories
  { id: 'salary', name: 'Maaş & Bordro', type: 'income', color: '#10b981', icon: 'Briefcase' },
  { id: 'freelance', name: 'Freelance & Danışmanlık', type: 'income', color: '#06b6d4', icon: 'Laptop' },
  { id: 'investment', name: 'Yatırım & Temettü', type: 'income', color: '#3b82f6', icon: 'TrendingUp' },
  { id: 'rental', name: 'Kira Geliri', type: 'income', color: '#8b5cf6', icon: 'Home' },
  { id: 'other_income', name: 'Diğer Gelir', type: 'income', color: '#14b8a6', icon: 'PlusCircle' },

  // Expense categories
  { id: 'housing', name: 'Kira & Konut', type: 'expense', color: '#ef4444', icon: 'Home' },
  { id: 'food', name: 'Market & Gıda', type: 'expense', color: '#f97316', icon: 'ShoppingCart' },
  { id: 'transport', name: 'Ulaşım & Yakıt', type: 'expense', color: '#eab308', icon: 'Car' },
  { id: 'utilities', name: 'Faturalar & Abonelik', type: 'expense', color: '#6366f1', icon: 'Zap' },
  { id: 'entertainment', name: 'Eğlence & Sosyal', type: 'expense', color: '#ec4899', icon: 'Film' },
  { id: 'health', name: 'Sağlık & Bakım', type: 'expense', color: '#14b8a6', icon: 'Heart' },
  { id: 'education', name: 'Eğitim & Kitap', type: 'expense', color: '#a855f7', icon: 'BookOpen' },
  { id: 'shopping', name: 'Giyim & Elektronik', type: 'expense', color: '#f43f5e', icon: 'ShoppingBag' },
  { id: 'other_expense', name: 'Diğer Gider', type: 'expense', color: '#64748b', icon: 'MinusCircle' },
];

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // YYYY-MM-DD
  notes?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type SortField = 'date' | 'amount' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  type: 'all' | TransactionType;
  categoryId: string; // 'all' or category id
  dateRange: 'all' | 'this_month' | 'last_30_days' | 'last_90_days' | 'this_year' | 'custom';
  startDate?: string;
  endDate?: string;
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface KPIStats {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  savingsRate: number; // percentage
  incomeCount: number;
  expenseCount: number;
  totalCount: number;
  avgIncome: number;
  avgExpense: number;
}
