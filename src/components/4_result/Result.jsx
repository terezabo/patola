import React, { useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';



const Result = ({ terms, setTerms, query }) => {
  const [btnHover, setBtnHover] = useState(false);



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

  const searchedTerms = terms.filter(term => {
    return typeof term.word === 'string' && term.word.toLowerCase().includes(query.toLowerCase());
  });


  return (
    <Container>
      {searchedTerms.map((term) => (
        <Row key={term.id}>

          <Row className='justify-content-center'>
            <Col>
              <hr className="line line_left" />
            </Col>
            <Col className='text-center'>
              <h3>{term.word}</h3>
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
            {term.favorite || btnHover
              ? < BsStarFill className='icon star' onClick={() => toggleFavorite(term.id)}
              onMouseLeave={() => setBtnHover(false)}
              />
              : <BsStar className='icon' 
                  onClick={() => toggleFavorite(term.id)}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                />
            }
            <FaTrashAlt
              className='icon trash'
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
