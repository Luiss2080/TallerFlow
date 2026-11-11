# Roadmap de TallerFlow

> Que el taller sepa qué auto está en qué estado, cuánto se le cobra al cliente y cuándo avisarle que está listo.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Órdenes de trabajo para talleres mecánicos: historial por vehículo y aviso al cliente por WhatsApp.
- **Usuario:** Dueño de un taller mecánico pequeño o mecánico independiente que atiende 3 a 15 autos por semana.
- **Duración estimada:** ~17 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Clientes y vehículos | Clientes y vehículos con historial. | 3 | 1 |
| 3 | Órdenes de trabajo | Órdenes de trabajo con ítems. | 5 | 2 |
| 4 | Presupuesto en PDF y avisos | Presupuesto en PDF y avisos. | 4 | 3 |
| 5 | Reportes de ingresos | Reportes de ingresos. | 3 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Clientes y vehículos

**Demo:** Encuentro un vehículo por placa en menos de 3 segundos.

### Hito 3 — Órdenes de trabajo

**Demo:** No se puede saltar de «recibido» a «entregado». El total coincide con casos de prueba.

### Hito 4 — Presupuesto en PDF y avisos

**Demo:** El PDF y el aviso salen con los datos correctos.

### Hito 5 — Reportes de ingresos

**Demo:** Los ingresos coinciden con la suma de órdenes entregadas.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Clientes y vehículos

- **Objetivo:** Clientes y vehículos con historial.
- **Historias cubiertas:** HU-01 Registrar clientes y vehículos
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Encuentro un vehículo por placa en menos de 3 segundos.

### Fase 3 — Órdenes de trabajo

- **Objetivo:** Órdenes de trabajo con ítems.
- **Historias cubiertas:** HU-02 Crear órdenes de trabajo; HU-03 Agregar mano de obra y repuestos
- **Depende de:** fase 2.
- **Duración:** 5 días.
- **Criterio de salida:**
  - No se puede saltar de «recibido» a «entregado».
  - El total coincide con casos de prueba.

### Fase 4 — Presupuesto en PDF y avisos

- **Objetivo:** Presupuesto en PDF y avisos.
- **Historias cubiertas:** HU-04 Presupuesto y orden en PDF; HU-05 Avisar que el vehículo está listo
- **Depende de:** fase 3.
- **Duración:** 4 días.
- **Criterio de salida:**
  - El PDF y el aviso salen con los datos correctos.

### Fase 5 — Reportes de ingresos

- **Objetivo:** Reportes de ingresos.
- **Historias cubiertas:** HU-06 Ver los ingresos del taller
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Los ingresos coinciden con la suma de órdenes entregadas.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Clientes y vehículos
- [ ] **Fase 3:** Órdenes de trabajo
- [ ] **Fase 4:** Presupuesto en PDF y avisos
- [ ] **Fase 5:** Reportes de ingresos

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar clientes y vehículos | 2 | Clientes y vehículos |
| HU-02 Crear órdenes de trabajo | 3 | Órdenes de trabajo |
| HU-03 Agregar mano de obra y repuestos | 3 | Órdenes de trabajo |
| HU-04 Presupuesto y orden en PDF | 4 | Presupuesto en PDF y avisos |
| HU-05 Avisar que el vehículo está listo | 4 | Presupuesto en PDF y avisos |
| HU-06 Ver los ingresos del taller | 5 | Reportes de ingresos |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 35 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 8 | 100 % |
| Reglas cubiertas | RN con prueba / 7 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
