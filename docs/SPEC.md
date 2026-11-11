# Especificación del MVP — TallerFlow

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que el taller sepa qué auto está en qué estado, cuánto se le cobra al cliente y cuándo avisarle que está listo.

**Problema:** Las órdenes se anotan en hojas o en la memoria del mecánico; se pierden repuestos sin cobrar, los clientes llaman a preguntar y no hay historial por vehículo.

**Cómo se resuelve hoy:** Hojas sueltas, cuaderno y llamadas.

**Usuario objetivo:** Dueño de un taller mecánico pequeño o mecánico independiente que atiende 3 a 15 autos por semana.

**Métricas de éxito del MVP:**

- Crear una orden de trabajo en menos de 1 minuto.
- Entregar un presupuesto en PDF al cliente en el mismo momento.
- Avisar por WhatsApp que el vehículo está listo con un toque.

## 2. Alcance del MVP

### Incluido

- Clientes y vehículos con su historial de trabajos.
- Órdenes de trabajo con estado (recibido, en proceso, listo, entregado).
- Items de mano de obra y repuestos con precio.
- Presupuesto y orden en PDF para el cliente.
- Aviso de «vehículo listo» por WhatsApp.
- Ingresos del taller por período.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Una orden pasa por estos estados en orden: recibido, en proceso, listo, entregado.
- **RN-02** Una orden entregada no se puede editar; solo se consulta.
- **RN-03** Cada ítem es de tipo mano de obra o repuesto, con cantidad y precio unitario.
- **RN-04** Total de la orden = suma de cantidad × precio unitario de sus ítems.
- **RN-05** Una orden pertenece a un vehículo y un vehículo a un cliente.
- **RN-06** El presupuesto puede emitirse antes de empezar el trabajo y se numera por orden.
- **RN-07** Los ingresos del taller cuentan las órdenes entregadas dentro del período.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar clientes y vehículos

**Como** dueño del taller **quiero** cargar clientes con sus vehículos **para** tener historial por auto.

**Fase:** 2 — Clientes y vehículos

**Criterios de aceptación:**

1. **Dado:** un cliente nuevo. **Cuando:** agrego su vehículo con placa y modelo. **Entonces:** queda asociado y aparece en su ficha.
2. **Dado:** una placa ya registrada. **Cuando:** intento cargarla otra vez. **Entonces:** la app avisa y ofrece abrir el vehículo existente.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Crear órdenes de trabajo

**Como** dueño del taller **quiero** abrir una orden con estado y descripción del problema **para** no perder ningún auto de vista.

**Fase:** 3 — Órdenes de trabajo

**Criterios de aceptación:**

1. **Dado:** un vehículo registrado. **Cuando:** creo una orden. **Entonces:** queda en estado «recibido» con fecha de ingreso.
2. **Dado:** una orden en «entregado». **Cuando:** intento editarla. **Entonces:** solo puedo verla.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Agregar mano de obra y repuestos

**Como** dueño del taller **quiero** agregar ítems con precio **para** cobrar todo lo que corresponde.

**Fase:** 3 — Órdenes de trabajo

**Criterios de aceptación:**

1. **Dado:** una orden abierta. **Cuando:** agrego un repuesto de 2 × 80 Bs y mano de obra de 150 Bs. **Entonces:** el total muestra 310 Bs.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Presupuesto y orden en PDF

**Como** dueño del taller **quiero** generar un PDF para el cliente **para** dar un documento claro.

**Fase:** 4 — Presupuesto en PDF y avisos

**Criterios de aceptación:**

1. **Dado:** una orden con ítems. **Cuando:** toco «Presupuesto PDF». **Entonces:** se genera un PDF con datos del taller, cliente, vehículo, ítems y total.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Avisar que el vehículo está listo

**Como** dueño del taller **quiero** enviar un aviso por WhatsApp **para** que el cliente venga a retirar.

**Fase:** 4 — Presupuesto en PDF y avisos

**Criterios de aceptación:**

1. **Dado:** una orden que paso a «listo». **Cuando:** toco «Avisar al cliente». **Entonces:** se abre WhatsApp con el mensaje prellenado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Ver los ingresos del taller

**Como** dueño del taller **quiero** ver ingresos por período **para** saber cómo va el negocio.

**Fase:** 5 — Reportes de ingresos

**Criterios de aceptación:**

1. **Dado:** órdenes entregadas este mes. **Cuando:** abro Reportes. **Entonces:** veo el total, la cantidad de órdenes y el desglose mano de obra vs repuestos.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Órdenes por estado en columnas o pestañas y entregas de hoy | Nueva orden |
| Clientes | Lista con teléfono y cantidad de vehículos | Crear, abrir ficha |
| Ficha de cliente/vehículo | Datos y historial de órdenes | Nueva orden |
| Detalle de orden | Estado, descripción, ítems y total | Cambiar estado, agregar ítem, PDF, avisar |
| Formulario de ítem | Tipo, descripción, cantidad, precio | Guardar |
| Reportes | Ingresos por período y desglose | Cambiar período, exportar |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `clientes`

Dueños de los vehículos.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |

### `vehiculos`

Autos de cada cliente.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `cliente_id` | INTEGER | Obligatorio; Referencia a clientes (se borra en cascada) |
| `placa` | TEXT | Obligatorio |
| `modelo` | TEXT | Opcional |
| `anio` | INTEGER | Opcional |

### `ordenes`

Orden de trabajo con su estado.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `vehiculo_id` | INTEGER | Obligatorio; Referencia a vehiculos (se borra en cascada) |
| `fecha_ingreso` | TEXT | Obligatorio |
| `estado` | TEXT | Obligatorio; Por defecto “recibido” |
| `diagnostico` | TEXT | Opcional |
| `total` | REAL | Obligatorio; Por defecto 0 |

### `items_orden`

Mano de obra y repuestos de la orden.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `orden_id` | INTEGER | Obligatorio; Referencia a ordenes (se borra en cascada) |
| `descripcion` | TEXT | Obligatorio |
| `tipo` | TEXT | Obligatorio; Por defecto “mano_de_obra” |
| `cantidad` | REAL | Obligatorio; Por defecto 1 |
| `precio` | REAL | Obligatorio; Por defecto 0 |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Cliente con varios vehículos y una orden por vehículo a la vez.
- Repuesto devuelto: se elimina el ítem mientras la orden no esté entregada.
- Orden cancelada por el cliente: estado «cancelada» fuera de ingresos.
- Cambio de teléfono del cliente: se actualiza en su ficha, no en el historial.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Precios desactualizados de repuestos | Precio editable por ítem; catálogo opcional en v1.1. |
| Disputas por trabajos no autorizados | El presupuesto en PDF sirve de constancia previa. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en TallerFlow |
|---|---|
| `clientes` | Dueños de los vehículos. |
| `vehiculos` | Autos de cada cliente. |
| `ordenes` | Orden de trabajo con su estado. |
| `items_orden` | Mano de obra y repuestos de la orden. |
| `ordenes.estado` | Valores: recibido, en_proceso, listo, entregado, cancelada |
| `items_orden.tipo` | Valores: mano_de_obra, repuesto |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar clientes y vehículos | 2 | CP-01-1, CP-01-2 |
| HU-02 Crear órdenes de trabajo | 3 | CP-02-1, CP-02-2 |
| HU-03 Agregar mano de obra y repuestos | 3 | CP-03-1 |
| HU-04 Presupuesto y orden en PDF | 4 | CP-04-1 |
| HU-05 Avisar que el vehículo está listo | 4 | CP-05-1 |
| HU-06 Ver los ingresos del taller | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
