
import { db } from "../../db";
import { valoraciones } from "../../db/schema";
import { guardarValoracion } from "./actions";
import BotonEnviar from "./BotonEnviar";



export default async function PaginaCatas() {
    const listaValoraciones = await db.select().from(valoraciones);

    return (
        <main>
            <h1>Valoraciones de nuestras catas</h1>
            <p>Descubre las opiniones de nuestros clientes.</p>

            {listaValoraciones.length === 0 ? (
                <p>Todavía no hay valoraciones. ¡Sé el primero en opinar!</p>
            ) : (
                <ul>
                    {listaValoraciones.map((valoracion) => (
                        <li key={valoracion.id}>
                            <h2>{valoracion.nombre}</h2>
                            <p>{valoracion.comentario}</p>
                            <p>Puntuación: {valoracion.puntuacion}/5</p>
                        </li>
                    ))}
                </ul>
            )}

            <h2>Deja tu valoración</h2>

            <form action={guardarValoracion}>

                <div>
                    <label htmlFor="nombre">Tu nombre:</label>

                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        style={{
                            display: "block",
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px",
                            marginBottom: "15px",
                            border: "1px solid #999",
                            borderRadius: "6px",
                        }}
                    />

                </div>

                <div>
                    <label htmlFor="comentario">Tu comentario:</label>

                    <textarea
                        id="comentario"
                        name="comentario"
                        rows={4}
                        required
                        style={{
                            display: "block",
                            width: "300px",
                            padding: "10px",
                            marginTop: "5px",
                            marginBottom: "15px",
                            border: "1px solid #999",
                            borderRadius: "6px",
                        }}
                    />

                </div>

                <div>
                    <label htmlFor="puntuacion">Tu puntuación (1-5):</label>

                    <input
                        type="number"
                        id="puntuacion"
                        name="puntuacion"
                        min="1"
                        max="5"
                        step="1"
                        required
                        style={{
                            display: "block",
                            width: "100px",
                            padding: "10px",
                            marginTop: "5px",
                            marginBottom: "15px",
                            border: "1px solid #999",
                            borderRadius: "6px",
                        }}
                    />

                </div>


                <BotonEnviar />

            </form>

        </main>
    );
}
