/**
 * Mapea nombres de colores del backend a códigos hexadecimales
 */
export function mapColorToHex(colorName: string): string {
  const colorMap: { [key: string]: string } = {
    'Negro': '#000000',
    'Black': '#000000',
    'Blanco': '#FFFFFF',
    'White': '#FFFFFF',
    'Gris': '#6B7280',
    'Gray': '#6B7280',
    'Grey': '#6B7280',
    'Azul': '#3B82F6',
    'Blue': '#3B82F6',
    'Verde': '#10B981',
    'Green': '#10B981',
    'Rojo': '#EF4444',
    'Red': '#EF4444',
    'Dorado': '#FBBF24',
    'Gold': '#FBBF24',
    'Plateado': '#9CA3AF',
    'Silver': '#9CA3AF',
    'Rosa': '#EC4899',
    'Pink': '#EC4899',
    'Morado': '#8B5CF6',
    'Purple': '#8B5CF6',
    'Beige': '#F3E8FF',
    'Natural Titanium': '#D1D5DB',
    'Blue Titanium': '#60A5FA',
    'White Titanium': '#F9FAFB',
    'Black Titanium': '#374151',
  };

  // Buscar coincidencia case-insensitive
  const normalizedColor = colorName.trim();
  const lowerColor = normalizedColor.toLowerCase();
  
  // Buscar coincidencia exacta primero
  if (colorMap[normalizedColor]) {
    return colorMap[normalizedColor];
  }
  
  // Buscar coincidencia case-insensitive
  const foundKey = Object.keys(colorMap).find(
    key => key.toLowerCase() === lowerColor
  );
  
  if (foundKey) {
    return colorMap[foundKey];
  }
  
  // Si no se encuentra, retornar un gris por defecto
  return '#6B7280';
}

/**
 * Normaliza el tipo del backend a las categorías permitidas
 */
export function normalizeCondition(tipo: string): 'Nuevo' | 'SemiNuevo' | 'Reacondicionado' {
  const normalized = tipo.toLowerCase().trim();
  
  if (normalized.includes('nuevo') && !normalized.includes('semi')) {
    return 'Nuevo';
  }
  
  if (normalized.includes('semi')) {
    return 'SemiNuevo';
  }
  
  if (normalized.includes('reacondicionado') || normalized.includes('outlet')) {
    return 'Reacondicionado';
  }
  
  // Por defecto
  return 'Reacondicionado';
}

