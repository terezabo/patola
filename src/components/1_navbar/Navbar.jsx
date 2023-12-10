import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { AiFillEdit } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';


import { Link, useMatch, useResolvedPath, useLocation  } from 'react-router-dom'

const MyNavbar = () => {
  const location = useLocation();
  return (
    <Navbar expand="lg"  bg="light">
      <Container>
        <Navbar.Brand>
          <Link to='' className='brand me-5'>Patologický slovník</Link>
        </Navbar.Brand>
        {location.pathname === '/' && <h1 className='m-0 ms-5'>Všechny termíny</h1>}
        {location.pathname === '/saved' && <h1 className='m-0 ms-5'>"Oblíbené" termíny</h1>}
        {location.pathname === '/edit' && <h1 className='m-0 ms-5'>Přidat nový termín</h1>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              <CustomLink to='/' className='icon'><FaHome /></CustomLink>
              <CustomLink to='/saved' className='icon'><BsStarFill /></CustomLink>
              <CustomLink to='/edit' className='icon'><AiFillEdit /></CustomLink>
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
