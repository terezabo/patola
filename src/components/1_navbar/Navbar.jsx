import React from 'react'

const Navbar = () => {
  return (
    <nav className='nav'>
      <h2>Patologický slovník</h2>
      <div>
        <span className="saved">uložené</span>
        <span className="signup">sign-up</span>
      </div>
    </nav>
  )
}

export default Navbar
