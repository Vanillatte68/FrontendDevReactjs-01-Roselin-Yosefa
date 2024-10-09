// import useState & useEffect and other component
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import "./api.css";
// import RestaurantDetail from "./restoDetail";

// api data
const API_KEY = "98f87e52b4msh0e83d977b417f59p18af93jsnb229400fbbee";
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
  // const [selectedResto, setSelectedResto] = useState(null);
  // add a new state to store the selected restaurant

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      setResto(data.data.data);
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = filterRestaurants(resto, filterBy, filterValue);

  // const handleDetailClick = (resto) => {
  //   setSelectedResto(resto);
  // }

  return (
    <section className="resto-container">
      {filteredRestaurants.map((resto) => (
        <div className="resto-card" key={resto.id}>
          <img
            className="img-class"
            src={resto.squareImgUrl}
            alt={resto.name}
          ></img>
          <h3>{resto.name}</h3>
          <Rating initialValue={resto.averageRating} size="14px" readonly />
          <div className="detail-box">
            <span>{resto.parentGeoName}</span>
            <span>{resto.priceTag}</span>
          </div>
          <button className="btn-detail" type="button" id="btnDetail">
            Learn More
          </button>
        </div>
      ))}
      {/* show restaurant details */}
      {/* {selectedResto && ( // render the restaurant details when a restaurant is selected
        <RestaurantDetail restaurant={selectedResto} /> // use the RestaurantDetail component to render the details
      )} */}
    </section>
  );
};

export default FetchResto;
