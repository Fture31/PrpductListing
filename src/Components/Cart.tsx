
import { useSelector, useDispatch } from "react-redux"
import { updateQuantity, removeFromCart } from "../store/cartSlice"
import type { RootState } from "../store/store"
import { Card, CardContent } from "./ui/card"
import { OctagonX } from "lucide-react"
import { Button } from "./ui/button"

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  return (
    <Card className="sticky top-4  ">
      <CardContent className="p-6">
        {/* <h2 className="text-xl font-semibold mb-4">Order Total</h2> */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex-1 whitespace-pre-wrap">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-xs text-gray-500"></p>
                <span className="w-8 text-red-600">{item.quantity}X</span>
                <span className="w-8 text-center">@{item.price.toFixed(2)}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <div  className="flex items-center  h-5 w-5   bg-white-600 hover:bg-white-700">
              <OctagonX
                  className=" cursor-pointer"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 ">
          <div className="flex justify-between mb-4 ">
            <span className="font-semibold"> Order Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <div className="text-center text-sm text-gray-500 mb-4">
            <span className="inline-flex items-center">🌱 This is a carbon-neutral delivery</span>
          </div>
          <Button title="Confirm Order " containerStyles=" h-15 w-90  bg-orange-600 hover:bg-orange-700 text-black"/>
        </div>
      </CardContent>
    </Card>
  )
}