import { Grid, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import { Card } from "./Card/Card";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper";
import { Paginationxd } from "./Pagination/Pagination";
import MultiActionAreaCard from "./Card/Card";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

  useEffect(() => {
    dispatch(getProducts());
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
      <Container
        maxWidth="vp"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        <SwipeableTextMobileStepper
          sx={{
            display: "flex",
            width: "100%",
          }}
        />
        <Container
          maxWidth="vp"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Container
            sx={{
              width: "15%",
            }}
          >
            <p> Aca van tus filtros samu chupapija </p>
          </Container>
          <Grid
            container
            spacing={12}
            sx={{
              display: "flex",
              ml: "auto",
              mr: "auto",
              mt: 1,
              width: "85%",
              justifyContent: "center",
            }}
          >
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
                        sku={prod.sku}
                        id={prod.id}
                      />
                    </Paper>
                  </Grid>
                );
              })}
              <Container maxWidth="vp" sx={{width:'100%'}}>
                <Paginationxd
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  productsPerPage={productsPerPage}
                  products={products.length}
                  setProductsPerPage={setProductsPerPage}
                />
              </Container>
          </Grid>
        </Container>


      </Container>
    </div>
  );
};
