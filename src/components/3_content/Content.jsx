import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../../pages/home/Home'
import Saved from '../../pages/saved/Saved'
import Edit from '../../pages/edit/Edit'


const Content = () => {
  return (
    <Routes>
      <Route path='' element={<Home />}  />
      <Route path='/saved' element={<Saved />}  />
      <Route path='/edit' element={<Edit />}  />
    </Routes>

  )
}

export default Content
