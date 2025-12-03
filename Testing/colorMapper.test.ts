import { mapColorToHex, normalizeCondition } from '../utils/colorMapper';

describe('colorMapper', () => {
  it('debe mapear colores en español a sus valores hex correctos', () => {
    expect(mapColorToHex('Negro')).toBe('#000000');
    expect(mapColorToHex('Blanco')).toBe('#FFFFFF');
    expect(mapColorToHex('Azul')).toBe('#3B82F6');
    expect(mapColorToHex('Rojo')).toBe('#EF4444');
    expect(mapColorToHex('Verde')).toBe('#10B981');
  });

  it('debe mapear colores en inglés a sus valores hex correctos', () => {
    expect(mapColorToHex('Black')).toBe('#000000');
    expect(mapColorToHex('White')).toBe('#FFFFFF');
    expect(mapColorToHex('Blue')).toBe('#3B82F6');
    expect(mapColorToHex('Red')).toBe('#EF4444');
    expect(mapColorToHex('Green')).toBe('#10B981');
  });

  it('debe mapear colores especiales como Titanium', () => {
    expect(mapColorToHex('Natural Titanium')).toBe('#D1D5DB');
    expect(mapColorToHex('Blue Titanium')).toBe('#60A5FA');
    expect(mapColorToHex('White Titanium')).toBe('#F9FAFB');
    expect(mapColorToHex('Black Titanium')).toBe('#374151');
  });

  it('debe ser case insensitive', () => {
    expect(mapColorToHex('NEGRO')).toBe('#000000');
    expect(mapColorToHex('negro')).toBe('#000000');
    expect(mapColorToHex('NegRo')).toBe('#000000');
  });

  it('debe retornar color gris por defecto para colores no reconocidos', () => {
    expect(mapColorToHex('ColorInexistente')).toBe('#6B7280');
    expect(mapColorToHex('')).toBe('#6B7280');
  });
});

