import { useEffect, useState } from 'react'
import axios from 'axios'
import { NumericFormat } from 'react-number-format'
import { useNavigate, useParams } from 'react-router-dom'
import { urlBase } from '../config'

export default function EditarEmpleado() {

  const { idEmpleado } = useParams()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [sueldo, setSueldo] = useState(0)

  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarEmpleado()
  }, [])

  const cargarEmpleado = async () => {
    try {
      const resultado = await axios.get(`${urlBase}${idEmpleado}/`)
      const data = resultado.data

      setNombre(data.nombre)
      setDepartamento(data.departamento)
      setSueldo(Number(data.sueldo))

    } catch (e) {
      setError('No se pudo cargar el empleado.')
    } finally {
      setCargando(false)
    }
  }

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

      await axios.put(`${urlBase}${idEmpleado}/`, {
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

  if (cargando) {
    return <p>Cargando datos...</p>
  }

  return (
    <div className="card">

      <div className="card-header">
        <strong>Editar empleado</strong>
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
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Departamento</label>
            <input
              className="form-control"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
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
              onValueChange={({ floatValue }) => setSueldo(floatValue ?? 0)}
            />
          </div>

          <div className="col-12">

            <button type="submit" className="btn btn-primary" disabled={enviando}>
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