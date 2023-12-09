import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Navbar from './components/1_navbar/Navbar';
import Content from './components/3_content/Content';
import apiRequest from './apiRequest';
import API_URL from './apiConfig';


import { useEffect, useState } from 'react';



function App() {

  const [terms, setTerms] = useState([]);


  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data se nepodařilo načíst.');
        const listTerms = await response.json();
        setTerms(listTerms);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTerms();
  }, [])


  return (
    <Container>
      <Row className="mb-3">
        <Navbar />
      </Row>

      <main>
        {isLoading && <p>Načítám...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content terms={terms} setTerms={setTerms}/>}
      </main>



      

      

      
    </Container>
  )
}

export default App
