import { useEffect, useState } from "react";
const API_KEY = "0f74f183dd0f440dbed60406250702";
const location = "Yerevan";

function calculateFishBite(
  pressure,
  airTemp,
  waterTemp,
  timeOfDay,
  weatherStability
) {
  let score = 0; // Initial bite score

  // Optimal pressure: 740-760 mmHg
  if (pressure >= 740 && pressure <= 760) {
    score += 30;
  } else if (
    (pressure >= 730 && pressure < 740) ||
    (pressure > 760 && pressure <= 770)
  ) {
    score += 15;
  } else {
    score -= 10; // Too high or too low pressure negatively affects the bite
  }

  // Optimal air temperature: 15-25°C
  if (airTemp >= 15 && airTemp <= 25) {
    score += 20;
  } else if (
    (airTemp >= 10 && airTemp < 15) ||
    (airTemp > 25 && airTemp <= 30)
  ) {
    score += 10;
  } else {
    score -= 10; // Too hot or too cold worsens the bite
  }

  // Optimal water temperature: 12-18°C
  if (waterTemp >= 12 && waterTemp <= 18) {
    score += 25;
  } else if (
    (waterTemp >= 10 && waterTemp < 12) ||
    (waterTemp > 18 && waterTemp <= 22)
  ) {
    score += 10;
  } else {
    score -= 15; // Too cold or too warm water negatively affects the bite
  }

  // Time of day: best in the morning or evening
  if (timeOfDay === "Day" || timeOfDay === "вечер") {
    score += 15;
  } else if (timeOfDay === "ночь") {
    score -= 5; // Night fishing is less effective
  }

  // Consider weather stability
  if (weatherStability === "Clear") {
    score += 10;
  } else if (weatherStability === "резкие изменения") {
    score -= 15; // Unstable weather worsens the bite
  }

  // Normalize score within 0-100%
  score = Math.max(0, Math.min(score, 100));

  // Provide textual recommendation
  let recommendation;
  if (score > 80) {
    recommendation = "Отличный клёв! Берите снасти и вперёд!";
  } else if (score > 50) {
    recommendation = "Хороший клёв, есть смысл попробовать.";
  } else if (score > 30) {
    recommendation = "Клёв слабый, но шанс есть.";
  } else {
    recommendation = "Клёва нет, лучше выбрать другое время.";
  }

  return { score, recommendation };
}

// Example usage:
// console.log(calculateFishBite(750, 20, 15, "утро", "стабильная"));

const FishApp = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchResult = await fetch(
        `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=${location}&days=5`
      );
      const result = await fetchResult.json();
      setState(result);
      console.log({ result }, result.forecast.forecastday[0]?.hour[6]);
      // Extract tomorrow's data (index 1)
      const tomorrow = result.forecast.forecastday[0];

      // Example: Getting pressure, air temp, water temp at noon (12:00)
      const noonWeather = tomorrow.hour.find((hour) =>
        hour.time.includes("12:00")
      );

      console.log("test", {
        date: tomorrow.date,
        pressure_mmHg: noonWeather.pressure_mb * 0.75006, // Convert to mmHg
        air_temp: noonWeather.temp_c,
        water_temp: noonWeather.water_temp_c,
        condition: noonWeather.condition.text,
        is_day: noonWeather.is_day ? "Day" : "Night",
      });
      const fishingConditions = calculateFishBite(
        result.pressure,
        result.airTemp,
        result.waterTemp,
        result.timeOfDay,
        result.weatherStability
      );
      console.log("Fishing Conditions:", fishingConditions);
    }
    fetchData();
  }, []);

  console.log(state);
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
