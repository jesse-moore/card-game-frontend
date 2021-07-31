const colors = require('tailwindcss/colors');

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
            yellow: colors.amber,
            blueGray: colors.blueGray,
            lightBlue: colors.lightBlue,
            darkBlue: colors.darkBlue,
            green: colors.green,
            orange: colors.orange,
        },
        extend: {
            colors: {
                pokerGreen: '#076324',
            },
            screens: {
                'xsm': '450px',
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
};
