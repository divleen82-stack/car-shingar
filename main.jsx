import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const cars = [
  {
    id: "thar",
    name: "Mahindra Thar",
    type: "Off-road SUV",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    type: "Premium SUV",
    image: "https://images.unsplash.com/photo-1621993202323-f438eec93436?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "creta",
    name: "Hyundai Creta",
    type: "Urban SUV",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop",
  },
];

const categories = ["Exterior", "Lighting", "Wheels", "Interior", "Audio"];

const options = [
  { id: 1, name: "Urban Front Bumper", category: "Exterior", price: 18500, effect: "Front bumper changed" },
  { id: 2, name: "Off-road Metal Bumper", category: "Exterior", price: 24500, effect: "Heavy bumper applied" },
  { id: 3, name: "Matrix LED Headlights", category: "Lighting", price: 22000, effect: "Headlights upgraded" },
  { id: 4, name: "Roof LED Bar", category: "Lighting", price: 12500, effect: "Roof light bar added" },
  { id: 5, name: "18-inch Alloy Wheels", category: "Wheels", price: 48000, effect: "Alloys replaced" },
  { id: 6, name: "Gloss Black Alloys", category: "Wheels", price: 62000, effect: "Black alloys applied" },
  { id: 7, name: "Tan Leather Interior", category: "Interior", price: 28500, effect: "Seats changed to tan leather" },
  { id: 8, name: "Black Leather Interior", category: "Interior", price: 30500, effect: "Seats changed to black leather" },
  { id: 9, name: "Android Touchscreen", category: "Audio", price: 21000, effect: "Infotainment upgraded" },
  { id: 10, name: "Bass Tube + Amplifier", category: "Audio", price: 24500, effect: "Audio system added" },
];

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function App() {
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [category, setCategory] = useState("Exterior");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const filteredOptions = useMemo(() => {
    return options.filter((item) => item.category === category);
  }, [category]);

  const total = selectedOptions.reduce((sum, item) => sum + item.price, 0);

  function toggleOption(option) {
    const exists = selectedOptions.find((item) => item.id === option.id);
    if (exists) {
      setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  function clearBuild() {
    setSelectedOptions([]);
    setCategory("Exterior");
  }

  return (
    <div className="app">
      <div className="shell">
        <header className="topbar">
          <div>
            <h1>CAR SHINGAR</h1>
            <p>Modification Studio</p>
          </div>
          <div className="estimateHead">
            <span>Current Estimate</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </header>

        <main className="layout">
          <aside className="panel vehiclePanel">
            <p className="label">Select Vehicle</p>
            <div className="carList">
              {cars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => {
                    setSelectedCar(car);
                    clearBuild();
                  }}
                  className={`carCard ${selectedCar.id === car.id ? "active" : ""}`}
                >
                  <div className="carThumb" style={{ backgroundImage: `url(${car.image})` }} />
                  <div className="carInfo">
                    <h2>{car.name}</h2>
                    <p>{car.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="previewPanel">
            <div className="previewTag left">Live Preview</div>
            <div className="previewTag right">360° View Ready</div>

            <div className="previewContent">
              <div className="carStage">
                <img src={selectedCar.image} alt={selectedCar.name} className="mainCar" />
                <div className="fade" />

                {selectedOptions.some((item) => item.category === "Lighting") && <div className="lightEffect" />}

                {selectedOptions.some((item) => item.category === "Wheels") && (
                  <>
                    <div className="wheel leftWheel" />
                    <div className="wheel rightWheel" />
                  </>
                )}

                {selectedOptions.some((item) => item.category === "Exterior") && <div className="bumperEffect" />}

                <div className="carTitle">
                  <h2>{selectedCar.name}</h2>
                  <p>
                    {selectedOptions.length === 0
                      ? "Select a modification to preview the build."
                      : selectedOptions.map((item) => item.effect).join(" · ")}
                  </p>
                </div>
              </div>

              <div className="stats">
                <div><span>Vehicle</span><strong>{selectedCar.name}</strong></div>
                <div><span>Selected Mods</span><strong>{selectedOptions.length}</strong></div>
                <div><span>Estimate</span><strong>{formatPrice(total)}</strong></div>
              </div>
            </div>
          </section>

          <aside className="panel optionsPanel">
            <p className="label">Modification Options</p>
            <div className="categoryGrid">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={cat === category ? "selected" : ""}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="optionList">
              {filteredOptions.map((option) => {
                const active = selectedOptions.some((item) => item.id === option.id);
                return (
                  <button key={option.id} onClick={() => toggleOption(option)} className={`optionCard ${active ? "active" : ""}`}>
                    <div>
                      <span>{option.category}</span>
                      <h3>{option.name}</h3>
                      <p>{option.effect}</p>
                    </div>
                    <strong>{formatPrice(option.price)}</strong>
                  </button>
                );
              })}
            </div>

            <div className="totalBox">
              <span>Build Total</span>
              <strong>{formatPrice(total)}</strong>
              <p>Estimate only. Final cost depends on fitting, stock and vehicle condition.</p>
            </div>

            <div className="actions">
              <button onClick={clearBuild} className="resetBtn">Reset</button>
              <button className="quoteBtn">Send Quote</button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
