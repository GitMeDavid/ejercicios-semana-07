
import { db } from "./index";
import { cafes } from "./schema";

const datosCafes = [
    {
        nombre: "Etiopía Sidamo",
        origen: "Etiopía",
        precio: 12.50,
        tueste: "claro" as const,
    },
    {
        nombre: "Guatemala Volcán",
        origen: "Guatemala",
        precio: 10.90,
        tueste: "medio" as const,
    },
    {
        nombre: "Colombia Supremo",
        origen: "Colombia",
        precio: 11.50,
        tueste: "medio" as const,
    },
    {
        nombre: "Brasil Santos",
        origen: "Brasil",
        precio: 9.80,
        tueste: "oscuro" as const,
    },
];


async function insertarCafes() {
    await db.insert(cafes).values(datosCafes);

    console.log("Los cuatro cafés se han insertado correctamente.");
}

insertarCafes();

