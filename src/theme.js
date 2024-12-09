import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat, sans-serif", // Replace with your desired font family
    },
    palette: {
        primary: {
            main: '#2E3CCE', // Set your custom primary color
        },
        secondary: {
            main: '#4caf50', // Optional: Set a custom secondary color
        },
    },
});

export default theme;