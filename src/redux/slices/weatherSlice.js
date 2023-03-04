import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    current: [],
    forecast: [],
    cities: [],
    location: [],
}

// export const fetchCurrentWeather = createAsyncThunk(
//     'weather/fetchCurrentWeather',
//     async (city, { dispatch, rejectWithValue }) => {
//         try {
//             const response = await axios.get(
//                 // `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=38e3a5f5afb6196d6ee28a5520484f2d`
//                 `http://api.weatherapi.com/v1/current.json?key=acf9cfbab835459a8c2205404230403&q=${city.name}&aqi=no`
//             );
//             dispatch(setCurrent(response.data));
//             console.log(response.data)
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }

//     }
// )

export const fetchCities = createAsyncThunk(
    'weather/fetchWeatherForecast',
    async (query, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(
                // `https://api.openweathermap.org/data/2.5/find?q=${query}&units=metric&appid=38e3a5f5afb6196d6ee28a5520484f2d`
                `http://api.weatherapi.com/v1/search.json?key=acf9cfbab835459a8c2205404230403&q=${query}`
            );
            dispatch(setCities(response.data));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async (city, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(
                // `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city.name}&cnt=5&appid=38e3a5f5afb6196d6ee28a5520484f2d`
                `http://api.weatherapi.com/v1/forecast.json?key=acf9cfbab835459a8c2205404230403&q=${city.name}&days=6&aqi=no&alerts=no`
            )
            dispatch(setForecast(response.data.forecast.forecastday));
            dispatch(setCurrent(response.data.current));
            dispatch(setLocation(response.data.location));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
        setForecast: (state, action) => {
            state.forecast = action.payload
        },
        setCities: (state, action) => {
            state.cities = action.payload
        },
        setLocation: (state,action) => {
            state.location = action.payload
        }
    }
})

export const { setCurrent, setForecast, setSearchValue, setCities, setLocation } = weatherSlice.actions

export default weatherSlice.reducer