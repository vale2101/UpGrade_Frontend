/**
 * Normaliza el tipo del producto para mostrarlo en el ConditionBadge
 * Mapea los valores del backend a los tipos esperados por el badge
 */
export function normalizeConditionForBadge(condition: string): "Nuevo" | "Como Nuevo" | "Outlet" | "Semi Nuevo" {
  const normalized = condition.toLowerCase().trim();
  
  if (normalized.includes('nuevo') && !normalized.includes('semi') && !normalized.includes('como')) {
    return "Nuevo";
  }
  
  if (normalized.includes('como nuevo')) {
    return "Como Nuevo";
  }
  
  if (normalized.includes('semi')) {
    return "Semi Nuevo";
  }
  
  if (normalized.includes('outlet') || normalized.includes('reacondicionado')) {
    return "Outlet";
  }
  
  return "Outlet";
}

