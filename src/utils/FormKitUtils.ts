// Format
// {
//     $formkit: json.type ,
//     name: 'json.field',
//     label: 'json.originalfield',
// },
type jsonForm = {
  original_field: string
  field: string
  type: string
}

export const jsonToSchema = (json: jsonForm[]) => {
  return json.map((item, index) => ({
    id: index,
    $formkit: item.type,
    name: item.field.toLowerCase().replace(/\s+/g, '_'),
    label: item.original_field,
  }))
}

export const FormType = {
  text: [
    { icon: 'mdi:text', type: 'text', description: 'Single-line text input.' },
    { icon: 'mdi:email-outline', type: 'email', description: 'Email input with validation.' },
    { icon: 'mdi:phone', type: 'tel', description: 'Telephone number input.' },
    { icon: 'mdi:numeric', type: 'number', description: 'Numeric input.' },
    { icon: 'mdi:search', type: 'search', description: 'Search input.' },
    { icon: 'mdi:calendar', type: 'date', description: 'Date picker input.' },
    { icon: 'mdi:clock-outline', type: 'datetime-local', description: 'Date and time input.' },
    { icon: 'mdi:clock-time-four-outline', type: 'time', description: 'Time input.' },
    { icon: 'mdi:palette', type: 'color', description: 'Color picker input.' },
    { icon: 'mdi:note-text-outline', type: 'textarea', description: 'Multi-line text input.' },
  ],
  other: [
    { icon: 'mdi:checkbox-marked-outline', type: 'checkbox', description: 'Checkbox input.' },
    { icon: 'mdi:checkbox-multiple-marked', type: 'radio', description: 'Radio button input.' },
    { icon: 'mdi:file-upload-outline', type: 'file', description: 'File upload input.' },
    { icon: 'mdi:ray-start-end', type: 'range', description: 'Slider for numeric range.' },
    { icon: 'mdi:menu-down', type: 'select', description: 'Dropdown menu.' },
  ],
}
