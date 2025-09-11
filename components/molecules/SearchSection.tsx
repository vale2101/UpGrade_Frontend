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
  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">{title}</h3>
      <div className="space-y-2">
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
