import { Transaction } from '../types';

const STORAGE_KEY = 'pulseboard_transactions_v1';

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Aylık Yazılım Mühendisliği Maaşı',
    amount: 85000,
    type: 'income',
    categoryId: 'salary',
    date: '2026-10-01',
    notes: 'Net maaş + kıdem tazminatı avansı',
    createdAt: '2026-10-01T09:00:00.000Z',
    updatedAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 'tx-2',
    title: 'Ofis ve Konut Kirası',
    amount: 28500,
    type: 'expense',
    categoryId: 'housing',
    date: '2026-10-03',
    notes: 'Kira bedeli ve aidat ödemesi',
    createdAt: '2026-10-03T10:00:00.000Z',
    updatedAt: '2026-10-03T10:00:00.000Z',
  },
  {
    id: 'tx-3',
    title: 'Mobil Uygulama UI/UX Tasarım Danışmanlığı',
    amount: 32000,
    type: 'income',
    categoryId: 'freelance',
    date: '2026-10-08',
    notes: 'Fintech projesi 1. sprint teslim hakedişi',
    createdAt: '2026-10-08T14:30:00.000Z',
    updatedAt: '2026-10-08T14:30:00.000Z',
  },
  {
    id: 'tx-4',
    title: 'Haftalık Süpermarket ve Şarküteri Alışverişi',
    amount: 4650,
    type: 'expense',
    categoryId: 'food',
    date: '2026-10-10',
    notes: 'Organik gıda ve temel tüketim',
    createdAt: '2026-10-10T16:15:00.000Z',
    updatedAt: '2026-10-10T16:15:00.000Z',
  },
  {
    id: 'tx-5',
    title: 'Borsa Portföy Temettü Geliri',
    amount: 9400,
    type: 'income',
    categoryId: 'investment',
    date: '2026-10-12',
    notes: 'BIST30 çeyreklik temettü ödemeleri',
    createdAt: '2026-10-12T11:00:00.000Z',
    updatedAt: '2026-10-12T11:00:00.000Z',
  },
  {
    id: 'tx-6',
    title: 'Elektrik, Fiber İnternet ve Su Faturaları',
    amount: 2850,
    type: 'expense',
    categoryId: 'utilities',
    date: '2026-10-14',
    notes: 'Aylık ev ve stüdyo tüketimleri',
    createdAt: '2026-10-14T12:00:00.000Z',
    updatedAt: '2026-10-14T12:00:00.000Z',
  },
  {
    id: 'tx-7',
    title: 'Akaryakıt & Otoyol Geçişleri',
    amount: 3400,
    type: 'expense',
    categoryId: 'transport',
    date: '2026-10-18',
    notes: 'Şehir içi ve otoyol masrafları',
    createdAt: '2026-10-18T18:00:00.000Z',
    updatedAt: '2026-10-18T18:00:00.000Z',
  },
  {
    id: 'tx-8',
    title: 'Kadıköy Daire Kira Geliri',
    amount: 22000,
    type: 'income',
    categoryId: 'rental',
    date: '2026-10-20',
    notes: 'Ekim ayı kira tahsilatı',
    createdAt: '2026-10-20T09:30:00.000Z',
    updatedAt: '2026-10-20T09:30:00.000Z',
  },
  {
    id: 'tx-9',
    title: 'Tiyatro & Konser Etkinlik Biletleri',
    amount: 2200,
    type: 'expense',
    categoryId: 'entertainment',
    date: '2026-10-22',
    notes: 'Hafta sonu caz festivali',
    createdAt: '2026-10-22T20:00:00.000Z',
    updatedAt: '2026-10-22T20:00:00.000Z',
  },
  {
    id: 'tx-10',
    title: 'Yıllık Özel Sağlık Sigortası Primi',
    amount: 8900,
    type: 'expense',
    categoryId: 'health',
    date: '2026-10-25',
    notes: 'Tamamlayıcı sağlık poliçesi taksiti',
    createdAt: '2026-10-25T11:45:00.000Z',
    updatedAt: '2026-10-25T11:45:00.000Z',
  },
  {
    id: 'tx-11',
    title: 'Yazılım Mimarlığı ve Bulut Eğitimi',
    amount: 4500,
    type: 'expense',
    categoryId: 'education',
    date: '2026-10-27',
    notes: 'AWS & Kubernetes sertifikasyon kursu',
    createdAt: '2026-10-27T15:00:00.000Z',
    updatedAt: '2026-10-27T15:00:00.000Z',
  },
  {
    id: 'tx-12',
    title: 'Elektronik Donanım & Klavye Aksesuar',
    amount: 3800,
    type: 'expense',
    categoryId: 'shopping',
    date: '2026-10-28',
    notes: 'Ergonomik mekanik klavye',
    createdAt: '2026-10-28T16:20:00.000Z',
    updatedAt: '2026-10-28T16:20:00.000Z',
  },
  // September data for trend charts
  {
    id: 'tx-13',
    title: 'Eylül Ayı Maaş Ödemesi',
    amount: 85000,
    type: 'income',
    categoryId: 'salary',
    date: '2026-09-01',
    notes: 'Eylül net maaş',
    createdAt: '2026-09-01T09:00:00.000Z',
    updatedAt: '2026-09-01T09:00:00.000Z',
  },
  {
    id: 'tx-14',
    title: 'Eylül Konut Kirası',
    amount: 28500,
    type: 'expense',
    categoryId: 'housing',
    date: '2026-09-03',
    notes: 'Eylül kira',
    createdAt: '2026-09-03T10:00:00.000Z',
    updatedAt: '2026-09-03T10:00:00.000Z',
  },
  {
    id: 'tx-15',
    title: 'Eylül Freelance Web Geliştirme',
    amount: 27500,
    type: 'income',
    categoryId: 'freelance',
    date: '2026-09-15',
    notes: 'E-ticaret entegrasyonu',
    createdAt: '2026-09-15T14:00:00.000Z',
    updatedAt: '2026-09-15T14:00:00.000Z',
  },
  {
    id: 'tx-16',
    title: 'Eylül Genel Market & Yaşam Masrafları',
    amount: 14200,
    type: 'expense',
    categoryId: 'food',
    date: '2026-09-20',
    notes: 'Eylül ayı mutfak giderleri',
    createdAt: '2026-09-20T17:00:00.000Z',
    updatedAt: '2026-09-20T17:00:00.000Z',
  },
  // August data for trend charts
  {
    id: 'tx-17',
    title: 'Ağustos Ayı Maaş Ödemesi',
    amount: 82000,
    type: 'income',
    categoryId: 'salary',
    date: '2026-08-01',
    notes: 'Ağustos net maaş',
    createdAt: '2026-08-01T09:00:00.000Z',
    updatedAt: '2026-08-01T09:00:00.000Z',
  },
  {
    id: 'tx-18',
    title: 'Ağustos Konut Kirası',
    amount: 28500,
    type: 'expense',
    categoryId: 'housing',
    date: '2026-08-03',
    notes: 'Ağustos kira',
    createdAt: '2026-08-03T10:00:00.000Z',
    updatedAt: '2026-08-03T10:00:00.000Z',
  },
  {
    id: 'tx-19',
    title: 'Yaz Tatili ve Seyahat Harcamaları',
    amount: 24500,
    type: 'expense',
    categoryId: 'entertainment',
    date: '2026-08-15',
    notes: 'Ege rotası konaklama & ulaşım',
    createdAt: '2026-08-15T19:00:00.000Z',
    updatedAt: '2026-08-15T19:00:00.000Z',
  },
  {
    id: 'tx-20',
    title: 'Ağustos Ek Danışmanlık Geliri',
    amount: 18000,
    type: 'income',
    categoryId: 'freelance',
    date: '2026-08-25',
    notes: 'Sistem mimarisi denetimi',
    createdAt: '2026-08-25T11:00:00.000Z',
    updatedAt: '2026-08-25T11:00:00.000Z',
  },
];

export function getStoredTransactions(): Transaction[] {
  if (typeof window === 'undefined') return SAMPLE_TRANSACTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First run: save sample transactions
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TRANSACTIONS));
      return SAMPLE_TRANSACTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return SAMPLE_TRANSACTIONS;
  } catch (err) {
    console.error('Failed to parse stored transactions:', err);
    return SAMPLE_TRANSACTIONS;
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (err) {
    console.error('Failed to save transactions to localStorage:', err);
  }
}

export function exportTransactionsJSON(): string {
  const transactions = getStoredTransactions();
  return JSON.stringify(transactions, null, 2);
}

export function importTransactionsJSON(jsonString: string): { success: boolean; count?: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, error: 'İçe aktarılan dosya geçerli bir kayıt listesi içermiyor.' };
    }
    // Basic validation
    const valid = parsed.every(
      (item) => item && typeof item.id === 'string' && typeof item.title === 'string' && typeof item.amount === 'number'
    );
    if (!valid) {
      return { success: false, error: 'Veri yapısı uyumsuz: Bazı alanlar eksik veya geçersiz.' };
    }
    saveTransactions(parsed);
    return { success: true, count: parsed.length };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Geçersiz JSON formatı' };
  }
}

export function resetTransactionsToDefault(): Transaction[] {
  saveTransactions(SAMPLE_TRANSACTIONS);
  return SAMPLE_TRANSACTIONS;
}
