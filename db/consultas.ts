
import { db } from "./index";
import { cafes } from "./schema";
import { asc, eq } from "drizzle-orm";

async function consultarCafes() {
    const cafesOrdenados = await db
        .select()
        .from(cafes)
        .orderBy(asc(cafes.precio));

    console.log("CAFÉS ORDENADOS POR PRECIO:");
    console.table(cafesOrdenados);

    const cafesTuesteMedio = await db
        .select()
        .from(cafes)
        .where(eq(cafes.tueste, "medio"));

    console.log("CAFÉS CON TUESTE MEDIO:");
    console.table(cafesTuesteMedio);

}

consultarCafes();
