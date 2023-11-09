import React from 'react'
import Result from '../../components/4_result/Result'


const Home = ({terms, setTerms}) => {
  return (
    <>
      <Result terms={terms} setTerms={setTerms}/>
    </>
  )
}

export default Home
