import { getIconComponent, renderIcon } from '../utils/iconMapper';

describe('iconMapper', () => {
  it('debe retornar null cuando iconName es undefined', () => {
    expect(getIconComponent(undefined)).toBeNull();
  });

  it('debe retornar null cuando iconName es string vacío', () => {
    expect(getIconComponent('')).toBeNull();
  });

  it('debe retornar un componente válido para iconos conocidos', () => {
    const WrenchComponent = getIconComponent('wrench');
    expect(WrenchComponent).toBeDefined();
    expect(typeof WrenchComponent).toBe('function');
  });

  it('debe retornar null para iconos no reconocidos', () => {
    expect(getIconComponent('icono-inexistente')).toBeNull();
    expect(getIconComponent('unknown-icon')).toBeNull();
  });

  it('debe renderizar un icono válido con props por defecto', () => {
    const result = renderIcon('star');
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });
});

