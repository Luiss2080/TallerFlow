// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE vehiculos (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE, placa TEXT NOT NULL, modelo TEXT, anio INTEGER);
CREATE TABLE ordenes (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, fecha_ingreso TEXT NOT NULL, estado TEXT NOT NULL DEFAULT 'recibido', diagnostico TEXT, total REAL NOT NULL DEFAULT 0);
CREATE TABLE items_orden (id INTEGER PRIMARY KEY AUTOINCREMENT, orden_id INTEGER NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE, descripcion TEXT NOT NULL, tipo TEXT NOT NULL DEFAULT 'mano_de_obra', cantidad REAL NOT NULL DEFAULT 1, precio REAL NOT NULL DEFAULT 0);`,
];

export const TABLAS = ['clientes', 'vehiculos', 'ordenes', 'items_orden'] as const;
