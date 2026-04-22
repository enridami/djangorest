import { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { urlBase } from "../config";

function ListadoEmpleados() {

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    setEmpleados(resultado.data);
  };

  return (
    <div className="container">

      <h3 className="text-center">Listado de Empleados</h3>

      <table className="table table-dark table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Sueldo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {empleados.map((empleado) => (
            <tr key={empleado.idEmpleado}>

              <td>{empleado.idEmpleado}</td>

              <td>{empleado.nombre}</td>

              <td>{empleado.departamento}</td>

              <td>

                <NumericFormat
                  value={empleado.sueldo}
                  displayType="text"
                  thousandSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="$ "
                />

              </td>

              <td>

                <button className="btn btn-warning btn-sm me-2">
                  Editar
                </button>

                <button className="btn btn-danger btn-sm">
                  Eliminar
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ListadoEmpleados;