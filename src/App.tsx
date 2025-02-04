import { products } from "./Components/product"
import Cart from "./Components/Cart";
import ProductCard from "./Components/ProductCard";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Grid principale */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* Section des produits */}
            <div className="md:col-span-2 lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>

            {/* Section du panier */}
            <div className="md:col-span-1">
              <Cart />
            </div>

          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
