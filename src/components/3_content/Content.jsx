import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../../pages/home/Home'
import Saved from '../../pages/saved/Saved'
import Edit from '../../pages/edit/Edit'


const Content = ({terms, setTerms}) => {
  return (
    <Routes>
      <Route path='' element={<Home terms={terms} setTerms={setTerms}/>}  />
      <Route path='/saved' element={<Saved />}  />
      <Route path='/edit' element={<Edit terms={terms} setTerms={setTerms}/>}  />
    </Routes>

  )
}

export default Content
