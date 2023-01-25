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
    <section className="milk__container">
        <ToastContainer
        autoClose={3000}
        draggable={false}
        icon={<CheckCircleIcon />}
        className="green__toast"
        />
        <div className="milk__grid">
        {selectedMilk === null ? (
            <form className="milk__search">
            <label>
                <input
                className="milk__search-input"
                type="text"
                placeholder="Search milk..."
                onChange={handleSearch}
                />
                <p>{numOfMilks} products</p>
            </label>
            </form>
        ) : null}
        {selectedMilk ? (
            <article className="milk__card">
            <div className="milk__card-img-container">
                <img src={MilkImage} alt="milk" className="milk__card-img" />
            </div>
            </article>
        ) : (
            filteredMilkData.map((milk) => (
            <article className="milk__card" onClick={() => setSelectedMilk(milk)}>
                <div className="milk__card-img-container">
                <img src={MilkImage} alt="milk" className="milk__card-img" />
                </div>
                <div className="milk__card-info-container">
                <h2 className="milk__card-name">{milk.name}</h2>
                <div className="milk__card-type-storage-container">
                    <span className="milk__card-type">{milk.type}</span>
                    <span
                    className={`milk__card-storage ${
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
