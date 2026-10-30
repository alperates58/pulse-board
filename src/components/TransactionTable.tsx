import React from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate, getCategoryById } from '../utils/format';
import { Edit2, Trash2, ArrowUpRight, ArrowDownRight, FileText, Inbox } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
  onAddNew: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mb-4">
          <Inbox className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Kayıt Bulunamadı
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Mevcut filtrelere uygun gelir veya gider kaydı bulunamadı. Filtreleri temizleyebilir veya yeni kayıt oluşturabilirsiniz.
        </p>
        <button
          onClick={onAddNew}
          className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Yeni Kayıt Ekle
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Table header for desktop */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3.5 px-4 sm:px-6">İşlem & Açıklama</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Tarih</th>
              <th className="py-3.5 px-4 text-right">Tutar</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
            {transactions.map((tx) => {
              const isIncome = tx.type === 'income';
              const cat = getCategoryById(tx.categoryId);

              return (
                <tr
                  key={tx.id}
                  id={`transaction-row-${tx.id}`}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Title & Notes */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isIncome
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isIncome ? (
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {tx.title}
                        </div>
                        {tx.notes && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center space-x-1 mt-0.5">
                            <FileText className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{tx.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${cat.color}18`,
                        color: cat.color,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-1.5"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 dark:text-slate-300 text-xs">
                    {formatDate(tx.date)}
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <span
                      className={`font-bold tabular-nums text-sm sm:text-base ${
                        isIncome
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        id={`btn-edit-transaction-${tx.id}`}
                        onClick={() => onEdit(tx)}
                        title="Düzenle"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        id={`btn-delete-transaction-${tx.id}`}
                        onClick={() => onDelete(tx)}
                        title="Sil"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 dark:hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
