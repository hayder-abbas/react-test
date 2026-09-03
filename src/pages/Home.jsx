import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const products = getProducts();

  return (
    <div>
      {/* Hero */}
      <header className="container p-4 text-center">
        <h1 className="fw-bold">Welcome to ShopHub</h1>
        <p>Discover amazing procucts at great prices</p>
      </header>

      {/* Products */}
      <section>
        <div className="container py-4">
          <h2 className="mb-4">Our Products</h2>

          <div className="row">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
