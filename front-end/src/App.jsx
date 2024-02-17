
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './layout/Admin'
import Client from './layout/Client'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/*" element={<Client />}/>
      </Routes>
    </div>
  )
}

export default App
