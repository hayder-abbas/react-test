import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";

export default function ProductDetailes() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const current = getProductById(id);

    if (!current) {
      navigate("/");
      return;
    }

    setProduct(current);
  }, [id]);

  if (!product) {
    return <h1 className="text-center p-4">Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="card mt-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.image}
              className="img-fluid rounded-start"
              alt=""
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-primary fw-bold">${product.price}</p>
              <p className="card-text">{product.description}</p>
              <button className="btn btn-primary">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
