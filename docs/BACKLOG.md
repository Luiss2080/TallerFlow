# Backlog de issues — TallerFlow

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Clientes y vehículos | 2 | 3 | 7 | 17.5 |
| Fase 3 — Órdenes de trabajo | 3 | 5 | 8 | 32 |
| Fase 4 — Presupuesto en PDF y avisos | 4 | 4 | 7 | 24.5 |
| Fase 5 — Reportes de ingresos | 5 | 3 | 7 | 17.5 |

Total: **35 tareas**, ~104 horas (17 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Clientes y vehículos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | CRUD de clientes y vehículos con placa única. | HU-01 | tarea | Alta | 2.5 |
| `F2-T2` | Ficha de cliente con sus vehículos. | HU-01 | ui | Alta | 2.5 |
| `F2-T3` | Búsqueda por nombre, teléfono o placa. | HU-01 | tarea | Alta | 2.5 |
| `F2-T4` | Pruebas de validación de placa. | HU-01 | lógica, pruebas | Alta | 2.5 |
| `F2-T5` | Validaciones, estados vacíos y mensajes en español | HU-01 | lógica | Alta | 2.5 |
| `F2-T6` | Pruebas automáticas y verificación manual de criterios | HU-01 | pruebas | Alta | 2.5 |
| `F2-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01 | pruebas | Alta | 2.5 |

### Fase 3 — Órdenes de trabajo

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Máquina de estados de la orden con transiciones válidas, con pruebas. | HU-02, HU-03 | pruebas | Alta | 4 |
| `F3-T2` | CRUD de órdenes y de ítems. | HU-02, HU-03 | tarea | Alta | 4 |
| `F3-T3` | Cálculo del total con función pura. | HU-02, HU-03 | lógica | Alta | 4 |
| `F3-T4` | Bloqueo de edición en órdenes entregadas. | HU-02, HU-03 | tarea | Alta | 4 |
| `F3-T5` | Vista de órdenes por estado en Inicio. | HU-02, HU-03 | ui | Alta | 4 |
| `F3-T6` | Validaciones, estados vacíos y mensajes en español | HU-02, HU-03 | lógica | Alta | 4 |
| `F3-T7` | Pruebas automáticas y verificación manual de criterios | HU-02, HU-03 | pruebas | Alta | 4 |
| `F3-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-02, HU-03 | pruebas | Alta | 4 |

### Fase 4 — Presupuesto en PDF y avisos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Datos del taller en Ajustes (nombre, teléfono, dirección). | HU-04, HU-05 | tarea | Media | 3.5 |
| `F4-T2` | Plantilla HTML del presupuesto para expo-print. | HU-04, HU-05 | tarea | Media | 3.5 |
| `F4-T3` | Compartir con expo-sharing. | HU-04, HU-05 | integración | Media | 3.5 |
| `F4-T4` | Aviso de «listo» por WhatsApp con plantilla editable. | HU-04, HU-05 | integración | Media | 3.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04, HU-05 | lógica | Media | 3.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04, HU-05 | pruebas | Media | 3.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04, HU-05 | pruebas | Media | 3.5 |

### Fase 5 — Reportes de ingresos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Consultas de ingresos por período (día, semana, mes). | HU-06 | datos | Media | 2.5 |
| `F5-T2` | Desglose mano de obra vs repuestos. | HU-06 | tarea | Media | 2.5 |
| `F5-T3` | Pantalla Reportes con selector de período. | HU-06 | ui | Media | 2.5 |
| `F5-T4` | Exportar el reporte a CSV. | HU-06 | integración | Media | 2.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-06 | lógica | Media | 2.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-06 | pruebas | Media | 2.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-06 | pruebas | Media | 2.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
