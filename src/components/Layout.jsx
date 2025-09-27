import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Películas</h1>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-400">Películas/Series</Link></li>
            <li><Link to="/generos" className="hover:text-blue-400">Géneros</Link></li>
            <li><Link to="/directores" className="hover:text-blue-400">Directores</Link></li>
            <li><Link to="/productoras" className="hover:text-blue-400">Productoras</Link></li>
            <li><Link to="/tipos" className="hover:text-blue-400">Tipos</Link></li>
            {/* <li><Link to="/media" className="hover:text-blue-400">Películas/Series</Link></li> */}
          </ul>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}