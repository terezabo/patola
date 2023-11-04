import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Saved from './pages/saved/Saved'
import Edit from './pages/edit/Edit'


import Navbar from './components/1_navbar/Navbar'
import Search from './components/2_search/Search'



function App() {

  return (
    <div className="container">
      <Navbar />
      <Search />


      <Routes>
        <Route path='' element={<Home />}  />
        <Route path='/saved' element={<Saved />}  />
        <Route path='/edit' element={<Edit />}  />
      </Routes>

      

      

      
    </div>
  )
}

export default App
