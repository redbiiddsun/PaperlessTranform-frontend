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

export const FormType = [
  'color',
  'date',
  'datetime-local',
  'email',
//   'file',
//   'form',
  'number',
//   'radio',
  'range',
//   'select',
  'tel',
  'text',
  'textarea',
  'time',
]
