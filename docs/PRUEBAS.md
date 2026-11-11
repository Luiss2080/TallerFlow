# Plan de pruebas — TallerFlow

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | Una orden pasa por estos estados en orden: recibido, en proceso, listo, entregado. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-02 | Una orden entregada no se puede editar; solo se consulta. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-03 | Cada ítem es de tipo mano de obra o repuesto, con cantidad y precio unitario. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | Total de la orden = suma de cantidad × precio unitario de sus ítems. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-05 | Una orden pertenece a un vehículo y un vehículo a un cliente. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-06 | El presupuesto puede emitirse antes de empezar el trabajo y se numera por orden. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-07 | Los ingresos del taller cuentan las órdenes entregadas dentro del período. | Unitaria o manual | Caso válido, caso inválido, límite |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar clientes y vehículos (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | un cliente nuevo | agrego su vehículo con placa y modelo | queda asociado y aparece en su ficha | ☐ |
| CP-01-2 | una placa ya registrada | intento cargarla otra vez | la app avisa y ofrece abrir el vehículo existente | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Crear órdenes de trabajo (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | un vehículo registrado | creo una orden | queda en estado «recibido» con fecha de ingreso | ☐ |
| CP-02-2 | una orden en «entregado» | intento editarla | solo puedo verla | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Agregar mano de obra y repuestos (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | una orden abierta | agrego un repuesto de 2 × 80 Bs y mano de obra de 150 Bs | el total muestra 310 Bs | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Presupuesto y orden en PDF (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | una orden con ítems | toco «Presupuesto PDF» | se genera un PDF con datos del taller, cliente, vehículo, ítems y total | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Avisar que el vehículo está listo (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | una orden que paso a «listo» | toco «Avisar al cliente» | se abre WhatsApp con el mensaje prellenado | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

### HU-06 — Ver los ingresos del taller (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-06-1 | órdenes entregadas este mes | abro Reportes | veo el total, la cantidad de órdenes y el desglose mano de obra vs repuestos | ☐ |

Casos transversales: **CP-06-T1** modo avión · **CP-06-T2** cerrar y reabrir la app (persistencia) · **CP-06-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Cliente con varios vehículos y una orden por vehículo a la vez. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Repuesto devuelto: se elimina el ítem mientras la orden no esté entregada. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Orden cancelada por el cliente: estado «cancelada» fuera de ingresos. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Cambio de teléfono del cliente: se actualiza en su ficha, no en el historial. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Clientes y vehículos**

- [ ] Encuentro un vehículo por placa en menos de 3 segundos.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Órdenes de trabajo**

- [ ] No se puede saltar de «recibido» a «entregado».
- [ ] El total coincide con casos de prueba.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Presupuesto en PDF y avisos**

- [ ] El PDF y el aviso salen con los datos correctos.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Reportes de ingresos**

- [ ] Los ingresos coinciden con la suma de órdenes entregadas.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
