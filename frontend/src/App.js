import { useState, useEffect } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home'); // home, login, cart, orders

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getProducts();
    if (token) getCart();
  }, [token,page]);

  const login = () => {
    fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setPage('home');
          alert('Login successful');
        } else {
          alert(data.message);
        }
      });
  };

  const getProducts = () => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.products || data));
  };

  const addToCart = (productId) => {
    fetch(`${API}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    })
      .then(res => res.json())
      .then(() => alert('Added to cart'));
  };

  const getCart = () => {
    fetch(`${API}/api/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCart(data.items || []));
  };

  const placeOrder = () => {
    fetch(`${API}/api/orders`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        alert('Order placed');
        getCart();
      });
  };

  const getOrders = () => {
    fetch(`${API}/api/orders/my-orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setPage('home');
  };

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => setPage('home')}>Home</button>
        {!token ? (
          <button onClick={() => setPage('login')}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage('cart')}>Cart</button>
            <button onClick={() => { getOrders(); setPage('orders'); }}>Orders</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      {page === 'home' && (
        <div>
          <h2>Products</h2>
          <div className="product-list">
            {products.map(p => (
              <div key={p._id} className="product">
                <strong>{p.name}</strong> - ₹{p.price} <br />
                {token && <button onClick={() => addToCart(p._id)}>Add to Cart</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {page === 'login' && (
        <div className="login">
          <h2>Login</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
          <button onClick={login}>Login</button>
        </div>
      )}

      {page === 'cart' && (
        <div>
          <h2>Your Cart</h2>
          {cart.map(item => (
            <div key={item.product._id} className="cart-item">
              {item.product.name} - Qty: {item.quantity}
            </div>
          ))}
          {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
        </div>
      )}

      {page === 'orders' && (
        <div>
          <h2>Your Orders</h2>
          {orders.map(order => (
            <div key={order._id} className="order-item">
              <div><strong>Order ID:</strong> {order._id}</div>
              <div><strong>Total:</strong> ₹{order.totalAmount}</div>
              <div>
                {order.items.map(i => (
                  <div key={i.product}>
                    {i.product.name} - Qty: {i.quantity}
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
