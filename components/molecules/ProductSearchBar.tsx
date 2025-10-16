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
        <div className="flex-1 w-full sm:w-auto">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            onClear={onClear}
            placeholder="Buscar productos..."
          />
        </div>
        <div className="text-sm text-gray-600 text-center sm:text-left">
          {resultsCount} producto{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}

