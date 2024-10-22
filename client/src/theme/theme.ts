import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ABC9C', // Teal for primary components (like AppBar)
        },
        secondary: {
            main: '#E74C3C', // Coral Red for secondary actions (like alerts or highlights)
        },
        background: {
            default: '#F7F9F9', // Light Gray for the background
            paper: '#FFFFFF', // White for cards or surfaces
        },
        error: {
            main: '#E74C3C', // Same Coral Red for error states
        },
        text: {
            primary: '#2C3E50', // Dark color for primary text (e.g., titles)
            secondary: '#34495E', // Slightly lighter shade for secondary text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem', // Larger h1 size
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem', // Consistent font weights and sizing
        },
        h3: {
            fontWeight: 700,
            fontSize: '1.75rem',
        },
        body1: {
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.6, // Improve readability
        },
        button: {
            fontWeight: 600, // Buttons can be slightly bolder
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Slight rounding for buttons
                    textTransform: 'none', // No uppercase transformation
                    '&:hover': {
                        backgroundColor: '#16a085', // Darker teal on hover
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1ABC9C', // Use teal for the app bar
                    color: '#F7F9F9', // Light gray for text
                },
            },
        },
    },
});

export default theme;
