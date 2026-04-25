function Menu({ addToCart }) {
  const menuData = {
    appetizers: [
      { name: 'Garlic Bread', price: 5.99 },
      { name: 'Chicken Wings', price: 8.99 },
      { name: 'Mozzarella Sticks', price: 6.99 }
    ],
    mainCourses: [
      { name: 'Grilled Salmon', price: 18.99 },
      { name: 'Steak Frites', price: 22.99 },
      { name: 'Chicken Parmesan', price: 16.99 }
    ],
    desserts: [
      { name: 'Chocolate Cake', price: 6.99 },
      { name: 'Tiramisu', price: 7.99 },
      { name: 'Ice Cream', price: 4.99 }
    ]
  }

  const formatCurrency = (value) => `$${value.toFixed(2)}`

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
                {menuData.appetizers.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
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
                ))}
              </div>
            </div>
          </div>

          {/* Main Courses */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Main Courses</h3>
                {menuData.mainCourses.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
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
                ))}
              </div>
            </div>
          </div>

          {/* Desserts */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title h5 mb-3">Desserts</h3>
                {menuData.desserts.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu