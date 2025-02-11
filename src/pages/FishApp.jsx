import { useEffect, useState } from "react";
const API_KEY = "0f74f183dd0f440dbed60406250702";

const FishApp = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchResult = await fetch(
        `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=Yerevan&days=5`
      );
      const result = await fetchResult.json();
      setState(result);
      console.log({ result }, state.forecast.forecastday[0]?.hour[6]);
    }
    fetchData();
  }, []);

  console.log(state);
  if (!state) return null;
  return (
    <div>fish app {state.forecast?.forecastday[0]?.hour[10]?.pressure_in} </div>
  );
};

export default FishApp;
