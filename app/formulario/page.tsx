"use client";

import { useState } from "react";

export default function Formulario() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");
  const [responseFiles, setResponseFiles] = useState([]); // Estado para guardar los archivos
  const [errorMessage, setErrorMessage] = useState(""); // Estado para guardar mensajes de error
  const [showNextButton, setShowNextButton] = useState(false); // Estado para controlar la visibilidad del botón "Siguiente"
  const [fileStatuses, setFileStatuses] = useState([]); // Estado para guardar el estado de los archivos

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

  const handleNext = async () => {
    const statuses = await Promise.all(
      responseFiles.map(async (file) => {
        const statusUrl = `https://auto.mpdefensa.gob.ar/webhook-test/definir-embedding?id=${file.id}`;
        const response = await fetch(statusUrl);
        if (response.ok) {
          const { has_embedding } = await response.json(); // Extraer "myField" del JSON
          return {
            id: file.id,
            name: file.name,
            status: has_embedding ? "Verdadero" : "Falso", // Si myField es true o false
          };
        } else {
          return {
            id: file.id,
            name: file.name,
            status: "Error", // Manejo de errores si la llamada falla
          };
        }
      })
    );

    setFileStatuses(statuses); // Actualiza el estado con los resultados
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
            placeholder="Introduce el texto aquí!!!"
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

      {/* Mostrar la tabla de estados de archivos */}
      {fileStatuses.length > 0 && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded shadow-md">
          <h2 className="text-xl font-semibold">Estados de Archivos:</h2>
          <table className="min-w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Nombre del Archivo</th>
                <th className="border border-gray-300 p-2">ID del Archivo</th>
                <th className="border border-gray-300 p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {fileStatuses.map((file) => (
                <tr key={file.id}>
                  <td className="border border-gray-300 p-2">{file.name}</td>
                  <td className="border border-gray-300 p-2">{file.id}</td>
                  <td className="border border-gray-300 p-2">{file.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
