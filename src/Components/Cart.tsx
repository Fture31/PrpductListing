import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import type { RootState } from "../store/store";
import { Card, CardContent } from "./ui/card";
import { OctagonX } from "lucide-react";
import { Button } from "./ui/button";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="sticky top-4 bg-white shadow-md rounded-lg p-4">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  
                  <span className="text-gray-500 text-sm">x{item.quantity} @ ${item.price.toFixed(2)} ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <OctagonX
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            ))}
          </div>
        )}
<div className="text-center text-sm text-gray-500 mb-4">
            <span className="inline-flex items-center">🌱 This is a carbon-neutral delivery</span>
          </div>
        <div className="pt-4 mt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <Button title="Confirm Order" containerStyles="w-full mt-4" />
          
        </div>
      </CardContent>
    </Card>
  );
}
