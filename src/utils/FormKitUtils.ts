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
  return json.map((item) => ({
    $formkit: item.type,
    name: item.field,
    label: item.original_field,
  }))
}

export const FormType = {
  text: [
    'color',
    'date',
    'datetime-local',
    'email',
    'number',
    'search',
    'tel',
    'text',
    'textarea',
    'time',
  ],
  other: [
    'checkbox',
    'file',
    'form',
    'radio',
    'range',
    'select',
  ],
}
