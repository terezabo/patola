import React, { useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


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
    <Container>
      {terms.map((term) => (
        <Row key={term.id}>

          <Row className='justify-content-center'>
            <Col>
              <hr className="line line_left" />
            </Col>
            <Col className='text-align-center'>
              <h3 className='m-auto'>{term.word}</h3>
            </Col>
            <Col>
              <hr className="line line_right" />
            </Col>
          </Row>

          <div className='content'>
            <h4>definice:</h4><p>{term.definition}</p>
            <h4>podrobně:</h4><p>{term.details}</p>
            <h4>obrázek:</h4><img src={term.photo} alt="" />
          </div>

          <div className="oper">
            {term.favorite ? <BsStarFill className='icon' onClick={() => toggleFavorite(term.id)}/> : <BsStar className='icon' onClick={() => toggleFavorite(term.id)}/>}
            <FaTrashAlt
              className='icon'
              onClick={() => handleDelete(term.id)}
              role='button'
            />
          </div>

        </Row>
      ))}
    
    
    </Container>
  )
}

export default Result
