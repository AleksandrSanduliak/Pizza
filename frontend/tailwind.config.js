module.exports = {
  theme: {
    extend: {
      colors: {
        // Добавляем ваши переменные в цветовую палитру
        linegray: 'var(--linegray)',
        'gray-text': 'var(--gray-text)',
        primary: 'var(--primary)',
        red: 'var(--red)',
        white: 'var(--white)',
        black: 'var(--black)',
        green: 'var(--green)',
      },
      fontFamily: {
        // Добавляем шрифты
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        // Добавляем transition durations
        'fast': '0.2s',
        'medium': '0.4s',
      },
      transitionTimingFunction: {
        // Добавляем transition timing
        'ease-in': 'ease-in',
        'ease': 'ease',
      },
    },
  },
}