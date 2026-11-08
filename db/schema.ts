
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const cafes = sqliteTable("cafes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nombre: text("nombre").notNull(),
    origen: text("origen").notNull(),
    precio: real("precio").notNull(),
    tueste: text("tueste", {
        enum: ["claro", "medio", "oscuro"],
    }).notNull(),
});

export const valoraciones = sqliteTable("valoraciones", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nombre: text("nombre").notNull(),
    comentario: text("comentario").notNull(),
    puntuacion: integer("puntuacion").notNull(),
});
