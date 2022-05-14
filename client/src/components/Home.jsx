import { Grid, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategories } from "../redux/actions";
import { Card } from "./Card/Card";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper";
import { Paginationxd } from "./Pagination/Pagination";
import MultiActionAreaCard from "./Card/Card";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Box } from "@mui/system";
import { Category } from "./Category/Category";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories())
  }, [dispatch]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  //calculos pagination
  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;
  const actualPage = products.slice(firstProduct, lastProduct);

  const classes = useStyles();

  return (
    <div>
      <h1>Soy el Home</h1>
      <SwipeableTextMobileStepper  />
      <Box sx= {{width: '100%', display: 'flex'}}>
        <Category categories= {categories}></Category>
        <Grid container spacing={12} sx={{ml:"auto", mr:"auto", mt:1}}>
        {products &&
          actualPage.map((prod, index) => {
            return (
                <Grid item l>
                  <Paper className={classes.paper}>
                    <MultiActionAreaCard
                      key={index}
                      name={prod.name}
                      brand={prod.brand}
                      thumbnail={prod.thumbnail}
                      price={prod.price}
                    />
                  </Paper>
                </Grid>
            
            );
          })}
          </Grid>
      </Box>
      <Paginationxd
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        products={products.length}
      />
    </div>
  );
};
