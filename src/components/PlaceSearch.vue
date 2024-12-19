<script setup>
import {defineEmits, ref} from 'vue';
import {searchPlaces} from '../services/openweather.js';
import axios from 'axios';

const emit = defineEmits(['select-place']);

const searchInput = ref('');
const searchResults = ref([]);
const errorMessage = ref('');

const searchPlacesHandler = async () => {
  if (searchInput.value.length < 3) {
    searchResults.value = [];
    errorMessage.value = 'Please enter at least 3 characters';
    return;
  }

  try {
    const results = await searchPlaces(searchInput.value);
    if (results.length > 0) {
      searchResults.value = results.map(place => `${place.name} (${place.country})`);
      errorMessage.value = '';
    } else {
      searchResults.value = [];
      errorMessage.value = 'No results found';
    }
  } catch (error) {
    searchResults.value = [];
    errorMessage.value = error.message;
  }
};

const selectPlace = async (place) => {
  searchInput.value = '';
  searchResults.value = [];
  errorMessage.value = '';

  const [name, country] = place.split(' (');
  const query = `${name},${country.slice(0, -1)}`;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: query,
        appid: '7399a837f1038a2856f98b22546ff3e4',
        units: 'metric'
      }
    });
    const weatherData = response.data;
    emit('select-place', {place, weatherData});
  } catch (error) {
    errorMessage.value = 'Error fetching weather data';
  }
};
</script>

<template>
  <div class="search-wrapper">
    <input v-model="searchInput" data-cy="search-input" placeholder="Search places" @input="searchPlacesHandler"/>
    <ul v-if="searchResults.length" data-cy="search-results">
      <li v-for="result in searchResults" :key="result" data-cy="search-result-item" @click="selectPlace(result)">
        {{ result }}
      </li>
    </ul>
    <div v-if="errorMessage" data-cy="error-message">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>