<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  favoritePlaces: Array
});
</script>

<template>
  <div class="favorite-list-wrapper">
    <ul data-cy="favorite-list">
      <li v-for="place in favoritePlaces" :key="place">
        <button @click="$emit('select-favorite', place)">{{ place }}
          <button data-cy="remove-favorite" @click.stop="$emit('remove-favorite', place)">Remove</button>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>