import { useEffect, useState } from "react";

import { calculateFishBite } from "../helper/index";

const API_KEY = "0f74f183dd0f440dbed60406250702";
const location = "Yerevan";

// Example usage:
// console.log(calculateFishBite(750, 20, 15, "утро", "стабильная"));

const FishApp = () => {
  const [state, setState] = useState(null); //  all data here
  const [dataForFishByte, setDataForFishByte] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchResult = await fetch(
        `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=${location}&days=5`
      );
      const result = await fetchResult.json();
      console.log({ result });
      setState(result);
      const weatherResult = state.forecast?.forecastday[0]?.hour[11];
      setDataForFishByte(weatherResult);
    }
    fetchData();
  }, []);

  // taking need data for calculate fish byte
  useEffect(() => {
    if (dataForFishByte) {
      const fishingConditions = calculateFishBite(
        dataForFishByte.pressure,
        dataForFishByte.airTemp,
        dataForFishByte.waterTemp,
        dataForFishByte.timeOfDay,
        dataForFishByte.weatherStability
      );
      console.log({ fishingConditions });
      // return arji dzuk brnle
    }
  }, [dataForFishByte]);

  console.log(
    "good data exable",
    calculateFishBite(750, 15, "2025-02-12", "Clear")
  );

  if (!state) return null;
  return (
    <div>fish app {state.forecast?.forecastday[0]?.hour[10]?.pressure_in} </div>
  );
};

export default FishApp;
