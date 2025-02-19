<script setup lang="ts">
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { SurveyComponent } from 'survey-vue3-ui'
import { ref, watchEffect } from 'vue'

// const SURVEY_ID = 1;

interface ITempData {
  orginalField: string
  field: string
  type: string
}

const tempData: ITempData[] = [
  {
    orginalField: 'ชื่อ',
    field: 'name',
    type: 'text',
  },
  {
    orginalField: 'อายุ',
    field: 'age',
    type: 'number',
  },
  {
    orginalField: 'ตำบล',
    field: 'district',
    type: 'text',
  },
  {
    orginalField: 'วันเกิด',
    field: 'Birthdate',
    type: 'date',
  },
  {
    orginalField: 'รหัสไปรณีย์',
    field: 'postal_code',
    type: 'text',
  },
]

function transformData(data: ITempData[]): { elements: { name: string; type: string }[] } {
  return {
    elements: data.map(({ orginalField, type }) => ({
      name: orginalField,
      type: 'text',
      inputType: type,
    })),
  }
}

const surveyJson = transformData(tempData)

console.log('Survey JSON:', JSON.stringify(surveyJson, null, 2))

const alertResults = (sender: any) => {
  const results = JSON.stringify(sender.data)
  alert(results)
  // saveSurveyResults(
  //   "https://your-web-service.com/" + SURVEY_ID,
  //   sender.data
  // )
}

// const survey = new Model(surveyJson)
// survey.onComplete.add(alertResults)
const survey = ref(new Model(surveyJson))
watchEffect(() => {
  survey.value = new Model(surveyJson)
})

console.log('Survey Model:', survey.value)

survey.value.onComplete.add((sender: any) => {
  alert(JSON.stringify(sender.data))
})
// function saveSurveyResults(url: string | URL, json: object) {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if (response.ok) {
//       // Handle success
//     } else {
//       // Handle error
//     }
//   })
//   .catch(error => {
//     // Handle error
//   });
// }
</script>

<template>
  <SurveyComponent :model="survey" :key="survey" />
</template>
