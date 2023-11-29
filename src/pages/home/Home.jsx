import React from 'react'
import Row from 'react-bootstrap/Row';

import Result from '../../components/4_result/Result'
import Search from '../../components/2_search/Search'



const Home = ({terms, setTerms}) => {
  return (
    <>
      <Row className="mb-3">
        <Search />
      </Row>

      <Result terms={terms} setTerms={setTerms}/>
    </>
  )
}

export default Home
