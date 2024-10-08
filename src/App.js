import "./App.css";
import React, { useState } from "react";
import FetchResto from "./components/api";
import Header from "./components/header";

function App() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event) => {
    setFilterBy(event.target.name);
    setFilterValue(event.target.value);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <h2>All Restaurants</h2>

        {/* filter option */}
        <div className="filterContainer">
          <span>Filter By</span>
          <div>
            <label htmlFor="status" className="restoStatus">
              <input
                type="checkbox"
                id="status"
                name="status"
                onChange={handleFilterChange}
              />
              Open Now
            </label>
          </div>
          <div>
            <select
              className="pricing"
              name="price"
              id="pricing"
              onChange={handleFilterChange}
            >
              <option value="">Price</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>
          </div>
          <div>
            <select
              className="category"
              id="category"
              name="category"
              onChange={handleFilterChange}
            >
              <option value="">Category</option>
              <option value="1">Local</option>
              <option value="2">Chinese</option>
              <option value="3">Mexican</option>
              <option value="4">Italian</option>
            </select>
          </div>
          <button className="btnClearAll" type="button">
            Clear All
          </button>
        </div>

        {/* resto list in grid */}
        <section className="container">
          <FetchResto filterBy={filterBy} filterValue={filterValue} />
        </section>

        {/* load more */}
        <div className="btnLoad">
          <button type="button">Load More</button>
        </div>
      </main>
    </div>
  );
}

export default App;
