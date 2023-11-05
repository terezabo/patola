import React, { useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';



const Result = () => {
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

  const toggleFavorite = (id) => {
    const updatedTerms = terms.map((term) =>
      term.id === id ? { ...term, favorite: !term.favorite } : term
    );
    setTerms(updatedTerms);
  };

  const handleDelete = (id) => {
    const updatedTerms = terms.filter((term) => term.id !== id);
    setTerms(updatedTerms);
  }

  return (
    <div className="result">
      {terms.map((term) => (
        <div className="term" key={term.id}>

          <div className='title'>
            <hr className="line line_left" />
            <h3>{term.word}</h3>
            <hr className="line line_right" />
          </div>

          <div className='content'>
            <h4>definice:</h4><p>{term.definition}</p>
            <h4>podrobně:</h4><p>{term.details}</p>
            <h4>obrázek:</h4><img src={term.photo} alt="" />
          </div>

          <div className="oper">
            {term.favorite ? <BsStarFill onClick={() => toggleFavorite(term.id)}/> : <BsStar onClick={() => toggleFavorite(term.id)}/>}
            <FaTrashAlt
              onClick={() => handleDelete(term.id)}
              role='button'
            />
          </div>

        </div>
      ))}
    
    
    </div>
  )
}

export default Result
