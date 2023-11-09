import React, { useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';



const Result = ({terms, setTerms}) => {
  console.log(terms)


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
