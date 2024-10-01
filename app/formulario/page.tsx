"use client";

import { useState } from "react";

export default function Formulario() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");
  const [responseFiles, setResponseFiles] = useState([]); // Estado para guardar los archivos
  const [errorMessage, setErrorMessage] = useState(""); // Estado para guardar mensajes de error
  const [showNextButton, setShowNextButton] = useState(false); // Estado para controlar la visibilidad del botón "Siguiente"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Genera la URL con los valores de texto y opción seleccionada
    const url = `https://auto.mpdefensa.gob.ar/webhook-test/definir-carpeta?folder_url=${text}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json(); // Procesa la respuesta como JSON
        setResponseFiles(data); // Actualiza el estado con la lista de archivos
        setShowNextButton(true); // Muestra el botón "Siguiente"
        setErrorMessage(""); // Limpia cualquier mensaje de error previo
      } else {
        setErrorMessage('Hubo un error al enviar el formulario.');
        setResponseFiles([]); // Limpia la lista de archivos en caso de error
        setShowNextButton(false); // Oculta el botón "Siguiente"
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Ocurrió un error al enviar el formulario.');
      setResponseFiles([]); // Limpia la lista de archivos en caso de error
      setShowNextButton(false); // Oculta el botón "Siguiente"
    }
  };

  const handleNext = () => {
    // Aquí puedes definir la lógica para lo que sucede al hacer clic en "Siguiente"
    // Por ejemplo, redirigir a otra página o mostrar un modal
    console.log("Botón 'Siguiente' presionado. Redirigiendo a la siguiente página...");
    // window.location.href = '/siguiente'; // Si deseas redirigir a otra página
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

      {/* Mostrar mensajes de error */}
      {errorMessage && (
        <div className="mt-4 text-red-500">
          {errorMessage}
        </div>
      )}

      {/* Mostrar la lista de archivos del webhook */}
      {responseFiles.length > 0 && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded shadow-md">
          <h2 className="text-xl font-semibold">Archivos recibidos:</h2>
          <ul className="list-disc list-inside">
            {responseFiles.map((file) => (
              <li key={file.id}>
                <strong>ID:</strong> {file.id} - <strong>Nombre:</strong> {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón de siguiente */}
      {showNextButton && (
        <button
          onClick={handleNext}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
