import { Box, Typography, CircularProgress, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../../redux/actions";
import MultiActionAreaCard from "../../Card/Card";

export default function GetAllProductsToAdmin() {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);

    const {name} = useParams();


    useEffect(() => {
        dispatch(getProducts(name));
      }, [dispatch]);

      
  return (
    <Box>

    {products.length > 0 ? (products.map((product)=>{
        return(
            <>
            {console.log(product)}
            <Typography variant="h2">{product.name}</Typography>
            </>
        )
    })): (<div></div>)}
    
    </Box>
  );
}


