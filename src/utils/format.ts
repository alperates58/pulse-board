import { CATEGORIES, CategoryDef } from '../types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function getCategoryById(id: string): CategoryDef {
  const found = CATEGORIES.find((c) => c.id === id);
  if (found) return found;
  return {
    id,
    name: 'Diğer',
    type: 'expense',
    color: '#94a3b8',
    icon: 'MoreHorizontal',
  };
}
