import {
  Paper, Typography, List, ImageListItem, ListItem, ListItemText, Divider, Grid, Button
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCartById, getOrderById, putQuantityAfterOrder } from "../redux/actions";
import {useNavigate} from "react-router-dom"
import { TypographyMenu } from "../personalizadTheme";




export const OrderDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    console.log(id)
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const currentOrder = useSelector(state => state.currentOrder);
    const navigate = useNavigate();
    const token = JSON.parse(window.localStorage.getItem("token"))?.token;

    useEffect(()=> {
        dispatch(getOrderById(id));
        dispatch(getCartById(token));
    }, [dispatch])

    const handleClick = (e)=>{
       
        navigate("/")
    }

  return (
    <Box
    sx={{display:"flex", justifyContent: "center", alignItems: "center", minHeight:"84.1vh"}}
    >
      <Paper component="div" sx={{ width: "700px", minHeight:"600px", padding: "15px", margin:"10px" }}>
      <Typography component='h1' variant='h3' color="darkGrey.main" sx={{textAlign:"center"}}>
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
             <Typography variant='h6' color="darkGrey.main">
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
             <Typography variant='h6' color="darkGrey.main">
                 Estado de compra:
            </Typography>
            <Box>
                    <Typography sx={{margin:"5px"}}>
                        Estado: {`${currentOrder?.state}.`}
                    </Typography>
                    {currentOrder?.paymentState === "success" ? <Typography sx={{margin:"5px"}}>
                        Pago: Exitoso.
                    </Typography> : <Typography sx={{margin:"5px"}}>
                        Pago: Rechazado.
                    </Typography>}
               
             </Box>
             <Box sx={{mt:"10px", display:"flex", justifyContent:"center"}}>
                 {
                     currentOrder?.paymentState === "success" ? 
                     <Button 
                     variant='contained' 
                     color='darkGrey' 
                     size='small'
                     onClick={(e)=>handleClick()}
                     > <TypographyMenu>Volver a la tienda</TypographyMenu> </Button>
                      : 
                    <Button
                    variant='contained' 
                    color='darkGrey' 
                    size='small'
                    onClick={
                        () => navigate("/cart")
                    }
                    > <TypographyMenu>Intentar nuevamente</TypographyMenu> </Button>
                 }
             </Box>

      </Paper>
      
    </Box>
  );
};
 
