# Plan de desarrollo — TallerFlow

Guía para construir el MVP fase por fase. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por fase** con las tareas de abajo como checklist.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Cierre de fase:** lint, tipos y tests en verde, probar en el teléfono, actualizar [ROADMAP.md](ROADMAP.md) y el [CHANGELOG](../CHANGELOG.md), y fusionar a `main`.

### Definición de «terminado» (vale para toda fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos y mensajes de error en español.
- [ ] Los datos persisten al reiniciar la app.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.

**Tareas**

- [ ] `npm install` y `npx expo start` abren la app en Expo Go.
- [ ] Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque.
- [ ] Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] Confirmar que el CI de GitHub Actions pasa en verde.

**Cierre:** la app abre, navega entre secciones vacías y no da errores.

---

## Fase 2 — Clientes y vehículos

**Estimación:** 4 días.

**Objetivo:** clientes y vehículos con su historial de trabajos.

**Tareas**

- [ ] Consultas de `clientes` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `vehiculos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: clientes y vehículos con su historial de trabajos.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Clientes y vehículos con su historial de trabajos: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 3 — Órdenes de trabajo

**Estimación:** 4 días.

**Objetivo:** órdenes de trabajo con estado (recibido, en proceso, listo, entregado); items de mano de obra y repuestos con precio.

**Tareas**

- [ ] Consultas de `ordenes` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `items_orden` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: órdenes de trabajo con estado (recibido, en proceso, listo, entregado).
- [ ] Pantalla(s) y formulario(s) para: items de mano de obra y repuestos con precio.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Órdenes de trabajo con estado (recibido, en proceso, listo, entregado): funciona sin internet y persiste al reiniciar.
- [ ] Items de mano de obra y repuestos con precio: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 4 — Presupuesto en PDF y avisos

**Estimación:** 3 días.

**Objetivo:** presupuesto y orden en PDF para el cliente; aviso de «vehículo listo» por WhatsApp.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: presupuesto y orden en PDF para el cliente.
- [ ] Pantalla(s) y formulario(s) para: aviso de «vehículo listo» por WhatsApp.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Presupuesto y orden en PDF para el cliente: funciona sin internet y persiste al reiniciar.
- [ ] Aviso de «vehículo listo» por WhatsApp: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 5 — Reportes de ingresos

**Estimación:** 3 días.

**Objetivo:** ingresos del taller por período.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: ingresos del taller por período.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Ingresos del taller por período: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio.
- [ ] Publicar el release con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.
