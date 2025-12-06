import React from 'react';
import './estilo_notificaciones.css';
import { FaTimes, FaExclamationCircle, FaClock, FaCheckCircle } from "react-icons/fa";

const PanelNotificaciones = ({ isOpen, onClose }) => {

    return (
        <div className={`panel-notificaciones ${isOpen ? "open" : ""}`}>
            <div className="panel-header">
                <h3>Notificaciones</h3>
                <button className="btn-cerrar-icon" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>

            <div className="contenido-scroll">
                <div className="seccion-prioridad alta">
                    <div className="titulo-seccion">
                        <FaExclamationCircle /> Prioridad Alta
                    </div>
                    <div className="lista-items">
                        <p className="vacio">No hay actividades urgentes.</p>
                    </div>
                </div>

                <div className="seccion-prioridad media">
                    <div className="titulo-seccion">
                        <FaClock /> Prioridad Media
                    </div>
                    <div className="lista-items">
                         <div className="item-actividad">
                            <span>Llamar al cliente J. Hernández</span>
                            <small>Para hoy: 14:00 hrs</small>
                         </div>
                    </div>
                </div>

                <div className="seccion-prioridad baja">
                    <div className="titulo-seccion">
                        <FaCheckCircle /> Prioridad Baja
                    </div>
                    <div className="lista-items">
                        <p className="vacio">Todo al día.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default PanelNotificaciones;