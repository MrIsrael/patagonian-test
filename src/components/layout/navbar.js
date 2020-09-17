import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return(
    <Fragment>
      <div className='navbar-link'>
        <Link to='/user-info' style={linkStyle}>Personal Content</Link>
      </div>
      <div className='navbar-link'>
        <Link to='/gallery' style={linkStyle}>Image Gallery</Link>
      </div>
      <div className='navbar-link'>
        <Link to='/products' style={linkStyle}>Products</Link>
      </div>
    </Fragment>
  )
}

// Link styles
const linkStyle = {
  textDecoration: 'none',
  color: 'rgb(228, 223, 213)',
}

export default Navbar
