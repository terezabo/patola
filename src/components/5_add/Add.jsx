import React from 'react'
import { AiFillFileAdd } from 'react-icons/ai'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const Add = () => {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Přidat termín</Form.Label>
          <Form.Control autoFocus type="text" placeholder="Přidat nový termín" required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Disabled select menu</Form.Label>
          <Form.Select placeholder="Přidat nový termín">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit"><AiFillFileAdd style={{color:'white', fontSize: '1.5em'}}/></Button>
      </Form>
    <form className='addForm'>
      <label htmlFor="addTerm">Přidat termín</label>
      <input
        type="text"
        id='addTerm'
        placeholder='Přidat nový termín'
        required />
      <button
        type='submit'
        aria-label='Přidat termín'>
        <AiFillFileAdd />
      </button>
    </form>
    </Container>
  )
}

export default Add
