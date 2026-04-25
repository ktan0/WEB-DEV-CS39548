import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [cart, setCart] = useState({})
  const [notification, setNotification] = useState('')

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 1800)
  }

  const addToCart = (name, price) => {
    setCart(prevCart => {
      const newCart = { ...prevCart }
      if (!newCart[name]) {
        newCart[name] = { price, quantity: 0 }
      }
      newCart[name].quantity += 1
      return newCart
    })
    showNotification(`Added ${name} to cart.`)
  }

  const removeFromCart = (name) => {
    setCart(prevCart => {
      const newCart = { ...prevCart }
      if (newCart[name]) {
        newCart[name].quantity -= 1
        if (newCart[name].quantity <= 0) {
          delete newCart[name]
          showNotification(`${name} removed from cart.`)
        } else {
          showNotification(`Removed one ${name}.`)
        }
      }
      return newCart
    })
  }

  const clearCart = () => {
    const hasItems = Object.keys(cart).length > 0
    setCart({})
    if (hasItems) {
      showNotification('All items removed from cart.')
    }
  }

  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <div className="App">
      <Header />
      <Hero />
      <Menu addToCart={addToCart} />
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={getCartTotal()}
        notification={notification}
      />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
