import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data";

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find((prod) => prod.id === parseInt(id));

    if(!product) {
        return <h2 style={{color:"white", textAlign: "center"}}>Product not found!</h2>
    }

    return (
        <div className="product-page-container" style={{color: "white",padding: '100px 20px', maxWidth: '800px' , margin: '0 auto'}}>
            <Link to='/'style={{ color: '#3498db', textDecoration: 'none', fontSize: '1.2rem' }}>Back To Store</Link>
            <div className="product-detail-card" style={{
                marginTop: '20px', 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(12px)', 
                padding: '40px', 
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                  <h1 style={{ fontSize: '2.5rem', marginTop: '20px' }}>{product.name}</h1>
                  <span style={{ background: '#3498db', padding: '5px 10px', borderRadius: '5px' }}>{product.category}</span>
                  <h2 style={{ color: '#2ecc71', margin: '20px 0' }}>₹{product.price}</h2>
                  <p>This is a premium high-quality product from Aditya's Store. It features state-of-the-art technology and sleek design.</p>
                  <button 
                     onClick={() => addToCart(product)}
                     style={{
                     backgroundColor: '#3498db',
                     color: 'white',
                     border: 'none',
                     padding: '15px 30px',
                     fontSize: '1.2rem',
                     borderRadius: '8px',
                     cursor: 'pointer',
                     marginTop: '20px',
                     width: '100%'
                     }}>
                        Add to Cart 🛒
                 </button>
            </div>
        </div>
    );
};

export default ProductPage;