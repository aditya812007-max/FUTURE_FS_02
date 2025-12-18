import {useState} from 'react'
import './App.css';
import LiquidEther from './components/LiquidEther'

function App() {
  const products = [
    { 
      id: 1, 
      name: 'Noise Earbuds', 
      price: 49.99, 
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80' 
    },
    { 
      id: 2, 
      name: "Noise Smart Watch", 
      price: 99.99, 
      category: "Wearables",
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80'
    },
    { 
      id: 3, 
      name: "Ant Esports Gaming Mouse", 
      price: 29.99, 
      category: "Gaming",
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80'
    },
    { 
      id: 4, 
      name: "Mechanical Keyboard", 
      price: 79.99, 
      category: "Gaming",
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80'
    },
    { 
      id: 5, 
      name: "Acer Nitro V16 Laptop", 
      price: 86000.00, 
      category: "Computers",
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80'
    },
    {
      id: 6,
      name: "MAYBELLINE (free for kiki)f"
      price: 20.00,
      category: "Makeup",
      image: 'https://images.unsplash.com/photo-1581579183494-5c5f4d3e6f3b?w=500&q=80'
    }
  ];

  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen (true);
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum,item) => sum + item.price, 0);

  return (
    <>
      
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        pointerEvents: 'none'
      }}>
        
        <LiquidEther 
          colors={["#3044e8", "#6a8ce6", "#d5d8e6"]}
          mouseForce={20}
          isViscous={false}
          viscous={30}
        />
      </div>
      
      <nav className='navbar'>
        <h1>Aditya's Store</h1>
        <button className='cart-icon-btn' onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart ({cart.length})
        </button>
      </nav>
      
      <div className='product-grid'>
          {products.map((product) => (
            <div key={product.id} className='product-card'>
              <img src={product.image} alt={product.name} className='product-img'/>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p className='category'>{product.category}</p>
              <button onClick={() => addToCart(product)}>Add to Cart 🛒</button>
            </div>
          ))}
          </div>

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
              <button className="checkout-btn" onClick={() => alert("Ullu banaya bada maza aaya :P")}>
                Checkout Now
              </button>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart 🗑️
              </button>
            </div>
          </>
        )}
      </div>       
    </>
  )
  };
export default App;