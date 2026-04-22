import { useState } from 'react'
import axios from 'axios'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import { urlBase } from '../config'

export default function AgregarEmpleado() {

  const [nombre, setNombre] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [sueldo, setSueldo] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const nombreOk = nombre.trim()
    const deptoOk = departamento.trim()
    const sueldoOk = Number(sueldo)

    if (!nombreOk || !deptoOk) {
      setError('Nombre y departamento son obligatorios.')
      return
    }

    if (isNaN(sueldoOk) || sueldoOk <= 0) {
      setError('El sueldo debe ser un número mayor a 0.')
      return
    }

    try {
      setEnviando(true)

      await axios.post(urlBase, {
        nombre: nombreOk,
        departamento: deptoOk,
        sueldo: sueldoOk
      })

      navigate('/')

    } catch (e) {

      if (e.response && e.response.data) {
        const errores = Object.values(e.response.data).flat().join(" ")
        setError(errores)
      } else {
        setError('Error de conexión con el servidor.')
      }

    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="card">

      <div className="card-header">
        <strong>Agregar empleado</strong>
      </div>

      <div className="card-body">

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={onSubmit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre completo"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Departamento</label>
            <input
              className="form-control"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              placeholder="Área o departamento"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Sueldo</label>
            <NumericFormat
              className="form-control"
              value={sueldo}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              prefix="$ "
              placeholder="Ingrese el sueldo"
              onValueChange={({ floatValue }) => setSueldo(floatValue ?? 0)}
            />
          </div>

          <div className="col-12">

            <button type="submit" className="btn btn-success" disabled={enviando}>
              {enviando ? 'Guardando…' : 'Guardar'}
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/")}>
              Regresar
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}