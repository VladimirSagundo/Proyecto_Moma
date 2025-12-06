import React, { useState } from "react";
import './css_agregar_cliente.css';
import Swal from 'sweetalert2';

const ModalAgregar_cliente = ({ onClose }) => {

  const aseguradoras = [
    { id: 1, nombre: "SMNYL" },
    { id: 2, nombre: "BX+" },
    { id: 3, nombre: "INSIGNIA LIFE" },
    { id: 4, nombre: "MAPFRE" },
    { id: 5, nombre: "INBURSA" }
  ];

  const formasPago = [
    { id: 1, nombre: "MENSUAL" },
    { id: 2, nombre: "TRIMESTRAL" },
    { id: 3, nombre: "SEMESTRAL" },
    { id: 4, nombre: "ANUAL" }
  ];

  const mediosCobro = [
    { id: 1, nombre: "TDC" },
    { id: 2, nombre: "TDD" },
    { id: 3, nombre: "AGENTE" },
    { id: 4, nombre: "MODO DIRECTO" }
  ];

  const productos = [
    { id: 1, nombre: "VIDA" },
    { id: 2, nombre: "GASTO MÉDICO" }
  ];

  const planesPorAseguradora = {
    1: [ 
      { id: 1, nombre: "ALFA MEDICAL FLEX A"},
      { id: 2, nombre: "ALFA MEDICAL FLEX B"},
      { id: 3, nombre: "INTEGRO"},
      { id: 4, nombre: "PLENO"},
      { id: 5, nombre: "VIDA MUJER"},
      { id: 6, nombre: "SEGUBECA 18"},
      { id: 7, nombre: "DOTAL 10 UDIS"},
      { id: 8, nombre: "DOTAL 20 UDIS"},
      { id: 9, nombre: "DOTAL 5 STAR 97"},
      { id: 10, nombre: "IMAGINA SER 55"},
      { id: 11, nombre: "IMAGINA SER 60"},
      { id: 12, nombre: "IMAGINA SER 65"},
      { id: 13, nombre: "IMAGINA SER +"},
      { id: 14, nombre: "REALIZA CRECIENTE"},
      { id: 15, nombre: "OBJETIVO VIDA"},
      { id: 16, nombre: "TEMPORAL 10 UDIS"},
      { id: 17, nombre: "TEMPORAL 20 UDIS"},
      { id: 18, nombre: "ORVI 99 10 UDIS"},
      { id: 19, nombre: "ORVI 99 15 PAGOS"},
      { id: 20, nombre: "ORVI 99 20 UDIS"}
    ],
    2: [ 
      { id: 21, nombre: "GMM TRADICIONAL" },
      { id: 22, nombre: "GMM UNIKUZ" }
    ],
    3: [ 
      { id: 23, nombre: "VPL 5" },
      { id: 24, nombre: "VPL 10" },
      { id: 25, nombre: "VPL 15" },
      { id: 26, nombre: "INSIGNIA PREMIA"},
      { id: 27, nombre: "TEMPORAL"},
      { id: 28, nombre: "VITALICIO BENEFICIO FISCAL"}
    ],
    4: [ 
      { id: 29, nombre: "PROTECCIÓN MEDIA A TU MEDIDA" }
    ],
    5: [ 
      { id: 30, nombre: "INBURMEDIC" }
    ]
  };

  const [aseguradoraId, setAseguradoraId] = useState("");
  const [planId, setPlanId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [formaPagoId, setFormaPagoId] = useState("");
  const [medioCobroId, setMedioCobroId] = useState("");

  const [numeroPoliza, setNumeroPoliza] = useState("");
  const [deducible, setDeducible] = useState("");
  const [contratante, setContratante] = useState("");
  const [correo, setCorreo] = useState("");
  const [asegurado, setAsegurado] = useState("");
  const [telefono, setTelefono] = useState("");
  const [numeroAgente, setNumeroAgente] = useState("");

  const [diaEmision, setDiaEmision] = useState("");
  const [mesEmision, setMesEmision] = useState("");
  const [anioEmision, setAnioEmision] = useState("");
  const [diaVencimiento, setDiaVencimiento] = useState("");
  const [mesVencimiento, setMesVencimiento] = useState("");
  const [anioVencimiento, setAnioVencimiento] = useState("");
  const [diaNacimiento, setDiaNacimiento] = useState("");
  const [mesNacimiento, setMesNacimiento] = useState("");
  const [anioNacimiento, setAnioNacimiento] = useState("");

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [ "Enero","Febrero","Marzo","Abril","Mayo","Junio", "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ];
  const currentYear = new Date().getFullYear();
  const añosEmision = Array.from({ length: 40 }, (_, i) => currentYear - 20 + i);
  const añosVencimiento = Array.from({ length: 30 }, (_, i) => currentYear + i);
  const añosNacimiento = Array.from({ length: 120 }, (_, i) => currentYear - i);

  const handleAgregar = async () => {
    try {
      const fechaEmision = `${anioEmision}-${mesEmision.toString().padStart(2,'0')}-${diaEmision.toString().padStart(2,'0')}`;
      const fechaVencimiento = `${anioVencimiento}-${mesVencimiento.toString().padStart(2,'0')}-${diaVencimiento.toString().padStart(2,'0')}`;
      const fechaNacimiento = `${anioNacimiento}-${mesNacimiento.toString().padStart(2,'0')}-${diaNacimiento.toString().padStart(2,'0')}`;

      const payload = {
        aseguradora_id: Number(aseguradoraId),
        plan_id: Number(planId),
        producto_id: Number(productoId),
        forma_pago_id: Number(formaPagoId),
        medio_cobro_id: Number(medioCobroId),
        numero_poliza: numeroPoliza,
        deducible,
        contratante,
        correo,
        asegurado,
        telefono,
        numero_agente: numeroAgente,
        fecha_de_emision: fechaEmision,
        fecha_de_vencimiento: fechaVencimiento,
        fecha_de_nacimiento: fechaNacimiento
      };

      const res = await fetch("http://127.0.0.1:8000/api/polizas/crear-poliza/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
                  Swal.fire({
                      title: 'Error',
                      text: 'Hubo un error al guardar la póliza.',
                      icon: 'error',
                      confirmButtonText: 'Cerrar'
                  });
                  return;
              }

      Swal.fire({
                  title: '¡Éxito!',
                  text: 'Póliza agregada correctamente.',
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
    <div className="overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Agregar cliente</h3>
        <div className="grid-form">

          <select value={aseguradoraId} onChange={(e) => { setAseguradoraId(e.target.value); setPlanId(""); }}>
            <option value="">Aseguradora</option>
            {aseguradoras.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>

          <select value={planId} onChange={(e) => setPlanId(e.target.value)} disabled={!aseguradoraId}>
            <option value="">Plan</option>
            {aseguradoraId && planesPorAseguradora[aseguradoraId]?.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>

          <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
            <option value="">Producto</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>

          <select value={formaPagoId} onChange={(e) => setFormaPagoId(e.target.value)}>
            <option value="">Forma de pago</option>
            {formasPago.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
          </select>

          <select value={medioCobroId} onChange={(e) => setMedioCobroId(e.target.value)}>
            <option value="">Medio de cobro</option>
            {mediosCobro.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>

          <select value={deducible} onChange={(e) => setDeducible(e.target.value)}>
            <option value="">Deducible</option>
            <option value="Si">SI</option>
            <option value="No">NO</option>
          </select>

          <input type="text" placeholder="Número de póliza" value={numeroPoliza} onChange={(e) => setNumeroPoliza(e.target.value)} />

          <div className="fecha-row">
            <label>Fecha de emisión</label>
            <div className="fecha-selects">
              <select value={diaEmision} onChange={e => setDiaEmision(e.target.value)}>{dias.map(d => <option key={d} value={d}>{d}</option>)}</select>
              <select value={mesEmision} onChange={e => setMesEmision(e.target.value)}>{meses.map((m,i) => <option key={i} value={i+1}>{m}</option>)}</select>
              <select value={anioEmision} onChange={e => setAnioEmision(e.target.value)}>{añosEmision.map(y => <option key={y} value={y}>{y}</option>)}</select>
            </div>
          </div>

          <div className="fecha-row">
            <label>Fecha de vencimiento</label>
            <div className="fecha-selects">
              <select value={diaVencimiento} onChange={e => setDiaVencimiento(e.target.value)}>{dias.map(d => <option key={d} value={d}>{d}</option>)}</select>
              <select value={mesVencimiento} onChange={e => setMesVencimiento(e.target.value)}>{meses.map((m,i) => <option key={i} value={i+1}>{m}</option>)}</select>
              <select value={anioVencimiento} onChange={e => setAnioVencimiento(e.target.value)}>{añosVencimiento.map(y => <option key={y} value={y}>{y}</option>)}</select>
            </div>
          </div>

          <div className="fecha-row">
            <label>Fecha de nacimiento</label>
            <div className="fecha-selects">
              <select value={diaNacimiento} onChange={e => setDiaNacimiento(e.target.value)}>{dias.map(d => <option key={d} value={d}>{d}</option>)}</select>
              <select value={mesNacimiento} onChange={e => setMesNacimiento(e.target.value)}>{meses.map((m,i) => <option key={i} value={i+1}>{m}</option>)}</select>
              <select value={anioNacimiento} onChange={e => setAnioNacimiento(e.target.value)}>{añosNacimiento.map(y => <option key={y} value={y}>{y}</option>)}</select>
            </div>
          </div>

          <input type="text" placeholder="Contratante" value={contratante} onChange={(e) => setContratante(e.target.value)} />
          <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <input type="text" placeholder="Asegurado" value={asegurado} onChange={(e) => setAsegurado(e.target.value)} />
          <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <input type="text" placeholder="Número de agente" value={numeroAgente} onChange={(e) => setNumeroAgente(e.target.value)} />

        </div>

        <div className="botones-modal">
          <button onClick={onClose} className="btn-cancelar">Cancelar</button>
          <button onClick={handleAgregar} className="btn-agregar">Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregar_cliente;
