import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from "react-icons/fa"; 
import PanelAgregarAct from './agregar_actividad';
import ModalEditar_actividad from './ModalEditar_Actividad'; 
import './estilo_actividades.css';
import Swal from 'sweetalert2';

function Actividades() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 8; 

  const [mostrarPanelAgregar, setMostrarPanelAgregar] = useState(false);
  
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [actividadAEditar, setActividadAEditar] = useState(null);

  const API_URL = "http://127.0.0.1:8000/actividades/actividades/"; 

  const obtenerActividades = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
      const datosJson = await respuesta.json();
      setDatos(datosJson);

    } catch (e) {
      console.error("Fallo al obtener actividades:", e);
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerActividades();
  }, []); 

  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const actividadesActuales = datos.slice(indicePrimerRegistro, indiceUltimoRegistro);
  const totalPaginas = Math.ceil(datos.length / registrosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
        title: '¿Eliminar actividad?',
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
            const res = await fetch(`http://127.0.0.1:8000/actividades/actividades/eliminar/${id}/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                const nuevosDatos = datos.filter(d => d.id_actividades !== id);
                setDatos(nuevosDatos);
                if (paginaActual > 1 && nuevosDatos.slice(indicePrimerRegistro, indiceUltimoRegistro).length === 0) {
                    setPaginaActual(paginaActual - 1);
                }

                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'La actividad ha sido eliminada correctamente.',
                    icon: 'success',
                    timer: 2000, 
                    showConfirmButton: false
                });
            } else {
                Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema de conexión', 'error');
        }
    }
};

  const handleEditar = (actividad) => {
      setActividadAEditar(actividad);
      setMostrarModalEditar(true);
  };

  if (cargando && datos.length === 0) return <div className='PanelAct'><h2>Cargando...</h2></div>;

  return (
    <div className='PanelAct'>
      <h2>Actividades</h2>
      <button onClick={() => setMostrarPanelAgregar(true)}>Actividad</button>

      <div className='rectangulo-tabla-actividades'>
        <table className="tabla-actividades">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Asunto</th>
              <th>Prioridad</th>
              <th>Persona de contacto</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividadesActuales.length > 0 ? (
              actividadesActuales.map((fila) => (
                <tr key={fila.id_actividades}> 
                  <td>{fila.tipo}</td>
                  <td>{fila.asunto}</td>
                  <td>{fila.prioridad}</td>
                  <td>{fila.personaContacto}</td>
                  <td>{fila.telefono}</td>
                  <td style={{ textAlign: "center", minWidth:"80px" }}>
                    <button
                        onClick={() => handleEditar(fila)}
                        style={{ border: "none", background: "transparent", color: "#f39c12", cursor: "pointer", marginRight: "10px", fontSize: "16px" }}
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => handleEliminar(fila.id_actividades)}
                        style={{ border: "none", background: "transparent", color: "red", cursor: "pointer", fontSize: "16px" }}
                    >
                        <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{textAlign: "center", padding: "20px"}}>No hay actividades disponibles.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- COMPONENTE DE PAGINACIÓN --- */}
      {totalPaginas > 1 && (
        <div className="paginacion-container">
            {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => cambiarPagina(i + 1)}
                    className={`btn-paginacion ${paginaActual === i + 1 ? 'activo' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
      )}

      <PanelAgregarAct 
        isOpen={mostrarPanelAgregar}
        onClose={() => setMostrarPanelAgregar(false)}
      />

      {/* MODAL EDITAR */}
      {mostrarModalEditar && (
          <ModalEditar_actividad 
            onClose={() => setMostrarModalEditar(false)}
            actividad={actividadAEditar}
            onActividadActualizada={() => {
                obtenerActividades(); 
            }}
          />
      )}

    </div>
  );
}

export default Actividades;