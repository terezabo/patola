import React from 'react'

import Row from 'react-bootstrap/Row';
import Search from '../../components/2_search/Search'
import Result from '../../components/4_result/Result';


const Saved = ({ terms, setTerms, query, setQuery }) => {
  return (
    <>
      <Row className="mb-3">
        <Search query={query} setQuery={setQuery}/>
      </Row>

      <Result terms={terms} setTerms={setTerms} query={query} onlyFavorites={true}/>
    </>

  )
}

export default Saved
