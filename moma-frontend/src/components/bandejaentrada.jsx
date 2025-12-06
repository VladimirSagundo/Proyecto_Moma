import React, { useState } from "react";
import "../css/Bandeja.css";

function BandejaEntrada() {
  const [seccion, setSeccion] = useState("bandeja");

  return (
    <div className="PanelBandeja">
      <div className="inbox-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <button className="compose-btn">Redactar</button>

          <div className="menu">
            <button
              className={`menu-btn ${seccion === "bandeja" ? "active" : ""}`}
              onClick={() => setSeccion("bandeja")}
            >
              Bandeja de entrada
            </button>
            <button
              className={`menu-btn ${seccion === "enviados" ? "active" : ""}`}
              onClick={() => setSeccion("enviados")}
            >
              Enviados
            </button>
            <button
              className={`menu-btn ${seccion === "borradores" ? "active" : ""}`}
              onClick={() => setSeccion("borradores")}
            >
              Borradores
            </button>
            <button
              className={`menu-btn ${seccion === "papelera" ? "active" : ""}`}
              onClick={() => setSeccion("papelera")}
            >
              Papelera
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="main-content">
          {seccion === "bandeja" && (
            <div className="email-section">
              <div className="toolbar">
                <input type="checkbox" />
                <button>Actualizar</button>
                <button>Eliminar</button>
              </div>

              <div className="email-list">
                <div className="email-item">
                  <input type="checkbox" />
                  <span className="sender">Juan Pérez</span>
                  <span className="subject">Reunión de seguimiento</span>
                  <span className="time">10:35 a.m.</span>
                </div>

                <div className="email-item unread">
                  <input type="checkbox" />
                  <span className="sender">María López</span>
                  <span className="subject">Nueva cotización adjunta</span>
                  <span className="time">9:10 a.m.</span>
                </div>

                <div className="email-item">
                  <input type="checkbox" />
                  <span className="sender">Soporte</span>
                  <span className="subject">Tu contraseña ha sido cambiada</span>
                  <span className="time">Ayer</span>
                </div>
              </div>
            </div>
          )}

          {seccion === "enviados" && (
            <div className="email-section">
              <h2>Correos enviados</h2>
              <p>Aquí aparecerán los correos que has enviado.</p>
            </div>
          )}

          {seccion === "borradores" && (
            <div className="email-section">
              <h2>Borradores</h2>
              <p>Aquí estarán tus mensajes guardados.</p>
            </div>
          )}

          {seccion === "papelera" && (
            <div className="email-section">
              <h2>Papelera</h2>
              <p>Estos son los correos eliminados.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default BandejaEntrada;
