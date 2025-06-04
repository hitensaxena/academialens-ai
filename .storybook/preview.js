export const parameters = {
  themes: {
    default: 'Light',
    list: [
      { name: 'Light', class: '', color: '#ffffff', default: true },
      { name: 'Dark', class: 'dark', color: '#222222' },
    ],
  },
};

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
