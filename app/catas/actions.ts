
"use server";

import { db } from "../../db";
import { valoraciones } from "../../db/schema";
import { revalidatePath } from "next/cache";

export async function guardarValoracion(formData: FormData) {
    const nombre = formData.get("nombre");
    const comentario = formData.get("comentario");
    const puntuacion = formData.get("puntuacion");

    if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new Error("El nombre es obligatorio.");
    }

    if (typeof comentario !== "string" || comentario.trim() === "") {
        throw new Error("El comentario es obligatorio.");
    }

    const numeroPuntuacion = Number(puntuacion);

    if (
        typeof puntuacion !== "string" ||
        puntuacion.trim() === "" ||
        !Number.isInteger(numeroPuntuacion) ||
        numeroPuntuacion < 1 ||
        numeroPuntuacion > 5
    ) {
        throw new Error("La puntuación debe ser un número entero entre 1 y 5.");
    }


    await db.insert(valoraciones).values({
        nombre: nombre.trim(),
        comentario: comentario.trim(),
        puntuacion: numeroPuntuacion,
    });

    revalidatePath("/catas");


}
