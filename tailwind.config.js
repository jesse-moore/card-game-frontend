const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: { safelist: ['text-red-400', 'text-blue-400', 'text-green-400'] },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            blue: colors.blue,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.red,
            rose: colors.rose,
            yellow: colors.amber,
            blueGray: colors.blueGray,
            lightBlue: colors.lightBlue,
            darkBlue: colors.darkBlue,
            green: colors.green,
            orange: colors.orange,
        },
        screens: {
            xsm: '450px',
            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                pokerGreen: '#076324',
                linkedIn: '#0A66C2',
                github: '#181717',
                gmail: '#EA4335',
            },
            width: {
                350: '350px',
                450: '450px',
            },
        },
    },
    variants: {
        extend: {
            fill: ['hover'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
