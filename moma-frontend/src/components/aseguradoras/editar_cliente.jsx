import React, { useState, useEffect } from "react";
import './css_agregar_cliente.css';

const ModalEditar_cliente = ({ onClose, poliza, onPolizaActualizada }) => {
  // Estado principal con todos los campos
  const [datos, setDatos] = useState({
    aseguradora: "",
    plan: "",
    producto: "",
    medio_de_cobro: "",
    deducible: "",
    no_poliza: "",
    forma_de_pago: "",
    contratante: "",
    correo: "",
    asegurado: "",
    telefono: "",
    no_agente: "",
    // Fechas desglosadas
    f_emision_d: "", f_emision_m: "", f_emision_y: "",
    f_vencimiento_d: "", f_vencimiento_m: "", f_vencimiento_y: "",
    f_nacimiento_d: "", f_nacimiento_m: "", f_nacimiento_y: "",
  });

  // Efecto para cargar los datos cuando se abre el modal
  useEffect(() => {
    if (poliza) {
      // Función auxiliar para separar fechas YYYY-MM-DD
      const splitFecha = (fecha) => {
        if (!fecha) return ["", "", ""];
        const partes = fecha.split("-"); // [YYYY, MM, DD]
        // Retorna [DD, MM, YYYY] eliminando ceros extra del mes si es necesario
        return [partes[2], parseInt(partes[1]), partes[0]]; 
      };

      const [ed, em, ey] = splitFecha(poliza.fecha_de_emision);
      const [vd, vm, vy] = splitFecha(poliza.fecha_de_vencimiento);
      const [nd, nm, ny] = splitFecha(poliza.fecha_nacimiento_contratante);

      setDatos({
        aseguradora: poliza.aseguradora || "", 
        plan: poliza.plan || "",
        producto: poliza.producto || "",
        medio_de_cobro: poliza.medio_de_cobro || "",
        deducible: poliza.deducible || "",
        no_poliza: poliza.no_poliza || "",
        forma_de_pago: poliza.forma_de_pago || "",
        contratante: poliza.contratante || "",
        correo: poliza.correo || "",
        asegurado: poliza.asegurado || "",
        telefono: poliza.telefono || "", // Mapeamos 'telefono' al campo que viene del back
        no_agente: poliza.no_agente || "",
        
        f_emision_d: ed, f_emision_m: em, f_emision_y: ey,
        f_vencimiento_d: vd, f_vencimiento_m: vm, f_vencimiento_y: vy,
        f_nacimiento_d: nd, f_nacimiento_m: nm, f_nacimiento_y: ny,
      });
    }
  }, [poliza]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar datos a Django
  const guardarCambios = async () => {
    // Reconstruir fechas para el backend (YYYY-MM-DD)
    const formatearFecha = (d, m, y) => {
        if (!d || !m || !y) return null;
        const MM = m.toString().padStart(2, '0');
        const DD = d.toString().padStart(2, '0');
        return `${y}-${MM}-${DD}`;
    };

    const payload = {
        no_poliza: datos.no_poliza,
        contratante: datos.contratante,
        asegurado: datos.asegurado,
        correo: datos.correo,
        telefono: datos.telefono,
        deducible: datos.deducible,
        no_agente: datos.no_agente,
        fecha_de_emision: formatearFecha(datos.f_emision_d, datos.f_emision_m, datos.f_emision_y),
        fecha_de_vencimiento: formatearFecha(datos.f_vencimiento_d, datos.f_vencimiento_m, datos.f_vencimiento_y),
        // Nota: Si quieres editar Plan/Producto, requeriría lógica extra en backend
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/polizas/editar/${poliza.id_poliza}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Póliza actualizada correctamente");
            if (onPolizaActualizada) onPolizaActualizada(); // Refrescar tabla padre
            onClose();
        } else {
            const errorData = await response.json();
            alert("Error al actualizar: " + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión");
    }
  };

  // --- DATOS ESTÁTICOS PARA SELECTS (Traídos de tu archivo original) ---
  const planesPorAseguradora = {
    SMNYL: ["ALFA MEDICAL FLEX A", "ALFA MEDICAL FLEX B", "INTEGRO", "PLENO", "VIDA MUJER", "SEGUBECA 18", "DOTAL 10 UDIS", "DOTAL 20 UDIS", "DOTAL 5 STAR 97", "IMAGINA SER 55", "IMAGINA SER 60", "IMAGINA SER 65", "IMAGINA SER +", "REALIZA CRECIENTE", "OBJETIVO VIDA", "TEMPORAL 10 UDIS", "TEMPORAL 20 UDIS", "ORVI 99 10 UDIS", "ORVI 99 15 PAGOS", "ORVI 99 20 UDIS"],
    "BX+": ["GMM TRADICIONAL", "GMM UNIKUZ"],
    INSIGNIA_LIFE: ["VPL 5", "VPL 10", "VPL 15", "INSIGNIA PREMIA", "TEMPORAL", "VITALICIO BENEFICIO FISCAL"],
    MAPFRE: ["PROTECCIÓN MEDIA A TU MEDIDA"],
    INBURSA: ["INBURMEDIC"],
  };

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const currentYear = new Date().getFullYear();
  const añosNacimiento = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const añosEmision = Array.from({ length: 40 }, (_, i) => currentYear - 20 + i);
  const añosVencimiento = Array.from({ length: 30 }, (_, i) => currentYear + i);

  return (
    <div className="overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar cliente</h3>

        <div className="grid-form">
          {/* Aseguradora (Solo lectura recomendada si no manejas cambio de ID en back) */}
          <select name="aseguradora" aria-label="Aseguradora" value={datos.aseguradora} onChange={handleChange} disabled>
            <option value="">Aseguradora</option>
            <option value="SMNYL">SMNYL</option>
            <option value="BX+">BX+</option>
            <option value="INSIGNIA_LIFE">INSIGNIA LIFE</option>
            <option value="MAPFRE">MAPFRE</option>
            <option value="INBURSA">INBURSA</option>
          </select>

          <select name="deducible" aria-label="Deducible" value={datos.deducible} onChange={handleChange}>
            <option value="">Deducible</option>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
            {/* Si tu backend devuelve valores como "$5000", aquí deberías poner un input text en vez de select, o ajustar las opciones */}
          </select>

          {/* Línea 2 */}
          <input type="text" name="no_poliza" placeholder="Número de póliza" value={datos.no_poliza} onChange={handleChange} />

          <select name="forma_de_pago" aria-label="Forma de pago" value={datos.forma_de_pago} onChange={handleChange}>
            <option value="">Forma de pago</option>
            <option value="MENSUAL">MENSUAL</option>
            <option value="TRIMESTRAL">TRIMESTRAL</option>
            <option value="SEMESTRAL">SEMESTRAL</option>
            <option value="ANUAL">ANUAL</option>
          </select>

          {/* Plan */}
          <select name="plan" aria-label="Plan" value={datos.plan} onChange={handleChange} disabled>
            <option value="">Plan</option>
            {datos.aseguradora && planesPorAseguradora[datos.aseguradora]?.map((plan) => (
                <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>

          <select name="medio_de_cobro" aria-label="Medio de cobro" value={datos.medio_de_cobro} onChange={handleChange}>
            <option value="">Medio de cobro</option>
            <option value="TDC">TARJETA DE CRÉDITO</option>
            <option value="TDD">TARJETA DE DÉBITO</option>
            <option value="AGENTE">AGENTE</option>
            <option value="MODO DIRECTO">MODO DIRECTO</option>
          </select>

          <select name="producto" aria-label="Producto" value={datos.producto} onChange={handleChange} disabled>
            <option value="">Producto</option>
            <option value="VIDA">VIDA</option>
            <option value="GASTO MÉDICO">GASTO MÉDICO</option>
          </select>

          {/* Fecha de emisión */}
          <div className="fecha-row">
            <label className="fecha-label">Fecha de emisión</label>
            <div className="fecha-selects">
              <select name="f_emision_d" value={datos.f_emision_d} onChange={handleChange}>
                <option value="">Día</option>
                {dias.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select name="f_emision_m" value={datos.f_emision_m} onChange={handleChange}>
                <option value="">Mes</option>
                {meses.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select name="f_emision_y" value={datos.f_emision_y} onChange={handleChange}>
                <option value="">Año</option>
                {añosEmision.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Fecha de vencimiento */}
          <div className="fecha-row">
            <label className="fecha-label">Fecha de vencimiento</label>
            <div className="fecha-selects">
              <select name="f_vencimiento_d" value={datos.f_vencimiento_d} onChange={handleChange}>
                <option value="">Día</option>
                {dias.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select name="f_vencimiento_m" value={datos.f_vencimiento_m} onChange={handleChange}>
                <option value="">Mes</option>
                {meses.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select name="f_vencimiento_y" value={datos.f_vencimiento_y} onChange={handleChange}>
                <option value="">Año</option>
                {añosVencimiento.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div className="fecha-row">
            <label className="fecha-label">Fecha de nacimiento</label>
            <div className="fecha-selects">
              <select name="f_nacimiento_d" value={datos.f_nacimiento_d} onChange={handleChange}>
                <option value="">Día</option>
                {dias.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select name="f_nacimiento_m" value={datos.f_nacimiento_m} onChange={handleChange}>
                <option value="">Mes</option>
                {meses.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
              <select name="f_nacimiento_y" value={datos.f_nacimiento_y} onChange={handleChange}>
                <option value="">Año</option>
                {añosNacimiento.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Inputs de texto restantes */}
          <input type="text" name="contratante" placeholder="Contratante" value={datos.contratante} onChange={handleChange} />
          <input type="email" name="correo" placeholder="Correo electrónico" value={datos.correo} onChange={handleChange} />
          <input type="text" name="asegurado" placeholder="Asegurado" value={datos.asegurado} onChange={handleChange} />
          <input type="text" name="telefono" placeholder="Teléfono" value={datos.telefono} onChange={handleChange} />
          <input type="text" name="no_agente" placeholder="Número de agente" value={datos.no_agente} onChange={handleChange} />
        </div>

        <div className="botones-modal">
          <button onClick={onClose} className="btn-cancelar">Cancelar</button>
          <button onClick={guardarCambios} className="btn-agregar">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditar_cliente;