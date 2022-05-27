import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function CartModal({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  const cart = useSelector((state) => state.cart);
  
  
  useEffect(() => {
    // setPrecio();
  }, []);
  const handleSetCantidad = (e) => {
    setCantidad(e.target.value)
  }
  const handleSubmitCart = (e) => {
    e.preventDefault()
    console.log(cantidad)
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        Agregar al Carrito
      </Button>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <form onSubmit={(e)=>{handleSubmitCart(e)}}>
          <TextField
            margin="normal"
            type="number"
            required
            id="cantidad"
            label={cantidad}
            value={cantidad}
            name="cantidad"
            sx={{
              width: 100
            }}
            onChange={(e)=>{ handleSetCantidad(e)}}
          >
          </TextField>
          
          <Button type="submit"> Agregar </Button>
          </form>

          <Button href={ "/detail/" + id}> Ver detalle </Button>
          <Button onClick={() => setOpen(false)}> Volver </Button>
        </Box>
      </Modal>
    </div>
  );
}
