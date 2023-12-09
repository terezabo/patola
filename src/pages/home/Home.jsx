import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';

import Result from '../../components/4_result/Result'
import Search from '../../components/2_search/Search'




const Home = ({terms, setTerms}) => {
  const [query, setQuery] = useState('')


  return (
    <>
      <Row className="mb-3">
        <Search query={query} setQuery={setQuery}/>
      </Row>

      <Result terms={terms} setTerms={setTerms} query={query}/>
    </>
  )
}

export default Home
