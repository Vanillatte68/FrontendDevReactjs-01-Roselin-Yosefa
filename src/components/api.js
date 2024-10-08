// import useState & useEffect and other component
import { useState, useEffect } from "react";

// api data
const API_KEY = "a89880c157msh81b16aad16d1791p1ec4c3jsnc9c7d2ea5e8d";
const API_HOST = "tripadvisor16.p.rapidapi.com";

const url =
  "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=294229&page=1&limit=10";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST,
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

// filter
const filterRestaurants = (restaurants, filterBy, filterValue) => {
  if (!filterBy || !filterValue) return restaurants;
  return restaurants.filter((restaurant) => {
    if (filterBy === "price") {
      return restaurant.priceTag === filterValue;
    } else if (filterBy === "category") {
      return restaurant.category === filterValue;
    } else if (filterBy === "openNow") {
      return restaurant.openNow === true;
    }
    return restaurant;
  });
};

// fetch data and map to the component
const FetchResto = ({ filterBy, filterValue }) => {
  const [resto, setResto] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      setResto(data.data.data);
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = filterRestaurants(resto, filterBy, filterValue);

  return (
    <div>
      {filteredRestaurants.map((resto) => (
        <div style={restoContainer} key={resto.id}>
          <img
            width="100"
            height="100"
            src={resto.squareImgUrl}
            alt={resto.name}
          ></img>
          <h3>{resto.name}</h3>
          <span>{resto.averageRating}</span>
          <div style={detailBox}>
            <span>{resto.parentGeoName}</span>
            <span>{resto.priceTag}</span>
          </div>
          <button style={btnDetail} type="button" id="btnDetail"></button>
        </div>
      ))}
    </div>
  );
};

// styling
const restoContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "20px",
};

const detailBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const btnDetail = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "5px 10px",
  border: "none",
  cursor: "pointer",
};

export default FetchResto;
