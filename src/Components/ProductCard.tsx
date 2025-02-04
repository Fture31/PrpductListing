import { useDispatch,useSelector } from "react-redux"
import { addToCart, removeFromCart, updateQuantity } from "../store/cartSlice"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ShoppingCart, CircleMinus, CirclePlus } from "lucide-react";
import { RootState } from "../store/store";




interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

export default function ProductCard({ id, name,  description, price, image }: ProductCardProps) {
  const dispatch = useDispatch()


  // Get the item from the cart
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, quantity: 1, description,image }))

  }
  const handleQuantityChange = (id: string, newQuantity: number) => {
      if (newQuantity < 1) {
        dispatch(removeFromCart(id))
      } else {
        dispatch(updateQuantity({ id, quantity: newQuantity }))
      }
    }

  return (
    <Card className="relative ">
    {/* Image du produit */}
    <div
        className={`relative aspect-square overflow-hidden ${
          cartItem ? "border-4 border-blue-500" : ""
        }`}
    >
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  
    {/* Bouton entre l'image et le contenu */}
    <div className="  -mt-6 z-4 absolute left-0 w-full h-full flex justify-center items-cente  text-white">
      {cartItem ? (
   
        <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full p-2 h-10 w-30 shadow-lg">
          <CircleMinus onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1)} />
          <span className="mx-2">{cartItem.quantity}</span>
          <CirclePlus onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)} />
        </button>

      ) : (
        <Button 
          title="Ajouter au panier"
          onClick={handleAddToCart}
          Icon={ShoppingCart}
          containerStyles="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
        />
      )}
    </div>
  
    {/* Contenu textuel */}
    <CardContent className="p-4">
      <p className="text-xs text-gray-500 mb-1">{description}</p>
      <h3 className="font-medium text-xs mb-2">{name}</h3>
      <h3 className="font-semibold">${price.toFixed(2)}</h3>
    </CardContent>
  </Card>
  
  )
}