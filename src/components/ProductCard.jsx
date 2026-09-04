import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ p }) {
  const { cartItems, addToCart } = useCart();
  const current = cartItems.find((item) => item.id === p.id);
  const quantityLabel = current ? `(${current.quantity})` : "";

  return (
    <div className="card col-6 col-lg-4 col-xl-3">
      <img src={p.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title">{p.name}</h3>
        <p className="card-text text-primary fw-bold">${p.price}</p>
        <div className="d-flex gap-2 align-items-center">
          <Link to={`/products/${p.id}`} className="btn btn-sm btn-secondary">
            View Details
          </Link>
          <button
            onClick={() => addToCart(p.id)}
            className="btn btn-sm btn-primary"
          >
            Add to Cart {quantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
