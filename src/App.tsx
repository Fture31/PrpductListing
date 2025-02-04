
import { products } from "./Components/product"
import Cart from './Components/Cart';
import ProductCard from './Components/ProductCard';
import { Provider } from "react-redux";
import {store} from "./store/store"

function App() {
  return (
    <Provider store={store}>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container m-20 px-4">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="container mx-auto px-4">
                  <div className="lg:col-span-3 ">
                    <div className="grid grid-cols-3 gap-2 ">
                      {products.map((product) => (
                       <ProductCard key={product.id} {...product} />
                         ))}
                    </div>
                  </div>
                </div>
                <div className="w-100 h-120">
              <Cart />
            </div>
              </div>
            </div>
          
          </div>
        </div>
   
  
    </Provider>
    
  );
}

export default App
