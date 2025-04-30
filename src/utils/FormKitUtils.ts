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
  help?: string
  outerClass?: string
  placeholder?: string
  validation?: string
}

export const jsonToSchema = (json: jsonForm[]) => {
  return json.map((item, index) => ({
    id: index,
    $formkit: item.type,
    name: item.field.toLowerCase().replace(/\s+/g, '_'),
    label: item.original_field,
    value: '',
    ...(item.validation ? { validation: item.validation } : {}),
    ...(item.help ? { help: item.help } : {}),
    ...(item.placeholder ? { placeholder: item.placeholder } : {}),
    ...(item.outerClass ? { outerClass: item.outerClass } : { outerClass: 'col-span-2' }),
  }))
}

export const FormType = {
  text: [
    {
      icon: 'mdi:text',
      type: 'text',
      description: 'Single-line text input.',
      validation: [
        { name: 'Required', description: '' },
        { name: 'Length', description: '' },
        { name: 'Url', description: '' },
        { name: 'Start With', description: '' },
        { name: 'End With', description: '' },
        { name: 'Minimum', description: '' },
        { name: 'Maximum', description: '' },
      ],
    },
    { icon: 'mdi:email-outline', type: 'email', description: 'Email input with validation.', validation: [] },
    { icon: 'mdi:phone', type: 'tel', description: 'Telephone number input.', validation: [] },
    { icon: 'mdi:numeric', type: 'number', description: 'Numeric input.', validation: [] },
    { icon: 'mdi:search', type: 'search', description: 'Search input.', validation: [] },
    { icon: 'mdi:calendar', type: 'date', description: 'Date picker input.', validation: [] },
    { icon: 'mdi:clock-outline', type: 'datetime-local', description: 'Date and time input.', validation: [] },
    { icon: 'mdi:clock-time-four-outline', type: 'time', description: 'Time input.', validation: [] },
    { icon: 'mdi:palette', type: 'color', description: 'Color picker input.', validation: [] },
    { icon: 'mdi:note-text-outline', type: 'textarea', description: 'Multi-line text input.', validation: [] },
  ],
  other: [
    { icon: 'mdi:checkbox-marked-outline', type: 'checkbox', description: 'Checkbox input.',validation: []  },
    { icon: 'mdi:checkbox-multiple-marked', type: 'radio', description: 'Radio button input.', validation: [] },
    { icon: 'mdi:file-upload-outline', type: 'file', description: 'File upload input.', validation: [] },
    { icon: 'mdi:ray-start-end', type: 'range', description: 'Slider for numeric range.', validation: [] },
    { icon: 'mdi:menu-down', type: 'select', description: 'Dropdown menu.', validation: [] },
  ],
}
