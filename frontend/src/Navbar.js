import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Products</NavLink>
      <NavLink to="/place-order">Place Order</NavLink>
      <NavLink to="/track-order">Track Order</NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </nav>
  );
}

export default Navbar;
