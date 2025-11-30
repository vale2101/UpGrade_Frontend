"use client";
import { useFicha } from "../../hooks/useFicha";

interface ProductDetailsInfoProps {
  product: any;
  idProducto?: number | string;
}

export default function ProductDetailsInfo({ product, idProducto }: ProductDetailsInfoProps) {
  const { ficha, loading: fichaLoading, error: fichaError } = useFicha(idProducto || null);

  return (
    <>
      {/* Información de la ficha técnica */}
      {ficha && (
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Especificaciones técnicas</h3>
          <div className="space-y-2 sm:space-y-3">
            {ficha.pantalla && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Pantalla:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.pantalla}</span>
              </div>
            )}
            {ficha.procesador && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Procesador:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.procesador}</span>
              </div>
            )}
            {ficha.camara && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Cámara:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.camara}</span>
              </div>
            )}
            {ficha.memoria && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Memoria:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.memoria}</span>
              </div>
            )}
            {ficha.sistemaO && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Sistema Operativo:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.sistemaO}</span>
              </div>
            )}
            {ficha.garantia && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Garantía:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.garantia}</span>
              </div>
            )}
            {ficha.estado && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 sm:w-28 flex-shrink-0">Estado:</span>
                <span className="text-xs sm:text-sm text-gray-600">{ficha.estado}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {fichaLoading && (
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">Cargando especificaciones...</p>
        </div>
      )}

      {fichaError && !fichaLoading && (
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">No se pudieron cargar las especificaciones técnicas</p>
        </div>
      )}

      {/* Descripción adicional si existe */}
      {product.description && (
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Características adicionales si existen */}
      {product.features && product.features.length > 0 && (
        <div className="mt-3 sm:mt-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Características principales</h3>
          <ul className="space-y-1 sm:space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

