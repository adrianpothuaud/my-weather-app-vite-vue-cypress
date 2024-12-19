<script setup>
import {ref} from 'vue';
import axios from 'axios';

const favoritePlaces = ref(JSON.parse(localStorage.getItem('favoritePlaces')) || []);
const searchInput = ref('');
const searchResults = ref([]);
const weatherInfo = ref(null);
const selectedPlace = ref('');
const errorMessage = ref('');

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

const searchPlaces = async () => {
  if (searchInput.value.length < 3) {
    searchResults.value = [];
    errorMessage.value = 'Please enter at least 3 characters';
    return;
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        appid: '7399a837f1038a2856f98b22546ff3e4',
        limit: 5,
        q: searchInput.value,
      }
    });

    if (response.data.length > 0) {
      searchResults.value = response.data.map(place => `${place.name} (${place.country})`);
      errorMessage.value = '';
    } else {
      searchResults.value = [];
      errorMessage.value = 'No results found';
    }
  } catch (error) {
    searchResults.value = [];
    errorMessage.value = 'Error fetching data';
  }
};

const selectPlace = (place) => {
  selectedPlace.value = place;
  weatherInfo.value = `Weather info for ${place}`;
  searchResults.value = [];
};
</script>

<template>
  <h1>Home</h1>
  <div>
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
    <div v-if="weatherInfo" data-cy="weather-info">
      {{ weatherInfo }}
      <button v-if="selectedPlace && !favoritePlaces.includes(selectedPlace)" data-cy="add-favorite-button"
              @click="addFavorite">Add to Favorites
      </button>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #333;
  margin-top: 20px;
}

div {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:last-child {
  border-bottom: none;
}

[data-cy="search-results"] li {
  cursor: pointer;
}

[data-cy="search-results"] li:hover {
  background-color: #f0f2f5;
}

[data-cy="error-message"] {
  color: red;
  margin-top: 10px;
}

[data-cy="weather-info"] {
  margin-top: 10px;
  font-weight: bold;
}
</style>