import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventary } from "../../../redux/actions";

export const AdmininAllStock = () => {
  const dispatch = useDispatch();
  const allStock = useSelector((state) => state.inventory);
  useEffect(() => {
    dispatch(getInventary());
  },[dispatch]);

  return (
    <>






    
      {allStock.map((s) => <Typography>{s.name}</Typography> )}
      {allStock.map((s) => <Typography>{s.quantity}</Typography> )}
    </>
  );
    };
