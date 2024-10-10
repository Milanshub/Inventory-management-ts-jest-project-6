import React from "react";
import { Container } from "@mui/material";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
    return (
        <Container 
            maxWidth='sm' 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}
        >
            <RegisterForm />
        </Container>
    );
}; 

export default RegisterPage;
