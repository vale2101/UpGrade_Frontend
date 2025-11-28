import SearchInput from "../atoms/SearchInput";

interface ProductSearchBarProps {
  searchTerm: string;
  onSearchChange: (e: any) => void;
  onClear: () => void;
  resultsCount: number;
}

export default function ProductSearchBar({ searchTerm, onSearchChange, onClear, resultsCount }: ProductSearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 w-full sm:w-auto relative">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Buscar productos..."
            className="pl-8 sm:pl-10 pr-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={onClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="text-sm text-gray-600 text-center sm:text-left">
          {resultsCount} producto{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}

