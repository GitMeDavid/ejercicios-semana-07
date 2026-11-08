
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const datos = await request.json();


    if (typeof datos.nombre !== "string" || datos.nombre.trim() === "") {
        return NextResponse.json(
            { error: "El nombre es obligatorio." },
            { status: 400 }
        );
    }

    if (
        typeof datos.personas !== "number" ||
        !Number.isInteger(datos.personas) ||
        datos.personas < 1 ||
        datos.personas > 6
    ) {
        return NextResponse.json(
            { error: "El número de personas debe ser un entero entre 1 y 6." },
            { status: 400 }
        );
    }


    return NextResponse.json(
        { reserva: datos },
        { status: 201 }
    );
}
