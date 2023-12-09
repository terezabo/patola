import React, { useState } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiRequest from '../../apiRequest';
import API_URL from '../../apiConfig';



const Add = ({terms, setTerms}) => {
  const [newTerm, setNewTerm] = useState({
    id: '',
    favorite: false,
    alphabet: '',
    word: '',
    topic: '',
    definition: '',
    details: '',
    photo: ''
  });

  const addTerm = async (term) => {
    const id = terms.length ? terms[terms.length - 1].id + 1 : 1;
    const addedTerm = { id, ...term};
    console.log('addedTerm:', addedTerm);
    const listTerms = [...terms, addedTerm];
    setTerms(listTerms);
    localStorage.setItem('patola', JSON.stringify(listTerms));

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedTerm)
    }
  
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTerm.word) return;
    addTerm(newTerm);
    setNewTerm({
      id: '',
      favorite: false,
      alphabet: '',
      word: '',
      topic: '',
      definition: '',
      details: '',
      photo: '',
    });
  }

  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setNewTerm((prevTerm) => ({
      ...prevTerm,
      [name]: value,
    }));
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            autoFocus
            type="text"
            placeholder="Další extrémně zajímavý termín"
            required
            value={newTerm.word}
            onChange={(e) => handleInputChange(e, 'word')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder='Vymysli co nejstručnější definici'
            value={newTerm.definition}
            onChange={(e) => handleInputChange(e, 'definition')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder='Nešlo to stručně? Tak se tady ještě trochu rozepiš no...'
            value={newTerm.details}
            onChange={(e) => handleInputChange(e, 'details')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select
            onChange={(e) => handleInputChange(e, 'topic')}
          >
            <option disabled value=''>Pokus se vybrat nějakou kategorii nebo vytvoř novou</option>
            <option value='Smrt'>Smrt</option>
            <option value='Změny životaschopnosti buněk'>Změny životaschopnosti buněk</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Máš nějakou fotku, bez který se to vážně neobejde?</Form.Label>
          <Form.Control
            type="file"
            value={newTerm.photo}
            onChange={(e) => handleInputChange(e, 'photo')}
          />
        </Form.Group>
        <Button type="submit"><AiFillFileAdd style={{color:'white', fontSize: '1.5em'}}/></Button>
      </Form>
    
    </Container>
  )
}

export default Add
