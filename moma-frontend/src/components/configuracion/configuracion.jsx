import React, { useState, useEffect } from "react";
import './estilo.css';
//Accesos Vladimir
function Configuracion() {
    const [historial, setHistorial] = useState([]);
    const [pagina, setPagina] = useState(1);
    const registrosPorPagina = 5;

    useEffect(() => {
        fetch("http://localhost:8000/usuarios/historial-accesos/")
            .then(res => res.json())
            .then(data => setHistorial(data))
            .catch(error => console.error("Error al obtener historial:", error));
    }, []);

    // Calcular los registros a mostrar
    const indexUltimo = pagina * registrosPorPagina;
    const indexPrimero = indexUltimo - registrosPorPagina;
    const registrosActuales = historial.slice(indexPrimero, indexUltimo);

    const totalPaginas = Math.ceil(historial.length / registrosPorPagina);

    return (
        <div className="panelConfiguracion">
            <h2>Configuración</h2>
            <h2 className="h">Historial de accesos</h2>
            <div className="panelAccesos">
                <div className="tabla-contenedor">
                    <table className="tabla_historial_accesos">
                        <thead>
                            <tr>
                                <th>Fecha y hora</th>
                                <th>Tipo de acceso</th>
                                <th>Resultado</th>
                                <th>Dispositivo/Navegador</th>
                                <th>Dirección ip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrosActuales.map(item => (
                                <tr key={item.id_acceso}>
                                    <td>{item.fecha_hora}</td>
                                    <td>{item.tipo_acceso}</td>
                                    <td>{item.resultado}</td>
                                    <td>{item.dispositivo_navegador}</td>
                                    <td>{item.direccion_ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación independiente, siempre fija en la parte inferior */}
                <div className="paginacion-fija">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPagina(i + 1)}
                            className={pagina === i + 1 ? "activo" : ""}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default Configuracion;
