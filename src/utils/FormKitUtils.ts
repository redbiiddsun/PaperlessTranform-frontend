// Format
// {
//     $formkit: json.type ,
//     name: 'json.field',
//     label: 'json.originalfield',

// },

export type jsonForm = {
  form_name: string;          
  fields: Array<{
    original_field?: string;  
    field: string;      
    type: string;
    help?: string;
    outerClass?: string;
    placeholder?: string;
    validation?: string;
    options?: string[];
  }>
};

export const jsonToSchema = (json: jsonForm[]) => {
  return json.flatMap((form) => {
    return form.fields.map((item, index) => ({
      id: index,
      $formkit: item.type,
      name: item.field.toLowerCase().replace(/\s+/g, '_'),
      label: item.original_field || item.field,
      value: '',
      validation: '',
      help: item.help || '',
      placeholder: item.placeholder || '',
      outerClass: item.outerClass || 'col-span-2',
      ...(item.options ? { options: item.options } : {}),
    }));
  });
};


export const FormType = {
  text: [
    {
      icon: 'mdi:text',
      type: 'text',
      description: 'Single-line text input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Url',
          description: 'Ensures the field is not left empty.',
          schema: 'url',
        },
        {
          name: 'Minimum Length',
          description: 'Sets the minimum number of characters.',
          schema: (value: number) => `min:${value}`,
        },
        {
          name: 'Maximum Length',
          description: 'Sets the maximum number of characters.',
          schema: (value: number) => `max:${value}`,
        },
        {
          name: 'Pattern',
          description: 'Validates the input against a specific pattern.',
          schema: (pattern: string) => `matches:${pattern}`,
        },
      ],
    },
    {
      icon: 'mdi:email-outline',
      type: 'email',
      description: 'Email input with validation.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Email Format',
          description: 'Validates that the input is a valid email address.',
          schema: 'email',
        },
      ],
    },
    {
      icon: 'mdi:phone',
      type: 'tel',
      description: 'Telephone number input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
      ],
    },
    {
      icon: 'mdi:numeric',
      type: 'number',
      description: 'Numeric input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Minimum Value',
          description: 'Sets the minimum numeric value.',
          schema: (value: number) => `min:${value}`,
        },
        {
          name: 'Maximum Value',
          description: 'Sets the maximum numeric value.',
          schema: (value: number) => `max:${value}`,
        },
      ],
    },
    {
      icon: 'mdi:search',
      type: 'search',
      description: 'Search input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
      ],
    },
    {
      icon: 'mdi:calendar',
      type: 'date',
      description: 'Date picker input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Minimum Date',
          description: 'Sets the earliest selectable date.',
          schema: (date: string) => `min:${date}`,
        },
        {
          name: 'Maximum Date',
          description: 'Sets the latest selectable date.',
          schema: (date: string) => `max:${date}`,
        },
      ],
    },
    {
      icon: 'mdi:clock-outline',
      type: 'datetime-local',
      description: 'Date and time input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Minimum DateTime',
          description: 'Sets the earliest selectable date and time.',
          schema: (datetime: string) => `min:${datetime}`,
        },
        {
          name: 'Maximum DateTime',
          description: 'Sets the latest selectable date and time.',
          schema: (datetime: string) => `max:${datetime}`,
        },
      ],
    },
    {
      icon: 'mdi:clock-time-four-outline',
      type: 'time',
      description: 'Time input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Minimum Time',
          description: 'Sets the earliest selectable time.',
          schema: (time: string) => `min:${time}`,
        },
        {
          name: 'Maximum Time',
          description: 'Sets the latest selectable time.',
          schema: (time: string) => `max:${time}`,
        },
      ],
    },
    {
      icon: 'mdi:palette',
      type: 'color',
      description: 'Color picker input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures a color is selected.',
          schema: 'required',
        },
      ],
    },
    {
      icon: 'mdi:note-text-outline',
      type: 'textarea',
      description: 'Multi-line text input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the field is not left empty.',
          schema: 'required',
        },
        {
          name: 'Minimum Length',
          description: 'Sets the minimum number of characters.',
          schema: (value: number) => `min:${value}`,
        },
        {
          name: 'Maximum Length',
          description: 'Sets the maximum number of characters.',
          schema: (value: number) => `max:${value}`,
        },
      ],
    },
  ],
  other: [
    {
      icon: 'mdi:checkbox-marked-outline',
      type: 'checkbox',
      description: 'Checkbox input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures the checkbox is checked.',
          schema: 'required',
        },
      ],
    },
    {
      icon: 'mdi:checkbox-multiple-marked',
      type: 'radio',
      description: 'Radio button input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures a radio option is selected.',
          schema: 'required',
        },
      ],
    },
    {
      icon: 'mdi:file-upload-outline',
      type: 'file',
      description: 'File upload input.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures a file is uploaded.',
          schema: 'required',
        },
        {
          name: 'File Type',
          description: 'Validates the file type.',
          schema: (types: string) => `mimes:${types}`,
        },
      ],
    },
    {
      icon: 'mdi:ray-start-end',
      type: 'range',
      description: 'Slider for numeric range.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures a value is selected.',
          schema: 'required',
        },
        {
          name: 'Minimum Value',
          description: 'Sets the minimum value.',
          schema: (value: number) => `min:${value}`,
        },
        {
          name: 'Maximum Value',
          description: 'Sets the maximum value.',
          schema: (value: number) => `max:${value}`,
        },
      ],
    },
    {
      icon: 'mdi:menu-down',
      type: 'select',
      description: 'Dropdown menu.',
      validation: [
        {
          name: 'Required',
          description: 'Ensures an option is selected.',
          schema: 'required',
        },
      ],
    },
  ],
}
