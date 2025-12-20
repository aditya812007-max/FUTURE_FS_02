import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CheckoutModal = ({ close, clearCart }) => {
  const [formData, setFormData] = useState({ name: '', address: '', card: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validate Empty Fields (Required by PDF)
    if (!formData.name || !formData.address || !formData.card) {
      toast.error("Please fill all fields!");
      return;
    }
    
    // 2. Validate Card Length (Simple Validation Logic)
    if (formData.card.length < 16) {
      toast.error("Invalid Card Number (Must be 16 digits)!");
      return;
    }
    
    // 3. Success Simulation
    toast.success("Order Placed Successfully! 🚀");
    clearCart(); // Wipes the cart
    close();     // Closes the modal
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', 
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <motion.form 
        initial={{y: -100, opacity: 0}} 
        animate={{y: 0, opacity: 1}}
        exit={{y: -100, opacity: 0}}
        onSubmit={handleSubmit}
        style={{
          background: '#1a1a1a', padding: '30px', borderRadius: '15px', 
          width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px',
          border: '1px solid #333', color: 'white'
        }}
      >
        <h2 style={{textAlign:'center', margin:0}}>Checkout</h2>
        
        <input 
          placeholder="Full Name" 
          value={formData.name} 
          onChange={e=>setFormData({...formData, name: e.target.value})} 
          style={{padding: '12px', borderRadius:'8px', border:'none', outline:'none'}} 
        />
        
        <input 
          placeholder="Shipping Address" 
          value={formData.address} 
          onChange={e=>setFormData({...formData, address: e.target.value})} 
          style={{padding: '12px', borderRadius:'8px', border:'none', outline:'none'}} 
        />
        
        <input 
          placeholder="Card Number (16 digits)" 
          maxLength="16" 
          value={formData.card} 
          onChange={e=>setFormData({...formData, card: e.target.value})} 
          style={{padding: '12px', borderRadius:'8px', border:'none', outline:'none'}} 
        />
        
        <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
            <button type="submit" style={{flex:1, padding: '12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius:'8px', cursor: 'pointer', fontWeight:'bold'}}>
                Pay Now
            </button>
            <button type="button" onClick={close} style={{flex:1, padding: '12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius:'8px', cursor: 'pointer', fontWeight:'bold'}}>
                Cancel
            </button>
        </div>
      </motion.form>
    </div>
  );
};

export default CheckoutModal;