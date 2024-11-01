/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Sora', 'sans-serif'],
            },
        },
        screens: {
            'xs': '480px',
            'ss': '620px',
            'sm': '768px',
            'md': '1060px',
            'lg': '1200px',
            'xl': '1700px',
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                night: {
                    ...require("daisyui/src/theming/themes")["[data-theme=night]"],
                    "primary": "#6366f1",
                    "primary-focus": "#4f46e5",
                    "primary-content": "#eef2ff",
                    "secondary": "#9882f8",
                    "secondary-focus": "#7c60f7",
                    "secondary-content": "#1f1f33",
                    "accent": "#F470B4",
                    "accent-focus": "#F250A3",
                    "accent-content": "#301C25",
                    "base-content": "#f9fafb",
                    "base-100": "#030712",
                    "base-200": "#111827",
                    "base-300": "#1f2937",
                },
            },
        ],
    },
}

