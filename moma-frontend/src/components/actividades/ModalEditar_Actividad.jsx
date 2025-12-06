import React, { useState, useEffect } from "react";
import '../aseguradoras/css_agregar_cliente.css'; 
import Swal from 'sweetalert2';

const ModalEditar_actividad = ({ onClose, actividad, onActividadActualizada }) => {
  const [datos, setDatos] = useState({
    tipo: "",
    asunto: "",
    prioridad: "",
    personaContacto: "",
    telefono: ""
  });

  useEffect(() => {
    if (actividad) {
      setDatos({
        tipo: actividad.tipo || "",
        asunto: actividad.asunto || "",
        prioridad: actividad.prioridad || "",
        personaContacto: actividad.personaContacto || "",
        telefono: actividad.telefono || ""
      });
    }
  }, [actividad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/actividades/actividades/editar/${actividad.id_actividades}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            Swal.fire({
                title: '¡Actualizado!',
                text: 'La actividad se modificó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (onActividadActualizada) onActividadActualizada();
                    onClose();
                }
            });

        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron guardar los cambios',
                icon: 'error',
                confirmButtonText: 'Revisar'
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error de conexión',
            text: 'Verifique su conexión o intente más tarde',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    }
};

  return (
    <div className="overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar actividad</h3>

        <div className="grid-form">
          <select name="tipo" value={datos.tipo} onChange={handleChange}>
             <option value="">Selecciona Tipo</option>
             <option value="Llamada">Llamada</option>
             <option value="Reunión">Reunión</option>
             <option value="Correo">Correo</option>
          </select>

          <input type="text" name="asunto" placeholder="Asunto" value={datos.asunto} onChange={handleChange} />
          
          <select name="prioridad" value={datos.prioridad} onChange={handleChange}>
             <option value="">Prioridad</option>
             <option value="Alta">Alta</option>
             <option value="Media">Media</option>
             <option value="Baja">Baja</option>
          </select>

          <input type="text" name="personaContacto" placeholder="Persona de contacto" value={datos.personaContacto} onChange={handleChange} />
          <input type="text" name="telefono" placeholder="Teléfono" value={datos.telefono} onChange={handleChange} />
        </div>

        <div className="botones-modal">
          <button onClick={onClose} className="cancelar-btn">Cancelar</button>
          <button onClick={guardarCambios} className="agregar-btn">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditar_actividad;