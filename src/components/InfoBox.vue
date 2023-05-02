<template>
  <div class="element">
    <div class="bg-white flex rounded-lg w-full p-4 flex-col">
      <!-- <div v-if="deletable" class="w-full flex justify-between mb-2">
        <button @click="reloadResult(index)" class="reloadButton">View again</button>
        <button @click="deleteResult(index)" class="deleteButton">X</button>
      </div> -->
      <div v-if="average">
        <div class="flex justify-between">
          <div>Average temperature:</div>
          <div class="capitalize font-bold">{{ formatTemperature(weatherInfo.averageTemperature) }}</div>
        </div>
        <div class="capitalize text-center flex justify-between">
          <div>Days above average temperature:</div>
          <div>{{ weatherInfo.daysAboveAverage }}</div>
        </div>
        <div class="flex justify-between">
          <div>Mode of temperature:</div>
          <div class="capitalize font-bold">{{ formatTemperature(weatherInfo.modeOfTemperature) }}</div>
        </div>
      </div>

      <div v-else>
        <div class="flex justify-between">
          <div>Location:</div>
          <div class="capitalize font-bold">{{ weatherInfo.location }}</div>
        </div>
        <div class="capitalize text-center flex justify-between">
          <div>Time:</div>
          <div>{{ formatTime(weatherInfo.time) }}</div>
        </div>
        <div class="flex justify-between">
          <div>Current temperature:</div>
          <div class="capitalize font-bold">{{ formatTemperature(weatherInfo.temperature) }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

defineProps({
  weatherInfo: Object,
  average: Boolean,
  index: Number,
});

const emit = defineEmits(['delete', 'reload']);

let formatTemperature = (temperature) => {
  return `${Math.floor(temperature-273)} °C`;
};
let formatTime = (time) => {
  //convert to date picker format
  console.log(time, new Date(time));
  return new Date(time).toJSON().slice(0,10).split('-').reverse().join('/');
};

function deleteResult(index) {
  emit('delete', index);
}

function reloadResult(index) {
  emit('reload', index);
}
</script>

<style scoped>
.deleteButton {
  @apply hover:opacity-70 font-bold text-base rounded flex justify-center text-white bg-sec w-6;
}

.reloadButton {
  @apply hover:opacity-70 font-bold text-base rounded flex justify-center text-white bg-main px-4;
}
</style>