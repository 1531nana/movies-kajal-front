import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { creaGenero, editarGenero } from '../../services/GeneroService'

const GeneroSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Demasiado corto')
    .max(50, 'Demasiado largo')
    .required('Requerido'),
  descripcion: Yup.string()
    .min(5, 'Demasiado corta')
    .max(200, 'Demasiado larga')
    .required('Requerida')
})

export default function GeneroForm({ genero, onClose, onSuccess }) {
  const initialValues = {
    nombre: genero?.nombre || '',
    descripcion: genero?.descripcion || ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (genero) {
        await editarGenero(genero._id, values)
      } else {
        await creaGenero(values)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {genero ? 'Editar Género' : 'Crear Género'}
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={GeneroSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <Field
                  name="nombre"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <Field
                  as="textarea"
                  name="descripcion"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  rows="3"
                />
                <ErrorMessage name="descripcion" component="div" className="text-red-500 text-sm mt-1" />
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
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}