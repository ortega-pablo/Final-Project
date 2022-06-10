import {
    Paper, Typography, List, ImageListItem, ListItem, ListItemText, Divider, Grid, Button, IconButton, Modal, InputLabel, Select, MenuItem
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { useDispatch } from "react-redux";
  import { useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import { useEffect } from "react";
  import { getOrderById, modifyStateOrder } from "../../redux/actions";
  import {useNavigate} from "react-router-dom"
  import EditIcon from '@mui/icons-material/Edit';
  import React from "react";
import { TypographyMenu } from "../../personalizadTheme";

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  
  
  export const OrderDetailForAdminPanel = () => {
  
      const {id} = useParams();
      const dispatch = useDispatch();
      console.log(id)
      let dollarUSLocale = Intl.NumberFormat('en-US');
      const currentOrder = useSelector(state => state.currentOrder);
      const navigate = useNavigate();
      const [open, setOpen] = React.useState(false);
      const [state, setState] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const [render, setRender] = React.useState(true);
      const handleChange = (event) => {
        setState(event.target.value);
      };
      const handleSubmit = async (event) => {
        //si si quiere cambiar el estado pasa esto:
          event.preventDefault();
          await dispatch(modifyStateOrder(id, state));
          setRender(!render);
          setOpen(false);
        // si no quiere:
        // event.preventDefault();
        // setOpen(false);
      }
      console.log(state);
  
      useEffect(()=> {
          dispatch(getOrderById(id));
      }, [render])
  
    return (
      <Box
      sx={{display:"flex", justifyContent: "center", alignItems: "center", minHeight:"84.1vh"}}
      >
        <Paper component="div" sx={{ width: "700px", minHeight:"600px", padding: "15px", margin:"10px" }}>
        <Typography component='h1' variant='h3' color="verdeLima.main" sx={{textAlign:"center"}}>
                  Orden N° {currentOrder.id}
          </Typography>
          <Typography variant='h6' color="darkGrey.main">
                  Resumen de compra:
              </Typography>
              <List disablePadding>
                  {currentOrder?.orderProducts?.map(p =>( 
                      <ListItem key={p.productName} sx={{display:"flex", justifyContent: "space-around"}}>
                          <ImageListItem sx={{width: "90px", heigth: "90px"}}>
                              <img 
                              src={p.productImage}
                              />
                          </ImageListItem>
                          <ListItemText
                              sx={{margin:"5px"}}
                              primary={p.productName}
                              secondary={"x" + p.quantity}
                          />
                          <ListItemText
                              sx={{margin:"5px"}}
                              primary={`Sub total: $${dollarUSLocale.format(p.price * p.quantity)}`}
                          />
                      </ListItem>
                  ))}
                  <ListItem>
                          <Typography variant='subtitle2'>
                              {`Total: $${dollarUSLocale.format(currentOrder.total/100)}`}
                          </Typography>
                  </ListItem>
               </List>
               <Divider></Divider>
               <Typography variant='h6'color="darkGrey.main">
                   Datos del cliente:
              </Typography>
               <Box>
                      <Typography sx={{margin:"5px"}}>
                          Nombre: {`${currentOrder?.FirstName} ${currentOrder?.LastName}.`}
                      </Typography>
                      <Typography sx={{margin:"5px"}}>
                          Correo electrónico: {`${currentOrder?.EmailAddress}.`}
                      </Typography>
                      <Typography sx={{margin:"5px"}}>
                          Teléfono: {`${currentOrder?.Mobile}.`}
                      </Typography>
                      <Typography sx={{margin:"5px"}}>
                          Pais: {`${currentOrder?.Country}.`}
                      </Typography>
                      <Typography sx={{margin:"5px"}}>
                          Dirección: {`${currentOrder?.Address1}, ${currentOrder.City}.`}
                      </Typography>
                      <Typography sx={{margin:"5px"}}>
                          CP: {`${currentOrder?.PostCode}.`}
                      </Typography>
               </Box>
               <Divider></Divider>
               <Typography variant='h6'color="darkGrey.main">
                   Estado de compra:
              </Typography>
              <Box>
                      <Typography sx={{margin:"5px"}}>
                          Estado de orden: {`${currentOrder?.state === "created" ? "creada" : ''}${currentOrder?.state === "processing" ? "en proceso" : ''}${currentOrder?.state === "shipped" ? "enviado" : ''}${currentOrder?.state === "cancelled" ? "cancelada" : ''}${currentOrder?.state === "completed" ? "completada": ''}.`} <IconButton onClick={handleOpen}>
                                                                            <EditIcon fontSize="small"></EditIcon>
                                                                        </IconButton>
                      </Typography>
                      {currentOrder?.paymentState === "success" ? 
                      <Typography sx={{margin:"5px"}}>
                          Pago: Exitoso.
                      </Typography>
                       :
                        <Typography sx={{margin:"5px"}}>
                            Pago: Rechazado.
                        </Typography>
                      }
                      {
                          currentOrder?.paymentState !== "success" &&   <Typography sx={{margin:"5px"}}>
                                                                             Motivo Stripe: {currentOrder.paymentState}
                                                                        </Typography>
                      }
               </Box>
               <Box sx={{mt:"10px", display:"flex", justifyContent:"center"}}>
                       <Button 
                       variant='contained' 
                       color='darkGrey' 
                       size='small'
                       onClick={
                          () => navigate("/allOrdersAdmin")
                      }
                       > <TypographyMenu>Volver a las ordenes</TypographyMenu> </Button>
            
               </Box>
               <Modal
                    open={open}
                    onClose={handleClose}
               >
                   <Box sx={style}>
                       <form onSubmit={handleSubmit}>
                           <InputLabel id="demo-simple-select-label" >Estado</InputLabel>
                           <Select
                            labelId="demo-simple-select-label"
                            label="Estado"
                            id="demo-simple-select"
                            value={state}
                            onChange={handleChange}
                            >
                                <MenuItem value={'created'}>Creada</MenuItem>
                                <MenuItem value={'processing'}>En proceso</MenuItem>
                                <MenuItem value={'shipped'}>Enviado</MenuItem>
                                <MenuItem value={'cancelled'}>Cancelada</MenuItem>
                                <MenuItem value={'completed'}>Completado</MenuItem>
                           </Select>
                           <Button type="submit" sx={{ml:"15px"}} variant='contained' color='darkGrey' size='small'> <TypographyMenu>Cambiar estado</TypographyMenu> </Button>
                       </form>
                   </Box>
               </Modal>
        </Paper>
        
      </Box>
    );
  };
   