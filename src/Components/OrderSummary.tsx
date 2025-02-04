
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


/////
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
    <Card className=" relative overflow-hidden group flex-wrap " >
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
      
      <CardContent className="  p-4 " >
        <p className="text-xs text-gray-500 mb-1">{description}</p>
        <h3 className="font-medium text-xs mb-2 ">{name}</h3>
        <h3 className="font-semibold">${price.toFixed(2)}</h3>
        <div className="flex absolute top-50 justify-between  items-center  text-center"> 
        {/* <div className="flex justify-center mt-2 "> */}
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
        {/* </div> */}
      </CardContent>
    </Card>
  )
}
//////
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
    <Card className="relative ">
    {/* Image du produit */}
    <div
      className={`relative aspect-square overflow-hidden ${isAddedToCart ? 'border-4 border-blue-500' : ''}`}
    >
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  
    {/* Bouton entre l'image et le contenu */}
    <div className="  -mt-2 z-4 absolute top-60 left-0 w-full h-full flex justify-center items-cente">
      {cartItem ? (
        <button className="flex items-center justify-center top-200 bg-red-600 hover:bg-red-700 rounded-full p-2 h-10 w-30">
          <CircleMinus onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1)} />
          <span className="mx-2 text-white">{cartItem.quantity}</span>
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