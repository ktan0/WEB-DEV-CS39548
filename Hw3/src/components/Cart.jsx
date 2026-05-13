import { useState } from 'react'

function Cart({ cart, removeFromCart, clearCart, total, notification }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  })

  const formatCurrency = (value) => `$${value.toFixed(2)}`
  const cartItems = Object.keys(cart)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setCheckoutLoading(true)
    setCheckoutError('')

    // Convert cart format to order items format
    const orderItems = Object.entries(cart).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      price: data.price
    }))

    const orderData = {
      items: orderItems,
      total,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      notes: formData.notes
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const result = await response.json()
      console.log('Order placed successfully:', result)
      
      setOrderPlaced(true)
      setShowCheckout(false)
      clearCart()
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: ''
      })
      
      setTimeout(() => {
        setOrderPlaced(false)
      }, 3000)
    } catch (error) {
      setCheckoutError(error.message)
      console.error('Error placing order:', error)
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <section id="cart" className="py-4 bg-white border-top">
      <div className="container">
        <h2 className="mb-3">Shopping Cart</h2>

        {notification && (
          <div className="alert alert-success py-2 mb-3" role="alert" aria-live="polite">
            {notification}
          </div>
        )}

        {orderPlaced && (
          <div className="alert alert-success py-2 mb-3" role="alert">
            Order placed successfully! Thank you for your purchase.
          </div>
        )}

        {checkoutError && (
          <div className="alert alert-danger py-2 mb-3" role="alert">
            Error: {checkoutError}
          </div>
        )}

        <div className="mb-3">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-borderless">
                <tbody>
                  {cartItems.map(name => {
                    const item = cart[name]
                    const itemTotal = item.price * item.quantity
                    return (
                      <tr key={name}>
                        <td className="fw-semibold">{name}</td>
                        <td>x{item.quantity}</td>
                        <td className="text-end">{formatCurrency(item.price)}</td>
                        <td className="text-end">{formatCurrency(itemTotal)}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(name)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-semibold">Total: {formatCurrency(total)}</span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger"
              onClick={clearCart}
              disabled={cartItems.length === 0}
            >
              Remove All
            </button>
            <button
              className="btn btn-success"
              onClick={() => setShowCheckout(!showCheckout)}
              disabled={cartItems.length === 0}
            >
              {showCheckout ? 'Cancel' : 'Checkout'}
            </button>
          </div>
        </div>

        {showCheckout && cartItems.length > 0 && (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Order Details</h5>
              <form onSubmit={handleCheckout}>
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Special Instructions (optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart