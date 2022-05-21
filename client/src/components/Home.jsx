import { CircularProgress, Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  filterPerCategory,
  filterPerSubCategory,
  filterPerPrice
} from "../redux/actions";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper";
import { Paginationxd } from "./Pagination/Pagination";
import MultiActionAreaCard from "./Card/Card";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Category from "./Category/Category";
import { useParams } from "react-router-dom";
import SwipeableDrawerFilters from './SwipeableFilters/SipeableFilters'
import { Box } from "@mui/system";
const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#D1C2B0"
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
  const [reRender, setReRender] = useState("");

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
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

  const handleClickSubmitPerPrice = (value) => {
      dispatch(filterPerPrice(value));
      setReRender(`Ultimo ordenamiento ${value}`)
      setCurrentPage(1);
  }



  return (
    <Box
        maxWidth="vp"
        sx={{
          gap:0,
          display: "flex",
          flexDirection: "column",
          margin: 0,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Container 
           maxWidth="vp"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: 0,
          }}>
        <SwipeableTextMobileStepper
          sx={{
            display: "flex",
            width: "100%",
          }}
        />
        </Container>

        <SwipeableDrawerFilters
              handleClickForCategories = {handleClickForCategories} 
              handleClickForSubcategories= {handleClickForSubcategories}
              handleClickSubmitPerPrice= {handleClickSubmitPerPrice} 
            >
        </SwipeableDrawerFilters>

        <Container
          maxWidth="vp"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: 0,
          }}
        >

          <Category
            handleClickForCategories = {handleClickForCategories} 
            handleClickForSubcategories= {handleClickForSubcategories}
            handleClickSubmitPerPrice= {handleClickSubmitPerPrice} 
          
          >

          </Category>

          
          <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: 0,
          }}
          >
          <Grid
          id="container"
            container 
            sx={{
              
              display: "flex",
              ml: "auto",
              mr: "auto",
              mt: "10px",
              justifyContent: "center",
            }}
          >
            {products.length > 0 ? (
              actualPage.map((prod, index) => {
                return (
                  <Grid
                    sx={{
                      m: "20px", width:"235px", justifyContent:"stretch"
                    }}
                  >
                      <Paper className={classes.paper} sx={{display: 'flex', heigth: "360px"}} >
                    <Link href={"/detail/" + prod.id} underline="none">
                        <MultiActionAreaCard
                          key={index}
                          name={prod.name}
                          brand={prod.brand}
                          thumbnail={prod.thumbnail}
                          price={prod.price}
                          id={prod.id}
                          description={prod.description}
                        />
                    </Link>
                      </Paper>
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

        <Container maxWidth="vp" sx={{ width: "100%"}}>
          <Paginationxd
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            products={products.length}
            setProductsPerPage={setProductsPerPage}
          />
        </Container>
        </Container>
          </Container>
      </Box>
  );
};
