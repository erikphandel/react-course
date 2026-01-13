import { Link, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import './header.css';

export function Header({ cart }) {
const [searchParams] = useSearchParams();
const searchText = searchParams.get('search');
const [search, setSearch] = useState(searchText || '');
const navigate = useNavigate();
let totalQuantity = 0;

cart.forEach((cartItem) => {
  totalQuantity += cartItem.quantity;
});

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" 
          value={search} onChange={(e) => setSearch(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/?search=${search}`);
            }
          }}
        />
        <button className="search-button"
          onClick={() => {
            navigate(`/?search=${search}`);
          }}
        >
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  )
}