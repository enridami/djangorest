import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../config";

function AgregarEmpleado() {

  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    departamento: "",
    sueldo: ""
  });

  const { nombre, departamento, sueldo } = empleado;

  const onInputChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(urlBase, empleado);

    navigate("/");
  };

  return (
    <div className="container">

      <h3 className="text-center">Agregar Empleado</h3>

      <form onSubmit={onSubmit}>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Departamento</label>
          <input
            type="text"
            className="form-control"
            name="departamento"
            value={departamento}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sueldo</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="sueldo"
            value={sueldo}
            onChange={onInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Regresar
        </button>

      </form>

    </div>
  );
}

export default AgregarEmpleado;