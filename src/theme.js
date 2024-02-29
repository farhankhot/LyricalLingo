// theme.js or wherever you have your Chakra theme config
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  shadows: {
    lavender: '0 0 10px #e0b0ff', // This is a lavender color, adjust as needed
  },
});

export default theme;
