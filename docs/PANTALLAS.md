# Pantallas y flujos — TallerFlow

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Clientes | `app/clientes.tsx` | Lista / vista |
| Ficha de cliente/vehículo | `app/ficha-de-cliente-vehiculo.tsx` | Detalle |
| Detalle de orden | `app/detalle-de-orden.tsx` | Detalle |
| Formulario de ítem | `app/formulario-de-item.tsx` | Formulario |
| Reportes | `app/reportes.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Órdenes por estado en columnas o pestañas y entregas de hoy
- **Acciones:** Nueva orden

**Bosquejo**

```
┌──────────────────────────────┐
│ TallerFlow                   │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Clientes                 │
│  ▸ Ficha de cliente/vehíc   │
│  ▸ Detalle de orden         │
│  ▸ Reportes                 │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Órdenes por estado en columnas o pestañas y entregas de hoy |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Clientes

- **Archivo:** `app/clientes.tsx`
- **Qué muestra:** Lista con teléfono y cantidad de vehículos
- **Acciones:** Crear, abrir ficha
- **Historias relacionadas:** HU-01, HU-02, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Clientes                    │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay clientes. Tocá «Crear» para empezar. |
| Con datos | Lista con teléfono y cantidad de vehículos |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Ficha de cliente/vehículo

- **Archivo:** `app/ficha-de-cliente-vehiculo.tsx`
- **Qué muestra:** Datos y historial de órdenes
- **Acciones:** Nueva orden
- **Historias relacionadas:** HU-01, HU-02, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Ficha de cliente/vehícul    │
├──────────────────────────────┤
│ placa                        │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay vehiculos. Tocá «Nueva orden» para empezar. |
| Con datos | Datos y historial de órdenes |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Detalle de orden

- **Archivo:** `app/detalle-de-orden.tsx`
- **Qué muestra:** Estado, descripción, ítems y total
- **Acciones:** Cambiar estado, agregar ítem, PDF, avisar
- **Historias relacionadas:** HU-02, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de orden            │
├──────────────────────────────┤
│ fecha_ingreso                │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay ordenes. Tocá «Cambiar estado» para empezar. |
| Con datos | Estado, descripción, ítems y total |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Formulario de ítem

- **Archivo:** `app/formulario-de-item.tsx`
- **Qué muestra:** Tipo, descripción, cantidad, precio
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-03 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de ítem          │
├──────────────────────────────┤
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Tipo, descripción, cantidad, precio |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Reportes

- **Archivo:** `app/reportes.tsx`
- **Qué muestra:** Ingresos por período y desglose
- **Acciones:** Cambiar período, exportar
- **Historias relacionadas:** HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Reportes                    │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Ingresos por período y desglose |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar clientes y vehículos**

```
agrego su vehículo con placa y modelo  →  queda asociado y aparece en su ficha
```

**HU-02 — Crear órdenes de trabajo**

```
creo una orden  →  queda en estado «recibido» con fecha de ingreso
```

**HU-03 — Agregar mano de obra y repuestos**

```
agrego un repuesto de 2 × 80 Bs y mano de obra de 150 Bs  →  el total muestra 310 Bs
```

**HU-04 — Presupuesto y orden en PDF**

```
toco «Presupuesto PDF»  →  se genera un PDF con datos del taller, cliente, vehículo, ítems y total
```

**HU-05 — Avisar que el vehículo está listo**

```
toco «Avisar al cliente»  →  se abre WhatsApp con el mensaje prellenado
```

**HU-06 — Ver los ingresos del taller**

```
abro Reportes  →  veo el total, la cantidad de órdenes y el desglose mano de obra vs repuestos
```
