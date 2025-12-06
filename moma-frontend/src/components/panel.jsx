import { useState } from "react";
import { FaTasks, FaBuilding, FaInbox, FaChartBar, FaCreditCard, FaCog, FaHeadset } from "react-icons/fa"; 



function Panel({ apartado, setApartado }) {
  

  return (
  <div className='PanelOpciones' style={{ width: '380px', height: '940px', backgroundColor: 'white' }}>
    <p className="menu">MENÚ PRINCIPAL</p>
      <button onClick={() => setApartado("Actividades")} className={apartado === "Actividades" ? "activo" : ""}> <FaTasks style={{ marginRight: "10px" }} />Actividades</button>
      <button onClick={() => setApartado("Aseguradoras")} className={apartado === "Aseguradoras" ? "activo" : ""}> <FaBuilding style={{ marginRight: "10px" }} />Aseguradoras</button>
      {/*<button onClick={() => setApartado("Bandeja_de_entrada")} className={apartado === "Bandeja_de_entrada" ? "activo" : ""}> <FaInbox style={{ marginRight: "10px" }} />Bandeja de entrada</button>
      <button onClick={() => setApartado("Estadistica")} className={apartado === "Estadistica" ? "activo" : ""}> <FaChartBar style={{ marginRight: "10px" }} />Estadística</button>
      <button onClick={() => setApartado("Pagos")} className={apartado === "Pagos" ? "activo" : ""}> <FaCreditCard style={{ marginRight: "10px" }} />Pagos</button>*/}

     <p className="otros">OTROS</p>  
      <button onClick={() => setApartado("Configuracion")} className={apartado === "Configuracion" ? "activo" : ""}><FaCog style={{ marginRight: "10px" }} />Configuración</button>
      {/*<button onClick={() => setApartado("Soporte")} className={apartado === "Soporte" ? "activo" : ""}><FaHeadset style={{ marginRight: "10px" }} />Soporte</button> */}

      
  </div>
  )
}
 
export default Panel;
