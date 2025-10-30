# 🏗️ Arquitectura del Proyecto - Programación Molecular y Recursividad

## 📚 Índice
1. [Programación Molecular](#programación-molecular)
2. [Recursividad Implementada](#recursividad-implementada)
3. [Estructura de Componentes](#estructura-de-componentes)
4. [Dashboard del Vendedor](#dashboard-del-vendedor)

---

## 🧬 Programación Molecular

### Principios Implementados

El proyecto sigue los principios de **Atomic Design** (Diseño Atómico):

```
Átomos → Moléculas → Organismos → Templates → Páginas
```

### Jerarquía de Componentes

#### 🔹 **Átomos** (Componentes indivisibles, < 50 líneas)
- `FilterCheckbox.tsx` - Checkbox individual para filtros
- `ModalHeader.tsx` - Header de modales reutilizable
- `DropdownMenuItem.tsx` - Item de menú dropdown
- `MobileMenuButton.tsx` - Botón para abrir menú móvil
- `OrderStatusBadge.tsx` - Badge de estado de pedidos
- `UserInfo.tsx` - Información del usuario
- Y 22 átomos más...

#### 🔸 **Moléculas** (Combinación de 2-5 átomos, 30-100 líneas)
- `FilterGroup.tsx` - Grupo de checkboxes con lógica
- `AuthForm.tsx` - Formulario de autenticación
- `MobileMenuOverlay.tsx` - Overlay del menú móvil
- `RecursiveMenu.tsx` ⭐ - Menú recursivo con subitems
- `OrderCard.tsx` - Tarjeta de pedido completa
- `DashboardHeader.tsx` - Header del dashboard
- Y 29 moléculas más...

#### 🔶 **Organismos** (Componentes complejos, < 120 líneas)
- `Header.tsx` - Navbar principal
- `FilterSidebar.tsx` - Sidebar de filtros
- `VendedorDashboardSection.tsx` - Dashboard completo
- `ProductDetailSection.tsx` - Detalle de producto
- Y 11 organismos más...

---

## 🔄 Recursividad Implementada

### Componente RecursiveMenu

El componente `RecursiveMenu.tsx` implementa **recursividad real** para renderizar menús con niveles infinitos de anidamiento.

#### Estructura de Datos Recursiva

```typescript
export interface MenuItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  subItems?: MenuItem[]; // ⭐ RECURSIÓN: Un item puede contener más items
  onClick?: () => void;
}
```

#### Función Recursiva

```typescript
export default function RecursiveMenu({ items, level = 0, mobile = false }: RecursiveMenuProps) {
  return (
    <div>
      {items.map((item) => (
        <div>
          {/* Renderiza el item actual */}
          <MenuItem {...item} />
          
          {/* ⭐ RECURSIÓN: Si tiene subItems, se llama a sí mismo */}
          {item.subItems && (
            <RecursiveMenu
              items={item.subItems}
              level={level + 1}
              mobile={mobile}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo de Uso: VendedorNavigation

```typescript
const menuItems: MenuItem[] = [
  {
    label: "Productos",
    icon: <Package />,
    subItems: [
      { label: "Todos los Productos" },
      {
        label: "Categorías",
        subItems: [  // ⭐ Nivel 2 de recursión
          { label: "iPhone" },
          { label: "Samsung" },
        ]
      }
    ]
  },
  {
    label: "Configuración",
    subItems: [
      { label: "Perfil" },
      {
        label: "Avanzado",
        subItems: [  // ⭐ Nivel 2 de recursión
          { label: "API Keys" },
          { label: "Webhooks" }
        ]
      }
    ]
  }
];
```

### Ventajas de la Recursividad

1. ✅ **Flexibilidad**: Soporta niveles infinitos de anidamiento
2. ✅ **Mantenibilidad**: Una sola función maneja toda la complejidad
3. ✅ **Escalabilidad**: Agregar nuevos niveles no requiere cambios en el código
4. ✅ **Elegancia**: Solución simple para un problema complejo

---

## 📁 Estructura de Componentes

### Refactorización del Header

**Antes (69 líneas):**
```tsx
// Header.tsx - TODO en un solo archivo
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header>
      <Logo />
      <NavMenu />
      <ActionIcons />
      <button onClick={toggleMenu}>Menu</button>
      
      {/* 50 líneas de overlay del menú móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0">
          {/* Mucho código aquí... */}
        </div>
      )}
    </header>
  );
}
```

**Después (Programación Molecular):**
```tsx
// Header.tsx - 35 líneas, componentes atómicos y moleculares
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header>
      <Logo />                        {/* Átomo */}
      <NavMenu />                     {/* Molécula */}
      <ActionIcons />                 {/* Molécula */}
      <MobileMenuButton />            {/* Átomo */}
      <MobileMenuOverlay />           {/* Molécula */}
    </header>
  );
}
```

**Componentes Extraídos:**
- `MobileMenuButton.tsx` (Átomo) - 17 líneas
- `MobileMenuOverlay.tsx` (Molécula) - 48 líneas

---

## 🎛️ Dashboard del Vendedor

### Integración con MainLayout

El dashboard del vendedor ahora **conserva el navbar** usando `MainLayout`:

```tsx
// app/vendedor/dashboard/page.tsx
export default function VendedorDashboardPage() {
  return (
    <MainLayout>  {/* ⭐ Incluye el Header/Navbar */}
      <VendedorDashboardSection />
    </MainLayout>
  );
}
```

### Estructura Visual

```
┌─────────────────────────────────────┐
│  Header (Navbar con Logo y Menú)   │ ← MainLayout
├─────────────────────────────────────┤
│  DashboardHeader (Vendedor Info)   │ ← VendedorDashboardSection
├─────────────────────────────────────┤
│  Tabs: Productos | Pedidos | Rep.  │
│                                     │
│  Contenido del Tab Activo           │
│                                     │
└─────────────────────────────────────┘
│         Footer                      │ ← MainLayout
└─────────────────────────────────────┘
```

### Componentes del Dashboard

```tsx
VendedorDashboardSection (Organismo)
├── DashboardHeader (Molécula)
│   ├── UserInfo (Átomo)
│   └── LogoutButton (Átomo)
│
└── Tabs (Molécula)
    ├── ProductsTab
    │   ├── VendedorProductForm (Molécula)
    │   │   ├── InputField (Átomo) x4
    │   │   └── Button (Átomo) x2
    │   └── VendedorProductsTable (Molécula)
    │
    ├── OrdersTab
    │   └── VendedorOrdersList (Molécula)
    │       └── OrderCard (Molécula) recursivo
    │           ├── OrderStatusBadge (Átomo)
    │           └── StatusSelect (Átomo)
    │
    └── RepairsTab
        └── VendedorRepairsList (Molécula)
```

---

## 📊 Métricas de Refactorización

### Reducción de Código

| Componente | Antes | Después | Reducción |
|------------|-------|---------|-----------|
| Header | 69 | 35 | -49% |
| FilterSidebar | 296 | 112 | -62% |
| AuthModal | 188 | 84 | -55% |
| UserDropdown | 143 | 60 | -58% |
| VendedorOrdersList | 102 | 28 | -73% |

### Componentes Creados

- **Átomos**: 28 componentes
- **Moléculas**: 35 componentes
- **Organismos**: 15 componentes
- **Total**: 78 componentes modulares y reutilizables

### Características Implementadas

✅ **Programación Molecular** (Atomic Design)
✅ **Recursividad** (RecursiveMenu con niveles infinitos)
✅ **Reutilización** (componentes atómicos en múltiples contextos)
✅ **Mantenibilidad** (componentes < 120 líneas)
✅ **Escalabilidad** (fácil agregar nuevas funcionalidades)

---

## 🚀 Uso de RecursiveMenu

### Ejemplo Básico

```tsx
import RecursiveMenu from '@/components/molecules/RecursiveMenu';

const menuItems = [
  { 
    label: "Dashboard", 
    href: "/dashboard" 
  },
  { 
    label: "Productos",
    subItems: [
      { label: "Lista", href: "/products" },
      { label: "Nuevo", href: "/products/new" }
    ]
  }
];

<RecursiveMenu items={menuItems} />
```

### Ejemplo Avanzado (3 niveles)

```tsx
const advancedMenu = [
  {
    label: "Configuración",
    icon: <Settings />,
    subItems: [
      { label: "General", href: "/settings" },
      {
        label: "Seguridad",
        subItems: [  // Nivel 2
          { label: "Contraseña", href: "/settings/password" },
          {
            label: "2FA",
            subItems: [  // Nivel 3
              { label: "SMS", href: "/settings/2fa/sms" },
              { label: "App", href: "/settings/2fa/app" }
            ]
          }
        ]
      }
    ]
  }
];

<RecursiveMenu items={advancedMenu} />
```

---

## 📝 Conclusión

El proyecto implementa una arquitectura moderna y escalable basada en:

1. **Programación Molecular** - Componentes pequeños y reutilizables
2. **Recursividad** - Menús anidados con niveles infinitos
3. **Separación de Responsabilidades** - Cada componente tiene un propósito único
4. **Mantenibilidad** - Código limpio y fácil de entender

Esta arquitectura permite que el **Dashboard del Vendedor conserve el navbar** manteniendo una estructura modular y escalable.

