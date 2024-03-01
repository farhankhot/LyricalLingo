// theme.js or wherever you have your Chakra theme config
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
});

export default theme;
