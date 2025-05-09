export const defaultJson = [
  {
    original_field: 'First Name',
    field: 'First Name',
    type: 'text',
    help: 'Enter your full first name as it appears on official documents.',
    value: '' // Default empty value
  },
  {
    original_field: 'Last Name',
    field: 'Last Name',
    type: 'text',
    help: 'Enter your last name as it appears on official documents.',
    value: '' // Default empty value
  },
  { 
    original_field: 'Birth Date', 
    field: 'Birth Date', 
    type: 'date', 
    value: '' // Default empty value
  },
  { 
    original_field: 'Appointment DateTime', 
    field: 'Appointment DateTime', 
    type: 'datetime-local', 
    value: '' // Default empty value
  },
  { 
    original_field: 'Email', 
    field: 'Email', 
    type: 'email', 
    value: '' // Default empty value
  },
  { 
    original_field: 'Age', 
    field: 'Age', 
    type: 'number', 
    value: 0 // Default value 0
  }
];

export const jsonTemp = [
  {
      "form_name": "Complaint Form",
      "fields": [
          {
              "field": "Day of Complaint",
              "type": "date",
              "validation": "required|date_before:today"
          },
          {
              "field": "Family 1",
              "type": "text",
              "validation": "length:0,255"
          },
          {
              "field": "Family 2",
              "type": "text",
              "validation": "length:0,255"
          },
          {
              "field": "Family 3",
              "type": "text",
              "validation": "length:0,255"
          },
          {
              "field": "Family 4",
              "type": "text",
              "validation": "length:0,255"
          },
          {
              "field": "Agency",
              "type": "text",
              "validation": "length:0,255"
          },
          {
              "field": "Intersection of Agency",
              "type": "textarea",
              "validation": "length:1,500"
          },
          {
              "field": "Apology Message",
              "type": "textarea",
              "validation": "length:0,1000"
          },
          {
              "field": "Phone Number",
              "type": "tel",
              "validation": "required|matches:^\+?[0-9\s\-]{7,15}$"
          },
          {
              "field": "Fax Number",
              "type": "text",
              "validation": "length:0,20"
          }
      ]
  }
]