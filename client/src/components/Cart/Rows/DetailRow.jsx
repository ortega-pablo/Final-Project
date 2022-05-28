import {
  IconButton,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addItemToCart,
  deleteFromCart,
  getCartForChild,
} from "../../../redux/actions";
import ModalToRow from "./ModalToRow";
import Swal from "sweetalert2";

const DetailRow = (props) => {
  const dispatch = useDispatch();
  const { row, cartId, token, setRender, render } = props;
  const [cantidad, setCantidad] = useState(row.Quantity.total);
  const [precio, setPrecio] = useState(row.price);

  const total = precio * row.Quantity.total;
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromCart(row.id, cartId));
        setRender(!render);
        Swal.fire({
          title: "Borrado",
          text: "Producto borrado del carrito",
          icon: "success",
          confirmButtonColor: "#B6893E",
          background: "#DFDCD3",
        });
      }
    });
  };

  return (
    <TableRow>
      <TableCell>
        <Typography>{row.name}</Typography>
      </TableCell>
      <TableCell sx={{display:'flex', alignItems:"center", mb:-0.06}}>

          <Typography>{row.Quantity.total}</Typography>

        <ModalToRow
          cantidad={cantidad}
          setCantidad={setCantidad}
          token={token}
          id={row.id}
          stock={row.productInventory.quantity}
          setRender={setRender}
          render={render}
        />
      </TableCell>
      <TableCell >
        <Typography>{row.price}</Typography>
      </TableCell>
      <TableCell >
        <Typography>{total}</Typography>
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="delete"
          size="small"

          onClick={(e) => {
            handleDelete(e);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;
