import React, {useContext} from "react";
import { ProductContext } from "../context/ProductContext";
import { Typography } from "@mui/material";

const LastActivity: React.FC = () => {
    const productContext = useContext(ProductContext); 

    if (!productContext) {
        return null; 
    }

    const {lastUpdated} = productContext; 

    return (
        <Typography variant="body1">
            Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'No updates yet'}
        </Typography>
    );
};

export default LastActivity; 