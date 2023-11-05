import './App.css'


import Navbar from './components/1_navbar/Navbar'
import Search from './components/2_search/Search'
import Content from './components/3_content/Content'


import { useEffect, useState } from 'react'



function App() {
  const API_URL = 'http://localhost:3500/terms'

  const [terms, setTerms] = useState([])
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
        {!fetchError && !isLoading && <Content />}
      </main>



      

      

      
    </div>
  )
}

export default App
