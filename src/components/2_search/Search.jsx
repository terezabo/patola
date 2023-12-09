import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { AiOutlineSearch } from 'react-icons/ai'



const Search = ({ query, setQuery }) => {


  return (
    <Stack direction="horizontal" gap={3}>
      <AiOutlineSearch  style={{ fontSize: '24px', color: 'orange'}}/>

      <Form.Control
        autoFocus
        className="me-auto"
        placeholder="Kolikrát to ještě budeš vyhledávat, než se to konečně naučíš?"
        value = {query}
        onChange={e => setQuery(e.target.value)}
        type="search"
      />
    </Stack>
  );
}

export default Search
