"use client";

import { useState } from "react";

export default function Formulario() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar los datos del formulario
    alert(`Texto: ${text}\nOpción seleccionada: ${option}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Formulario</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-semibold mb-2">Define la carpeta donde estan los archivos de la causa.</label>
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
          <label className="block text-lg font-semibold mb-2">Qué documento quieres generar?</label>
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
    </div>
  );
}