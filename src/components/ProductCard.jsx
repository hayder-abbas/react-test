import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="card" style={{ maxWidth: 16 + "rem", width: 14 + "rem" }}>
      <img src={p.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title">{p.name}</h3>
        <p className="card-text text-primary fw-bold">${p.price}</p>
        <div className="d-flex gap-2 align-items-center">
          <Link href="#" className="btn btn-sm btn-secondary">
            View Details
          </Link>
          <button className="btn btn-sm btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
