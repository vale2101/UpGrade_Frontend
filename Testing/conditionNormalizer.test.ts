import { normalizeConditionForBadge } from '../utils/conditionNormalizer';

describe('conditionNormalizer', () => {
  it('debe normalizar "nuevo" a Nuevo', () => {
    expect(normalizeConditionForBadge('nuevo')).toBe('Nuevo');
    expect(normalizeConditionForBadge('NUEVO')).toBe('Nuevo');
    expect(normalizeConditionForBadge('Producto Nuevo')).toBe('Nuevo');
  });

  it('debe normalizar "como nuevo" a Como Nuevo', () => {
    expect(normalizeConditionForBadge('como nuevo')).toBe('Como Nuevo');
    expect(normalizeConditionForBadge('Como Nuevo')).toBe('Como Nuevo');
    expect(normalizeConditionForBadge('COMO NUEVO')).toBe('Como Nuevo');
  });

  it('debe normalizar variantes de "semi nuevo" a Semi Nuevo', () => {
    expect(normalizeConditionForBadge('semi nuevo')).toBe('Semi Nuevo');
    expect(normalizeConditionForBadge('Semi Nuevo')).toBe('Semi Nuevo');
    expect(normalizeConditionForBadge('seminuevo')).toBe('Semi Nuevo');
  });

  it('debe normalizar "outlet" y "reacondicionado" a Outlet', () => {
    expect(normalizeConditionForBadge('outlet')).toBe('Outlet');
    expect(normalizeConditionForBadge('reacondicionado')).toBe('Outlet');
    expect(normalizeConditionForBadge('Producto Outlet')).toBe('Outlet');
    expect(normalizeConditionForBadge('Reacondicionado')).toBe('Outlet');
  });

  it('debe retornar Outlet por defecto para valores desconocidos', () => {
    expect(normalizeConditionForBadge('condicion desconocida')).toBe('Outlet');
    expect(normalizeConditionForBadge('')).toBe('Outlet');
    expect(normalizeConditionForBadge('otra condicion')).toBe('Outlet');
  });
});

