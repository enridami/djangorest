import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navegacion from "./plantillas/Navegacion";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";

function App() {

  return (
    <Router>

      <Navegacion />

      <div className="container mt-4">

        <Routes>

          <Route path="/" element={<ListadoEmpleados />} />

          <Route path="/agregar" element={<AgregarEmpleado />} />

          <Route path="/editar/:idEmpleado" element={<EditarEmpleado />} />

        </Routes>

      </div>

    </Router>
  );
}

export default App;