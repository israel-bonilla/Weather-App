import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  graphMode: 'temperature',
  currentWeather: {},
  todaysWeather: {},
  coords: {
    lat: 0,
    lon: 0,
  },
  dailyForecast: [],
  units: "imperial",
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGraphMode: (state, action) => {
      state.graphMode = action.payload;
    },
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setTodaysWeather: (state, action) => {
      state.todaysWeather = action.payload;
    },
    setDailyForecast: (state, action) => {
      state.dailyForecast = action.payload;
    },
    setUnits: (state, action) => {
      state.units = action.payload;
    },
  },
});

export const { setGraphMode, setCurrentWeather, setTodaysWeather, setDailyForecast, setUnits } = appSlice.actions;

export const selectGraphMode = state => state.app.graphMode;
export const selectCurrentWeather = state => state.app.currentWeather;
export const selectTodaysWeather = state => state.app.todaysWeather;
export const selectDailyForecast = state => state.app.dailyForecast;
export const selectUnits = state => state.app.units;

export default appSlice.reducer;
