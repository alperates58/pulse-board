import React from 'react';
import { Search, Filter, RotateCcw, Calendar, ArrowUpDown } from 'lucide-react';
import { CATEGORIES, FilterState, SortField, SortOrder, TransactionType } from '../types';

interface FilterToolbarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  filteredCount: number;
  totalCount: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filter,
  onFilterChange,
  filteredCount,
  totalCount,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, search: e.target.value });
  };

  const handleTypeChange = (type: 'all' | TransactionType) => {
    onFilterChange({ ...filter, type, categoryId: 'all' });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, categoryId: e.target.value });
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      dateRange: e.target.value as FilterState['dateRange'],
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
    onFilterChange({
      ...filter,
      sortBy: field,
      sortOrder: order,
    });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      type: 'all',
      categoryId: 'all',
      dateRange: 'all',
      startDate: undefined,
      endDate: undefined,
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const isFiltered =
    filter.search.trim() !== '' ||
    filter.type !== 'all' ||
    filter.categoryId !== 'all' ||
    filter.dateRange !== 'all' ||
    Boolean(filter.startDate) ||
    Boolean(filter.endDate);

  const availableCategories =
    filter.type === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.type === filter.type);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top row: Search input & Type pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="filter-search-input"
            type="text"
            value={filter.search}
            onChange={handleSearch}
            placeholder="İşlem adı, açıklama veya notlarda ara..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Type pills: All, Income, Expense */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 self-start sm:self-auto">
          <button
            id="btn-filter-type-all"
            onClick={() => handleTypeChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter.type === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tümü
          </button>
          <button
            id="btn-filter-type-income"
            onClick={() => handleTypeChange('income')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
              filter.type === 'income'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" />
            <span>Gelirler</span>
          </button>
          <button
            id="btn-filter-type-expense"
            onClick={() => handleTypeChange('expense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
              filter.type === 'expense'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-300 inline-block" />
            <span>Giderler</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Category, Date Range, Sort and Clear Filters */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
        {/* Category dropdown */}
        <div className="flex items-center space-x-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <select
            id="filter-category-select"
            value={filter.categoryId}
            onChange={handleCategoryChange}
            aria-label="Kategori Filtresi"
            className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Kategoriler</option>
            {availableCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type === 'income' ? 'Gelir' : 'Gider'})
              </option>
            ))}
          </select>
        </div>

        {/* Date Range dropdown */}
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <select
            id="filter-date-select"
            value={filter.dateRange}
            onChange={handleDateRangeChange}
            aria-label="Tarih Aralığı Filtresi"
            className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tüm Zamanlar</option>
            <option value="this_month">Bu Ay (Ekim 2026)</option>
            <option value="last_30_days">Son 30 Gün</option>
            <option value="last_90_days">Son 90 Gün</option>
            <option value="this_year">Bu Yıl (2026)</option>
            <option value="custom">Özel Tarih Aralığı...</option>
          </select>
        </div>

        {/* Custom date range inputs */}
        {filter.dateRange === 'custom' && (
          <div className="flex items-center space-x-1.5">
            <input
              type="date"
              id="filter-custom-start"
              value={filter.startDate || ''}
              onChange={(e) => onFilterChange({ ...filter, startDate: e.target.value })}
              className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              id="filter-custom-end"
              value={filter.endDate || ''}
              onChange={(e) => onFilterChange({ ...filter, endDate: e.target.value })}
              className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Sort dropdown */}
        <div className="flex items-center space-x-1.5 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <select
            id="filter-sort-select"
            value={`${filter.sortBy}-${filter.sortOrder}`}
            onChange={handleSortChange}
            aria-label="Sıralama Seçimi"
            className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="date-desc">En Yeni Tarih</option>
            <option value="date-asc">En Eski Tarih</option>
            <option value="amount-desc">En Yüksek Tutar</option>
            <option value="amount-asc">En Düşük Tutar</option>
            <option value="title-asc">Başlık (A-Z)</option>
          </select>
        </div>

        {/* Clear filters button */}
        {isFiltered && (
          <button
            id="btn-filter-reset"
            onClick={handleReset}
            className="py-1.5 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 flex items-center space-x-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Filtreleri Temizle</span>
          </button>
        )}

        {/* Result counter badge */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {filteredCount === totalCount ? (
            <span>Toplam {totalCount} kayıt listeleniyor</span>
          ) : (
            <span>
              {filteredCount} / {totalCount} kayıt eşleşti
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
