function Usuario({ nombre, rol }) {

  return (
    <div className="usuario">
      <h2>Bienvenido, {nombre}</h2>
      <p>{rol}</p>
      <hr className="dividir-usuario" />
    </div>
  );
}

export default Usuario;

// Usuario Jesus
