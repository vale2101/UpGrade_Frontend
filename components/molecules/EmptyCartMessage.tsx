export default function EmptyCartMessage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
      <div className="max-w-md mx-auto">
        <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-6">Agrega algunos productos para comenzar tu compra</p>
        <button
          onClick={() => window.location.href = '/promociones'}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto"
        >
          Ver productos
        </button>
      </div>
    </div>
  );
}

