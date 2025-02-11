export function calculateFishBite(
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


