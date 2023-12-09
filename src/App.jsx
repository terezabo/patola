import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Navbar from './components/1_navbar/Navbar';
import Content from './components/3_content/Content';
import apiRequest from './apiRequest';


import { useEffect, useState } from 'react';



function App() {
  const API_URL = 'http://localhost:3500/terms'

  const [terms, setTerms] = useState([
    {
      id: 1,
      favorite: false,
      alphabet: "n",
      word: "nekróza",
      topic: "Buněčná smrt",
      definition: "Nekróza je intravitální odumření tkáně.",
      details: "Zahrnuje celé spektrum morfologických změn, které probíhají po zániku buňky. Vývoj nekrotických změn trvá několik hodin, a proto nejsou makroskopicky zřejmé bezprostředně po odumření buněk. Většinou se jedná o patologický proces, ale může být součástí i procesů fyziologických (např. alternativní cesta likvidace nádorových buněk, které inaktivují apoptózu).",
      photo: ''
    },
    {
      id: 2,
      favorite: true,
      alphabet: "a",
      word: "apoptóza",
      topic: "Buněčná smrt",
      definition: "Apoptóza neboli programovaná buněčná smrt je mechanismus sloužící k eliminaci nepotřebných či poškozených buněk.",
      details: "Jedná se o zánik buňky způsobený aktivací cysteinových proteáz kaspáz a následně pak jaderných endonukleáz. Dochází k poškození jaderné DNA a k zástavě všech biosyntetických pochodů v buňce. Velký význam hraje v ontogenezi, kdy napomáhá k formování orgánů. Během apoptózy nedochází (na rozdíl od nekrózy) k bobtnání, prasknutí a vylití obsahu buňky, které by způsobilo zánětlivou reakci.",
      photo: ''
    }
  ]);


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
