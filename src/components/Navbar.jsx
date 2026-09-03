import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="container p-3 border-bottom d-flex justify-content-around align-items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="text-black fw-bold text-decoration-none">
            ShopHub
          </Link>
        </div>

        {/* Links */}
        <div className="d-flex gap-4">
          <Link to="/" className="link-dark text-decoration-none">
            Home
          </Link>
          <Link to="/checkout" className="link-dark text-decoration-none">
            Cart
          </Link>
        </div>

        {/* Auth */}
        <div className="d-flex gap-2 align-items-center">
          <Link to="/auth" className="btn btn-sm btn-secondary">
            Login
          </Link>
          <Link to="/auth" className="btn btn-sm btn-primary">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
