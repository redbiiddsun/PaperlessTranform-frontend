module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Inter: ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#1A74E2',
        secondary: '#3FA0EF',
        hightlight: '#6BD0FF',
        text: '#FFFFFF',
        subtext: '#434649',
        text_b: '#222222',
        success: '#34C724',
        warning: '#FFC107',
        error: '#DC3545',
      },
    },
  },
  plugins: [],
}
