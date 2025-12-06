import { useState } from 'react'
import './App.css'
import Panel from './components/panel';
import Usuario from "./components/usuario";
import Actividades from "./components/actividades/actividades";
import Aseguradoras from "./components/aseguradoras/aseguradoras";
import BandejaEntrada from './components/bandejaentrada';
import Login from './components/login/login';
import Configuracion from './components/configuracion/configuracion';
import PanelNotificaciones from "./components/notificaciones/notificaciones";

import { FaBell, FaUser } from "react-icons/fa"; 

function App() {
  const [apartado, setApartado] = useState("Actividades");
  const [isLogged, setIsLogged] = useState(false);
  const [mostrarModal, setMostrarModalNotificaciones] = useState(false);

  return (
    <div className="App">
      {!isLogged && <Login onLogin={() => setIsLogged(true)} />}
      
      {isLogged && (
        <>
          <div className="claseusuario">
            <Usuario nombre="Jesús Hernández" rol="Soporte"/>
          </div>
          <button className='perfil'> <FaUser size={20} color='#4c6074'/> </button>
          
          <button 
             className='notificaciones' 
             onClick={() => setMostrarModalNotificaciones(true)} 
          >
             <FaBell style={{ marginRight: "3px"}}/>
          </button>

          <Panel apartado={apartado} setApartado={setApartado} />

          {apartado === "Actividades" && <Actividades />}
          {apartado === "Aseguradoras" && <Aseguradoras />}
          {apartado === "Bandeja_de_entrada" && <BandejaEntrada />}
          {apartado === "Configuracion" && <Configuracion/>}

          <PanelNotificaciones 
             isOpen={mostrarModal} 
             onClose={() => setMostrarModalNotificaciones(false)} 
          />

        </>
      )}
    </div>
  )
}
export default App