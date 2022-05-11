import { SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import { Card } from "./Card/Card";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper"
import { Pagination } from "./Pagination/Pagination";

export const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
 
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(2)
  //calculos pagination
  const lastProduct = currentPage*productsPerPage
  const firstProduct = lastProduct - productsPerPage
  const actualPage = products.slice(firstProduct, lastProduct)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h1>Soy el Home</h1>
      <SwipeableTextMobileStepper/>

      {products &&
        actualPage.map((prod, index) => {
          return (
            <div key={index}>
              <Card
                key={index}
                name={prod.name}
                brand={prod.brand}
                thumbnail={prod.thumbnail}
                price={prod.price}
              />
            </div>
          );
        })}
      <Pagination productsPerPage={productsPerPage} products={products.length} paginate={paginate} currentPage={currentPage}/>
    </div>
  );
};
