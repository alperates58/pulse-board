import React, { useState } from 'react';
import { X, Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { exportTransactionsJSON, importTransactionsJSON, resetTransactionsToDefault } from '../services/storage';

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const DataModal: React.FC<DataModalProps> = ({ isOpen, onClose, onDataChanged }) => {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const dataStr = exportTransactionsJSON();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pulseboard_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setFeedback({ type: 'success', message: 'Veriler başarıyla JSON olarak dışa aktarıldı.' });
    } catch (e: any) {
      setFeedback({ type: 'error', message: 'Dışa aktarma hatası: ' + (e?.message || '') });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importTransactionsJSON(content);
      if (res.success) {
        setFeedback({
          type: 'success',
          message: `${res.count} adet kayıt başarıyla içe aktarıldı.`,
        });
        onDataChanged();
      } else {
        setFeedback({
          type: 'error',
          message: res.error || 'İçe aktarma sırasında bir hata oluştu.',
        });
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Tüm veriler varsayılan demo kayıtlarla değiştirilecek. Onaylıyor musunuz?')) {
      resetTransactionsToDefault();
      setFeedback({ type: 'success', message: 'Demo verileri başarıyla geri yüklendi.' });
      onDataChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] my-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Veri Yönetimi & Yedekleme
          </h2>
          <button
            id="btn-close-data-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto">
          {feedback && (
            <div
              className={`p-3 rounded-xl flex items-center space-x-2 text-xs ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {feedback.type === 'success' ? (
                <Check className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Export */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                JSON Dışa Aktar
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kayıtlarınızı yerel cihazınıza JSON dosyası olarak indirin.
              </p>
            </div>
            <button
              id="btn-export-json"
              onClick={handleExport}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>İndir</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                JSON İçe Aktar
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daha önce yedeklenmiş JSON dosyasını sisteme yükleyin.
              </p>
            </div>
            <label className="cursor-pointer px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 flex items-center space-x-1.5 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Dosya Seç</span>
              <input
                id="input-import-file"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </label>
          </div>

          {/* Reset */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Demo Verilerini Sıfırla
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Orijinal 20 adet örnek gelir ve gider kaydını yeniden yükler.
              </p>
            </div>
            <button
              id="btn-reset-sample-data"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/60 dark:border-amber-800/60 flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
