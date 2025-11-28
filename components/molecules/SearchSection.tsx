import SearchButton from '../atoms/SearchButton';

interface SearchItem {
  label: string;
  searchQuery: string;
}

interface SearchSectionProps {
  title: string;
  items: SearchItem[];
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchSection({ title, items, onSearch, className = "" }: SearchSectionProps) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 sm:mb-4">{title}</h3>
      <div className="space-y-0.5 sm:space-y-1">
        {items.map((item, index) => (
          <SearchButton
            key={index}
            label={item.label}
            onClick={() => onSearch(item.searchQuery)}
          />
        ))}
      </div>
    </div>
  );
}
