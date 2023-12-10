import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from '../../pages/home/Home'
import Saved from '../../pages/saved/Saved'
import Edit from '../../pages/edit/Edit'


const Content = ({terms, setTerms}) => {
  const [query, setQuery] = useState('')

  return (
    <Routes>
      <Route path='' element={<Home terms={terms} setTerms={setTerms} query={query} setQuery={setQuery}/>}  />
      <Route path='/saved' element={<Saved terms={terms} setTerms={setTerms} query={query} setQuery={setQuery}/>}  />
      <Route path='/edit' element={<Edit terms={terms} setTerms={setTerms}/>}  />
    </Routes>

  )
}

export default Content
