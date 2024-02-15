
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './layout/Admin'
import Client from './layout/Client'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="" element={<Client />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </div>
  )
}

export default App
