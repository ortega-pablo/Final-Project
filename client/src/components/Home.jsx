import { Button, CircularProgress, Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  filterPerCategory,
  filterPerSubCategory,
} from "../redux/actions";
import { Card } from "./Card/Card";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper";
import { Paginationxd } from "./Pagination/Pagination";
import MultiActionAreaCard from "./Card/Card";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Box } from "@mui/system";
import Category from "./Category/Category";

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
  }, [dispatch]);

  //reRenderizador
  const [reRender, setReRender] = useState("");

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  //calculos pagination
  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;
  const actualPage = products.slice(firstProduct, lastProduct);

  const classes = useStyles();

  const handleClickForCategories = (category) => {
    dispatch(filterPerCategory(category));
    setReRender(`Ultimo ordenamiento ${category}`);
    setCurrentPage(1);
  };

  const handleClickForSubcategories = (subCategory) => {
    dispatch(filterPerSubCategory(subCategory));
    setReRender(`Ultimo ordenamiento ${subCategory}`);
    setCurrentPage(1);
  };

  return (
    <div>
      <Container
        maxWidth="vp"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <SwipeableTextMobileStepper
          sx={{
            display: "flex",
            width: "100%",
          }}
        />
        <Button color="primary" variant="contained">
          hola
        </Button>
        <Container
          maxWidth="vp"
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "#000000",
          }}
        >
          <p> Aca van tus filtros samu chupapija </p>
        </Container>
        <Container
          maxWidth="vp"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: 0,
          }}
        >
          <Container
            sx={{
              width: "15%",
            }}
          >
            <Category
              handleClickForCategories={handleClickForCategories}
              handleClickForSubcategories={handleClickForSubcategories}
            ></Category>
          </Container>
          <Grid
            container
            sx={{
              display: "flex",
              ml: "auto",
              mr: "auto",
              mt: "10px",
              width: "85%",
              justifyContent: "center",
            }}
          >
            {products.length > 0 ? (
              actualPage.map((prod, index) => {
                return (
                  <Grid
                    sx={{
                      m: "10px",
                    }}
                  >
                    <Link href={"/detail/" + prod.id} underline="none">
                      <Paper className={classes.paper}>
                        <MultiActionAreaCard
                          key={index}
                          name={prod.name}
                          brand={prod.brand}
                          thumbnail={prod.thumbnail}
                          price={prod.price}
                          id={prod.id}
                          description={prod.description}
                        />
                      </Paper>
                    </Link>
                  </Grid>
                );
              })
            ) : (
              <CircularProgress
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            )}
          </Grid>
        </Container>

        <Container maxWidth="vp" sx={{ width: "100%" }}>
          <Paginationxd
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            products={products.length}
            setProductsPerPage={setProductsPerPage}
          />
        </Container>
      </Container>
    </div>
  );
};
