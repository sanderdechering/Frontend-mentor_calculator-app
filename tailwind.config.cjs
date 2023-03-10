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
        //backgrounds
        'My-very-dark-desaturated-blue-background' : 'hsl(222, 26%, 31%)',
        'My-very-dark-desaturated-blue-background-toggle-keypad' : 'hsl(223, 31%, 20%)',
        'My-very-dark-desaturated-blue-background-screen' : 'hsl(224, 36%, 15%)',

        //keys
        'My-desaturated-dark-blue-button' : 'hsl(225, 21%, 49%)',
        'My-desaturated-dark-blue-button-shadow' : 'hsl(224, 28%, 35%)',

        'My-red-button': 'hsl(6, 63%, 50%)',
        'My-dark-red-button-shadow': 'hsl(6, 70%, 34%)',

        'My-light-grayish-orange-button': 'hsl(30, 25%, 89%)',
        'My-grayish-orange-button-shadow': 'hsl(28, 16%, 65%)',

        //text

        'My-very-dark-grayish-blue-text' : 'hsl(221, 14%, 31%)',


        //theme 2
        'My-light-gray-background': 'hsl(0, 0%, 90%)',
        'My-grayish-red-background-toggle-keypad': 'hsl(0, 5%, 81%)',
        'My-very-light-gray-background-screen': 'hsl(0, 0%, 93%)',

        //keys
        'My-dark-moderate-cyan-button': 'hsl(185, 42%, 37%)',
        'My-very-dark-cyan-button-shadow': 'hsl(185, 58%, 25%)',

        'My-orange-button': 'hsl(25, 98%, 40%)',
        'My-dark-orange-button-shadow': 'hsl(25, 99%, 27%)',

        'My-light-grayish-yellow-button': 'hsl(45, 7%, 89%)',
        'My-dark-grayish-orange-button-shadow': 'hsl(35, 11%, 61%)',

        'My-very-dark-grayish-yellow-text': 'hsl(60, 10%, 19%)',

        //text

        //theme 3
        // backgrounds
        'My-very-dark-violet-background': 'hsl(268, 75%, 9%)',
        'My-very-dark-violet-toggle-keypad-screen-background': 'hsl(268, 71%, 12%)',

        //keys
        'My-dark-violet-button': 'hsl(281, 89%, 26%)',
        'My-vivid-magenta-shadow': 'hsl(285, 91%, 52%)',

        'My-pure-cyan-button': 'hsl(176, 100%, 44%)',
        'My-soft-cyan-shadow': 'hsl(177, 92%, 70%)',

        'My-very-dark-violet-button': 'hsl(268, 47%, 21%)',
        'My-dark-magenta-shadow': 'hsl(290, 70%, 36%)',

        //text
        'My-light-yellow-text': 'hsl(52, 100%, 62%)',
        'My-very-dark-blue-text': 'hsl(198, 20%, 13%)',
        'My-white': 'hsl(0, 0%, 100%)'

      }
    },
  },
  plugins: [],
}
