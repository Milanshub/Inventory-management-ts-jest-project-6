import React from "react";
import { Container, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <Container 
            maxWidth='sm'
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh'  // Ensures it takes up the full height
            }}
        >
            <Box sx={{ width: '100%' }}> {/* Ensures the LoginForm takes full width */}
                <LoginForm />
            </Box>
        </Container>
    )
};

export default LoginPage;