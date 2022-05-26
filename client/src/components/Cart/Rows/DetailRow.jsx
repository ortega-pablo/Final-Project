import { Table, TableCell, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailRow = (props) => {
  const { row } = props;
  const cartState = useSelector((state) => state.cart);

  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(1);


  useEffect(() => {
    setPrecio(row.precio);
  }, []);

  const total = precio * cantidad;
  const handleSetCantidad = (e) => {
    setCantidad(e.target.value)
  }

  console.log("total --> ", total);
  return (
    <TableRow>
      <TableCell>
        <Typography>{row.name}</Typography>
      </TableCell>
      <TableCell />
      <TableCell>
        <TextField
          margin="normal"
          type="number"
          id="cantidad"
          label={cantidad}
          name="cantidad"
          sx={{
              width: 100
          }}
          onChange={(e)=>{ handleSetCantidad(e)}}
        />
      </TableCell>
      <TableCell>
        <Typography>{precio}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{total}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;
