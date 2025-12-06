// Aseguradoras Jesus

import React, { useState } from "react";
import { FaPlus , FaTrash, FaEdit} from "react-icons/fa";
import ModalAgregar_cliente from "./agregar_cliente";
import ModalEditar_cliente from "./editar_cliente";
import './estilo_aseguradora.css';
import Swal from 'sweetalert2';

function Aseguradoras() {
  const [apartado, setApartado] = useState("SMNYL");
  const [polizas, setPolizas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [polizaAEditar, setPolizaAEditar] = useState(null);

  const [filtro, setFiltro] = useState("");

  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 15;

  const aseguradoras = [
    { name: "SMNYL", id: 1 },
    { name: "BX+", id: 2 },
    { name: "INSIGNIA_LIFE", id: 3 },
    { name: "MAPFRE", id: 4 },
    { name: "INBURSA", id: 5 },
  ];

  const cargarPolizas = async (aseguradoraID) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/polizas/por-aseguradora/${aseguradoraID}/`
      );
      if (!res.ok) {
        console.error("Error response:", res.status, await res.text());
        return;
      }
      const data = await res.json();
      setPolizas(data);
      setPagina(1);
    } catch (error) {
      console.error("Error cargando pólizas:", error);
    }
  };

  const handleEliminar = async (id_poliza) => {
    const result = await Swal.fire({
            title: '¿Eliminar póliza?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#3085d6', 
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
if (result.isConfirmed) {
  try {
      const res = await fetch(`http://127.0.0.1:8000/api/polizas/eliminar/${id_poliza}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const nuevasPolizas = polizas.filter((p) => p.id_poliza !== id_poliza);
        setPolizas(nuevasPolizas);
        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'La póliza ha sido eliminada correctamente.',
                            icon: 'success',
                            timer: 2000, 
                            showConfirmButton: false
                        });
      } else {
        Swal.fire('Error', 'No se pudo eliminar la póliza', 'error');
      }
    } catch (error) {
      console.error("Error eliminando:", error);
      Swal.fire('Error', 'Hubo un problema de conexión', 'error');
    }
  };
}

  const handleEditar = (poliza) => {
    setPolizaAEditar(poliza); 
    setMostrarModalEditar(true); 
  };

  const handleAseguradoraClick = (aseg) => {
    setApartado(aseg.name);
    cargarPolizas(aseg.id);
  };

  const polizasFiltradas = polizas.filter((p) => {
    const texto = filtro.toLowerCase();

    return (
      p.no_poliza.toLowerCase().includes(texto) ||
      p.contratante.toLowerCase().includes(texto) ||
      p.asegurado.toLowerCase().includes(texto)
    );
  });

  const totalPaginas = Math.ceil(polizasFiltradas.length / registrosPorPagina);

  const inicio = (pagina - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;

  const polizasPaginadas = polizasFiltradas.slice(inicio, fin);

  return (
    <div className="PanelAseguradoras">
      <h2>Aseguradoras</h2>

      <button className="btn-cliente" onClick={() => setMostrarModal(true)}>
        <FaPlus style={{ marginRight: "10px" }} /> Póliza
      </button>

      <div className="rectangulo-tabla-aseguradoras">
        <table className="tabla-aseguradoras">
          <thead>
            <tr>
              <th>No. póliza</th>
              <th>Producto</th>
              <th>Plan</th>
              <th>FDE</th>
              <th>FDV</th>
              <th>Contratante</th>
              <th>Asegurado</th>
              <th>MDC</th>
              <th>Deducible</th>
              <th>No. agente</th>
              <th>Borrar</th>
            </tr>
          </thead>

          <tbody>
            {polizasPaginadas.length === 0 ? (
              <tr>
                <td>No hay pólizas que coincidan.</td>
              </tr>
            ) : (
              polizasPaginadas.map((p, index) => (
                <tr key={index}>
                  <td>{p.no_poliza}</td>
                  <td>{p.producto}</td>
                  <td>{p.plan}</td>
                  <td>{p.fecha_de_emision}</td>
                  <td>{p.fecha_de_vencimiento}</td>

                  <td>{p.contratante}</td>
                  <td>{p.asegurado}</td>

                  <td>{p.medio_de_cobro}</td>
                  <td>{p.deducible}</td>
                  <td>{p.no_agente}</td>
                  <td style={{ textAlign: "center" }}>
                    {/* BOTÓN EDITAR */}
                    <button
                      onClick={() => handleEditar(p)}
                      style={{ border: "none", background: "transparent", color: "#f39c12", cursor: "pointer", marginRight: "10px" }}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>

                    {/* BOTÓN BORRAR */}
                    <button 
                      onClick={() => handleEliminar(p.id_poliza)}
                      style={{ border: "none", background: "transparent", color: "red", cursor: "pointer" }}
                      title="Borrar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

      <div className="aseguradoras-panel">
        {aseguradoras.map((aseg) => (
          <button
            key={aseg.name}
            onClick={() => handleAseguradoraClick(aseg)}
            className={apartado === aseg.name ? "activo" : ""}
          >
            {aseg.name.replace("_", " ")}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="filtro-clientes"
        placeholder="Filtrar por nombre o número de póliza"
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value);
          setPagina(1);
        }}
      />

      {mostrarModal && (
        <ModalAgregar_cliente onClose={() => setMostrarModal(false)} />
      )}
      {mostrarModalEditar && (
        <ModalEditar_cliente 
            onClose={() => setMostrarModalEditar(false)} 
            poliza={polizaAEditar} 
        />
      )}
    </div>
  );
}

export default Aseguradoras;
