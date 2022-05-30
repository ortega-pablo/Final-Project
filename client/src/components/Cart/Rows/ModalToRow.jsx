import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCartById } from "../../../redux/actions";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

export default function ModalToRow({
  id,
  token,
  cantidad,
  setCantidad,
  stock,
  render,
  setRender,
  precio
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSetCantidad = (e) => {
    setCantidad(e.target.value);
  };

  const  handleSubmitCart = async (e) => {
    e.preventDefault();
    if(cantidad <= 0){
      setOpen(false);
      Swal.fire({
        background: "#DFDCD3",
        confirmButtonColor: "#B6893E",
        icon: "error",
        title: "Oops...",
        text: "La cantidad no puede ser menor a 0",
      }).then(() => {
        setOpen(true);
      });
    }
    else if (cantidad <= stock) {
      await dispatch(addItemToCart(id, token, cantidad));
      setOpen(false);
      setRender(!render);
      Swal.fire({
        background: "#DFDCD3",
        icon: "success",
        title: "Modificado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setOpen(false);
      Swal.fire({
        background: "#DFDCD3",
        confirmButtonColor: "#B6893E",
        icon: "error",
        title: "Oops...",
        text: "Stock insuficiente para la cantidad que seleccionaste",
      }).then(() => {
        setOpen(true);
      });
    }
  };
  const subTotal = precio*cantidad

  return (
    <Box>
      <IconButton size="small" onClick={handleOpen}>
        <EditIcon size="small" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
        <Box sx={{display:'flex', justifyContent:'space-around'}}>
          <Typography>Stock: {stock}</Typography>
          <Typography>Precio: {precio}</Typography>
          <Typography>SubTotal: {subTotal}</Typography>
        </Box>
          <form
            onSubmit={(e) => {
              handleSubmitCart(e);
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextField
                margin="normal"
                type="number"
                required
                id="cantidad"
                label={cantidad}
                value={cantidad}
                name="cantidad"
                sx={{
                  width: 100,
                }}
                onChange={(e) => {
                  handleSetCantidad(e);
                }}
              ></TextField>
              <Button type="submit" variant="contained" color="ambar3">
                {" "}
                Confirmar{" "}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="contained"
                color="ambar3"
              >
                {" "}
                Volver{" "}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
