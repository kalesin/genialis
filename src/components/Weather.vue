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
                'validation-error': !isRecordFormValid.location,
              }"
              autocomplete="off"
              v-model="locationValue"
              @focus="() => autocompleteFocused = true"
              v-click-outside="() => autocompleteFocused = false"
            >
            <p v-if="!isRecordFormValid.location" class="mt-2 text-sm text-red-600 dark:text-red-500">Please enter a location!</p>
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
                'validation-error': !isRecordFormValid.date,
              }"
              autocomplete="off"
            >
            <p v-if="!isRecordFormValid.date" class="mt-2 text-sm text-red-600 dark:text-red-500">Please select a date!</p>
          </div>
          <div>
            <label for="temperature-input" class="block my-2 text-sm font-medium text-gray-900 light:text-white">Temperature:</label>
            <input
              type="text"
              id="temperature-input"
              class="textInput"
              :class="{ 
                'validation-error': !isRecordFormValid.temperature,
              }"
              autocomplete="off"
            >
            <p v-if="!isRecordFormValid.temperature" class="mt-2 text-sm text-red-600 dark:text-red-500">Please enter a temperature!</p>
          </div>
          <button
            v-if="disableRecordButton"
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
              'validation-error': !isRangeFormValid.startTime,
            }"
            placeholder="Select date start"
            autocomplete="off"
          >
          <p
            v-if="!isRangeFormValid.startTime"
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
              'validation-error': !isRangeFormValid.endTime,
            }"
            placeholder="Select date end"
            autocomplete="off"
          >
          <p
            v-if="!isRangeFormValid.endTime"
            class="absolute mt-2 text-sm text-red-600 dark:text-red-500"
          >
            Please enter a temperature!
          </p>
        </div>
        <button
          v-if="disableRecordButton"
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
        v-if="weatherRecordStatistics && !requestFailed && !noRecordsFound"
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
          @click="displayMoreRecords()"
        >
          Show More
        </button>
        <button
          class="submitButton ml-4"
          @click="displayLessRecords()"
        >
          Show Less
        </button>
        <button
          class="submitButton ml-4"
          @click="toggleDisplayAllRecords"
        >
        {{ displayAllRecords ?  "Hide All" : "Show All" }}
        </button>
      </div>
      <div
        v-if="recordsInRange.length>0"
        class="mt-4"
      >
        Showing <strong>{{ numberOfRecordsToDisplay }}</strong> out of <strong>{{ recordsInRange.length }}</strong> results
      </div>
      <div v-if="recordsInRange.length>0" class="elementContainer">
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
import { ref, computed, onMounted, watch } from "vue"
import { initFlowbite } from "flowbite"
import { mockApi } from "../api/mockApi.ts"
import { getTimestampFromEuFormat, getEuFormatFromTimestamp, convertToKelvin } from "../utilities"
import InfoBox from "./InfoBox.vue"

const { autocompleteLocation, getTemperaturesDuring, saveTemperature } = mockApi()

const isRecordFormValid = ref({
  temperature: true,
  location: true,
  date: true
})
const isRangeFormValid = ref({
  startTime: true,
  endTime: true
})
const disableRecordButton = ref(false)
const disableRangeButton = ref(false)

onMounted(() => {
  //init tailwind components
  initFlowbite()
  
  document.getElementById("end-time").value = getEuFormatFromTimestamp(Date.now())

  const submitForm = document.getElementById("record-form")
  submitForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    disableRecordButton.value = true

    const temperatureValue = document.getElementById("temperature-input").value
    if(temperatureValue == "") isRecordFormValid.value.temperature = false
    else isRecordFormValid.value.temperature = true
    
    const locationValue = document.getElementById("location-input").value
    if(locationValue == "") isRecordFormValid.value.location = false
    else isRecordFormValid.value.location = true
    
    const dateValue = document.getElementById("date-picker").value
    if(dateValue == "") isRecordFormValid.value.date = false
    else isRecordFormValid.value.date = true

    if(Object.values(isRecordFormValid.value).every(x => x)) {
      const time = getTimestampFromEuFormat(dateValue)
      await saveTemperature(locationValue, time, convertToKelvin(parseInt(temperatureValue)))
      //updateRanges to include the added record
      await updateRanges(time)
    }
    setTimeout(() => { disableRecordButton.value = false }, throttleTimeout)
  })

  const rangeForm = document.getElementById("range-form")
  rangeForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    disableRangeButton.value = true

    const startTimeValue = document.getElementById("start-time").value
    if(startTimeValue == "") isRangeFormValid.value.startTime = false
    else isRangeFormValid.value.startTime = true  
    
    const endTimeValue = document.getElementById("end-time").value
    if(endTimeValue == "") isRangeFormValid.value.endTime = false
    else isRangeFormValid.value.endTime = true

    if(Object.values(isRangeFormValid.value).every(x => x)) {
      const startTime = getTimestampFromEuFormat(startTimeValue)
      const endTime = getTimestampFromEuFormat(endTimeValue)
      await getRecordsInRange(startTime, endTime)
    }
    setTimeout(() => { disableRangeButton.value = false }, throttleTimeout)
  })
})

//displaying records
const increment = 10
const numberOfRecordsToDisplay = ref(increment)
const displayAllRecords = ref(false)

//request results
const recordsInRange = ref([])
const noRecordsFound = ref(false)
const requestFailed = ref(false)
const throttleTimeout = 1000

//autocomplete
let locationValue = ref("")
let searchLocations = ref([])
let autocompleteFocused = ref(false)

function displayMoreRecords() {
  numberOfRecordsToDisplay.value += increment
  if(numberOfRecordsToDisplay.value>recordsInRange.value.length) numberOfRecordsToDisplay.value = recordsInRange.value.length
}

function displayLessRecords() {
  numberOfRecordsToDisplay.value -= increment
  if(numberOfRecordsToDisplay.value<increment) numberOfRecordsToDisplay.value = increment
}

function toggleDisplayAllRecords() {
  displayAllRecords.value = !displayAllRecords.value
  if(displayAllRecords.value===true) numberOfRecordsToDisplay.value = recordsInRange.value.length
  else numberOfRecordsToDisplay.value = increment
}

let recordsInRangeToDisplay = computed(() => {
  return recordsInRange.value.slice(0, numberOfRecordsToDisplay.value)
})

let weatherRecordStatistics = computed(() => {
  if(recordsInRange.value.length>0) {
    const averageTemperature = recordsInRange.value.reduce((accumulator, current) => accumulator + current.temperature, 0)/recordsInRange.value.length
    const daysAboveAverage = recordsInRange.value.filter(el => el.temperature>=averageTemperature).length
    
    const hotDayTemperature = convertToKelvin(15)
    const hotDays = recordsInRange.value.filter(el => el.temperature>=hotDayTemperature).length
    const coldDays = recordsInRange.value.filter(el => el.temperature<hotDayTemperature).length
    
    const maxCounts = {}
    recordsInRange.value.forEach((el) => {
      if(maxCounts[el.temperature]) maxCounts[el.temperature]++
      else maxCounts[el.temperature] = 1
    })
    //convert to array and sort by count
    const sortedCounts = Object.entries(maxCounts).sort(([key1, value1], [key2, value2]) => value2 - value1)
    const [ mode, modeCount ] = sortedCounts[0]
    const allModes = sortedCounts.filter(([key, value]) => value===modeCount)
    const modeOfTemperature = allModes.length==1 ? mode : allModes.sort(([key1, value1], [key2, value2]) => key2 - key1)[0][0]
    
    const result = {
      averageTemperature,
      daysAboveAverage,
      hotDays,
      coldDays,
      modeOfTemperature,
    }
    return result
  } else {
    return null
  }
})

async function getRecordsInRange(startTime, endTime) {
  try {
    const records = await getTemperaturesDuring(startTime, endTime)
    requestFailed.value = false
    if(records.length>0) {
      const sortByDescendingDate = records.sort((a, b) => b.time-a.time)
      recordsInRange.value = sortByDescendingDate
      noRecordsFound.value = false
    } else {
      recordsInRange.value = []
      noRecordsFound.value = true
    }
  } catch(e) {
    requestFailed.value = true
    noRecordsFound.value = false
    recordsInRange.value = []
  }
}

async function updateRanges(time) {
  const endTimeInput = document.getElementById("end-time")
  if(time>getTimestampFromEuFormat(endTimeInput.value)) {
    endTimeInput.value = getEuFormatFromTimestamp(time)
  }
  
  const startTimeInput = document.getElementById("start-time")
  if(time<getTimestampFromEuFormat(startTimeInput.value)) {
    startTimeInput.value = getEuFormatFromTimestamp(time)
  }
  
  await getRecordsInRange(getTimestampFromEuFormat(startTimeInput.value), getTimestampFromEuFormat(endTimeInput.value))
}

function selectLocation(value) {
  locationValue.value = value
  autocompleteFocused.value = false
}

watch(locationValue, async (input) => {
  if(searchLocations.value.includes(input)) return autocompleteFocused.value = false
  if(input === "") return searchLocations.value = []

  const locations = await autocompleteLocation(input)
  searchLocations.value = locations
  autocompleteFocused.value = true
})
</script>

<style scoped>
.submitButton {
  @apply cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-blue-800
}

.rangeFormContainer {
  @apply m-6 mb-10 flex items-start justify-center
}

.autocompleteItem {
  @apply w-full m-0 p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
}

.textInput {
  @apply block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
}

.datePickerInput {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
}

.validation-success {
 @apply bg-green-50 border-green-500 text-green-900 placeholder-green-700 dark:bg-green-100 dark:border-green-400
}

.validation-error {
  @apply bg-red-50 border-red-500 text-red-900 placeholder-red-700 dark:bg-red-100 dark:border-red-400
}

.elementContainer {
  @apply flex bg-main w-full flex-wrap h-auto items-start justify-center px-6 py-4
}

.averagesContainer {
  @apply flex flex-col bg-main w-full items-center justify-center
}

.recordsContainer {
  @apply py-4 flex flex-col bg-main w-full items-center justify-center
}

.titleText {
  @apply capitalize text-center flex items-center text-xl m-4
}

.element {
  @apply bg-main w-1/3 p-2 flex rounded-lg
}

.formContainer {
  @apply flex items-start h-auto mx-8 pb-8 flex-col
}
</style>