<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  selectedPlace: String,
  weatherInfo: Object,
  favoritePlaces: Array
});

const isFavorite = computed(() => props.favoritePlaces.includes(props.selectedPlace));

const weatherIcon = computed(() => {
  if (!props.weatherInfo) return '';
  const description = props.weatherInfo.weather[0].description.toLowerCase();
  if (description.includes('clear')) return '☀️';
  if (description.includes('rain')) return '🌧';
  if (description.includes('snow')) return '❄️';
  if (description.includes('cloud')) return '☁️';
  return '';
});
</script>

<template>
  <div v-if="weatherInfo" class="place-weather-wrapper">
    <div data-cy="weather-info">
      <h2>{{ selectedPlace }}</h2>

      <p>Temperature: {{ weatherInfo.main.temp }}°C</p>
      <p>Weather: {{ weatherInfo.weather[0].description }} {{ weatherIcon }}</p>
      <p>Humidity: {{ weatherInfo.main.humidity }}%</p>
      <p>Wind Speed: {{ weatherInfo.wind.speed }} m/s</p>
      <button
          v-if="selectedPlace && !isFavorite"
          data-cy="add-favorite-button"
          @click="$emit('add-favorite')"
      >
        Add to Favorites
      </button>
      <button
          v-if="isFavorite"
          data-cy="remove-favorite-button"
          @click="$emit('remove-favorite', selectedPlace)"
      >
        Remove from Favorites
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>