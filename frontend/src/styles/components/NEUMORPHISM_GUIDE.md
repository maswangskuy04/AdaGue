# Neumorphism Design System

Reusable neumorphism components dan utilities untuk admin dashboard.

## Instalasi & Setup

### 1. Import CSS Utilities (di `main.jsx`)
```javascript
import './styles/neumorphism.css'
```

### 2. Update `tailwind.config.js`
Pastikan neumorphism.css di-import dalam Tailwind config untuk menggunakan @layer components.

## Penggunaan

### Option 1: Gunakan Component NeumorphismBox
```jsx
import NeumorphismBox from '@/components/NeumorphismBox'

// Simple card
<NeumorphismBox>
  <p>Content</p>
</NeumorphismBox>

// Button with variant
<NeumorphismBox variant="button" rounded="rounded-2xl" padding="px-3 py-2">
  Click me
</NeumorphismBox>

// Custom styling
<NeumorphismBox 
  variant="card" 
  bgColor="bg-blue-50"
  className="text-blue-900"
>
  Custom card
</NeumorphismBox>
```

### Option 2: Gunakan CSS Classes (Recommended untuk perf)
```jsx
// Card
<div className="bg-white rounded-3xl p-3 neo-card">
  Content
</div>

// Button
<button className="bg-white rounded-2xl px-3 py-2 neo-button hover:neo-button-hover transition">
  Click
</button>

// Inset/Embossed
<div className="bg-gray-100 rounded-3xl w-10 h-10 neo-inset flex items-center justify-center">
  A
</div>

// Header
<header className="neo-header">
  Header content
</header>

// Active/Pressed state
<button className="neo-button neo-active">
  Pressed
</button>

// Gradient variant
<button className="bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-3xl neo-gradient">
  Gradient Button
</button>
```

## Available Utilities

| Class | Purpose | Size |
|-------|---------|------|
| `neo-card` | Large card shadow | 8px |
| `neo-button` | Medium button shadow | 6px |
| `neo-inset` | Embossed/pressed effect | inset |
| `neo-header` | Full-width header shadow | 0 8px |
| `neo-button-hover` | Button hover state | 6px (enhanced) |
| `neo-active` | Active/pressed state | inset |
| `neo-gradient` | Gradient button shadow | 0 8px |
| `neo-light` | Subtle neumorphism | 4px |

## Color Variants

### Background Colors untuk Neumorphism
- `bg-white` - Default, cocok untuk semua
- `bg-gray-50` - Sedikit lebih gelap
- `bg-[#e9eaf0]` - Khusus sidebar
- `bg-[#eef1f5]` - Khusus card header

### Text Colors
- `text-gray-900` - Headings/labels
- `text-gray-700` - Body text
- `text-gray-600` - Secondary text
- `text-gray-500` - Tertiary/hints

## Shadow Deep Dive

### Anatomy Neumorphism Shadow
```
shadow-[offsetX_offsetY_blurRadius_rgba(R,G,B,alpha)]
```

**Contoh:**
- `shadow-[8px_8px_20px_rgba(0,0,0,0.12)]` = Dark shadow (bottom-right)
- `inset_2px_2px_4px_rgba(255,255,255,0.8)` = Light inset (top-left)

### Kombinasi Efektif
```
shadow-[darkShadow, insetLightShadow]
```
Menghasilkan efek 3D yang clean.

## Responsive Neumorphism

Gunakan breakpoint Tailwind untuk responsive shadows:
```jsx
<div className="neo-light sm:neo-button lg:neo-card">
  Responsive shadow
</div>
```

## Tips Penggunaan

1. **Gunakan `transition` class** untuk smooth shadow changes
   ```jsx
   <button className="neo-button hover:neo-button-hover transition">Click</button>
   ```

2. **Combine dengan padding** untuk proper spacing
   ```jsx
   <div className="bg-white rounded-3xl p-3 neo-card">
   ```

3. **Untuk buttons**, gunakan `rounded-2xl` bukan `rounded-3xl`

4. **Hover states** - Update shadow pada hover untuk feedback visual

## Contoh Implementasi di Navbar/Sidebar

```jsx
// Before (repetitive)
<button className="shadow-[6px_6px_14px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.8)]">
  Overview
</button>

// After (clean)
<button className="neo-button hover:neo-button-hover">
  Overview
</button>
```

## Custom Variants

Jika perlu shadow custom, tambahkan ke `neumorphism.css`:
```css
@layer components {
  .neo-custom {
    @apply shadow-[10px_10px_25px_rgba(0,0,0,0.15),inset_2px_2px_5px_rgba(255,255,255,0.85)];
  }
}
```

Kemudian gunakan:
```jsx
<div className="neo-custom">
  Custom shadow
</div>
```
