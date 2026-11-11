# Modelo de datos — TallerFlow

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `vehiculos.cliente_id` | `clientes` | Al borrar el padre se borran los hijos |
| `ordenes.vehiculo_id` | `vehiculos` | Al borrar el padre se borran los hijos |
| `items_orden.orden_id` | `ordenes` | Al borrar el padre se borran los hijos |

```
clientes  ──<  vehiculos
vehiculos  ──<  ordenes
ordenes  ──<  items_orden
items_orden
```

## 3. Detalle por tabla

### 3.1 `clientes`

Dueños de los vehículos.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |

**Consultas base** (en `src/db/clientes.ts`):

```ts
listar(): Promise<Cliente[]>            // SELECT * FROM clientes ORDER BY id DESC
obtener(id: number): Promise<Cliente | null>   // SELECT * FROM clientes WHERE id = ?
crear(datos: NuevoCliente): Promise<number>   // INSERT INTO clientes (nombre, telefono) VALUES (?, ?)
actualizar(id: number, datos: NuevoCliente): Promise<void>   // UPDATE clientes SET nombre = ?, telefono = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM clientes WHERE id = ?
```

### 3.2 `vehiculos`

Autos de cada cliente.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `cliente_id` | INTEGER → `number` | Selector de clientes | Obligatorio; Debe existir en `clientes` | «Elegí un registro» |
| `placa` | TEXT → `string` | Texto (mayúsculas) | Obligatorio; Se guarda en mayúsculas; 5 a 10 caracteres alfanuméricos | «Placa no válida» |
| `modelo` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí modelo» |
| `anio` | INTEGER → `number \| null` | Numérico entero | Opcional; Entero mayor o igual a 0 | «Ingresá un número entero» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_vehiculos_cliente_id ON vehiculos(cliente_id);
```

**Consultas base** (en `src/db/vehiculos.ts`):

```ts
listar(): Promise<Vehiculo[]>            // SELECT * FROM vehiculos ORDER BY id DESC
obtener(id: number): Promise<Vehiculo | null>   // SELECT * FROM vehiculos WHERE id = ?
crear(datos: NuevoVehiculo): Promise<number>   // INSERT INTO vehiculos (cliente_id, placa, modelo, anio) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoVehiculo): Promise<void>   // UPDATE vehiculos SET cliente_id = ?, placa = ?, modelo = ?, anio = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM vehiculos WHERE id = ?
listarPorCliente(cliente_id: number): Promise<Vehiculo[]>   // WHERE cliente_id = ?
```

### 3.3 `ordenes`

Orden de trabajo con su estado.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `vehiculo_id` | INTEGER → `number` | Selector de vehiculos | Obligatorio; Debe existir en `vehiculos` | «Elegí un registro» |
| `fecha_ingreso` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `estado` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `recibido`, `en_proceso`, `listo`, `entregado`, `cancelada`; Valor inicial `recibido` | «Elegí una opción» |
| `diagnostico` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí diagnostico» |
| `total` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_ordenes_vehiculo_id ON ordenes(vehiculo_id);
CREATE INDEX IF NOT EXISTS idx_ordenes_fecha_ingreso ON ordenes(fecha_ingreso);
CREATE INDEX IF NOT EXISTS idx_ordenes_estado ON ordenes(estado);
```

**Consultas base** (en `src/db/ordenes.ts`):

```ts
listar(): Promise<Orden[]>            // SELECT * FROM ordenes ORDER BY id DESC
obtener(id: number): Promise<Orden | null>   // SELECT * FROM ordenes WHERE id = ?
crear(datos: NuevoOrden): Promise<number>   // INSERT INTO ordenes (vehiculo_id, fecha_ingreso, estado, diagnostico, total) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoOrden): Promise<void>   // UPDATE ordenes SET vehiculo_id = ?, fecha_ingreso = ?, estado = ?, diagnostico = ?, total = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM ordenes WHERE id = ?
listarPorVehiculo(vehiculo_id: number): Promise<Orden[]>   // WHERE vehiculo_id = ?
```

### 3.4 `items_orden`

Mano de obra y repuestos de la orden.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `orden_id` | INTEGER → `number` | Selector de ordenes | Obligatorio; Debe existir en `ordenes` | «Elegí un registro» |
| `descripcion` | TEXT → `string` | Texto largo | Obligatorio; Hasta 280 caracteres | «Máximo 280 caracteres» |
| `tipo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `mano_de_obra`, `repuesto`; Valor inicial `mano_de_obra` | «Elegí una opción» |
| `cantidad` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `1` | «Ingresá un número válido» |
| `precio` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un monto mayor a 0» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_items_orden_orden_id ON items_orden(orden_id);
```

**Consultas base** (en `src/db/items_orden.ts`):

```ts
listar(): Promise<Items_orden[]>            // SELECT * FROM items_orden ORDER BY id DESC
obtener(id: number): Promise<Items_orden | null>   // SELECT * FROM items_orden WHERE id = ?
crear(datos: NuevoItems_orden): Promise<number>   // INSERT INTO items_orden (orden_id, descripcion, tipo, cantidad, precio) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoItems_orden): Promise<void>   // UPDATE items_orden SET orden_id = ?, descripcion = ?, tipo = ?, cantidad = ?, precio = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM items_orden WHERE id = ?
listarPorOrden(orden_id: number): Promise<Items_orden[]>   // WHERE orden_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Cliente {
  id: number;
  nombre: string;
  telefono: string | null;
}
export type NuevoCliente = Omit<Cliente, 'id'>;

export interface Vehiculo {
  id: number;
  cliente_id: number;
  placa: string;
  modelo: string | null;
  anio: number | null;
}
export type NuevoVehiculo = Omit<Vehiculo, 'id'>;

export interface Orden {
  id: number;
  vehiculo_id: number;
  fecha_ingreso: string;
  estado: string;
  diagnostico: string | null;
  total: number;
}
export type NuevoOrden = Omit<Orden, 'id'>;

export interface Items_orden {
  id: number;
  orden_id: number;
  descripcion: string;
  tipo: string;
  cantidad: number;
  precio: number;
}
export type NuevoItems_orden = Omit<Items_orden, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`ordenes.estado`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `recibido` | Recibido |
| `en_proceso` | En proceso |
| `listo` | Listo |
| `entregado` | Entregado |
| `cancelada` | Cancelada |

**`items_orden.tipo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `mano_de_obra` | Mano de obra |
| `repuesto` | Repuesto |

```ts
export const ORDENES_ESTADO = ['recibido', 'en_proceso', 'listo', 'entregado', 'cancelada'] as const;
export const ITEMS_ORDEN_TIPO = ['mano_de_obra', 'repuesto'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 4 | Datos del taller para el presupuesto y plantilla del aviso «listo». |

**Migración 2** (fase 4)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE vehiculos (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE, placa TEXT NOT NULL, modelo TEXT, anio INTEGER);
CREATE TABLE ordenes (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, fecha_ingreso TEXT NOT NULL, estado TEXT NOT NULL DEFAULT 'recibido', diagnostico TEXT, total REAL NOT NULL DEFAULT 0);
CREATE TABLE items_orden (id INTEGER PRIMARY KEY AUTOINCREMENT, orden_id INTEGER NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE, descripcion TEXT NOT NULL, tipo TEXT NOT NULL DEFAULT 'mano_de_obra', cantidad REAL NOT NULL DEFAULT 1, precio REAL NOT NULL DEFAULT 0);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Una orden pasa por estos estados en orden: recibido, en proceso, listo, entregado.
- **RN-02** Una orden entregada no se puede editar; solo se consulta.
- **RN-03** Cada ítem es de tipo mano de obra o repuesto, con cantidad y precio unitario.
- **RN-04** Total de la orden = suma de cantidad × precio unitario de sus ítems.
- **RN-05** Una orden pertenece a un vehículo y un vehículo a un cliente.
- **RN-06** El presupuesto puede emitirse antes de empezar el trabajo y se numera por orden.
- **RN-07** Los ingresos del taller cuentan las órdenes entregadas dentro del período.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
