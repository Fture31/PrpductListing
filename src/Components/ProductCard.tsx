import { useDispatch,useSelector } from "react-redux"
import { addToCart, removeFromCart, updateQuantity } from "../store/cartSlice"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ShoppingCart, CircleMinus, CirclePlus } from "lucide-react";
import { RootState } from "../store/store";
import { useState } from 'react';



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

  const [isAddedToCart, setIsAddedToCart] = useState(false); // État local pour savoir si le produit est ajouté au panier

  // Get the item from the cart
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, quantity: 1, description,image }))
    setIsAddedToCart(true)
  }
  const handleQuantityChange = (id: string, newQuantity: number) => {
      if (newQuantity < 1) {
        dispatch(removeFromCart(id))
      } else {
        dispatch(updateQuantity({ id, quantity: newQuantity }))
      }
    }

  return (
    <Card className=" relative overflow-hidden group " >
      <div
        className={`relative aspect-square overflow-hidden ${isAddedToCart ? 'border-4 border-blue-500' : ''}`} // Ajouter un contour si ajouté au panier
      >
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 w-50 w-80"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-4 " >
        <p className="text-xs text-gray-500 mb-1">{description}</p>
        <h3 className="font-medium text-xs mb-2 ">{name}</h3>
        <h3 className="font-semibold">${price.toFixed(2)}</h3>
        <div className="flex absolute top-50 justify-between  items-center  text-center"> 
        <div className="flex justify-center mt-3 ">
        {cartItem ? (
          
            // If item exists in cart, show quantity controls
            // SI
          
            <button  className="  flex items-center justify-center  text-center bg-red-600 hover:bg-red-700 rounded-full p-2  h-10 w-30 ">
              < CircleMinus className=""  onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1)} />
              <span className="mx-2 text-white">{cartItem.quantity}</span> {/* Ajout d'un espacement autour de la quantité */}
              <CirclePlus  className="" onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)} />
            </button>
    
          
          ) : (
            // Otherwise, show "Add to Cart" button
            <Button
              title="Add to Cart"
              onClick={handleAddToCart}
              Icon={ShoppingCart}
              containerStyles="w-full"
            />
          )}
        </div>
        </div>
      </CardContent>
    </Card>
  )
}