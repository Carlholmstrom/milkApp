import React, { useEffect, useState } from "react";
import "../styles/MilkList.css";
import MilkImage from "../assets/milk.png";
import Order from "./Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface IMilkData {
  id: string;
  name: string;
  type: string;
  storage: number;
}

const MilkList = () => {
  const [milkData, setMilkData] = useState<IMilkData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMilkData, setFilteredMilkData] = useState<IMilkData[]>([]);
  const [selectedMilk, setSelectedMilk] = useState<IMilkData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5049/api/milks");
        const data = await response.json();
        setMilkData(data);
        setFilteredMilkData(data);
      } catch (err) {}
    };
    getData();
  }, []);

  useEffect(() => {
    setFilteredMilkData(
      milkData.filter((milk) =>
        milk.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, milkData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const numOfMilks = filteredMilkData.length;

  return (
    <section className="milk-container">
        <ToastContainer
        autoClose={3000}
        draggable={false}
        icon={<CheckCircleIcon />}
        className="green-toast"
        />
        <div className="milk-grid">
        {selectedMilk === null ? (
            <form className="search-container">
            <label>
                <input
                className="search-input"
                type="text"
                placeholder="Search milk..."
                onChange={handleSearch}
                />
                <p>{numOfMilks} products</p>
            </label>
            </form>
        ) : null}
        {selectedMilk ? (
            <article className="milk-card">
            <div className="milk-card-img-container">
                <img src={MilkImage} alt="milk" className="milk-card-img" />
            </div>
            <div className="milk-card-info-container">
                <h2 className="milk-card-name">{selectedMilk.name}</h2>
                <div className="milk-card-type-storage-container">
                <span className="milk-card-type">{selectedMilk.type}</span>
                <span
                    className={`milk-card-storage ${
                    selectedMilk.storage < 10 ? "red" : ""
                    }`}
                ></span>
                </div>
            </div>
            </article>
        ) : (
            filteredMilkData.map((milk) => (
            <article className="milk-card" onClick={() => setSelectedMilk(milk)}>
                <div className="milk-card-img-container">
                <img src={MilkImage} alt="milk" className="milk-card-img" />
                </div>
                <div className="milk-card-info-container">
                <h2 className="milk-card-name">{milk.name}</h2>
                <div className="milk-card-type-storage-container">
                    <span className="milk-card-type">{milk.type}</span>
                    <span
                    className={`milk-card-storage ${
                        milk.storage < 10 ? "red" : ""
                    }`}
                    >
                    {milk.storage} liters
                    </span>
                </div>
                </div>
            </article>
            ))
        )}
        {selectedMilk && (
            <Order milk={selectedMilk} setSelectedMilk={setSelectedMilk} />
        )}
        </div>
    </section>
);

};

export default MilkList;
