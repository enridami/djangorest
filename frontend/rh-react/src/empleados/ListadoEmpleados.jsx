import { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { urlBase } from "../config";

function ListadoEmpleados() {

  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    setEmpleados(resultado.data);
  };

  const eliminarEmpleado = async (idEmpleado) => {

    const confirmacion = window.confirm("¿Seguro que deseas eliminar este empleado?");

    if (!confirmacion) return;

    try {

      await axios.delete(`${urlBase}/${idEmpleado}/`);

      // recargar lista sin refrescar página
      cargarEmpleados();

    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el empleado");
    }
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

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/editar/${empleado.idEmpleado}`)}>
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarEmpleado(empleado.idEmpleado)}>
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