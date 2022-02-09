import { createTheme } from '@mui/material/styles';
import { purple, indigo } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface ThemeOptions  {
    status: {
        primary: {
            main: string,
            price: string
        },
        secondary: {
            main: string,
        },
    }
  }
}

export const Theme = createTheme({
        status: {
            primary: {
                main: purple[700],
                price: indigo[600]
            },
            secondary: {
                main: '#f44336',
            },
        },
    });