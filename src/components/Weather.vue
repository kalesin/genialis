<template>
  <div class="w-screen h-screen bg-gray-500 pt-16">
    <div class="formContainer">
      <div class="flex justify-start items-center w-full flex-col">
        <div class="flex w-full flex-col">
          <form id="record-form" action="">
            <div>
              <label for="location-input" class="block mb-2 text-sm font-medium text-gray-900 light:text-white">Location name:</label>
              <input 
                type="text"
                id="location-input"
                class="textInput"
                :class="{ 
                  'validation-error': validation.location==='error',
                  'validation-success': validation.location==='success',
                }"
                v-model="locationInput"
              >
              <p v-if="validation.location==='error'" class="mt-2 text-sm text-red-600 dark:text-red-500">Please enter a location!</p>
              <ul
                id="autocomplete"
                v-if="autocompleteFocused && searchLocations.length"
                class="absolute z-10 m-1"
                v-click-outside="dismissAutocomplete"
              >
                <li class="font-bold autocompleteItem">
                  Showing {{ searchLocations.length }} results
                </li>
                <li
                  v-for="(location, index) in searchLocations"
                  :key="index"
                  @click="selectLocation(location)"
                  class="cursor-pointer autocompleteItem"
                >
                  {{ location }}
                </li>
              </ul>
            </div>
            <label for="date-picker" class="block mb-2 text-sm font-medium text-gray-900 light:text-white">Date:</label>
            <div class="relative max-w-sm">
              <div class="absolute flex items-center w-6 h-6 inset-2 pointer-events-none">
                <svg aria-hidden="true" class="w-full h-full text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <input
                id="date-picker"
                datepicker
                type="text"
                placeholder="Select date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :class="{
                  'validation-error': validation.date==='error',
                  'validation-success': validation.date==='success',
                }"
              >
              <p v-if="validation.date==='error'" class="mt-2 text-sm text-red-600 dark:text-red-500">Please select a date!</p>
            </div>
            <div>
              <label for="temperature-input" class="block mb-2 text-sm font-medium text-gray-900 light:text-white">Temperature:</label>
              <input
                type="text"
                id="temperature-input"
                class="textInput"
                :class="{ 
                  'validation-error': validation.temperature==='error',
                  'validation-success': validation.temperature==='success',
                }"
              >
              <p v-if="validation.temperature==='error'" class="mt-2 text-sm text-red-600 dark:text-red-500">Please enter a temperature!</p>
            </div>
            <input type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-blue-800">
          </form>
        </div>
      </div>
    </div>
    <form id="range-form" action="">
      <div date-rangepicker class="flex items-center">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input
            id="start-time"
            type="text"
            value="02/05/2015"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date start"
          >
        </div>
        <span class="mx-4 text-gray-500">to</span>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input
            id="end-time"
            type="text"
            :value="currentTime"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date end"
          >
        </div>
        <input type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-blue-800">
      </div>
    </form>

    <div class="averagesContainer">
      <div class="titleText">Statistics for selected date range:</div>
      <InfoBox
        v-if="displayAverages && !invalidResult"
        :weatherInfo="displayAverages"
        :average="true"
        class="flex justify-center w-full"
      />
    </div>

    <div class="recordsContainer">
      <div class="titleText">Records for selected date range:</div>
      <div v-if="recordsInRange.length > 0" class="elementContainer">
        <InfoBox
          v-for="(record, index) in recordsInRange"
          :key="index"
          :weatherInfo="record"
          :average="false"
          :index="index"
          @delete="(value) => deleteResult(value)"
          @reload="(value) => reloadResult(value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { initFlowbite } from 'flowbite'
import { mockApi } from '../api/mockApi.ts';
import InfoBox from './InfoBox.vue';

onMounted(() => {
  //init tailwind components
  initFlowbite();
  
  const submitForm = document.getElementById('record-form');
  submitForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const temperatureInput = document.getElementById("temperature-input");
    const locationInput = document.getElementById("location-input");
    const dateInput = document.getElementById("date-picker");
    
    console.log('submit', validation, validation.value.temperature);
    if(temperatureInput.value == "") validation.value.temperature = 'error';
    else validation.value.temperature = 'success';
    
    if(locationInput.value == "") validation.value.location = 'error';
    else validation.value.location = 'success';
    
    if(dateInput.value == "") validation.value.date = 'error';
    else validation.value.date = 'success';
    console.log('submit', validation, validation.value.temperature);
    
    if(Object.keys(validation.value).every(key => key!=='error')) {
      console.log('record', new Date(dateInput.value), locationInput.value, temperatureInput.value);
      function convertToKelvin(celsius) { return parseInt(celsius)+273; };
      const location = locationInput.value;
      const time = new Date(dateInput.value).getTime();
      const temperature = convertToKelvin(temperatureInput.value) 
      console.log(mockApi);
      await saveTemperature(location, time, temperature);
      //clearInput on successful validation
      validation.value = {
        temperature: null,
        location: null,
        date: null,
      };
    }
    
  });

  const rangeForm = document.getElementById('range-form');
  rangeForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const startTimeInput = document.getElementById("start-time");
    const endTimeInput = document.getElementById("end-time");
    const startTime = new Date(startTimeInput.value).getTime();
    const endTime = new Date(endTimeInput.value).getTime();
    console.log(startTime, endTime);
    await getRecordsInRange(startTime, endTime);
  });
})

const { autocompleteLocation, getTemperaturesDuring, saveTemperature } = mockApi();
let recordsInRange = ref([]);
let displayAverages = computed(() => {
  if(recordsInRange.value.length > 0) {
    console.log('displayAverages', recordsInRange.value.reduce((accumulator, current) => accumulator + current.temperature), 0);
    const averageTemperature = recordsInRange.value.reduce((accumulator, current) => accumulator + current.temperature, 0)/recordsInRange.value.length;
    const daysAboveAverage = recordsInRange.value.filter(el => el.temperature>=averageTemperature).length;
    const modeOfTemperature = recordArray => {
      let maxCounts = {};
      recordArray.forEach((el) => {
        if(maxCounts[el.temperature]) maxCounts[el.temperature]++;
        else maxCounts[el.temperature] = 1;
      });
      const sorted = Object.entries(maxCounts).sort(([key1, value1], [key2, value2]) => {
        return value2 - value1;
      });
      return parseInt(sorted[0][0]);
    };
    const result = {
      averageTemperature,
      daysAboveAverage,
      modeOfTemperature: modeOfTemperature(recordsInRange.value)
    };
    console.log(result);
    return result;
  } else {
    return null;
  }
})
let currentTime = computed(() => {
  //convert to date picker format
  return new Date().toJSON().slice(0,10).split('-').reverse().join('/');
});
let validation = ref({
  temperature: null,
  location: null,
  date: null,
});

async function getRecordsInRange(startTime, endTime) {
  const response = await getTemperaturesDuring(startTime, endTime);
  console.log(response);
  const sortByAscendingDate = response.sort((a, b) => b.time-a.time);
  recordsInRange.value = sortByAscendingDate;
}

let locationInput = ref("");
let searchLocations = ref([]);
let autocompleteFocused = ref(false);

watch(locationInput, async (input) => {
  if(searchLocations.value.includes(input)) return [];
  if(input === '') return [];
  const locations = await autocompleteLocation(input);
  console.log('searchLocations', input, locations.length)
  searchLocations.value = locations;
  autocompleteFocused.value = true;
})

function dismissAutocomplete() {
  console.log('dismissed');
  autocompleteFocused.value = false;
}

function selectLocation(value) {
  locationInput.value = value;
  autocompleteFocused.value = false;
}

</script>

<style scoped>
.autocompleteItem {
  @apply w-full m-0 p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
.textInput {
  @apply block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.validation-success {
 @apply bg-green-50 border-green-500 text-green-900 placeholder-green-700 dark:bg-green-100 dark:border-green-400;
}

.validation-error {
  @apply bg-red-50 border-red-500 text-red-900 placeholder-red-700 dark:bg-red-100 dark:border-red-400;
}

.elementContainer {
  @apply flex bg-main w-full flex-wrap h-auto items-start justify-center px-6 py-4;
}

.averagesContainer {
  @apply flex flex-col bg-main w-full items-center justify-center;
}

.recordsContainer {
  @apply flex flex-col bg-main w-full items-center justify-center;
}

.titleText {
  @apply capitalize text-center flex items-center h-1/3 text-xl m-4;
}

.element {
  @apply bg-main w-1/3 p-2 flex rounded-lg;
}

.formContainer {
  @apply flex items-start h-auto mx-8 pb-8 flex-col;
}

.searchButton {
  @apply px-4 bg-main opacity-60 text-white rounded shadow-md flex items-center;
}
</style>