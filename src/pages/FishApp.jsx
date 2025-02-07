import { useEffect } from "react";
const API_KEY = "0f74f183dd0f440dbed60406250702";

const FishApp = () => {
  useEffect(() => {
    async function fetchData() {
      const fetchResult = await fetch(
        `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=Sevan`
      );
      const result = await fetchResult.json();
      console.log({ result });
    }
    fetchData();
  }, []);

  return <div>fish app</div>;
};

export default FishApp;
