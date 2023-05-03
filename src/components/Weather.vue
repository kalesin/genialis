<template>
  <div class="w-screen h-screen bg-gray-500 pt-4">
    <div class="titleText flex justify-center w-full">Submit a temperature record:</div>
    <div class="formContainer">
      <div class="flex justify-center items-center w-full flex-col">
        <form id="record-form" class="flex w-1/2 flex-col" action="">
          <div>
            <label for="location-input" class="block mb-2 text-sm font-medium text-gray-900 light:text-white">Location name:</label>
            <input 
              type="text"
              id="location-input"
              class="textInput"
              :class="{ 
                'validation-error': submitFormValidation.location==='error',
              }"
              v-model="locationInput"
              @focus="showAutocomplete"
              v-click-outside="dismissAutocomplete"
            >
            <p v-if="submitFormValidation.location==='error'" class="mt-2 text-sm text-red-600 dark:text-red-500">Please enter a location!</p>
            <ul
              id="autocomplete"
              v-if="autocompleteFocused && searchLocations.length"
              class="absolute z-10 m-1"
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
          <label for="date-picker" class="block my-2 text-sm font-medium text-gray-900 light:text-white">Date:</label>
          <div class="relative w-full">
            <div class="absolute flex items-center w-6 h-6 inset-2 pointer-events-none">
              <svg aria-hidden="true" class="w-full h-full text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <input
              id="date-picker"
              datepicker
              datepicker-autohide
              datepicker-buttons
              datepicker-format="dd/mm/yyyy"
              type="text"
              placeholder="Select date"
              class="datePickerInput"
              :class="{
                'validation-error': submitFormValidation.date==='error',
              }"
            >
            <p v-if="submitFormValidation.date==='error'" class="mt-2 text-sm text-red-600 dark:text-red-500">Please select a date!</p>
          </div>
          <div>
            <label for="temperature-input" class="block my-2 text-sm font-medium text-gray-900 light:text-white">Temperature:</label>
            <input
              type="text"
              id="temperature-input"
              class="textInput"
              :class="{ 
                'validation-error': submitFormValidation.temperature==='error',
              }"
            >
            <p v-if="submitFormValidation.temperature==='error'" class="mt-2 text-sm text-red-600 dark:text-red-500">Please enter a temperature!</p>
          </div>
          <button
          v-if="disableSubmitButton"
          disabled
          type="submit"
          class="submitButton mx-auto mt-4"
        >
          Submit
        </button>
        <button
          v-else
          type="submit"
          class="submitButton mx-auto mt-4"
        >
          Submit
        </button>
        </form>
      </div>
    </div>
    <div class="titleText flex justify-center w-full">Select a date range:</div>
    <form id="range-form" class="rangeFormContainer" action="">
      <div
        date-rangepicker
        datepicker-autohide
        datepicker-buttons
        datepicker-format="dd/mm/yyyy"
        class="flex items-center"
      >
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input
            id="start-time"
            type="text"
            value="15/10/2019"
            class="datePickerInput"
            :class="{ 
              'validation-error': rangeFormValidation.startTime==='error',
            }"
            placeholder="Select date start"
          >
          <p
            v-if="rangeFormValidation.startTime==='error'"
            class="absolute mt-2 text-sm text-red-600 dark:text-red-500"
          >
            Please enter a temperature!
          </p>
        </div>
        <span class="mx-4 text-gray-700">to</span>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input
            id="end-time"
            type="text"
            class="datePickerInput"
            :class="{
              'validation-error': rangeFormValidation.endTime==='error',
            }"
            placeholder="Select date end"
          >
          <p
            v-if="rangeFormValidation.endTime==='error'"
            class="absolute mt-2 text-sm text-red-600 dark:text-red-500"
          >
            Please enter a temperature!
          </p>
        </div>
        <button
          v-if="disableSubmitButton"
          disabled
          type="submit"
          class="submitButton ml-4"
        >
          Submit
        </button>
        <button
          v-else
          type="submit"
          class="submitButton ml-4"
        >
          Submit
        </button>
      </div>
    </form>

    <div class="averagesContainer">
      <div class="titleText">Statistics for selected date range:</div>
      <InfoBox
        v-if="weatherRecordStatistics && !requestFailed"
        :weatherInfo="weatherRecordStatistics"
        :average="true"
        class="flex justify-center w-full"
      />
      <p
        v-if="requestFailed"
        class="mt-2 text-medium text-red-600 dark:text-red-500 font-bold"
      >
        Something went wrong! Please retry.
      </p>
      <p
        v-if="noRecordsFound"
        class="mt-2 text-medium text-red-600 dark:text-red-500 font-bold"
      >
        No records found in selected range!
      </p>
    </div>

    <div class="recordsContainer">
      <div class="titleText">Records for selected date range:</div>
      <div class="buttonContainer">
        <button
          class="submitButton ml-4"
          @click="displayMoreRecords(true)"
        >
          Show More
        </button>
        <button
          class="submitButton ml-4"
          @click="displayMoreRecords(false)"
        >
          Show Less
        </button>
        <button
          class="submitButton ml-4"
          @click="toggleDisplayAllRecords"
        >
        {{ displayAllRecords ?  'Hide All' : 'Show All' }}
        </button>
      </div>
      <div
        v-if="recordsInRange.length>0"
        class="mt-4"
        v-html="numberOfRecordsToDisplayText"
      >
      </div>
      <div v-if="recordsInRange.length > 0" class="elementContainer">
        <InfoBox
          v-for="(record, index) in recordsInRangeToDisplay"
          :key="index"
          :weatherInfo="record"
          :average="false"
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
    disableSubmitButton.value = true;
    const temperatureInput = document.getElementById("temperature-input").value;
    const locationInput = document.getElementById("location-input").value;
    const dateInput = document.getElementById("date-picker").value;

    if(temperatureInput == "") submitFormValidation.value.temperature = 'error';
    else submitFormValidation.value.temperature = 'success';
    if(locationInput == "") submitFormValidation.value.location = 'error';
    else submitFormValidation.value.location = 'success';
    if(dateInput == "") submitFormValidation.value.date = 'error';
    else submitFormValidation.value.date = 'success';

    console.log('submit', submitFormValidation, Object.keys(submitFormValidation.value));
    
    if(Object.values(submitFormValidation.value).every(value => value!=='error')) {
      console.log('record', getTimestampFromEuFormat(dateInput), dateInput);
      const location = locationInput;
      const time = getTimestampFromEuFormat(dateInput);
      const temperature = convertToKelvin(temperatureInput)
      await saveTemperature(location, time, temperature);
      //updateRanges to include the added record
      await updateRanges(time);
      submitFormValidation.value = {
        temperature: 'success',
        location: 'success',
        date: 'success'
      };
    }
    enableButtons();
    
  });

  document.getElementById("end-time").value = currentTime;
  const rangeForm = document.getElementById('range-form');
  rangeForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    disableRangeButton.value = true;
    const startTimeInput = document.getElementById("start-time").value;
    const endTimeInput = document.getElementById("end-time").value;
    if(startTimeInput == "") rangeFormValidation.value.startTime = 'error';
    else rangeFormValidation.value.startTime = 'success';  
    if(endTimeInput == "") rangeFormValidation.value.endTime = 'error';
    else rangeFormValidation.value.endTime = 'success';

    if(Object.values(rangeFormValidation.value).every(value => value!=='error')) {
      const startTime = getTimestampFromEuFormat(startTimeInput);
      const endTime = getTimestampFromEuFormat(endTimeInput);
      console.log(startTime, endTime);
      console.log('submitted', Date.now());
      await getRecordsInRange(startTime, endTime);
      rangeFormValidation.value = {
        startTime: 'success',
        endTime: 'success'
      };
    }
    enableButtons();
  });

})



const { autocompleteLocation, getTemperaturesDuring, saveTemperature } = mockApi();
let submitFormValidation = ref({
  temperature: 'success',
  location: 'success',
  date: 'success'
});
let rangeFormValidation = ref({
  startTime: 'success',
  endTime: 'success'
});
const currentTime = new Date().toJSON().slice(0,10).split('-').reverse().join('/');
let recordsInRange = ref([])
let numberOfRecordsToDisplay = ref(10);
let displayAllRecords = ref(false);

let numberOfRecordsToDisplayText = computed(() => {
  return `Showing <strong>${numberOfRecordsToDisplay.value}</strong> out of <strong>${recordsInRange.value.length}</strong> results`;
});

function displayMoreRecords(value) {
  //number of displayed items to increment by
  const increment = 10;
  if(value) {
    if(numberOfRecordsToDisplay.value<=recordsInRange.value.length-increment) numberOfRecordsToDisplay.value += increment;
    else if(numberOfRecordsToDisplay.value>recordsInRange.value.length-increment) numberOfRecordsToDisplay.value = recordsInRange.value.length;
  } else if(!value) {
    if(numberOfRecordsToDisplay.value>=2*increment) numberOfRecordsToDisplay.value -= increment;
    else if(numberOfRecordsToDisplay.value<2*increment) numberOfRecordsToDisplay.value = increment;
  }
}

function toggleDisplayAllRecords() {
  displayAllRecords.value = !displayAllRecords.value;
  if(displayAllRecords.value===true) numberOfRecordsToDisplay.value = recordsInRange.value.length;
  else numberOfRecordsToDisplay.value = 10;
}

let recordsInRangeToDisplay = computed(() => {
  return recordsInRange.value.slice(0, numberOfRecordsToDisplay.value);
});

let weatherRecordStatistics = computed(() => {
  if(recordsInRange.value.length > 0) {
    const averageTemperature = recordsInRange.value.reduce((accumulator, current) => accumulator + current.temperature, 0)/recordsInRange.value.length;
    const daysAboveAverage = recordsInRange.value.filter(el => el.temperature>=averageTemperature).length;
    const hotDayKelvinTemperature = 273+15;
    const hotDays = recordsInRange.value.filter(el => el.temperature>=hotDayKelvinTemperature).length;
    const coldDays = recordsInRange.value.filter(el => el.temperature<hotDayKelvinTemperature).length;
    const modeOfTemperature = recordArray => {
      let maxCounts = {};
      recordArray.forEach((el) => {
        if(maxCounts[el.temperature]) maxCounts[el.temperature]++;
        else maxCounts[el.temperature] = 1;
      });
      console.log(maxCounts);
      //convert to array and sort by count
      const sortedCounts = Object.entries(maxCounts).sort(([key1, value1], [key2, value2]) => value2 - value1);
      const [ mode, modeCount ] = sortedCounts[0];
      console.log('mode, modeCount', mode, modeCount)
      const allModes = sortedCounts.filter(([key, value]) => value===modeCount);
      console.log('weatherRecordStatistics', allModes);
      //if multiple values are the mode return the highest one
      if(allModes.length>1) {
        allModes.sort(([key1, value1], [key2, value2]) => key2 - key1);
        return allModes[0][0];
      } else return mode;
    };
    const result = {
      averageTemperature,
      daysAboveAverage,
      modeOfTemperature: modeOfTemperature(recordsInRange.value),
      hotDays,
      coldDays
    };
    console.log(result);
    return result;
  } else {
    return null;
  }
})

let noRecordsFound = ref(false);
let requestFailed = ref(false);
let disableSubmitButton = ref(false);
let disableRangeButton = ref(false);
let throttleTimeout = 1000;

function enableButtons() {
  setTimeout(() => { 
    console.log('activated');
    disableSubmitButton.value = false;
    disableRangeButton.value = false;
  }, throttleTimeout);
}

async function getRecordsInRange(startTime, endTime) {
  try {
    const records = await getTemperaturesDuring(startTime, endTime);
    requestFailed.value = false;
    console.log(records);
    if(records.length>0) {
      const sortByAscendingDate = records.sort((a, b) => b.time-a.time);
      recordsInRange.value = sortByAscendingDate;
      noRecordsFound.value = false;
    } else {
      noRecordsFound.value = true;
    }
  } catch(e) {
    console.log(e);
    requestFailed.value = true;
    noRecordsFound.value = false;
    recordsInRange.value = [];
  }
}

async function updateRanges(time) {
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  let startTimestamp = getTimestampFromEuFormat(startTimeInput.value);
  let endTimestamp = getTimestampFromEuFormat(endTimeInput.value);
  console.log('updateRanges', startTimestamp, endTimestamp, time)
  if(time > endTimestamp) {
    endTimeInput.value = getEuFormatFromTimestamp(time);
    endTimestamp = time;
  }
  if(time < startTimestamp) {
    startTimeInput.value = getEuFormatFromTimestamp(time);
    startTimestamp = time;
  }
  await getRecordsInRange(startTimestamp, endTimestamp);
}

function getTimestampFromEuFormat(date) { 
  const dateArray = date.split('/');
  const switched = [...dateArray.splice(1, 1), ...dateArray].join('/');
  console.log('getTimestampFromEuFormat', new Date(switched));
  return new Date(switched).getTime();
};

function getEuFormatFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  let formatted = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  return formatted;
};

function convertToKelvin(celsius) {
  return parseInt(celsius)+273;
};

//autocomplete
let locationInput = ref("");
let searchLocations = ref([]);
let autocompleteFocused = ref(false);

watch(locationInput, async (input) => {
  if(searchLocations.value.includes(input)) return searchLocations.value = [];
  if(input === '') return searchLocations.value = [];
  const locations = await autocompleteLocation(input);
  console.log('searchLocations', input, locations.length)
  searchLocations.value = locations;
  autocompleteFocused.value = true;
})

function dismissAutocomplete() {
  console.log('dismissed');
  autocompleteFocused.value = false;
}

function showAutocomplete() {
  console.log('showed');
  autocompleteFocused.value = true;
}

function selectLocation(value) {
  locationInput.value = value;
  autocompleteFocused.value = false;
}

</script>

<style scoped>
.submitButton {
  @apply cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-blue-800;
}
.rangeFormContainer {
  @apply m-6 mb-10 flex items-start justify-center;
}
.autocompleteItem {
  @apply w-full m-0 p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
.textInput {
  @apply block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.datePickerInput {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
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
  @apply py-4 flex flex-col bg-main w-full items-center justify-center;
}

.titleText {
  @apply capitalize text-center flex items-center text-xl m-4;
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