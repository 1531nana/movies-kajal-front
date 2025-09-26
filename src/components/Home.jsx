export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl">Películas</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl">Géneros</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl">Directores</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl">Productoras</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  )
}