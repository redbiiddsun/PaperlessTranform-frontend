module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1A74E2',
        secondary: '#3FA0EF',
        highlight: '#6BD0FF',
        text: '#FFFFFF',
        subtext: '#434649',
        text_b: '#light:text',
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
      },
      fontSize: {
        '36': '36px',
        '24': '24px',
        '16': '16px',
        '12': '12px',
      },
    },
  },
  plugins: [],
}
