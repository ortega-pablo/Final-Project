import { SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import { Card } from "./Card/Card";
import SwipeableTextMobileStepper from "./Carousel/SwipeableTextMobileStepper"
import Footer from "./Footer/Footer";

export const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
 
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Soy el Home</h1>
      <SwipeableTextMobileStepper/>

      {products &&
        products.map((prod, index) => {
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
      <Footer/>
    </div>
  );
};
