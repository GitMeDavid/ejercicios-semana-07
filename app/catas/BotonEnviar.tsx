
"use client";

import { useFormStatus } from "react-dom";

export default function BotonEnviar() {
    const { pending } = useFormStatus();

    return (

        <button
            type="submit"
            disabled={pending}
            style={{
                backgroundColor: "#4b2e20",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: pending ? "not-allowed" : "pointer",
            }}
        >

            {pending ? "Enviando..." : "Enviar valoración"}
        </button>
    );
}
