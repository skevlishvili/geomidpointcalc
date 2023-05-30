import { useState } from "react";
import Map from "./components/LeafletMap";
import "./App.css";

const App = () => {
  const [points, setPoints] = useState([]);
  const [weightedMidpoint, setWeightedMidpoint] = useState(null);



  // Define the handlePointWeightChange function
  const handlePointWeightChange = (e, index) => {
    const { value } = e.target;
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints];
      updatedPoints[index] = { ...updatedPoints[index], weight: value };
      return updatedPoints;
    });
  };


  const calculateWeightedMidpoint = () => {
    const point1 = points[0];
    const point2 = points[1];
    const weight1 = parseInt(point1.weight) || 1
    const weight2 = parseInt(point2.weight) || 1

    const totalWeight = weight1 + weight2;

    const midpointLat = (point1.lat * weight1 + point2.lat * weight2) / totalWeight;
    const midpointLng = (point1.lng * weight1 + point2.lng * weight2) / totalWeight;

    if (totalWeight != 0)
      setWeightedMidpoint({ lat: midpointLat, lng: midpointLng });
  };

  const clear = () => {
    setPoints([])
    setWeightedMidpoint(null)
  }

  return (
    <>
      <div className="bg-green-100 rounded-lg p-4 h-full flex flex-col items-center">


      <img src="/hero.png" className="heroImg"></img>

        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Geographic Midpoint Calculator
        </h1>


        <Map points={points} setPoints={setPoints} weightedMidpoint={weightedMidpoint} />

        <h1 className="text-2xl font-bold text-green-300 mt-4">
          Click on the map to set the points first then set the weights!
        </h1>

        <div className="flex flex-wrap justify-center mt-5">
          <input
            type="text"
            value={points && points[0]?.lat}
            disabled
            className="bg-green-200 text-green-800 py-2 px-4 mb-2 rounded mr-2"
            defaultValue={"Click Map to Set!"}
          />
          <input
            type="text"
            value={points && points[0]?.lng}
            disabled
            className="bg-green-200 text-green-800 py-2 px-4 mb-2 rounded mr-2"
            defaultValue={"Click Map to Set!"}
          />
          <input
            type="number"
            value={points && points[0]?.weight}
            onChange={(e) => handlePointWeightChange(e, 0)}
            className="bg-green-200 text-green-800 py-2 px-4 mb-2 rounded mr-2"
            defaultValue={1}
            min="1"
            disabled={points.length < 2}
          />
        </div>

        <div className="flex flex-wrap justify-center">
          <input
            type="text"
            value={points && points[1]?.lat}
            disabled
            className="bg-green-200 text-green-800 py-2 px-4 mb-2 rounded mr-2"
            defaultValue={"Click Map to Set!"}
          />
          <input
            type="text"
            value={points && points[1]?.lng}
            disabled
            className="bg-green-200 text-green-800 py-2 px-4 mb-2 rounded mr-2"
            defaultValue={"Click Map to Set!"}
          />
          <input
            type="number"
            value={points && points[1]?.weight}
            onChange={(e) => handlePointWeightChange(e, 1)}
            className="bg-green-200 text-green-800 py-2 px-4 mb-2 rounded mr-2"
            defaultValue={1}
            min="1"
            disabled={points.length < 2}
          />
        </div>

        <button onClick={calculateWeightedMidpoint} className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 mt-4 rounded w-300" style={{ width: "300px" }}>
          Calculate Midpoint
        </button>

        <button onClick={clear} className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 mt-4 rounded w-300" style={{ width: "300px" }}>
          Clear Points
        </button>


        <p className="text-center mt-4 bg-green-200 rounded-lg p-2 inline-block text-green-600">
          <span role="img" aria-label="idea" className="mr-1">
            🧚‍♀️
          </span>{" "}
          Idea Credit: Makuna
        </p>

      </div>
    </>
  );
};

export default App;
