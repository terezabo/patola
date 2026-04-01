/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'patho': {
          'cellular': '#DC2626',      // Červená - buněčné poškození
          'adaptation': '#EA580C',    // Oranžová - adaptace
          'circulation': '#EAB308',   // Žlutá - poruchy oběhu
          'healing': '#16A34A',       // Zelená - hojení
          'inflammation': '#2563EB',  // Modrá - zánět
          'tumor': '#9333EA',         // Fialová - nádory
          'deposits': '#92400E',      // Hnědá - pigmenty
          'immune': '#6B7280',        // Šedá - imunita
          'cardio': '#EC4899',        // Růžová - kardio
          'hemato': '#881337',        // Bordó - krev
          'respiratory': '#06B6D4',   // Tyrkysová - dýchací
          'git': '#84CC16',           // Limetková - GIT
          'renal': '#1E40AF',         // Námořnická - ledviny
          'gyneco': '#A78BFA',        // Levandulová - gynekologie
          'cns': '#4F46E5',           // Indigová - CNS
          'bone': '#D4A574',          // Béžová - kosti
        }
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}