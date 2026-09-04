import { useCart } from "../context/CartContext";

export default function Checkout() {
  const {
    getCartItemswithProducts,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  const cartItems = getCartItemswithProducts();
  const total = getCartTotal();

  function placeOrder() {
    alert("Successful Order!");
    clearCart();
  }

  return (
    <div>
      <div className="container">
        <h1 className="pt-4">Checkout</h1>
        <div className="container py-4 d-md-flex">
          {/* Order Summary */}
          <div className="card p-3 shadow border-0">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="py-3 border-bottom d-flex">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-25 rounded-1"
                />
                <div className="px-2">
                  <h3 className="fs-5 py-2">{item.product.name}</h3>
                  <p className="text-secondary fs-6">
                    ${item.product.price} each
                  </p>
                </div>
                <div>
                  <div className="d-flex">
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="p-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-end py-2 fw-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-sm btn-secondary"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="card flex-grow-1 p-3 shadow border-0">
            <h2>Total</h2>
            {/* Subtotal */}
            <div className="d-flex justify-content-between">
              <p className="text-secondary">Subtotal:</p>
              <p>${total.toFixed(2)}</p>
            </div>
            {/* Total */}
            <div className="d-flex justify-content-between border-bottom border-dark mb-3">
              <p className="text-secondary">Total:</p>
              <p className="fs-3 fw-bold text-primary">${total.toFixed(2)}</p>
            </div>
            <button onClick={placeOrder} className="btn btn-primary">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
