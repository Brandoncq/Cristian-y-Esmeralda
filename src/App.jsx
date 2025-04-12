import { useState, useEffect } from "react";

function App() {
  const [nombre, setNombre] = useState("");
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
    if (!nombre || !personas) return;

    const url = `https://cristian-y-esmeralda.pages.dev/invitacion?nombre=${encodeURIComponent(
      nombre
    )}&personas=${encodeURIComponent(personas)}`;

    const nuevoEnlace = {
      nombre,
      personas,
      url,
    };

    const nuevosEnlaces = [...enlaces, nuevoEnlace];
    setEnlaces(nuevosEnlaces);
    localStorage.setItem("invitaciones", JSON.stringify(nuevosEnlaces));

    setNombre("");
    setPersonas("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-medium mb-1">Añade tus Invitados</h2>
        <p className="text-sm text-gray-500 mb-4">
          Favor de NO usar símbolos o emojis
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="María Isabel"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full mb-3 border border-gray-400 rounded px-3 py-2 outline-none focus:border-[#78be8f]"
          />
          <input
            type="text"
            placeholder="2 personas"
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
          <button
            type="submit"
            className="bg-[#78be8f] hover:bg-[#ffea75] hover:text-black text-white px-4 py-2 rounded transition-colors duration-300 ease-in-out cursor-pointer w-full"
          >
            Generar
          </button>
        </form>

        {enlaces.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-center text-lg">
              ENLACES GENERADOS:
            </h3>
            <ul className="space-y-3">
              {enlaces.map((item, index) => (
                <>
                  <hr className="h-px my-1 bg-gray-400 border-0" />
                  <li key={index} className="p-3 bg-gray-50 rounded">
                    <div className="font-medium">
                      {item.nombre} - {item.personas}
                    </div>
                    <div className="flex items-center mt-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 truncate flex-1"
                      >
                        {item.url}
                      </a>
                      <button
                        onClick={() => copiarPortapapeles(item.url, index)}
                        className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded transition-colors cursor-pointer"
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
