<script setup>
import {ref} from 'vue';
import axios from 'axios';

import FavoriteList from './components/FavoritesList.vue';
import SearchBar from './components/PlaceSearch.vue';
import WeatherInfo from './components/PlaceWeather.vue';

const favoritePlaces = ref(JSON.parse(localStorage.getItem('favoritePlaces')) || []);
const selectedPlace = ref('');
const weatherInfo = ref(null);

const addFavorite = () => {
  if (selectedPlace.value && !favoritePlaces.value.includes(selectedPlace.value)) {
    favoritePlaces.value.push(selectedPlace.value);
    localStorage.setItem('favoritePlaces', JSON.stringify(favoritePlaces.value));
    selectedPlace.value = '';
  }
};

const removeFavorite = (place) => {
  favoritePlaces.value = favoritePlaces.value.filter(fav => fav !== place);
  localStorage.setItem('favoritePlaces', JSON.stringify(favoritePlaces.value));
};

const selectPlace = ({place, weatherData}) => {
  selectedPlace.value = place;
  weatherInfo.value = weatherData;
};

const selectFavorite = async (place) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: place.split('(')[0],
        appid: '7399a837f1038a2856f98b22546ff3e4',
        units: 'metric'
      }
    });
    const weatherData = response.data;
    selectPlace({place, weatherData});
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};
</script>

<template>
  <h1>Home</h1>
  <FavoriteList :favoritePlaces="favoritePlaces" @remove-favorite="removeFavorite" @select-favorite="selectFavorite"/>
  <SearchBar @select-place="selectPlace"/>
  <WeatherInfo :favoritePlaces="favoritePlaces" :selectedPlace="selectedPlace" :weatherInfo="weatherInfo"
               @add-favorite="addFavorite" @remove-favorite="removeFavorite"/>
</template>

<style scoped>
/* Add your styles here */
</style>