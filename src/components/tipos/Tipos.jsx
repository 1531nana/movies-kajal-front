import { useEffect, useState } from "react"
import { obtenerTipos, creaTipo } from "../../services/TipoService"

export default function Tipos() {
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const listaTipos = async () => {
    try {
      setLoading(true)
      const { data } = await obtenerTipos()
      setTipos(data)
    } catch (error) {
      setError('Error al cargar tipos')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setShowForm(true)
  }

  const handleFormSubmit = async (values) => {
    try {
      await creaTipo(values)
      listaTipos()
      setShowForm(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    listaTipos()
  }, [])

  if (loading) return <div className="text-center">Cargando...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Tipos</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Crear Tipo
        </button>
      </div>

      <div className="bg-gray-800 rounded p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map(tipo => (
              <tr key={tipo._id} className="border-b border-gray-700">
                <td className="p-2">{tipo.nombre}</td>
                <td className="p-2">{tipo.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <TipoForm
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

function TipoForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Crear Tipo</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}