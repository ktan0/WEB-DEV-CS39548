import { useState, useEffect } from 'react'

function Menu({ addToCart }) {
  const [menuItems, setMenuItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/menu')
      if (!response.ok) {
        throw new Error('Failed to fetch menu')
      }
      const items = await response.json()
      
      // Organize items by category
      const organized = {
        appetizers: [],
        mainCourses: [],
        desserts: []
      }
      
      items.forEach(item => {
        if (organized[item.category]) {
          organized[item.category].push(item)
        }
      })
      
      setMenuItems(organized)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching menu:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) => `$${value.toFixed(2)}`

  if (loading) {
    return (
      <section id="menu" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Menu</h2>
          <p className="text-center">Loading menu...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="menu" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Menu</h2>
          <p className="text-center text-danger">Error loading menu: {error}</p>
          <div className="text-center">
            <button className="btn btn-primary" onClick={fetchMenu}>
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Our Menu</h2>
        <p className="text-center text-muted mb-4">Tap the Add button to place items into your cart.</p>

        <div className="row">
          {/* Appetizers */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Appetizers</h3>
                {menuItems.appetizers.length === 0 ? (
                  <p className="text-muted">No appetizers available</p>
                ) : (
                  menuItems.appetizers.map((item) => (
                    <div key={item._id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                      <span className="fw-semibold">{item.name}</span>
                      <div className="d-flex align-items-center gap-2">
                        <span>{formatCurrency(item.price)}</span>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addToCart(item.name, item.price)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Courses */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Main Courses</h3>
                {menuItems.mainCourses.length === 0 ? (
                  <p className="text-muted">No main courses available</p>
                ) : (
                  menuItems.mainCourses.map((item) => (
                    <div key={item._id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                      <span className="fw-semibold">{item.name}</span>
                      <div className="d-flex align-items-center gap-2">
                        <span>{formatCurrency(item.price)}</span>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addToCart(item.name, item.price)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Desserts */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Desserts</h3>
                {menuItems.desserts.length === 0 ? (
                  <p className="text-muted">No desserts available</p>
                ) : (
                  menuItems.desserts.map((item) => (
                    <div key={item._id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                      <span className="fw-semibold">{item.name}</span>
                      <div className="d-flex align-items-center gap-2">
                        <span>{formatCurrency(item.price)}</span>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addToCart(item.name, item.price)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu