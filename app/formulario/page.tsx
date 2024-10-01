"use client";

import { useState } from "react";

export default function Formulario() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // Estado para guardar la respuesta del webhook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Genera la URL con los valores de texto y opción seleccionada
    const url = `https://auto.mpdefensa.gob.ar/webhook-test/definir-carpeta?first_name=Guido&last_name=Buhl`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.text(); // Suponiendo que la respuesta es texto
        setResponseMessage(data); // Actualiza el estado con la respuesta
      } else {
        setResponseMessage('Hubo un error al enviar el formulario.');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setResponseMessage('Ocurrió un error al enviar el formulario.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Formulario</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-semibold mb-2">Texto</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Introduce el texto aquí"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Selecciona una opción</label>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="Demanda">Demanda</option>
            <option value="Sentencia">Sentencia</option>
            <option value="PSJ">PSJ</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Enviar
        </button>
      </form>

      {/* Mostrar la respuesta del webhook */}
      {responseMessage && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded shadow-md">
          <h2 className="text-xl font-semibold">Respuesta del Webhook:</h2>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
}