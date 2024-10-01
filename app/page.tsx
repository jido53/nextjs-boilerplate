"use client";

import { useRouter } from "next/navigation"; // Importar el hook de enrutamiento

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">
        RelatorIA, llevando a la Justicia al más aIA
      </h1>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        onClick={() => router.push("/formulario")} // Redirige a la nueva página
      >
        Comenzar
      </button>
    </div>
  );
}