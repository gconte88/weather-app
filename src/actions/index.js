import transformForecast from './../services/transformForecast';
import transformWeather from './../services/transformWeather';
import { getUrlWeatherByCity, getUrlForecastByCity } from './../services/getUrl';

export const SET_CITY = "SET_CITY";
export const SET_FORECAST_DATA = "SET_FORECAST_DATA";
export const SET_WEATHER_CITY = "SET_WEATHER_CITY";
export const GET_WEATHER_CITY = "GET_WEATHER_CITY";

const setCity = payload => ({ type: SET_CITY, payload });
const setForecastData = payload => ({type: SET_FORECAST_DATA, payload});

const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload});
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload});

export const api_key = "9e773b477309ec7e146dd4465dcdea8b";

export const setSelectedCity = payload => {
  
  return (dispatch, getState) => {
    // activar en el estado un indicador de busqueda de datos
    dispatch(setCity(payload));

    const state = getState();
    const date = state.cities[payload] && state.cities[payload].forecastDataDate;

    const now = new Date();

    if(date && (now - date) < 1 * 60 * 1000) {
      return;
    }

    return fetch(getUrlForecastByCity(payload)).then(data =>
      data.json().then(weather_data => {
        const forecastData = transformForecast(weather_data);
        console.log(forecastData);
        // modificar el estado con el result de la promise
        dispatch(setForecastData({ city: payload, forecastData }));
        
      })
    );
  };
};

export const setWeather = payload => {

  return dispatch => {
    
    payload.forEach(city => {
      // activar en el estado un indicador de busqueda de datos
      dispatch(getWeatherCity(city));

      fetch(getUrlWeatherByCity(city)).then( resolve => {
          return resolve.json();
      }).then(data => {
          const weather = transformWeather(data);

          // modificar el estado con el result de la promise
          dispatch(setWeatherCity({city: city, weather: weather}));
      });
    });
  }
};