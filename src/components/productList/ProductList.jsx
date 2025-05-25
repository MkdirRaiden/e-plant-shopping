import { useState, useEffect, useMemo } from "react";
import CartItem from "../cartItem/CartItem";
import { addItem } from "../../features/CartSlice";
import { plantsArray, styleObj, styleObjUl, styleA } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)

    setAddedToCart((prevState) => ({
      // Update the local state to reflect that the product has been added
      ...prevState, // Spread the previous state to retain existing entries
      [product.name]: true, // Set the current product's name as a key with value 'true' to mark it as added
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const totalCart = useMemo(() => {
    let count = 0;
    for (const item of cart) {
      count += item.quantity;
    }
    return count;
  }, [cart]);
  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" onClick={(e) => handleHomeClick(e)}>
              <div>
                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            {" "}
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            {" "}
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
                <span
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  {totalCart}
                </span>
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map(
            (
              category,
              index // Loop through each category in plantsArray
            ) => (
              <div key={index}>
                {" "}
                {/* Unique key for each category div */}
                <h1 style={{ marginLeft: "2.5rem", marginTop: "1rem" }}>
                  <div>{category.category}</div>{" "}
                  {/* Display the category name */}
                </h1>
                <div className="product-list">
                  {" "}
                  {/* Container for the list of plant cards */}
                  {category.plants.map(
                    (
                      plant,
                      plantIndex // Loop through each plant in the current category
                    ) => {
                      return (
                        !(
                          plant.name in addedToCart && addedToCart[plant.name]
                        ) && (
                          <div className="product-card" key={plantIndex}>
                            {" "}
                            {/* Unique key for each plant card */}
                            <img
                              className="product-image"
                              src={plant.image} // Display the plant image
                              alt={plant.name} // Alt text for accessibility
                            />
                            <div className="product-title">{plant.name}</div>{" "}
                            {/* Display plant name */}
                            {/* Display other plant details like description and cost */}
                            <div className="product-description">
                              {plant.description}
                            </div>{" "}
                            {/* Display plant description */}
                            <div className="product-cost">
                              ${plant.cost}
                            </div>{" "}
                            {/* Display plant cost */}
                            <button
                              className="product-button"
                              onClick={() => handleAddToCart(plant)} // Handle adding plant to cart
                            >
                              Add to Cart
                            </button>
                          </div>
                        )
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <CartItem
          onContinueShopping={handleContinueShopping}
          setAddedToCart={setAddedToCart}
        />
      )}
    </div>
  );
}

export default ProductList;
