const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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
            },
            width: {
                350: '350px',
                450: '450px',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            boxShadow: ['active'],
            borderRadius: ['last'],
            borderRadius: ['first'],
        },
    },
	plugins: [
        require('@tailwindcss/forms'),
    ],
};
