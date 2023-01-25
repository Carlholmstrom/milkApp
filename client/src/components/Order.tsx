import React, { useState } from "react";
import { IMilkData } from "./MilkList";
import { toast } from "react-toastify";
import "../styles/Order.css";

interface IProps {
  milk: IMilkData;
  setSelectedMilk: (milk: IMilkData | null) => void;
}

const Order = ({ milk, setSelectedMilk }: IProps) => {
  const [orderAmount, setOrderAmount] = useState(0);
  const [detailsMilk, setDetailsMilk] = useState(milk);

  const handleOrderAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderAmount(parseInt(e.target.value));
  };

  const handleOrderClick = async () => {
    if (orderAmount > 0) {
      try {
        const updatedStorage = detailsMilk.storage - orderAmount;
        const response = await fetch(
          `http://localhost:5049/api/milks/${detailsMilk.id}`,
          {
            method: "PUT",
            body: JSON.stringify({ ...detailsMilk, storage: updatedStorage }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          toast.success("Order placed successfully!");
          setDetailsMilk({ ...detailsMilk, storage: updatedStorage });
        } else {
          throw new Error("Error placing order");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <p>In stock: {detailsMilk.storage}</p>
      <label>
        Order amount: {orderAmount} &nbsp;
        <input
          type="range"
          value={orderAmount}
          onChange={handleOrderAmountChange}
          min={1}
          max={detailsMilk.storage}
        />
      </label>
      <div className="btn-container">
        <button className="order-btn" onClick={handleOrderClick}>
          Order
        </button>
        <button className="back-btn" onClick={() => setSelectedMilk(null)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Order;
