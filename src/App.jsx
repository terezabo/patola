import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import Navbar from './components/1_navbar/Navbar'
import Search from './components/2_search/Search'
import Content from './components/3_content/Content'


import { useEffect, useState } from 'react'



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


  const [newTerm, setNewTerm] = useState('')
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
    <div className="container">
      <Navbar />
      <Search />
      <main>
        {isLoading && <p>Načítám...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content terms={terms} setTerms={setTerms}/>}
      </main>



      

      

      
    </div>
  )
}

export default App
