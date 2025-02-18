<script setup lang="ts">
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { SurveyComponent } from 'survey-vue3-ui'
import { computed, ref, watchEffect } from 'vue'

// const SURVEY_ID = 1;
const tempData = {
  element: [
    {
      orginalField: "ชื่อ",
      field: "name",
      type: "text"
    },  {
      orginalField: "อายุ",
      field: "age",
      type: "text",
      inputType: "number"
    },  {
      orginalField: "ตำบล",
      field: "district",
      type: "text"
    },  {
      orginalField: "วันเกิด",
      field: "Birthdate",
      type: "text",
      inputType: "date"
    },  {
      orginalField: "รหัสไปรณีย์",
      field: "postal_code",
      type: "text"
    },
  ]
}

const surveyJson = ref({
  elements: tempData.element.map(item => ({
    name: item.field,
    title: `Enter your ${item.orginalField}:`,
    type: item.type,
    ...(item.inputType ? { inputType: item.inputType } : {})
  }))
});

console.log("Survey JSON:", JSON.stringify(surveyJson.value, null, 2));

// console.log("Survey JSON:", JSON.stringify(surveyJson.value, null, 2));

// const surveyJson = {
//   elements: [
//     {
//       name: 'FirstName',
//       title: 'Enter your first name:',
//       type: 'text',
//     },
//     // {
//     //   name: 'LastName',
//     //   title: 'Enter your last name:',
//     //   type: 'text',
//     // },
//   ],
// }

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
const survey = ref(new Model(surveyJson.value));
watchEffect(() => {
  survey.value = new Model(surveyJson.value);
});

console.log("Survey Model:", survey.value);

survey.value.onComplete.add((sender: any) => {
  alert(JSON.stringify(sender.data));
});
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
  <!-- <SurveyComponent :model="survey" /> -->
  <SurveyComponent :model="survey" :key="survey" />
</template>
