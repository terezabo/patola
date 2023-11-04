import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav'>
      <Link to=''>Patologický slovník</Link>
      <ul>
        <CustomLink to='/saved' className="saved">uložené</CustomLink>
        <CustomLink to='/edit' className="edit">edit</CustomLink>
      </ul>
    </nav>
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

export default Navbar
