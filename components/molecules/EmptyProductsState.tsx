import Button from "../atoms/Button";

interface EmptyProductsStateProps {
  searchTerm: string;
  categoryName: string;
  onReset: () => void;
  showResetButton?: boolean;
}

export default function EmptyProductsState({ searchTerm, categoryName, onReset, showResetButton = true }: EmptyProductsStateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 text-center">
      <div className="max-w-md mx-auto">
        <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-4 px-2">
          {searchTerm 
            ? `No hay productos que coincidan con "${searchTerm}"`
            : `No hay productos en la categoría "${categoryName}"`
          }
        </p>
        {showResetButton && (
          <Button onClick={onReset} variant="primary" size="md" className="w-full sm:w-auto">
            {searchTerm ? 'Limpiar búsqueda' : 'Ver todos los productos'}
          </Button>
        )}
      </div>
    </div>
  );
}

