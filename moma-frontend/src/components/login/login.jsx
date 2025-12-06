import { useState } from 'react';
import './login_estilo.css'
//Login Vladimir

function Login({ onLogin }) {

    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Aquí se manda la petición a Django
        const response = await fetch("http://127.0.0.1:8000/usuarios/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: correo,
                contrasenia: contrasenia
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login correcto");
            onLogin(); // aquí cambias de pantalla
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="login-container">
            <div className="panel">
                <img src="/logo.png" alt='Logo'/>
                <h2>Iniciar sesión</h2>

                <input 
                    type="email"
                    className="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <input 
                    type="password"
                    className="password"
                    placeholder="Contraseña"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                />

                <button className="entrar" onClick={handleSubmit}>
                    Entrar
                </button>

                
            </div>
        </div>
    );
}

export default Login;
