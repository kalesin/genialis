<template>
  <div class="element">
    <div class="bg-white flex rounded-lg w-full p-4 flex-col">

      <div v-if="average">
        <div class="flex justify-between">
          <div>Average temperature:</div>
          <div class="capitalize font-bold">{{ formatTemperature(weatherInfo.averageTemperature) }}</div>
        </div>
        <div class="text-center flex justify-between">
          <div>Days above average temperature:</div>
          <div>{{ weatherInfo.daysAboveAverage }}</div>
        </div>
        <div class="flex justify-between">
          <div>Mode of temperature:</div>
          <div class="capitalize font-bold">{{ formatTemperature(weatherInfo.modeOfTemperature) }}</div>
        </div>
        <div class="text-center flex justify-between">
          <div>Hot days(above 15 °C):</div>
          <div>{{ weatherInfo.hotDays }}</div>
        </div>
        <div class="text-center flex justify-between">
          <div>Cold days:</div>
          <div>{{ weatherInfo.coldDays }}</div>
        </div>
      </div>

      <div v-else>
        <div class="flex justify-between">
          <div>Location:</div>
          <div class="capitalize font-bold">{{ weatherInfo.location }}</div>
        </div>
        <div class="text-center flex justify-between">
          <div>Time:</div>
          <div>{{ getEuFormatFromTimestamp(weatherInfo.time) }}</div>
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
import { nextTick, onMounted } from 'vue';

defineProps({
  weatherInfo: Object,
  average: Boolean,
});

onMounted(() => {
  nextTick(()=> {
    console.log('component mounted', Date.now());
  })
});

let formatTemperature = (temperature) => {
  return `${Math.floor(temperature-273)} °C`;
};

function getEuFormatFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  let formatted = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  return formatted;
};
</script>