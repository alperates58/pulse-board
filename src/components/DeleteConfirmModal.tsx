import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/format';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  transaction,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kaydı Silmek İstediğinize Emin Misiniz?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Bu işlem geri alınamaz. Seçilen kayıt sistemden kalıcı olarak silinecektir:
            </p>
            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {transaction.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {transaction.type === 'income' ? 'Gelir: ' : 'Gider: '}
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {formatCurrency(transaction.amount)}
                </span>
                {' · ' + transaction.date}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            id="btn-cancel-delete"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Vazgeç
          </button>
          <button
            type="button"
            id="btn-confirm-delete"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-md shadow-rose-500/25 flex items-center space-x-1.5 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Evet, Sil</span>
          </button>
        </div>
      </div>
    </div>
  );
};
