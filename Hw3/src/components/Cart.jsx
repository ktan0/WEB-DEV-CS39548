function Cart({ cart, removeFromCart, clearCart, total, notification }) {
  const formatCurrency = (value) => `$${value.toFixed(2)}`
  const cartItems = Object.keys(cart)

  return (
    <section id="cart" className="py-4 bg-white border-top">
      <div className="container">
        <h2 className="mb-3">Shopping Cart</h2>

        {notification && (
          <div className="alert alert-success py-2 mb-3" role="alert" aria-live="polite">
            {notification}
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

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Total: {formatCurrency(total)}</span>
          <button
            className="btn btn-danger"
            onClick={clearCart}
            disabled={cartItems.length === 0}
          >
            Remove All
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart