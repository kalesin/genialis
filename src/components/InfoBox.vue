<template>
  <div class="elementWrapper">
    <div v-if="isAverage" class="element">
      <div class="textLine">
        <div class="textNormal">Average temperature:</div>
        <div class="textBold">{{ formatTemperatureToCelsius(weatherInfo.averageTemperature) }}</div>
      </div>
      <div class="textLine">
        <div class="textNormal">Days above average temperature:</div>
        <div class="textNormal">{{ weatherInfo.daysAboveAverage }}</div>
      </div>
      <div class="textLine">
        <div class="textNormal">Mode of temperature:</div>
        <div class="textBold">{{ formatTemperatureToCelsius(weatherInfo.modeOfTemperature) }}</div>
      </div>
      <div class="textLine">
        <div class="textNormal">Hot days(above 15 °C):</div>
        <div class="textNormal">{{ weatherInfo.hotDays }}</div>
      </div>
      <div class="textLine">
        <div class="textNormal">Cold days:</div>
        <div class="textNormal">{{ weatherInfo.coldDays }}</div>
      </div>
    </div>
    <div v-else class="element">
      <div class="textLine">
        <div class="textNormal">Location:</div>
        <div class="textBold capitalize">{{ weatherInfo.location }}</div>
      </div>
      <div class="textLine">
        <div class="textNormal">Time:</div>
        <div class="textNormal">{{ getEuFormatFromTimestamp(weatherInfo.time) }}</div>
      </div>
      <div class="textLine">
        <div class="textNormal">Current temperature:</div>
        <div class="textBold">{{ formatTemperatureToCelsius(weatherInfo.temperature) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getEuFormatFromTimestamp, formatTemperatureToCelsius } from "../utilities";

defineProps({
  weatherInfo: Object,
  isAverage: Boolean,
})
</script>

<style scoped>
  .elementWrapper {
    @apply w-1/3 flex
  }
  .element {
    @apply p-4 w-full flex bg-white dark:bg-gray-700 flex rounded-lg flex-col
  }

  .textLine {
    @apply flex justify-between 
  }

  .textNormal {
    @apply text-base font-normal text-gray-900 dark:text-white
  }

  .textBold {
    @apply  text-base text-gray-900 dark:text-white font-bold
  }
</style>