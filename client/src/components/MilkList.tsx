import React, { useEffect, useState } from "react";
import "../styles/MilkList.css";
import MilkImage from "../assets/rsz_milk.png";
import Order from "./Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Container,
  Grid,
} from "@mui/material";

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
  const [selectedType, setSelectedType] = useState<string>("");

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

  useEffect(() => {
    setFilteredMilkData(
      milkData.filter((milk) => {
        if (selectedType === "") {
          return true;
        }
        return milk.type === selectedType;
      })
    );
  }, [selectedType, milkData]);

  const handleTypeSelection = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const updateMilkData = (updatedMilk: IMilkData) => {
    setMilkData((prevMilkData) =>
      prevMilkData.map((milk) => {
        if (milk.id === updatedMilk.id) {
          return updatedMilk;
        }
        return milk;
      })
    );
  };

  const numOfMilks = filteredMilkData.length;

  return (
    <section>
      <Container>
        <ToastContainer
          autoClose={3000}
          draggable={false}
          icon={<CheckCircleIcon />}
          className="green__toast"
        />
        <Grid container justifyContent="center" sx={{ mt: 3}}>
          {selectedMilk === null ? (
            <form className="milk__search">
              <label>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  type="text"
                  placeholder="Search milk..."
                  onChange={handleSearch}
                />
              </label>
              
              <FormControl>
                <InputLabel>Filter</InputLabel>
                <Select
                  sx={{ m: 1, width: 300 }}
                  value={selectedType}
                  label="Filter by type"
                  onChange={handleTypeSelection}
                >
                  <MenuItem value="">All</MenuItem>
                  {Array.from(new Set(milkData.map((milk) => milk.type))).map(
                    (type) => (
                      <MenuItem value={type}>{type}</MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <div className="milk__counter">
                <p>Showing {numOfMilks} milks</p>
              </div>
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
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card sx={{ m: 2}}>
                  <CardActionArea onClick={() => setSelectedMilk(milk)}>
                    <CardMedia
                      component="img"
                      height="250"
                      width="150"
                      image={MilkImage}
                      alt="milk"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {milk.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="milk__card-type-storage-container"
                      >
                        <span className="milk__card-type">{milk.type}</span>
                        <span
                          className={`milk__card-storage ${
                            milk.storage < 10 ? "red" : ""
                          }`}
                        >
                          {milk.storage} liters
                        </span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
          {selectedMilk && (
            <Order
              milk={selectedMilk}
              setSelectedMilk={setSelectedMilk}
              updateMilkData={updateMilkData}
            />
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default MilkList;
