/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //theme 1
        'My-very-dark' : '',

        //theme 2
        'My-light-gray': 'hsl(0, 0%, 90%)',
        'My-grayish-red': 'hsl(0, 5%, 81%)',
        'My-very-light-gray': ' hsl(0, 0%, 93%)',

        //theme 3
        // backgrounds
        'My-very-dark-violet-1': 'hsl(268, 75%, 9%)',
        'My-very-dark-violet-2': 'hsl(268, 71%, 12%)',
        //keys
        'My-very-dark-violet-3': 'hsl(268, 47%, 21%)',
        'My-dark-violet': 'hsl(281, 89%, 26%)',
        'My-dark-magenta': 'hsl(290, 70%, 36%)',
        'My-vivid-magenta': 'hsl(285, 91%, 52%)',
        'My-pure-cyan': 'hsl(176, 100%, 44%)',
        'My-soft-cyan': 'hsl(177, 92%, 70%)',

        //text
        'My-light-yellow': 'hsl(52, 100%, 62%)',
        'My-very-dark-blue': 'hsl(198, 20%, 13%)',
        'My-white': 'hsl(0, 0%, 100%)'

      }
    },
  },
  plugins: [],
}
