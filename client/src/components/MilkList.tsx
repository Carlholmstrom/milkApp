import React, { useEffect, useState } from "react";
import '../styles/MilkList.css'
import MilkImage from '../assets/milk.png'


interface IMilkData {
  id: string;
  name: string;
  type: string;
  storage: number;
}

const MilkList = () => {
  const [milkData, setMilkData] = useState<IMilkData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5049/api/milks");
        const data = await response.json();
        setMilkData(data);
      } catch (err) {}
    };
    getData();
  }, []);
  return (
    <div className="milk-container">
      <div className="milk-grid">
        {milkData.map((milk) => (
          <div className="milk-card">
            <div className="milk-card-img-container">
              <img src={MilkImage} alt="milk" className="milk-card-img" />
            </div>
            <div className="milk-card-info-container">
              <div className="milk-card-name">{milk.name}</div>
              <div className="milk-card-type-storage-container">
                <div className="milk-card-type">{milk.type}</div>
                <div className="milk-card-storage">{milk.storage} liters</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilkList;
