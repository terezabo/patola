import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { AiOutlineSearch } from 'react-icons/ai'



const Search = ({ query, setQuery }) => {


  return (
    <Stack direction="horizontal" gap={3}>
      <Form.Control
        autoFocus
        className="me-auto"
        placeholder="Hledej..."
        value = {query}
        onChange={e => setQuery(e.target.value)}
        type="search"
      />
      <Button variant="primary"><AiOutlineSearch  style={{ fontSize: '24px', color: 'white'}}/></Button>
    </Stack>
  );
}

export default Search
