import React from "react";

const RestaurantDetail = ({ restaurant }) => {
  return (
    <div className="restaurant-detail">
      <img src={restaurant.squareImgUrl} alt={restaurant.name} />
      <h2>{restaurant.name}</h2>
      <p>Rating: {restaurant.averageRating}</p>
      <p>{restaurant.text}</p>
    </div>
  );
};

export default RestaurantDetail;
