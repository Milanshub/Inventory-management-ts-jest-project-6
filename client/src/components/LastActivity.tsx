import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring'; // For fade-in effect

const LastActivity: React.FC = () => {
    const productContext = useContext(ProductContext);

    // The useSpring hook is always called, ensuring consistent execution order.
    const fadeInProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 800 }, // Customize the duration as needed
    });

    // If there's no product context, render null, but the hook is still called.
    if (!productContext) {
        return null;
    }

    const { lastUpdated } = productContext;

    return (
        <animated.div style={fadeInProps}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                        Last Updated
                    </Typography>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#1ABC9C', // Teal color for the date
                            fontWeight: 'bold', 
                            fontSize: '1.5rem', 
                        }}
                    >
                        {lastUpdated ? lastUpdated.toLocaleString() : 'No updates yet'}
                    </Typography>
        </animated.div>
    );
};

export default LastActivity;
