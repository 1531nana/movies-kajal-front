import { useEffect, useState } from "react"
import { obtenerDirectores, creaDirector, editarDirector } from "../../services/DirectorService"

export default function Directores() {
  const [directores, setDirectores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingDirector, setEditingDirector] = useState(null)
  const [filterEstado, setFilterEstado] = useState('')

  const listaDirectores = async () => {
    try {
      setLoading(true)
      const { data } = await obtenerDirectores(filterEstado)
      setDirectores(data)
    } catch (error) {
      setError('Error al cargar directores')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingDirector(null)
    setShowForm(true)
  }

  const handleEdit = (director) => {
    setEditingDirector(director)
    setShowForm(true)
  }

  const handleFormSubmit = async (values) => {
    try {
      if (editingDirector) {
        await editarDirector(editingDirector._id, values)
      } else {
        await creaDirector(values)
      }
      listaDirectores()
      setShowForm(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    listaDirectores()
  }, [filterEstado])

  if (loading) return <div className="text-center">Cargando...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Directores</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Crear Director
        </button>
      </div>

      <div className="mb-4">
        <select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded"
        >
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </div>

      <div className="bg-gray-800 rounded p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Nombres</th>
              <th className="text-left p-2">Estado</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {directores.map(director => (
              <tr key={director._id} className="border-b border-gray-700">
                <td className="p-2">{director.nombres}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${director.estado ? 'bg-green-600' : 'bg-red-600'}`}>
                    {director.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(director)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <DirectorForm
          director={editingDirector}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

function DirectorForm({ director, onClose, onSubmit }) {
  const [nombres, setNombres] = useState(director?.nombres || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ nombres })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {director ? 'Editar Director' : 'Crear Director'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombres</label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
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