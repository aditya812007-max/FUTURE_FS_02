import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import LiquidEther from './components/LiquidEther'
import ProductPage from './components/ProductPage'
import { products } from './data'
import CheckoutModal from './components/CheckoutModal' // Import Modal
import { motion } from 'framer-motion' // Import Animation Library
import { Toaster } from 'react-hot-toast' // Import Toast Library

function App() {

  // FIX 1: Initialize as empty string "", NOT false
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // FIX 2: Add the missing state for the Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* FIX 3: Add Toaster here so notifications work */}
      <Toaster position="top-center" />

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
        <LiquidEther 
          colors={["#3044e8", "#6a8ce6", "#d5d8e6"]}
          mouseForce={20}
          isViscous={false}
          viscous={30}
        />
      </div>

      <nav className='navbar'>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>Aditya's Store</h1>
        </Link>
        <button className='cart-icon-btn' onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart ({cart.length})
        </button>
      </nav>

      <Routes>
        <Route path="/" element={
          <> 
          <div className='search-container' style={{marginBottom:'20px', textAlign:"center"}}>
            <input
            type="text"
            placeholder='Search For Product'
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 20px',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '25px',
              fontSize: '1rem'
            }}
            />
          </div>
          <div className='product-grid'>
            {products
              .filter((val) => {
                if (searchTerm === "") return val;
                else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) return val;
              })
              .map((product) => (
              
              // FIX 4: Changed <div> to <motion.div> and fixed syntax errors
              <motion.div 
                key={product.id} 
                className='product-card'
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }}  
                transition={{ duration: 0.4 }}             
                whileHover={{ scale: 1.05 }}
              >                                
                <Link to={`/product/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <img src={product.image} alt={product.name} className='product-img'/>
                    <h3>{product.name}</h3>
                </Link>
                
                <p>Price: ₹{product.price}</p>
                <p className='category'>{product.category}</p>
                
                <button onClick={() => addToCart(product)}>Add to Cart 🛒</button>
              </motion.div>
            ))}
          </div>
          </>
        } />

        <Route path="/product/:id" element={ <ProductPage addToCart={addToCart} /> } />

      </Routes>

      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({cart.length})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>❌</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-msg">Your cart is empty. Go buy stuff!</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <span>{item.name}</span>
                  <b>₹{item.price}</b>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <h3>Total: ₹{total.toFixed(2)}</h3>
              
              {/* FIX 5: Wire up the button to open the modal (set true, not false) */}
              <button className="checkout-btn" onClick={() => setIsCheckoutOpen(true)}>
                Checkout Now
              </button>
              
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart 🗑️
              </button>
            </div>
          </>
        )}
      </div>

      {/* FIX 6: Render the Modal at the bottom */}
      {isCheckoutOpen && (
        <CheckoutModal 
          close={() => setIsCheckoutOpen(false)} 
          clearCart={clearCart} 
        />
      )}
    </>
  )
}

export default App;