import { useState } from "react";
import { IMilkData } from "./MilkList";
import { toast } from "react-toastify";

import "../styles/Order.css";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";

interface IProps {
  milk: IMilkData;
  setSelectedMilk: (milk: IMilkData | null) => void;
  updateMilkData: (milk: IMilkData) => void;
}

const Order = ({ milk, setSelectedMilk, updateMilkData }: IProps) => {
  const [orderAmount, setOrderAmount] = useState(0);
  const [detailsMilk, setDetailsMilk] = useState(milk);

  const handleOrderAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderAmount(parseInt(e.target.value));
  };

  const handleOrderClick = async () => {
    if (orderAmount > 0 && orderAmount < detailsMilk.storage) {
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
          updateMilkData({ ...detailsMilk, storage: updatedStorage });
        } else {
          toast.error("Error while processing order");
          throw new Error("Error placing order");
        }
      } catch (err) {
        console.error(err);
      }
    }
    
  };

  return (
    <form>
      <Typography sx={{ m: 1, ml: 3, mt: 5 }} variant="h5" align="left" >{milk.name}</Typography>
      <Typography sx={{ m: 1, ml: 3 }} variant="body1" align="left" >{detailsMilk.type}</Typography>
      <Typography sx={{ m: 1, ml: 3 }} variant="body1" align="left" >{detailsMilk.storage} liters in stock
      </Typography>
      <FormControl sx={{ml: 3, mt: 2}}>
        <InputLabel id="quantity-label">Quantity (liters)</InputLabel>
        <Input sx={{ m: 0.5, width: 150, height: 40 }}
          type="number"
          value={orderAmount}
          onChange={handleOrderAmountChange}
          inputProps={{
            min: 1,
            max: detailsMilk.storage
          }}
        />
      </FormControl>
      
        <Button sx={{ml: 3, m: 1, mt: 4 }} variant="contained" color="primary" onClick={handleOrderClick}>
          Order
        </Button>
        <Button sx={{ml: 3, m: 1, mt: 4 }} variant="contained" color="secondary" onClick={() => setSelectedMilk(null)}>
          Back
        </Button>
      
    </form>
  );
};

export default Order;
