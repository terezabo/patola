import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { AiFillEdit } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs';


import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const MyNavbar = () => {
  return (
    <Navbar expand="lg"  bg="light">
      <Container>
        <Navbar.Brand>
          <Link to='' className='brand'>Patologický slovník</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <CustomLink to='/saved' className='icon'><BsStarFill /></CustomLink>
            </Nav.Link>
            <Nav.Link>
              <CustomLink to='/edit' className='icon'><AiFillEdit /></CustomLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to)
  const active = useMatch({ path: resolvedPath.pathname, end: true})
  return (
    <li className={active ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default MyNavbar
