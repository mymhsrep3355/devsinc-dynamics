import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f5f7ff',
      100: '#e1e6ff',
      200: '#c2cbff',
      300: '#a3b0ff',
      400: '#8495ff',
      500: '#647aff',
      600: '#4f61cc',
      700: '#3b4999',
      800: '#283266',
      900: '#141933',
    },
  },
  fonts: {
    heading: "Roboto, sans-serif",
    body: "Roboto, sans-serif",
  },
});

export default theme;