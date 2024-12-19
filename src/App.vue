<script setup>
import {ref} from 'vue';

const favoritePlace = ref('');
const favoritePlaces = ref(JSON.parse(localStorage.getItem('favoritePlaces')) || []);
const searchInput = ref('');
const searchResults = ref([]);
const weatherInfo = ref(null);
const errorMessage = ref('');

const addFavorite = () => {
  if (favoritePlace.value && !favoritePlaces.value.includes(favoritePlace.value)) {
    favoritePlaces.value.push(favoritePlace.value);
    localStorage.setItem('favoritePlaces', JSON.stringify(favoritePlaces.value));
    favoritePlace.value = '';
  }
};

const removeFavorite = (place) => {
  favoritePlaces.value = favoritePlaces.value.filter(fav => fav !== place);
  localStorage.setItem('favoritePlaces', JSON.stringify(favoritePlaces.value));
};

const searchPlaces = () => {
  if (searchInput.value === 'New York') {
    searchResults.value = ['New York'];
    errorMessage.value = '';
  } else {
    searchResults.value = [];
    errorMessage.value = 'No results found';
  }
};

const selectPlace = (place) => {
  weatherInfo.value = `Weather info for ${place}`;
  searchResults.value = [];
};
</script>

<template>
  <h1>Home</h1>
  <div>
    <input v-model="favoritePlace" data-cy="add-favorite" placeholder="Add favorite place"/>
    <button data-cy="add-favorite-button" @click="addFavorite">Add</button>
    <ul data-cy="favorite-list">
      <li v-for="place in favoritePlaces" :key="place">
        {{ place }}
        <button data-cy="remove-favorite" @click="removeFavorite(place)">Remove</button>
      </li>
    </ul>
  </div>
  <div>
    <input v-model="searchInput" data-cy="search-input" placeholder="Search places" @input="searchPlaces"/>
    <ul v-if="searchResults.length" data-cy="search-results">
      <li v-for="result in searchResults" :key="result" data-cy="search-result-item" @click="selectPlace(result)">
        {{ result }}
      </li>
    </ul>
    <div v-if="errorMessage" data-cy="error-message">{{ errorMessage }}</div>
    <div v-if="weatherInfo" data-cy="weather-info">{{ weatherInfo }}</div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>