import { useEffect, useState } from "react"
import { obtenerGeneros, eliminarGenero } from "../../services/GeneroService"
import GeneroForm from "./GeneroForm"

export default function Generos() {
  const [generos, setGeneros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingGenero, setEditingGenero] = useState(null)
  const [filterEstado, setFilterEstado] = useState('')

  const listaGeneros = async () => {
    try {
      setLoading(true)
      const { data } = await obtenerGeneros()
      setGeneros(data)
    } catch (error) {
      setError('Error al cargar géneros')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este género?')) {
      try {
        await eliminarGenero(id)
        listaGeneros()
      } catch (error) {
        console.error('Error al eliminar:', error)
      }
    }
  }

  const handleEdit = (genero) => {
    setEditingGenero(genero)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingGenero(null)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    listaGeneros()
  }

  const filteredGeneros = generos.filter(genero => {
    if (filterEstado === '') return true
    return genero.estado === (filterEstado === 'true')
  })

  useEffect(() => {
    listaGeneros()
  }, [])

  if (loading) return <div className="text-center">Cargando...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Géneros</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Crear Género
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
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Descripción</th>
              <th className="text-left p-2">Estado</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredGeneros.map(genero => (
              <tr key={genero._id} className="border-b border-gray-700">
                <td className="p-2">{genero.nombre}</td>
                <td className="p-2">{genero.descripcion}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${genero.estado ? 'bg-green-600' : 'bg-red-600'}`}>
                    {genero.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(genero)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(genero._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <GeneroForm
          genero={editingGenero}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}
