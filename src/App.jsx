import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Generos from './components/generos/Generos'
import Directores from './components/directores/Directores'
import Productoras from './components/productoras/Productoras'
import Tipos from './components/tipos/Tipos'
import Media from './components/media/Media'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="generos" element={<Generos />} />
        <Route path="directores" element={<Directores />} />
        <Route path="productoras" element={<Productoras />} />
        <Route path="tipos" element={<Tipos />} />
        <Route path="media" element={<Media />} />
      </Route>
    </Routes>
  )
}

export default App
