import React from "react";
import PropTypes from "prop-types";
import WeatherData from "./../WeatherLocation/WeatherData";

// const data = {
//     temperature:"15",
//     humidity:19,
//     weatherState: "sun",
//     wind: "15"
// }

const ForecastItem = ({ weekDay, hour, data }) => (
  <div>
    <h2>
      {weekDay} - {hour} hs
    </h2>
    <WeatherData data={data} />
  </div>
);

ForecastItem.propTypes = {
  weekDay: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  data: PropTypes.shape({
    temperature: PropTypes.string.isRequired,
    weatherState: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.string.isRequired
  })
};

export default ForecastItem;
