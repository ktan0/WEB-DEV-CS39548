import { useState } from 'react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="bg-white shadow-sm position-fixed w-100 top-0" style={{ zIndex: 1000 }}>
      <nav className="container d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center">
          <span className="fs-4 me-2">🍽️</span>
          <h1 className="h4 mb-0">Top Tier Italzi</h1>
        </div>

        <div className="hamburger d-md-none" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links list-unstyled mb-0 d-flex flex-column flex-md-row position-md-static position-absolute bg-white border border-md-0 rounded mt-2 me-3 p-3 p-md-0 ${isOpen ? 'd-flex' : 'd-none d-md-flex'}`} style={{ top: '60px', right: '20px' }}>
          <li className="me-md-4 mb-2 mb-md-0"><a href="#home" className="text-decoration-none fw-semibold text-dark" onClick={closeMenu}>Home</a></li>
          <li className="me-md-4 mb-2 mb-md-0"><a href="#menu" className="text-decoration-none fw-semibold text-dark" onClick={closeMenu}>Menu</a></li>
          <li className="me-md-4 mb-2 mb-md-0"><a href="#about" className="text-decoration-none fw-semibold text-dark" onClick={closeMenu}>About</a></li>
          <li className="mb-2 mb-md-0"><a href="#contact" className="text-decoration-none fw-semibold text-dark" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header