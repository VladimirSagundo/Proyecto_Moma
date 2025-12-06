import React, { useState } from 'react';
import './estilo_actividades.css';
import Swal from 'sweetalert2';

const PanelAgregarAct = ({ isOpen, onClose }) => {
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");
    const [asuntoSeleccionado, setAsuntoSeleccionado] = useState("");
    const [prioridadSeleccionada, setPrioridadSeleccionada] = useState("");
    const [persona, setPersona] = useState("");
    const [telefono, setTelefono] = useState("");

    const handleAgregar = async () => {
    try {
        const payload = {
            tipo: tipoSeleccionado,
            asunto: asuntoSeleccionado,
            prioridad: prioridadSeleccionada,
            personaContacto: persona,
            telefono: telefono
        };

        const res = await fetch("http://127.0.0.1:8000/actividades/actividades/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al insertar la actividad',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            return;
        }

        Swal.fire({
            title: '¡Éxito!',
            text: 'Actividad agregada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                onClose(); 
            }
        });

    } catch (err) {
        console.error(err);
        Swal.fire({
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    }
};

    return (
        <div className={`panel-actividades ${isOpen ? "open" : ""}`}>
            <h3>Agregar actividad</h3>

            <div className="grupo">
                <select value={tipoSeleccionado} onChange={e => setTipoSeleccionado(e.target.value)}>
                    <option value="">Tipo</option>
                    <option value="Reunion">Reunión</option>
                    <option value="Correo">Correo</option>
                    <option value="Llamada">Llamada</option>
                    <option value="Mensaje">Mensaje</option>
                </select>
            </div>

            <div className="grupo">
                <input
                    type="text"
                    placeholder="Asunto"
                    value={asuntoSeleccionado}
                    onChange={(e) => setAsuntoSeleccionado(e.target.value)}
                />
            </div>

            <div className="grupo">
                <select value={prioridadSeleccionada} onChange={(e) => setPrioridadSeleccionada(e.target.value)}>
                    <option value="">Prioridad</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
            </div>

            <div className="grupo">
                <input
                    type="text"
                    placeholder="Persona de contacto"
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                />
            </div>

            <div className="grupo">
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>

            <button className="cerrar" onClick={onClose}>Cerrar</button>
            <button className="agregar" onClick={handleAgregar} >Agregar</button>

        </div>
    );
};

export default PanelAgregarAct;
