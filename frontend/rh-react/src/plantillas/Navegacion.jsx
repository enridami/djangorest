import { Link } from "react-router-dom";

function Navegacion() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">

      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          RH App
        </Link>

        <div className="collapse navbar-collapse">

          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Empleados
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/agregar">
                Agregar
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navegacion;