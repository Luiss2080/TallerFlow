<div align="center">

<img src="docs/assets/logo.svg" alt="TallerFlow" width="96" height="96">

# TallerFlow

**Órdenes de trabajo para talleres mecánicos: historial por vehículo y aviso al cliente por WhatsApp.** Pensado para talleres mecánicos y mecánicos independientes, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Clientes y vehículos con su historial de trabajos.
- Órdenes de trabajo con estado (recibido, en proceso, listo, entregado).
- Items de mano de obra y repuestos con precio.
- Presupuesto y orden en PDF para el cliente.
- Aviso de «vehículo listo» por WhatsApp.
- Ingresos del taller por período.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| PDF | Generación de PDF (expo-print) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `clientes` (id, nombre, telefono)
- `vehiculos` (id, cliente_id, placa, modelo, anio)
- `ordenes` (id, vehiculo_id, fecha_ingreso, estado, diagnostico, total)
- `items_orden` (id, orden_id, descripcion, tipo, cantidad, precio)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Clientes y vehículos
3. Órdenes de trabajo
4. Presupuesto en PDF y avisos
5. Reportes de ingresos

## 📂 Estructura

```
TallerFlow/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/TallerFlow.git
cd TallerFlow
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
