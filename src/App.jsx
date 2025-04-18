import { useState, useEffect } from "react";

function App() {
  const [nombre, setNombre] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [personas, setPersonas] = useState("");
  const [enlaces, setEnlaces] = useState([]);
  const [copiado, setCopiado] = useState(null);

  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("invitaciones")) || [];
    setEnlaces(almacenados);
  }, []);

  const copiarPortapapeles = (texto, index) => {
    navigator.clipboard.writeText(texto);
    setCopiado(index);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!nombre && !nombre2) || !personas) return;

    const url = `https://cristian-y-esmeralda.pages.dev/${encodeURIComponent(
      personas
    )}/${encodeURIComponent(nombre)}/${encodeURIComponent(nombre2)}`;

    const nuevoEnlace = {
      nombre,
      nombre2,
      personas,
      url,
    };

    const nuevosEnlaces = [nuevoEnlace,...enlaces];
    setEnlaces(nuevosEnlaces);
    localStorage.setItem("invitaciones", JSON.stringify(nuevosEnlaces));

    setNombre("");
    setNombre2("");
    setPersonas("");
  };

  const eliminarEnlace = (index) => {
    const nuevosEnlaces = enlaces.filter((_, i) => i !== index);
    setEnlaces(nuevosEnlaces);
    localStorage.setItem("invitaciones", JSON.stringify(nuevosEnlaces));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-medium mb-1">Añade tus Invitados</h2>
        <div className="flex flex-col mb-4">
          <p className="text-sm text-gray-500">
            Favor de NO usar símbolos o emojis
          </p>
          <p className="text-sm text-gray-500">
            Si solo desea agregar un invitado, deje el segundo campo vacío
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
          <span className="text-start  text-gray-600">Nombre del Invitado 1:</span>
          <input
            type="text"
            placeholder="Ejemplo: Cristian Fernandez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2 outline-none focus:border-[#78be8f]"
          />
          </div>
          <div className="flex flex-col gap-1">
          <span className="text-start  text-gray-600">Nombre del Invitado 2:</span>
          <input
            type="text"
            placeholder="Ejemplo: Giselle Garcia"
            value={nombre2}
            onChange={(e) => setNombre2(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2 outline-none focus:border-[#78be8f]"
          />
          </div>
          <div className="flex flex-col gap-1">
          <span className="text-start  text-gray-600">Número de pases:</span>
          <input
            type="text"
            placeholder="Ejemplo: 2"
            value={personas}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setPersonas(value);
                return;
              }
              const num = Number(value);
              if (Number.isInteger(num) && num > 1) {
                setPersonas(value);
              }
            }}
            onKeyDown={(e) => {
              if ([".", "e", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 outline-none focus:border-[#78be8f]"
          />
          </div>
          <button
            type="submit"
            className="bg-[#53a06d] hover:bg-[#ffea75] hover:text-black text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out cursor-pointer w-full"
          >
            Generar enlace
          </button>
        </form>

        {enlaces.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-col justify-center items-center mb-2">  
            <h3 className="font-semibold text-center text-lg">
              ENLACES GENERADOS
            </h3>
            <span className="self-start text-sm">
              Total de enlaces generados: {enlaces.length}
            </span>
            </div>
            <ul className="space-y-3">
              {enlaces.map((item, index) => (
                <>
                  <hr className="h-px my-1 bg-gray-400 border-0" />
                  <li key={index} className="p-3 bg-gray-50 rounded">
                    <div className="flex flex-col justify-start items-start text-sm">
                      <span>Invitado 1: <span className="font-medium">{item.nombre}</span></span>
                      {item.nombre2 && (
                        <span>Invitado 2: <span className="font-medium">{item.nombre2}</span></span>
                      )}
                      <span>Número de pases: <span className="font-medium">{item.personas}</span></span>
                    </div>
                    <div className="flex text-sm items-center mt-1">
                      <span className="mr-1">Enlace:</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 truncate flex-1"
                      >
                        {item.url}
                      </a>
                    </div>
                    <div className="flex justify-end mt-2">

                      <button
                        onClick={() => eliminarEnlace(index)}
                        className="ml-2 bg-red-200 hover:bg-red-300 text-gray-800 text-xs px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => copiarPortapapeles(item.url, index)}
                        className="ml-2 bg-green-200 hover:bg-green-300 text-gray-800 text-xs px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                        {copiado === index ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
