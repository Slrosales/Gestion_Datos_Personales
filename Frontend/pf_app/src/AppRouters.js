import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import ConsultaPage from './Pages/ConsultaPage/ConsultaPage'
import CreacionPage from './Pages/CreacionPage/CreacionPage'
import HomePage from './Pages/HomePage/HomePage'



export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/ConsultaPage" element={<ConsultaPage/>} />
    <Route path='/CreacionPage'element={<CreacionPage/>} />
    </Routes>
}