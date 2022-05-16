import { Grid, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, filterPerCategory, filterPerSubCategory, filterPerPrice, filterPerName} from "../redux/actions";
import { Card } from "./Card/Card";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper";
import { Paginationxd } from "./Pagination/Pagination";
import MultiActionAreaCard from "./Card/Card";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Box } from "@mui/system";
import Category  from "./Category/Category";
import { formatMuiErrorMessage } from "@mui/utils";
import { useParams } from "react-router-dom";

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

  const {name} = useParams();
  
  console.log(name);

  useEffect(() => {
    dispatch(getProducts(name));
  }, [dispatch]);
  
  //reRenderizador 
  const [reRender, setReRender] = useState('');

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
  }

  const handleClickForSubcategories = (subCategory) => {
    dispatch(filterPerSubCategory(subCategory));
    setReRender(`Ultimo ordenamiento ${subCategory}`);
    setCurrentPage(1);
  }

  const handleClickSubmitPerPrice = (value) => {
      dispatch(filterPerPrice(value));
      setReRender(`Ultimo ordenamiento ${value}`)
      setCurrentPage(1);
  }



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
            <Category 
              handleClickForCategories = {handleClickForCategories} 
              handleClickForSubcategories= {handleClickForSubcategories}
              handleClickSubmitPerPrice= {handleClickSubmitPerPrice} 
            >
            </Category>
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
