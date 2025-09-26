import { useEffect, useState } from "react"
import { obtenerMedias, creaMedia, editarMedia, eliminarMedia } from "../../services/MediaService"
import { obtenerGeneros } from "../../services/GeneroService"
import { obtenerDirectores } from "../../services/DirectorService"
import { obtenerProductoras } from "../../services/ProductoraService"
import { obtenerTipos } from "../../services/TipoService"

export default function Media() {
  const [medias, setMedias] = useState([])
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [productoras, setProductoras] = useState([])
  const [tipos, setTipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingMedia, setEditingMedia] = useState(null)
  const [filterGenero, setFilterGenero] = useState('')
  const [filterTipo, setFilterTipo] = useState('')
  const [filterAnio, setFilterAnio] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      const [mediasRes, generosRes, directoresRes, productorasRes, tiposRes] = await Promise.all([
        obtenerMedias(),
        obtenerGeneros('true'), // only active
        obtenerDirectores('true'), // only active
        obtenerProductoras('true'), // only active
        obtenerTipos()
      ])
      setMedias(mediasRes.data)
      setGeneros(generosRes.data)
      setDirectores(directoresRes.data)
      setProductoras(productorasRes.data)
      setTipos(tiposRes.data)
    } catch (error) {
      setError('Error al cargar datos')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta media?')) {
      try {
        await eliminarMedia(id)
        loadData()
      } catch (error) {
        console.error('Error al eliminar:', error)
      }
    }
  }

  const handleEdit = (media) => {
    setEditingMedia(media)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingMedia(null)
    setShowForm(true)
  }

  const handleFormSubmit = async (values) => {
    try {
      if (editingMedia) {
        await editarMedia(editingMedia._id, values)
      } else {
        await creaMedia(values)
      }
      loadData()
      setShowForm(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredMedias = medias.filter(media => {
    if (filterGenero && media.genero._id !== filterGenero) return false
    if (filterTipo && media.tipo._id !== filterTipo) return false
    if (filterAnio && media.anioEstreno !== parseInt(filterAnio)) return false
    return true
  })

  useEffect(() => {
    loadData()
  }, [])

  if (loading) return <div className="text-center">Cargando...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Películas y Series</h2>
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Crear Media
        </button>
      </div>

      <div className="mb-4 flex space-x-4">
        <select
          value={filterGenero}
          onChange={(e) => setFilterGenero(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded"
        >
          <option value="">Todos los géneros</option>
          {generos.map(genero => (
            <option key={genero._id} value={genero._id}>{genero.nombre}</option>
          ))}
        </select>
        <select
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded"
        >
          <option value="">Todos los tipos</option>
          {tipos.map(tipo => (
            <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Año"
          value={filterAnio}
          onChange={(e) => setFilterAnio(e.target.value)}
          className="p-2 bg-gray-700 border border-gray-600 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedias.map(media => (
          <div key={media._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src={media.imagen || '/placeholder.jpg'}
              alt={media.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{media.titulo}</h3>
              <p className="text-gray-300 mb-2">{media.sinopsis.substring(0, 100)}...</p>
              <p className="text-sm text-gray-400">Género: {media.genero.nombre}</p>
              <p className="text-sm text-gray-400">Tipo: {media.tipo.nombre}</p>
              <p className="text-sm text-gray-400">Año: {media.anioEstreno}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(media)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(media._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <MediaForm
          media={editingMedia}
          generos={generos}
          directores={directores}
          productoras={productoras}
          tipos={tipos}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

function MediaForm({ media, generos, directores, productoras, tipos, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    serial: media?.serial || '',
    titulo: media?.titulo || '',
    sinopsis: media?.sinopsis || '',
    url: media?.url || '',
    imagen: media?.imagen || '',
    anioEstreno: media?.anioEstreno || '',
    genero: media?.genero._id || '',
    director: media?.director._id || '',
    productora: media?.productora._id || '',
    tipo: media?.tipo._id || ''
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl my-8">
        <h3 className="text-xl font-bold mb-4">
          {media ? 'Editar Media' : 'Crear Media'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Serial</label>
              <input
                type="text"
                name="serial"
                value={formData.serial}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sinopsis</label>
            <textarea
              name="sinopsis"
              value={formData.sinopsis}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              rows="3"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Imagen</label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Año de Estreno</label>
              <input
                type="number"
                name="anioEstreno"
                value={formData.anioEstreno}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              >
                <option value="">Seleccionar género</option>
                {generos.map(genero => (
                  <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Director</label>
              <select
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              >
                <option value="">Seleccionar director</option>
                {directores.map(director => (
                  <option key={director._id} value={director._id}>{director.nombres}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Productora</label>
              <select
                name="productora"
                value={formData.productora}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                required
              >
                <option value="">Seleccionar productora</option>
                {productoras.map(productora => (
                  <option key={productora._id} value={productora._id}>{productora.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              required
            >
              <option value="">Seleccionar tipo</option>
              {tipos.map(tipo => (
                <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
              ))}
            </select>
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