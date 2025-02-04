import React from "react";

type OrderSummaryProps = {
  items: { name: string; price: number; quantity: number }[];
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  return (
    <div>
      <h2 className="font-bold">Order Summary</h2>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>{item.name} x{item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;
