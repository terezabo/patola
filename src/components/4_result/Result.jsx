import React, { useMemo, useState } from 'react'
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaHome, FaTrashAlt } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import API_URL from '../../apiConfig';
import apiRequest from '../../apiRequest';
import { Link } from 'react-router-dom';



const Result = ({ terms, setTerms, query, onlyFavorites }) => {
  const [btnHover, setBtnHover] = useState(false);


  const toggleFavorite = async (id) => {
    const updatedTerms = terms.map((term) =>
      term.id === id ? { ...term, favorite: !term.favorite } : term);
    setTerms(updatedTerms);

    const myTerm = updatedTerms.filter((term) => term.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favorite: myTerm[0].favorite})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if(result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const updatedTerms = terms.filter((term) => term.id !== id);
    setTerms(updatedTerms);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if(result) setFetchError(result);

  }


  const searchedTerms = useMemo(() => {
    return terms.filter(term => {
      const matchesQuery =
      typeof term.word === 'string' && term.word.toLowerCase().includes(query.toLowerCase());

    return onlyFavorites ? (matchesQuery && term.favorite) : matchesQuery;
  })}, [terms, query, onlyFavorites]);


  const anyFavorites = terms.some(term => term.favorite);

  return (
    <Container>
      {searchedTerms.length ? (
        searchedTerms.map((term) => (
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
        ))
        ) : (

        !onlyFavorites ? (
          <Row>
            <Row className='justify-content-center'>
              <Col>
                <hr className="line line_left" />
              </Col>
              <Col className='text-center'>
                <h3>A sakra :(</h3>
              </Col>
              <Col>
                <hr className="line line_right" />
              </Col>
            </Row>

            <Row className='text-center mt-5'>
              <p>Tento termín ve slovníku zatím není...<br/>ZATÍM.<br/>Víš, co to znamená?</p>
              <Link to='/edit' className='icon' style={{ margin: 0 }}><AiFillEdit /></Link>
            </Row>    

          </Row>
          ) : anyFavorites ? (
            <Row>
              <Row className='justify-content-center'>
                <Col>
                  <hr className="line line_left" />
                </Col>
                <Col className='text-center'>
                  <h3>A sakra :(</h3>
                </Col>
                <Col>
                  <hr className="line line_right" />
                </Col>
              </Row>

              <Row className='text-center mt-5'>
                <p>Tento termín není uložený nebo ve slovníku chybí úplně...<br/>Zkus vyhledávat na hlavní stránce.<br/></p>
                <Link to='/' className='icon' style={{ margin: 0 }}><FaHome /></Link>
              </Row>    


            </Row>
            
          ) : (
            <Row>
              <Row className='justify-content-center'>
                <Col>
                  <hr className="line line_left" />
                </Col>
                <Col className='text-center'>
                  <h3>Zatím nic neuloženo</h3>
                </Col>
                <Col>
                  <hr className="line line_right" />
                </Col>
              </Row>

              <Row className='text-center mt-5'>
                <p>Ulož si termíny, který ti nejvíc vypadávají z hlavy.<br/>(Chápu, že se v ní neudrží skoro nic,
                ale uložit úplně všechno by postrádalo smysl, že..)</p>
                <Link to='/' className='icon' style={{ margin: 0 }}><FaHome /></Link>
              </Row>    
            </Row>
          )
        )
      };
    </Container>
  
)}

export default Result
