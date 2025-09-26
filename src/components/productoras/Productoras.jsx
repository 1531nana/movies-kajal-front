import { useEffect, useState } from "react"
import { obtenerProductoras, creaProductora, editarProductora } from "../../services/ProductoraService"

export default function Productoras() {
  const [productoras, setProductoras] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProductora, setEditingProductora] = useState(null)
  const [filterEstado, setFilterEstado] = useState('')

  const listaProductoras = async () => {
    try {
      setLoading(true)
      const { data } = await obtenerProductoras(filterEstado)
      setProductoras(data)
    } catch (error) {
      setError('Error al cargar productoras')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingProductora(null)
    setShowForm(true)
  }

  const handleEdit = (productora) => {
    setEditingProductora(productora)
    setShowForm(true)
  }

  const handleFormSubmit = async (values) => {
    try {
      if (editingProductora) {
        await editarProductora(editingProductora._id, values)
      } else {
        await creaProductora(values)
      }
      listaProductoras()
      setShowForm(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    listaProductoras()
  }, [filterEstado])

  if (loading) return <div className="text-center">Cargando...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Productoras</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Crear Productora
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
              <th className="text-left p-2">Slogan</th>
              <th className="text-left p-2">Descripción</th>
              <th className="text-left p-2">Estado</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productoras.map(productora => (
              <tr key={productora._id} className="border-b border-gray-700">
                <td className="p-2">{productora.nombre}</td>
                <td className="p-2">{productora.slogan}</td>
                <td className="p-2">{productora.descripcion}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${productora.estado ? 'bg-green-600' : 'bg-red-600'}`}>
                    {productora.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(productora)}
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
        <ProductoraForm
          productora={editingProductora}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

function ProductoraForm({ productora, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: productora?.nombre || '',
    slogan: productora?.slogan || '',
    descripcion: productora?.descripcion || ''
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
        <h3 className="text-xl font-bold mb-4">
          {productora ? 'Editar Productora' : 'Crear Productora'}
        </h3>
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
            <label className="block text-sm font-medium mb-2">Slogan</label>
            <input
              type="text"
              name="slogan"
              value={formData.slogan}
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