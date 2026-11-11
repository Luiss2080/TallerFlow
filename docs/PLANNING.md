# Plan de desarrollo — TallerFlow

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Clientes y vehículos | 3 | 5 |
| 3 | Órdenes de trabajo | 5 | 10 |
| 4 | Presupuesto en PDF y avisos | 4 | 14 |
| 5 | Reportes de ingresos | 3 | 17 |

Total: **17 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Clientes y vehículos

**Estimación:** 3 días. **Rama sugerida:** `fase-2-clientes-y-vehiculos`.

**Objetivo:** Clientes y vehículos con historial.

**Historias que se completan:** HU-01 (Registrar clientes y vehículos).

**Tareas**

- [ ] **F2-T1** CRUD de clientes y vehículos con placa única.
- [ ] **F2-T2** Ficha de cliente con sus vehículos.
- [ ] **F2-T3** Búsqueda por nombre, teléfono o placa.
- [ ] **F2-T4** Pruebas de validación de placa.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — un cliente nuevo → agrego su vehículo con placa y modelo → queda asociado y aparece en su ficha.
- [ ] HU-01 — una placa ya registrada → intento cargarla otra vez → la app avisa y ofrece abrir el vehículo existente.

**Criterio de salida:**

- [ ] Encuentro un vehículo por placa en menos de 3 segundos.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Órdenes de trabajo

**Estimación:** 5 días. **Rama sugerida:** `fase-3-ordenes-de-trabajo`.

**Objetivo:** Órdenes de trabajo con ítems.

**Historias que se completan:** HU-02 (Crear órdenes de trabajo), HU-03 (Agregar mano de obra y repuestos).

**Tareas**

- [ ] **F3-T1** Máquina de estados de la orden con transiciones válidas, con pruebas.
- [ ] **F3-T2** CRUD de órdenes y de ítems.
- [ ] **F3-T3** Cálculo del total con función pura.
- [ ] **F3-T4** Bloqueo de edición en órdenes entregadas.
- [ ] **F3-T5** Vista de órdenes por estado en Inicio.
- [ ] **F3-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — un vehículo registrado → creo una orden → queda en estado «recibido» con fecha de ingreso.
- [ ] HU-02 — una orden en «entregado» → intento editarla → solo puedo verla.
- [ ] HU-03 — una orden abierta → agrego un repuesto de 2 × 80 Bs y mano de obra de 150 Bs → el total muestra 310 Bs.

**Criterio de salida:**

- [ ] No se puede saltar de «recibido» a «entregado».
- [ ] El total coincide con casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Presupuesto en PDF y avisos

**Estimación:** 4 días. **Rama sugerida:** `fase-4-presupuesto-en-pdf-y-avisos`.

**Objetivo:** Presupuesto en PDF y avisos.

**Historias que se completan:** HU-04 (Presupuesto y orden en PDF), HU-05 (Avisar que el vehículo está listo).

**Tareas**

- [ ] **F4-T1** Datos del taller en Ajustes (nombre, teléfono, dirección).
- [ ] **F4-T2** Plantilla HTML del presupuesto para expo-print.
- [ ] **F4-T3** Compartir con expo-sharing.
- [ ] **F4-T4** Aviso de «listo» por WhatsApp con plantilla editable.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — una orden con ítems → toco «Presupuesto PDF» → se genera un PDF con datos del taller, cliente, vehículo, ítems y total.
- [ ] HU-05 — una orden que paso a «listo» → toco «Avisar al cliente» → se abre WhatsApp con el mensaje prellenado.

**Criterio de salida:**

- [ ] El PDF y el aviso salen con los datos correctos.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Reportes de ingresos

**Estimación:** 3 días. **Rama sugerida:** `fase-5-reportes-de-ingresos`.

**Objetivo:** Reportes de ingresos.

**Historias que se completan:** HU-06 (Ver los ingresos del taller).

**Tareas**

- [ ] **F5-T1** Consultas de ingresos por período (día, semana, mes).
- [ ] **F5-T2** Desglose mano de obra vs repuestos.
- [ ] **F5-T3** Pantalla Reportes con selector de período.
- [ ] **F5-T4** Exportar el reporte a CSV.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-06 — órdenes entregadas este mes → abro Reportes → veo el total, la cantidad de órdenes y el desglose mano de obra vs repuestos.

**Criterio de salida:**

- [ ] Los ingresos coinciden con la suma de órdenes entregadas.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Clientes y vehículos

- **Día 3** (día 1 de la fase): `F2-T1` CRUD de clientes y vehículos con placa única.; `F2-T2` Ficha de cliente con sus vehículos.; `F2-T3` Búsqueda por nombre, teléfono o placa..
- **Día 4** (día 2 de la fase): `F2-T4` Pruebas de validación de placa.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Órdenes de trabajo

- **Día 6** (día 1 de la fase): `F3-T1` Máquina de estados de la orden con transiciones válidas, con pruebas.; `F3-T2` CRUD de órdenes y de ítems..
- **Día 7** (día 2 de la fase): `F3-T3` Cálculo del total con función pura.; `F3-T4` Bloqueo de edición en órdenes entregadas..
- **Día 8** (día 3 de la fase): `F3-T5` Vista de órdenes por estado en Inicio.; `F3-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 9** (día 4 de la fase): `F3-T7` Pruebas automáticas y verificación manual de criterios; `F3-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.
- **Día 10** (día 5 de la fase): colchón: terminar pendientes, probar en el teléfono y ajustar detalles.

### Fase 4 — Presupuesto en PDF y avisos

- **Día 11** (día 1 de la fase): `F4-T1` Datos del taller en Ajustes (nombre, teléfono, dirección).; `F4-T2` Plantilla HTML del presupuesto para expo-print..
- **Día 12** (día 2 de la fase): `F4-T3` Compartir con expo-sharing.; `F4-T4` Aviso de «listo» por WhatsApp con plantilla editable..
- **Día 13** (día 3 de la fase): `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 14** (día 4 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Reportes de ingresos

- **Día 15** (día 1 de la fase): `F5-T1` Consultas de ingresos por período (día, semana, mes).; `F5-T2` Desglose mano de obra vs repuestos.; `F5-T3` Pantalla Reportes con selector de período..
- **Día 16** (día 2 de la fase): `F5-T4` Exportar el reporte a CSV.; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 17** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
